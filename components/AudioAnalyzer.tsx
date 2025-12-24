/**
 * 音源解析 メインコンポーネント
 *
 * 役割：
 * - 音源ファイルのアップロード〜解析〜結果表示までの全フローを管理
 * - 子コンポーネント（FileUploadZone, AnalysisProgress, ChordTimeline, ScaleMatchCard）を統合
 * - API呼び出しと状態管理
 * - エラーハンドリング
 */

'use client';

import { useState } from 'react';
import { upload } from '@vercel/blob/client';
import FileUploadZone from './FileUploadZone';
import AnalysisProgress from './AnalysisProgress';
import ChordTimeline from './ChordTimeline';
import ScaleMatchCard from './ScaleMatchCard';
import type {
  AudioAnalyzerProps,
  AnalysisResult,
  AnalysisStatus,
  UploadResponse,
  AnalysisResponse,
  UploadedFileInfo,
} from '@/lib/audio-analysis-types';

export default function AudioAnalyzer({ onScaleSelect }: AudioAnalyzerProps) {
  // 状態管理
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [progress, setProgress] = useState<number>(0);
  const [jobId, setJobId] = useState<string | null>(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<UploadedFileInfo | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ファイル選択時の処理
  const handleFileSelect = async (file: File) => {
    console.log('📱 AudioAnalyzer: File received:', {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    setSelectedFile(file);
    setError(null);

    // モバイルUX改善: ファイル選択直後に自動的に解析開始
    console.log('📱 AudioAnalyzer: Setting timeout to start analysis...');
    setTimeout(() => {
      console.log('📱 AudioAnalyzer: Starting analysis...');
      handleStartAnalysis(file);
    }, 500);
  };

  // 解析開始
  const handleStartAnalysis = async (fileToAnalyze?: File) => {
    const file = fileToAnalyze || selectedFile;

    console.log('📱 handleStartAnalysis called with:', {
      fileToAnalyze: fileToAnalyze?.name,
      selectedFile: selectedFile?.name,
      finalFile: file?.name,
    });

    if (!file) {
      console.error('📱 No file available for analysis');
      setError('ファイルを選択してください');
      return;
    }

    try {
      console.log('📱 Starting upload process...');
      setError(null);
      setStatus('uploading');
      setProgress(0);

      // クライアントサイドから直接Vercel Blobにアップロード
      setProgress(30);

      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const fileUrl = blob.url;

      console.log('Upload completed:', {
        jobId,
        fileUrl,
        fileName: file.name,
      });

      setJobId(jobId);
      setUploadedFileInfo({
        jobId,
        originalFileName: file.name,
        mimeType: file.type,
        size: file.size,
        storedFilePath: fileUrl,
        uploadedAt: new Date().toISOString(),
      });

      setProgress(50);
      setStatus('processing');

      // 解析結果の取得
      await fetchAnalysisResult(jobId, fileUrl);

    } catch (err) {
      console.error('📱 Analysis error:', err);
      console.error('📱 Error stack:', err instanceof Error ? err.stack : 'No stack trace');
      const errorMessage = err instanceof Error ? err.message : '解析中にエラーが発生しました';
      console.error('📱 Setting error message:', errorMessage);
      setError(errorMessage);
      setStatus('failed');
    }
  };

  // 解析結果を取得（Pythonバックエンドを呼び出し）
  const fetchAnalysisResult = async (jobId: string, storedFilePath?: string) => {
    try {
      setProgress(70);

      // Phase 3: POST メソッドで filePath を送信
      // 引数から filePath を取得（state更新を待たない）
      const filePath = storedFilePath;

      if (!filePath) {
        throw new Error('ファイルパスが見つかりません');
      }

      console.log('Analyze request payload:', {
        jobId,
        storedFilePath: filePath,
      });

      const response = await fetch(`/api/analysis/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath,
          options: {
            separateStems: true,
            analysisDepth: 'basic',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('解析結果の取得に失敗しました');
      }

      const data: AnalysisResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || '解析結果の取得に失敗しました');
      }

      if (data.status === 'completed' && data.result) {
        setProgress(100);
        setAnalysisResult(data.result);
        setStatus('completed');
      } else if (data.status === 'failed') {
        throw new Error(data.error || '解析に失敗しました');
      } else {
        // 処理中の場合（実際の実装ではここでポーリング継続）
        setProgress(data.progress || 70);
        // setTimeout(() => fetchAnalysisResult(jobId), 2000); // 2秒後に再取得
      }

    } catch (err) {
      console.error('Fetch analysis error:', err);
      setError(err instanceof Error ? err.message : '解析結果の取得に失敗しました');
      setStatus('failed');
    }
  };

  // リセット処理
  const handleReset = () => {
    setSelectedFile(null);
    setStatus('idle');
    setProgress(0);
    setJobId(null);
    setUploadedFileInfo(null);
    setAnalysisResult(null);
    setError(null);
  };

  // プログレス表示用の状態変換
  const getProgressStatus = (): 'uploading' | 'analyzing' | 'completed' => {
    if (status === 'uploading') return 'uploading';
    if (status === 'processing') return 'analyzing';
    if (status === 'completed') return 'completed';
    return 'analyzing';
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      {/* セクションヘッダー */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg p-6 text-white">
        <div className="flex items-center mb-2">
          <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <h2 className="text-3xl font-bold">音源解析</h2>
        </div>
        <p className="text-purple-100">
          音源ファイルをアップロードして、コード進行とスケールを自動解析します
        </p>
      </div>

      <div className="bg-white rounded-b-lg shadow-lg p-6 space-y-6">
        {/* エラー表示 */}
        {error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-red-800">エラーが発生しました</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* ファイルアップロードゾーン */}
        {status === 'idle' && (
          <div>
            <FileUploadZone
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              disabled={status !== 'idle'}
            />

            {/* 解析開始ボタン */}
            {selectedFile && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleStartAnalysis}
                  className="inline-flex items-center px-8 py-3 bg-purple-500 text-white text-lg font-bold rounded-lg hover:bg-purple-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  解析を開始
                </button>
              </div>
            )}
          </div>
        )}

        {/* 進捗表示 */}
        {(status === 'uploading' || status === 'processing') && (
          <AnalysisProgress
            progress={progress}
            status={getProgressStatus()}
          />
        )}

        {/* 解析完了：結果表示 */}
        {status === 'completed' && analysisResult && (
          <div className="space-y-6">
            {/* 完了メッセージ */}
            <AnalysisProgress
              progress={100}
              status="completed"
            />

            {/* メタデータ表示 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
              <div className="flex items-center mb-4">
                <svg className="w-7 h-7 mr-2 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800">解析結果</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-500">キー</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {analysisResult.metadata.detectedKey} {analysisResult.metadata.scale}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    信頼度: {Math.round(analysisResult.metadata.confidence * 100)}%
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-500">テンポ</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {analysisResult.metadata.tempo}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">BPM</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-500">拍子</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {analysisResult.metadata.timeSignature}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-sm text-gray-500">長さ</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {Math.floor(analysisResult.metadata.duration / 60)}:
                    {String(Math.floor(analysisResult.metadata.duration % 60)).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>

            {/* スケールマッチング */}
            <ScaleMatchCard
              matchingScales={analysisResult.scaleMatch.matchingScales}
              onScaleSelect={onScaleSelect}
            />

            {/* コード進行タイムライン */}
            <ChordTimeline
              chordProgression={analysisResult.chordProgression}
            />

            {/* 別の音源を解析ボタン */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                別の音源を解析
              </button>
            </div>
          </div>
        )}

        {/* 失敗時 */}
        {status === 'failed' && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              もう一度試す
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
