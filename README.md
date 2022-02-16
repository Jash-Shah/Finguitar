<h1 align="center">
  <a href="https://github.com/Jash-Shah/Finguitar">
    <img src="https://guitar.com/wp-content/uploads/2018/05/lesson-technique-1-hold-neck-fingers-exercises@1800x1000.jpg" alt="Guitar" width="125" height="125">
  </a>
  <br>
  Finguitar 🎸
</h1>

<div align="center">
   <strong>Finguitar</strong> - This is an online instrument which you can play using just your fingers. <br>
  CodeOdyssey Hack-a-thon || Team NeoStar Aaghadi <br> <br>
  <img src="https://img.shields.io/github/stars/Jash-Shah/Finguitar?color=green&style=for-the-badge">
  <img src="https://img.shields.io/github/forks/Jash-Shah/Finguitar?color=red&style=for-the-badge">
</div>
<hr>

<table>
  <tr>
    <td>
This web-app is called Finguitar (Finger-Guitar).  
It uses Computer Vision to build an online instrument which you can play using <strong><em>just your fingers</em></strong>. <br>
You can hold up a gesture with your hand and the web-app will record it using your webcam and play a music note for every gesture!
The idea is to then give the user the ability to combine these gestures to make a tune out of it.
So, it's like playing a guitar... but using Computer Vision!<br>
Currently we recognize <i>10 gestures</i> to play different sounds:
      <ul>
        <li>Palm</li>
        <li>Fist</li>
        <li>Thumb</li>
        <li>Index</li>
        <li>Middle 2 fingers</li>
        <li>Pinky</li>
        <li>Call</li>
        <li>Rock</li>
        <li>LShape(finger+thumb)</li>
        <li>Ok</li>
      </ul>
  </td>
 </tr>
</table>

## Resources
- [Demo Video](https://youtu.be/pFYSHJIRtao)
- [Devfolio Submission](https://devfolio.co/submissions/finguitar-00bc)

## 🤖Tech-Stack

#### Front-end
- ReactJS

#### Back-end
- Flask

#### Computer vision
- OpenCV

## 📲Communication b/w the web-app and the model
The communication is carried out on a <strong>WebSocket</strong> endpoint run by the server. The web-app uses the browser's Stream API to emit the current frame encoded as a base64 string via the WebSocket. The server receives the string, decodes it and runs the OpenCV model on it. The gesture recognized is then relayed back on the same endpoint as a response.
<br>
<div align="center">
<img src="https://camo.githubusercontent.com/1573abb7f33538f04895f5b1286312d4ef114ecb3e3b070415c09ec6b2b6f9a1/68747470733a2f2f7777772e786f7269616e742e636f6d2f73697465732f64656661756c742f66696c65732f75706c6f6164732f323031352f30322f696d67342d776562532e706e67" alt="WebSockets" width="400" height="400">
</div>

## 🔮Further additions
- Host the web-app and the model
- Improve the animations on the web-app
- Add a gamified experience for the user, and provide him with a score as a feedback
- Add a tutorial run, where the user can first train on the set of gestures and get familiar with the sounds.

## 👨‍💻Team Members
- [Sarvagnya Purohit](https://github.com/saRvaGnyA)
- [Jash Shah](https://github.com/Jash-Shah)
- [Pratiksha Sankhe](https://github.com/psankhe28)
- [Alisha Kamat](https://github.com/alisha-kamat)
