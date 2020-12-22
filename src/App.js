import logo from './logo.svg';
import './App.css';

import React, {useRef} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam"

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // load posenet
  const runPosenet = async () =>{
    const net = await posenet.load({
      inputResolution:{width: 640, height:480},
      scale:0.5
    })
    // setInterval
    const count = 0
    const poseFrame = setInterval(()=>{
        detect(net)
  
    }, 5000)

    


  }

  //start detecting 
  const detect = async(net) =>{
    if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState ===4) {
      
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video with
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;


      // make the detection
      const pose = await net.estimateSinglePose(video);
      // console.log(pose);
      // console.log(pose["score"]);
      console.log(pose["keypoints"][0]["position"]["y"]);
      // console.log(pose["keypoints"][1]["position"]);
      // console.log(pose["keypoints"][2]["position"]);
      // console.log(pose["keypoints"][3]["position"]);
      // console.log(pose["keypoints"][4]["position"]);
      console.log(pose["keypoints"][5]["position"]["x"] - pose["keypoints"][6]["position"]["x"]);
      // console.log(pose["keypoints"][5]["position"]["y"] - pose["keypoints"][6]["position"]["y"]);

    }
  }
  runPosenet()
  return (
    <div className="App">
      <header className="App-header">
      <Webcam 
        ref = {webcamRef}
        style = {{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          textAlign: "center",
          zIndex:9,
          width: 640,
          height: 480
          
        }}
      />
      <canvas 
      ref = {canvasRef}
      style ={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: "0",
        right: "0",
        textAlign: "center",
        zIndex:9,
        width: 640,
        height: 480
      }} 
      />
      </header>
    </div>
  );
}

export default App;
