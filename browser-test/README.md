# Working with the Stream API

[Browser Compatibility Check](https://caniuse.com/stream)

[Relevant MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

The getUserMedia API works only in secure context(HTTPS), not a worry if running on localhost

There are two components that do all the heavy lifting in getting data from your webcam displayed on your screen. They are the HTML video element and the JavaScript getUserMedia function:

![Stream API](https://www.kirupa.com/html5/images/video_getUserMedia.png)

The video element is pretty straightforward in what it does. It is responsible for taking the video stream from your webcam and actually displaying it on the screen.

The interesting piece is the getUserMedia function. This function allows you to do three things:

1. Specify whether you want to get video data from the webcam, audio data from a microphone, or both.

1. If the user grants permission to access the webcam, specify a success function to call where you can process the webcam data further.

1. If the user does not grant permission to access the webcam or your webcam runs into some other kind of error, specify a error function to handle the error conditions.

For what we are trying to do, we call the getUserMedia function and tell it to only retrieve the video from the webcam. Once we retrieve the video, we tell our success function to send the video data to our video element for display on our screen.
