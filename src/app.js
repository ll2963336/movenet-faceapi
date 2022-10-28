import "./import-jquery.js";
import "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api/dist/face-api.esm-nobundle.js";
import * as posedetection from "@tensorflow-models/pose-detection";

import { Camera } from "./camera.js";

let detector;
let camera;

// 建立 post detector
async function createDetector() {
  const modelType = posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING;
  const modelConfig = {
    modelType,
    modelUrl: "/model/model.json",
  };
  return posedetection.createDetector(
    posedetection.SupportedModels.MoveNet,
    modelConfig
  );
}

// 建立faceapi detector
async function createFaceDetector() {
  await faceapi.nets.tinyFaceDetector.loadFromUri("/model");
  await faceapi.nets.ageGenderNet.loadFromUri("/model");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/model");
  await faceapi.nets.faceExpressionNet.loadFromUri("/model");
}

// render loop
// async function renderResult() {
//   if (camera.video.readyState < 2) {
//     await new Promise((resolve) => {
//       camera.video.onloadeddata = () => {
//         resolve(true);
//       };
//     });
//   }

//   let poses = null;
//   let subjects = null;
//   let faces = null;

//   // pose detect
//   if (detector != null) {
//     // 拿到 poses & faceapi
//     try {
//       // poses
//       window.poses = poses = await detector.estimatePoses(camera.video, {
//         maxPoses: 1,
//         flipHorizontal: false,
//         predictIrises: false,
//       });

//       window.faces = faces = await faceapi
//         .detectAllFaces(camera.video, new faceapi.TinyFaceDetectorOptions())
//         .withFaceExpressions()
//         .withAgeAndGender();

//       subjects = [];
//       if (detections.length > 0) {
//         detections.forEach((detection) => {
//           const expression = calcExpression(detection.expressions);
//           const subject = {
//             age: detection.age,
//             gender: detection.gender,
//             expression,
//           };
//           subjects.push(subject);
//         });
//       }
//       console.log(subjects);
//     } catch (error) {
//       detector.dispose();
//       detector = null;
//       alert(error);
//     }
//   }
// }

async function runMLModels() {
  // load pose detection
  const detectorConfig = {
    modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    modelUrl: "/model/model.json",
  };
  const detector = await posedetection.createDetector(
    posedetection.SupportedModels.MoveNet,
    detectorConfig
  );
  // load age / gender & emotion detection
  // await faceapi.nets.tinyFaceDetector.loadFromUri("/model");
  // await faceapi.nets.ageGenderNet.loadFromUri("/model");
  // await faceapi.nets.faceRecognitionNet.loadFromUri("/model");
  // await faceapi.nets.faceExpressionNet.loadFromUri("/model");

  async function detect() {
    // get poses
    let poses;
    poses = await detector.estimatePoses(camera.video, {
      maxPoses: 1,
      flipHorizontal: false,
      predictIrises: false,
    });

    //   // get age / gender & emotion detection
    //   // let subjects;
    //   // let detections;
    //   // if (faceAPIToggle.current) {
    //   //   detections = await faceapi
    //   //     .detectAllFaces(
    //   //       camera.current.video,
    //   //       new faceapi.TinyFaceDetectorOptions()
    //   //     )
    //   //     .withFaceExpressions()
    //   //     .withAgeAndGender();
    //   //   subjects = [];
    //   //   if (detections.length > 0) {
    //   //     detections.forEach((detection) => {
    //   //       const expression = calcExpression(detection.expressions);
    //   //       const subject = {
    //   //         age: detection.age,
    //   //         gender: detection.gender,
    //   //         expression,
    //   //       };
    //   //       subjects.push(subject);
    //   //     });
    //   //   }
    //   // }

    //   // Date Log to send to backend
    const MLData = {
      posenet: poses ? poses : null,
      // faceapi: detections ? detections : null,
    };

    console.log(MLData);
    requestAnimationFrame(detect);
  }
  detect();
}

// // 建立 render loop
// async function renderPrediction() {
//   await renderResult();

//   requestAnimationFrame(renderPrediction);
// }

// 主程式
async function app() {
  // 設好 camera
  window.camera = camera = await Camera.setupCamera();

  // 建立 detector
  // detector = await createDetector();
  // await createFaceDetector();

  // 開始 loop
  runMLModels();
}

app();
