'use client';
import React, { useState } from 'react';

interface ScanContentProps { selectedId: string; }

export default function ScanContent({ selectedId }: ScanContentProps) {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const OCR_ENDPOINT = 'https://ocr-b1-10.cognitiveservices.azure.com/';
  const OCR_KEY = 'B0boaBIxUVoiG98EOSreX1ipXZK6gP8HPHBHlGDOFVTzeRXpPW2gJQQJ99BEACGhslBXJ3w3AAAFACOGhsZb';

  const TTS_ENDPOINT = 'https://centralindia.tts.speech.microsoft.com/cognitiveservices/v1';
  const TTS_KEY = '30yiwr7RGInDIcklNpModrtdf1bY4hFFMQzwk4ZGClL27Vd5ZPKrJQQJ99BEACGhslBXJ3w3AAAYACOGiqx8';

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
      headers: {
        'Ocp-Apim-Subscription-Key': OCR_KEY,
        'Content-Type': 'application/octet-stream',
      },
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
        headers: { 'Ocp-Apim-Subscription-Key': OCR_KEY },
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
      <speak version='1.0' xml:lang='en-US'>
        <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
          ${extractedText}
        </voice>
      </speak>`;

    const ttsResponse = await fetch(TTS_ENDPOINT, {  // Path yang benar untuk TTS
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': TTS_KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
      },
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

      {/* Gambar Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 p-2 bg-gray-200 text-black rounded cursor-pointer hover:bg-gray-300"
        aria-label="Upload Image"
      />
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
