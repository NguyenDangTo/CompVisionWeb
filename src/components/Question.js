import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

const Question = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const predictDataRef = useRef(null);

  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [webcamRunning, setWebcamRunning] = useState(false);

  const createGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    const recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
        delegate: "GPU",
      },
      runningMode: GestureRecognizer,
      numHands: 1,
    });
    setGestureRecognizer(recognizer);
  };

  useEffect(() => {
    createGestureRecognizer();

    return () => {
      if (gestureRecognizer) {
        gestureRecognizer.close();
      }
    };
  }, [gestureRecognizer]);

  const enableCam = () => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (webcamRunning === true) {
      setWebcamRunning(false);
      window.location.reload(false);
      textRef.current.innerText = "START LESSON";
    } else {
      setWebcamRunning(true);
      textRef.current.innerText = "END LESSON";
    }
  };
  const predictWebcam = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !gestureRecognizer) {
      return;
    }
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");

    canvas.style.width = video.videoWidth;
    canvas.style.height = video.videoHeight;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    const nowInMs = Date.now();
    const results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    const drawingUtils = new DrawingUtils(canvasCtx);
    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: "#00FF00",
            lineWidth: 5,
          }
        );
        drawingUtils.drawLandmarks(landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }

    if (results.gestures.length > 0) {
      const categoryName = results.gestures[0][0].categoryName;
      const categoryScore = parseFloat(
        results.gestures[0][0].score * 100
      ).toFixed(2);
      const handedness = results.handednesses[0][0].displayName;
      predictDataRef.current.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
    }

    if (webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
      console.log("webcamRunning");
    } else {
      console.log("webcamStopped");
    }
  }, [gestureRecognizer, webcamRunning]);

  useEffect(() => {
    const getPredict = () => {
      try {
        if (webcamRunning) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              videoRef.current.srcObject = stream;
              videoRef.current.addEventListener("loadeddata", predictWebcam);
            });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPredict();
  }, [webcamRunning, predictWebcam]);
  return (
    <div className="w-screen h-screen p-8 flex justify-center items-center bg-primary gap-[50px]">
      <div className="flex justify-center items-center w-full h-3/4">
        <div className="w-3/5 h-full relative" style={{ position: "relative" }}>
          <video
            id="webcam"
            autoPlay
            playsInline
            className="w-[640px] h-[480px]"
            ref={videoRef}
          ></video>
          <canvas
            id="output_canvas"
            className="absolute left-0 top-0 right-0 bottom-0 w-[640px] h-[480px]"
            ref={canvasRef}
          ></canvas>
        </div>
        <div className="flex flex-col bg-white rounded-lg text-black w-1/4 h-full p-4 items-center">
          <div
            ref={textRef}
            className="cursor-pointer font-bold text text-xl text-white bg-primary rounded-lg px-4 py-2 w-4/5 text-center"
            onClick={enableCam}
          >
            {webcamRunning ? "STOP LESSON" : "START LESSON"}
          </div>
          <div ref={predictDataRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Question;
