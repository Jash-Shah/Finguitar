const video = document.getElementById("videoElement");
const statusText = document.getElementById("status");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
      statusText.innerText = "Your webcam is connected :)";
      statusText.classList.add("success");
    })
    .catch(function (err) {
      console.log("Something went wrong!");
      statusText.innerText =
        "Your webcam hasn't connected :( Please check the browser permissions";
      statusText.classList.add("failure");
    });
}
