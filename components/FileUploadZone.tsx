/**
 * ファイルアップロードゾーン コンポーネント
 *
 * 役割：
 * - ファイル選択ボタンとドラッグ&ドロップエリアを提供
 * - 選択されたファイル情報を表示
 * - 対応フォーマットとサイズ制限を表示
 */

'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import type { FileUploadZoneProps } from '@/lib/audio-analysis-types';
import { SUPPORTED_AUDIO_FORMATS, MAX_FILE_SIZE } from '@/lib/audio-analysis-types';

export default function FileUploadZone({
  onFileSelect,
  selectedFile,
  disabled = false,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイルサイズをMB表記に変換
  const formatFileSize = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  // ファイルのバリデーション
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    console.log('📱 Validating file:', {
      name: file.name,
      size: file.size,
      type: file.type,
      maxSize: MAX_FILE_SIZE,
    });

    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `ファイルサイズが大きすぎます（最大 ${formatFileSize(MAX_FILE_SIZE)}MB）`,
      };
    }

    // ファイル形式チェック（拡張子を優先、次にMIMEタイプ）
    // iOSでは正しいMIMEタイプが取得できないことがあるため、拡張子チェックを優先
    const supportedExtensions = ['.mp3', '.wav', '.m4a', '.flac', '.ogg', '.aac'];
    const fileExtension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0];
    const isExtensionSupported = fileExtension && supportedExtensions.includes(fileExtension);
    const isMimeTypeSupported = file.type && SUPPORTED_AUDIO_FORMATS.includes(file.type as any);

    console.log('📱 File format check:', {
      extension: fileExtension,
      isExtensionSupported,
      mimeType: file.type,
      isMimeTypeSupported,
    });

    // 拡張子またはMIMEタイプのどちらかが正しければOK
    if (!isExtensionSupported && !isMimeTypeSupported) {
      return {
        valid: false,
        error: 'サポートされていないファイル形式です',
      };
    }

    return { valid: true };
  };

  // ファイル選択処理
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('📱 File selected:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
    });

    if (file) {
      const validation = validateFile(file);
      console.log('📱 Validation result:', validation);

      if (validation.valid) {
        console.log('📱 Calling onFileSelect...');
        onFileSelect(file);
      } else {
        console.error('📱 Validation failed:', validation.error);
        alert(validation.error);
      }
    } else {
      console.log('📱 No file selected');
    }
  };

  // ドラッグ開始
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  // ドラッグ中
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // ドラッグ終了
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // ドロップ
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validation = validateFile(file);
      if (validation.valid) {
        onFileSelect(file);
      } else {
        alert(validation.error);
      }
    }
  };

  // ファイル選択ボタンクリック
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {/* ドラッグ&ドロップエリア */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : selectedFile
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'}
        `}
        onClick={!disabled && !selectedFile ? handleButtonClick : undefined}
      >
        {/* 非表示のfile input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={SUPPORTED_AUDIO_FORMATS.join(',')}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />

        {/* アイコン */}
        <div className="mb-4">
          {selectedFile ? (
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          )}
        </div>

        {/* メッセージ */}
        {selectedFile ? (
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-1">
              {selectedFile.name}
            </p>
            <p className="text-sm text-gray-600">
              {formatFileSize(selectedFile.size)} MB
            </p>
            {!disabled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick();
                }}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 underline"
              >
                別のファイルを選択
              </button>
            )}
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              音源ファイルをドラッグ&ドロップ
            </p>
            <p className="text-sm text-gray-500 mb-3">または</p>
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={disabled}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              ファイルを選択
            </button>
          </div>
        )}

        {/* 対応フォーマット表示 */}
        <div className="mt-4 text-xs text-gray-500">
          <p>対応形式: MP3, WAV, M4A, FLAC, OGG</p>
          <p>最大ファイルサイズ: {formatFileSize(MAX_FILE_SIZE)} MB</p>
        </div>
      </div>
    </div>
  );
}
