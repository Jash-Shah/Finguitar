from flask import Flask, jsonify
from flask_sock import Sock
import cv2 as cv
import mediapipe as mp
import base64

from keypoint_classifier import KeyPointClassifier
from landmark_processing import *
import numpy as np

# Create Flask App
app = Flask(__name__)

# Create app for WebSocket
sock = Sock(app)

# Classifies which hand gesture is being displayed based on the landmarks calculatted in the image
keypoint_classifier = KeyPointClassifier()

# Mediapipe model to find the location of the hand on he image
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.5,
)


######################################## Detection implementation ###########################
# Return index of hand gesure being broadcasted in the image
# Indices are as follows:
# 0. Palm   1. Fist   2. Thumb   3. Index   4. Middle   5. Pinky   6. Call   7. Rock   8. LShape(Finger+thumb)   9. Ok   -1. NOTA
def get_sign(image):
    # Mirrors the image
    image = cv.flip(image, 1)
    image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
    image.flags.writeable = False # To avoid any writing to img by mediapipe

    # Returns a class which has all the information about tthe landmark points of the hand detected using mediapipe model
    results = hands.process(image)
    image.flags.writeable = True

    hand_sign_id = -1 # Default index if no gestture is detected
    if results.multi_hand_landmarks is not None:
        for hand_landmarks, handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
            # Landmark calculation
            landmark_list = calc_landmark_list(image, hand_landmarks)

            # Conversion to relative coordinates / normalized coordinates
            pre_processed_landmark_list = pre_process_landmark(
                landmark_list)

            # Hand sign classification
            hand_sign_id = keypoint_classifier(pre_processed_landmark_list)

    return hand_sign_id

@sock.route('/')
def echo(ws):
    while True:
        # Decoding Image recieved in Base64 format
        data = ws.receive()
        data_bytes = base64.b64decode(data[23:])

        # Default index
        res = -1
        if len(data_bytes) != 0:
            # Converting from bytes to cv2 image
            img_result_np = np.frombuffer(data_bytes, np.uint8)
            img_result_cv = cv.imdecode(img_result_np, cv.IMREAD_COLOR)
            res = get_sign(img_result_cv)
            print("Sign = ",res)
        ws.send(res)


if __name__ == "__main__":
    app.run(debug=True, port=3001)
