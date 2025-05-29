"use client";
import React, { useState, useRef, useEffect } from "react";
import { useScan } from "../app/scan/ScanContext";
import { useAuth } from "@/app/hooks/useAuth";
import { apiRoutes } from "../app/API/routes";

interface ScanContentProps {
  selectedId: string;
}

export default function ScanContent({ selectedId }: ScanContentProps) {
  const { histories } = useScan();
  const { userId } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [useCamera, setUseCamera] = useState(false);
  const { refreshHistories, setSelectedId } = useScan();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedHistory = histories.find((h) => h._id === selectedId);

  useEffect(() => {
    if (selectedId) {
      const selectedHistory = histories.find((h) => h._id === selectedId);
      if (selectedHistory) {
        setPreviewUrl(selectedHistory.photoUrl);
        setResult(selectedHistory.extractedText);
        setImage(null); // Clear any uploaded image
        setUseCamera(false); // Disable camera mode
      }
    } else {
      // Reset state when no history is selected
      setPreviewUrl(null);
      setResult("");
    }
  }, [selectedId, histories]);

  useEffect(() => {
    if (!useCamera) return;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err: any) => {
        if (err.name === "NotAllowedError") {
          setError("Camera access was denied");
        } else if (err.name === "NotFoundError") {
          setError("No camera device found");
        } else {
          setError(`Camera error: ${err.message}`);
        }
        setUseCamera(false);
      });
  }, [useCamera]);

  const stopCameraStream = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const resetCapture = () => {
    setPreviewUrl(null);
    setImage(null);
    setResult("");
    stopCameraStream();
    if (useCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        });
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current;
    const c = canvasRef.current;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0);
    c.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          setImage(file);
          setResult("");
          const url = URL.createObjectURL(blob);
          setPreviewUrl(url);
          // Stop camera stream after capture
          stopCameraStream();
        }
      },
      "image/jpeg",
      0.9
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
      setResult("");
    }
  };

  const handleProcess = async () => {
    if (!image) {
      setError("No image selected");
      return;
    }

    if (!userId) {
      setError("User not authenticated");
      return;
    }
    setLoading(true);
    setResult("");

    const OCR_ENDPOINT = process.env.OCR_ENDPOINT!;
    const OCR_KEY = process.env.OCR_KEY!;
    const TTS_ENDPOINT = process.env.TTS_ENDPOINT!;
    const TTS_KEY = process.env.TTS_KEY!;

    try {
      const ocrResponse = await fetch(
        `${OCR_ENDPOINT}vision/v3.2/read/analyze`,
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": OCR_KEY,
            "Content-Type": "application/octet-stream",
          },
          body: image,
        }
      );

      if (!ocrResponse.ok)
        throw new Error(`OCR request failed: ${ocrResponse.statusText}`);
      const operationLocation = ocrResponse.headers.get("Operation-Location");
      if (!operationLocation)
        throw new Error("Operation-Location header is missing");

      const operationId = operationLocation.split("/").pop();
      let ocrResult;

      do {
        const resultResponse = await fetch(
          `${OCR_ENDPOINT}vision/v3.2/read/analyzeResults/${operationId}`,
          { headers: { "Ocp-Apim-Subscription-Key": OCR_KEY } }
        );
        ocrResult = await resultResponse.json();
      } while (
        ocrResult.status === "running" ||
        ocrResult.status === "notStarted"
      );

      const extractedText =
        ocrResult.analyzeResult.readResults
          .flatMap((page: any) => page.lines)
          .map((line: any) => line.text)
          .join(" ") || "No text detected";

      setResult(extractedText);

      const ttsBody = `
        <speak version='1.0' xml:lang='id-ID'>
          <voice xml:lang='id-ID' xml:gender='Male' name='id-ID-ArdiNeural'>
            ${extractedText}
          </voice>
        </speak>`;
      const ttsResponse = await fetch(TTS_ENDPOINT, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": TTS_KEY,
          "Content-Type": "application/ssml+xml",
          "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
        },
        body: ttsBody,
      });

      if (!ttsResponse.ok)
        throw new Error(`TTS request failed: ${ttsResponse.statusText}`);

      const audioBlob = await ttsResponse.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setPreviewUrl(audioUrl);

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("extractedText", extractedText);
      formData.append("photo", image);
      formData.append("audio", audioBlob, "audio.mp3");

      const saveResponse = await fetch(apiRoutes.history.add, {
        method: "POST",
        body: formData,
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save scan history");
      }

      const savedHistory = await saveResponse.json();
      await refreshHistories();
      if (savedHistory?._id) {
        setSelectedId(savedHistory._id);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUseCameraToggle = (useCam: boolean) => {
    setUseCamera(useCam);
    setImage(null);
    setPreviewUrl(null);
    setResult("");
    setError("");
    stopCameraStream();
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded-lg shadow">
      {selectedId ? (
        // History View
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-black">
              {new Date(selectedHistory?.date || "").toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </h3>
          </div>

          {/* Image Preview */}
          {previewUrl && (
            <div className="mb-6">
              <img
                src={previewUrl}
                alt="Scanned Document"
                className="w-full max-h-96 object-cover rounded-lg shadow"
              />
            </div>
          )}

          {/* Audio Player */}
          {selectedHistory?.audioUrl && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-black mb-2">Audio:</h4>
              <audio controls className="w-full">
                <source src={selectedHistory.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Detected Text */}
          <div className="mt-6 p-4 border rounded-lg bg-white shadow">
            <h4 className="text-lg font-semibold text-black mb-2">
              Detected Text:
            </h4>
            <p className="text-black">{selectedHistory?.extractedText}</p>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6 flex space-x-2 justify-center">
            <button
              onClick={() => handleUseCameraToggle(false)}
              className={`px-4 py-2 border rounded ${
                !useCamera ? "bg-purple-600 text-white" : "bg-white text-black"
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => handleUseCameraToggle(true)}
              className={`px-4 py-2 border rounded ${
                useCamera ? "bg-purple-600 text-white" : "bg-white text-black"
              }`}
            >
              Use Camera
            </button>
          </div>

          {/* Camera mode */}
          {useCamera ? (
            <div className="relative flex flex-col items-center mb-6 w-full max-w-xl">
              {previewUrl ? (
                <div className="relative w-full max-h-96">
                  <img
                    src={previewUrl}
                    alt="Captured Preview"
                    className="w-full max-h-96 object-cover rounded-lg shadow"
                  />
                  <button
                    onClick={resetCapture}
                    className="absolute top-2 right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center shadow hover:bg-purple-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="border border-gray-300 bg-black rounded-lg overflow-hidden w-full max-h-96">
                  <video
                    ref={videoRef}
                    className="w-full h-96 object-cover"
                    autoPlay
                    muted
                  />
                </div>
              )}
              {!previewUrl && (
                <div className="mt-4">
                  <button
                    onClick={handleCapture}
                    className="w-16 h-16 bg-white border-4 border-gray-500 rounded-full shadow-lg hover:scale-105 transition-transform"
                    aria-label="Capture photo"
                  />
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            // Upload mode
            <div className="mb-6 relative">
              {previewUrl ? (
                <div className="relative w-full max-h-96">
                  <img
                    src={previewUrl}
                    alt="Uploaded Preview"
                    className="w-full max-h-96 object-cover rounded-lg shadow"
                  />
                  <button
                    onClick={() => {
                      setPreviewUrl(null);
                      setImage(null);
                      setResult("");
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center shadow hover:bg-purple-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <svg
                    className="w-16 h-16 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="mt-2 text-lg text-gray-600">
                    Select and Upload Image
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

          {image && (
            <button
              onClick={handleProcess}
              disabled={loading}
              className={`w-full px-4 py-2 rounded-lg ${
                image
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : "Run OCR to TTS"}
            </button>
          )}
        </>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
