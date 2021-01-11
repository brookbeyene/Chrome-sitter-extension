import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import React, {useRef} from 'react';
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
const bodyPose = null;
function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  

  // load posenet
  const runPosenet = async () =>{
    const net = await posenet.load({
      inputResolution:{width: 640, height:480},
      scale:0.2
    })
    // setInterval
   
    
    setInterval(()=>{
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
      // bodyPose = pose["keypoints"][5]["position"]["x"] - pose["keypoints"][6]["position"]["x"]
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
      
      const yFrame = pose["keypoints"][2]["position"]["y"] + pose["keypoints"][6]["position"]["y"]

      const xCounter = 4
      // const xAvg = 0
      const xFrame = pose["keypoints"][5]["position"]["x"] - pose["keypoints"][6]["position"]["x"]
      // if(pose["keypoints"][2]["score"] > 0.9){
      //   if(pose["keypoints"][6]["score"] > 0.9){

      //     const yTFrame = pose["keypoints"][2]["position"]["y"] - pose["keypoints"][6]["position"]["y"]
      //     // console.log(yTFrame)
      //   }
      // }
      
      console.log(yFrame)
      

        if (xFrame > 250){
          if(yFrame > 15 && yFrame < 30){
  
          ReactDOM.render(<div style ={{
            
            
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            zIndex:9,
            width: 640,
            height: 480
          }} > <img src="https://i.pinimg.com/originals/26/d5/79/26d57978063c9901120bfc5ac9b85d1b.jpg" width="250" height="200"/><h1>Good Job </h1>
          <h2>You are sitting properly...keeeeeep it up!! </h2>
          <h2>Normal Pose Avg Score  = 17</h2>
          <h2>Your Pose Avg Score = {Math.round(yFrame)}</h2>
          <button><a href="https://google.com" class="button">Go to Google</a></button><h1></h1><Webcam 
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
        }} /><h1></h1>
          </div>, document.getElementById('bodyPosing'))
          // console.log("Good")
          // console.log(pose)
        }else{
          // console.log(pose["score"])
          // console.log("fix it")
          // console.log(pose)
          ReactDOM.render(<div style ={{
            background: "ebony",
    
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            zIndex:9,
            width: 640,
            height: 480
          }} > <img src="https://i.pinimg.com/originals/26/d5/79/26d57978063c9901120bfc5ac9b85d1b.jpg" width="250" height="200"/>
          <h1>Your posture could be better!</h1>
          <h2>You can do this!!</h2>
          <h2>Normal Pose Avg Score  = 17</h2>
        <h2>Your Pose Avg Score = {Math.round(yFrame)}</h2>
          <button><a href="https://google.com" class="button">Go to Google</a></button><h1></h1><Webcam 
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
        }} /><h1></h1>
          </div>, document.getElementById('bodyPosing'))
  
          // ReactDOM.render(<p style ={{
          //   position: "absolute",
          //   marginLeft: "auto",
          //   marginRight: "auto",
          //   left: "0",
          //   right: "0",
          //   textAlign: "center",
          //   zIndex:9,
          //   width: 340,
          //   height: 280
          // }} >Please fix your posture</p>, document.getElementById('bodyPosing'));
        }
        
        
      }else{
        ReactDOM.render(<div style ={{
          background: "ebony",
  
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          textAlign: "center",
          zIndex:9,
          width: 640,
          height: 480
        }} > <img src="https://i.pinimg.com/originals/26/d5/79/26d57978063c9901120bfc5ac9b85d1b.jpg" width="250" height="200"/>
        <h1>Your posture could be better!</h1>
        <h2>You can do this!!</h2>
        <h2>Normal Pose Avg Score  = 17</h2>
        <h2>Your Pose Avg Score = {Math.round(yFrame)}</h2>
        <button><a href="https://google.com" class="button">Go to Google</a></button><h1></h1><Webcam 
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
      }} /><h1></h1>
        </div>, document.getElementById('bodyPosing'))

        
    
      
      }
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
      {/* <div
      ref = {bodyPose}
      style ={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: "0",
        right: "0",
        textAlign: "center",
        zIndex:9,
        width: 340,
        height: 280
      }} 
      /> */}
      
      </header>
      
      
      
      
    </div>
    
  );
}

export default App;
