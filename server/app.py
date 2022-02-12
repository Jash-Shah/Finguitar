from flask import Flask, jsonify
from flask_sock import Sock
from flask_socketio import SocketIO
from keypoint_classifier import KeyPointClassifier
import cv2 as cv
import mediapipe as mp
from landmark_processing import *
import base64

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
sock = Sock(app)
socketio = SocketIO(app)
# Do CORS

keypoint_classifier = KeyPointClassifier()
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.5,
)



@app.route("/keypoint_classifier/")
def hello_world():
    # get image by converting from base64
    image = cv.flip(image, 1)
    # Detection implementation #############################################################
    image = cv.cvtColor(image, cv.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = hands.process(image)
    image.flags.writeable = True
    if results.multi_hand_landmarks is not None:
            for hand_landmarks, handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
                # Landmark calculation
                landmark_list = calc_landmark_list(image, hand_landmarks)
                # Conversion to relative coordinates / normalized coordinates
                pre_processed_landmark_list = pre_process_landmark(
                    landmark_list)
                # Hand sign classification
                hand_sign_id = keypoint_classifier(pre_processed_landmark_list)

    return jsonify(hand_sign_id)

@sock.route('/')
def echo(ws):
    while True:
        data = ws.receive()
        ws.send(base64.decodebytes(data))

if __name__=="__main__":
    #socketio.run(app)
    app.run(debug=True,port = 3100)