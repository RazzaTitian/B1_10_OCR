'use client';
import React, { useState, useRef, useEffect } from 'react';

interface ScanContentProps { selectedId: string; }

export default function ScanContent({ selectedId }: ScanContentProps) {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
  if (!useCamera) return;
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      /* … */
    })
    .catch((err: any) => {
      if (err.name === 'NotAllowedError') {
        setError('Camera access was denied');
      } else if (err.name === 'NotFoundError') {
        setError('No camera device found');
      } else {
        setError(`Camera error: ${err.message}`);
      }
      setUseCamera(false);
    });
}, [useCamera]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current;
    const c = canvasRef.current;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext('2d');
    ctx?.drawImage(v, 0, 0);
    c.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
        setImage(file);
        setResult('');
        setAudioUrl('');
      }
    }, 'image/jpeg', 0.9);
  };

  const OCR_ENDPOINT = process.env.NEXT_PUBLIC_OCR_ENDPOINT;
  const OCR_KEY = process.env.NEXT_PUBLIC_OCR_KEY;
  const TTS_ENDPOINT = process.env.NEXT_PUBLIC_TTS_ENDPOINT;
  const TTS_KEY = process.env.NEXT_PUBLIC_TTS_KEY;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setResult('');
      setAudioUrl('');
    }
  };

  const handleProcess = async () => {
  if (!image) return;
  setLoading(true);
  setError(''); // Clear any previous errors

  try {
    // OCR request
    const ocrResponse = await fetch(OCR_ENDPOINT + 'vision/v3.2/read/analyze', {
      method: 'POST',
      headers: OCR_KEY
        ? {
            'Ocp-Apim-Subscription-Key': OCR_KEY,
            'Content-Type': 'application/octet-stream',
          }
        : {},
      body: image,
    });

    if (!ocrResponse.ok) {
      throw new Error('OCR request failed: ' + ocrResponse.statusText);
    }

    const operationLocation = ocrResponse.headers.get('Operation-Location');
    if (!operationLocation) {
      throw new Error('Operation-Location header is missing');
    }

    const operationId = operationLocation.split('/').pop();

    // Menunggu hingga analisis selesai
    let ocrResult;
    do {
      ocrResult = await fetch(`${OCR_ENDPOINT}vision/v3.2/read/analyzeResults/${operationId}`, {
        headers: OCR_KEY
        ? {
            'Ocp-Apim-Subscription-Key': OCR_KEY
          }
        : {},
      });
      ocrResult = await ocrResult.json();
    } while (ocrResult.status === 'running' || ocrResult.status === 'notStarted');

    const extractedText = ocrResult.analyzeResult.readResults
      .flatMap((page: any) => page.lines)
      .map((line: any) => line.text)
      .join(' ') || 'No text detected';

    setResult(extractedText);


    // TTS request
    const ttsBody = `
      <speak version='1.0' xml:lang='id-ID'>
        <voice xml:lang='id-ID' xml:gender='Male' name='id-ID-ArdiNeural'>
          ${extractedText}
        </voice>
      </speak>`;

    if (!TTS_ENDPOINT) {
      throw new Error('TTS endpoint is not defined');
    }
    const ttsResponse = await fetch(TTS_ENDPOINT, {  // Path yang benar untuk TTS
      method: 'POST',
      headers: new Headers({
        'Ocp-Apim-Subscription-Key': TTS_KEY || '',
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
      }),
      body: ttsBody,
    });

    if (!ttsResponse.ok) {
      const errorDetails = await ttsResponse.text(); // Menampilkan teks error secara langsung
      throw new Error(`TTS request failed: ${ttsResponse.status} - ${errorDetails || 'Unknown error'}`);
    }

    const audioBlob = await ttsResponse.blob();  // Tangani respons audio sebagai Blob
    const audioUrl = URL.createObjectURL(audioBlob);  // Membuat URL untuk audio
    setAudioUrl(audioUrl);  // Set URL untuk pemutar audio
  } catch (error) {
    setError(`Error: ${(error as Error).message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-black">OCR & TTS for {selectedId}</h3>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setUseCamera(false)}
          className={`px-4 py-2 border rounded ${
            !useCamera ? 'bg-purple-600 text-white' : 'bg-white text-black'
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => setUseCamera(true)}
          className={`px-4 py-2 border rounded ${
            useCamera ? 'bg-purple-600 text-white' : 'bg-white text-black'
          }`}
        >
          Use Camera
        </button>
      </div>

      {useCamera ? (
        <div className="mb-4">
          <video ref={videoRef} className="w-full rounded-lg shadow" />
          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleCapture}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Capture
            </button>
            <button
              onClick={() => setUseCamera(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      ) : (
        // Upload picture
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="
            mb-4 p-2 bg-gray-200 text-black rounded cursor-pointer hover:bg-gray-300
            file:border file:border-gray-300 file:rounded-md
            file:px-4 file:py-2 file:bg-white file:text-gray-700
            file:cursor-pointer hover:file:bg-gray-100
          "
          aria-label="Upload Image"
        />
      )}
      <button
        onClick={handleProcess}
        disabled={!image || loading}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Run OCR to TTS'}
      </button>

      {/* Menampilkan Teks yang Terhasil dari OCR */}
      {result && (
        <div className="mt-4 p-4 border rounded bg-white">
          <h3 className="text-xl font-semibold text-black mb-2">Detected Text:</h3>
          <p className="text-black">{result}</p>
        </div>
      )}

      {/* Menampilkan Pesan Error jika Ada */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Menampilkan Audio Player */}
      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl} />
        </div>
      )}
    </div>
  );
}
