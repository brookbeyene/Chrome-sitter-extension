import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import React, {useRef} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import  Album  from "./Component/HomePage";
const bodyPose = null;
function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  

  // load posenet
  const runPosenet = async () =>{
    const net = await posenet.load({
      inputResolution:{width: 380, height:240},
      scale:0.52
    })
    // setInterval
   
    
    setInterval(()=>{
        detect(net)
  
    }, 2000)
    
    
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
      // bodyPose = pose["keypoints"][5]["position"]["x"] - pose["keypoints"][6]["position"]["x"]
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
      
      // const yFrame = pose["keypoints"][2]["position"]["y"] + pose["keypoints"][6]["position"]["y"]

      // const xCounter = 4
      // // const xAvg = 0
      const xFrame = pose["keypoints"][6]["position"]["x"] - pose["keypoints"][5]["position"]["x"]
      ReactDOM.render(<div style ={{
            
            
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: "0",
        right: "0",
        textAlign: "center",
        zIndex:9,
        width: 380,
        height: 240
      }} > <h1>Good Job </h1>
      <h2>You are sitting properly...keeeeeep it up!! </h2>
      <h2>Normal Pose Avg Score  = 17</h2>
      
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
            width: 380,
            height: 240
            
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
                  width: 380,
                  height: 240
            }} /><h1></h1>
  
      <h2>Your Pose Avg Score = {Math.round(xFrame)}</h2>
    
      <Album />
      <button><a href="https://google.com" class="button">Go to Google</a></button><h1></h1>
      </div>, document.getElementById('bodyPosing'))
    }
  }
  

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);

  };
  
  runPosenet()
  // function myStopFunction(){
  //   clearInterval(runPosenet())
  // }
  // myStopFunction()
  // setInterval(runPosenet(), 10000)
  return (
    <div className="App" id="bodyPosing" >
      <header className="App-header" id="searchBar">
    <> 
      <Webcam 
        ref = {webcamRef}
        style = {{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
         
          left: "0",
          right: "0",
          textAlign: "center",
          zIndex:9,
          width: 380,
          height: 240
          
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
        width: 380, height:240
      }} 
      />
      
      </>
      
     
      </header>
      </div>
  );
}

export default App;
