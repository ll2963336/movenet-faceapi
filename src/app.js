import "./import-jquery.js";
import "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api/dist/face-api.esm-nobundle.js";
import * as posedetection from "@tensorflow-models/pose-detection";

import { Camera } from "./camera.js";

let camera;

async function runMLModels() {
  // load pose detection
  // const detectorConfig = {
  //   modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
  //   modelUrl: "/model/model.json",
  // };
  // const detector = await posedetection.createDetector(
  //   posedetection.SupportedModels.MoveNet,
  //   detectorConfig
  // );

  // load age / gender & emotion detection
  // await faceapi.nets.tinyFaceDetector.loadFromUri("/model");
  // await faceapi.nets.ageGenderNet.loadFromUri("/model");
  // await faceapi.nets.faceRecognitionNet.loadFromUri("/model");
  // await faceapi.nets.faceExpressionNet.loadFromUri("/model");

  async function detect() {
    // get poses
    // let poses;
    // poses = await detector.estimatePoses(camera.video, {
    //   maxPoses: 1,
    //   flipHorizontal: false,
    //   predictIrises: false,
    // });

    // get age / gender & emotion detection
    let detections;
    // if (faceAPIToggle.current) {
    //   detections = await faceapi
    //     .detectAllFaces(
    //       camera.current.video,
    //       new faceapi.TinyFaceDetectorOptions()
    //     )
    //     .withFaceExpressions()
    //     .withAgeAndGender();

    // Date Log to send to backend
    const MLData = {
      posenet: poses ? poses : null,
      faceapi: detections ? detections : null,
    };

    console.log(MLData);
    requestAnimationFrame(detect);
  }
  detect();
}

// 主程式
async function app() {
  // 設好 camera
  // window.camera = camera = await Camera.setupCamera();

  // 開始 loop
  // runMLModels();

  await faceapi.nets.tinyFaceDetector.loadFromUri("/model");
  // await faceapi.nets.ageGenderNet.loadFromUri("/model");
  // await faceapi.nets.faceRecognitionNet.loadFromUri("/model");
  // await faceapi.nets.faceExpressionNet.loadFromUri("/model");
}

app();
