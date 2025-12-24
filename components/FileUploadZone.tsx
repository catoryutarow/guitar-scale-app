/**
 * ファイルアップロードゾーン コンポーネント
 *
 * 役割：
 * - ファイル選択ボタンとドラッグ&ドロップエリアを提供
 * - 選択されたファイル情報を表示
 * - 対応フォーマットとサイズ制限を表示
 */

'use client';

import { useState, useRef, useEffect, useCallback, DragEvent, ChangeEvent } from 'react';
import type { FileUploadZoneProps } from '@/lib/audio-analysis-types';
import { SUPPORTED_AUDIO_FORMATS, MAX_FILE_SIZE } from '@/lib/audio-analysis-types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FileUploadZone({
  onFileSelect,
  selectedFile,
  disabled = false,
}: FileUploadZoneProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイルサイズをMB表記に変換
  const formatFileSize = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  // ファイルのバリデーション
  const validateFile = useCallback((file: File): { valid: boolean; error?: string } => {
    // ファイルサイズチェック
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `${t.fileTooLarge}（${t.maxFileSize}: ${formatFileSize(MAX_FILE_SIZE)}MB）`,
      };
    }

    // ファイル形式チェック（拡張子を優先、次にMIMEタイプ）
    // iOSでは正しいMIMEタイプが取得できないことがあるため、拡張子チェックを優先
    const supportedExtensions = ['.mp3', '.wav', '.m4a', '.flac', '.ogg', '.aac'];
    const fileExtension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0];
    const isExtensionSupported = fileExtension && supportedExtensions.includes(fileExtension);
    const isMimeTypeSupported = file.type && SUPPORTED_AUDIO_FORMATS.includes(file.type as any);

    // 拡張子またはMIMEタイプのどちらかが正しければOK
    if (!isExtensionSupported && !isMimeTypeSupported) {
      return {
        valid: false,
        error: t.unsupportedFormat,
      };
    }

    return { valid: true };
  }, [t]);

  // ファイル選択処理
  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement> | Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const validation = validateFile(file);

      if (validation.valid) {
        onFileSelect(file);
      } else {
        alert(validation.error);
      }
    }
  }, [onFileSelect, validateFile]);

  // iOS対策: ネイティブイベントリスナーを直接追加
  // iOSのSafariでは'change'イベントではなく'input'イベントが発火するため、両方をリッスン
  useEffect(() => {
    const input = fileInputRef.current;
    if (!input) return;

    const handler = (e: Event) => {
      handleFileChange(e);
    };

    input.addEventListener('change', handler);
    input.addEventListener('input', handler);

    return () => {
      input.removeEventListener('change', handler);
      input.removeEventListener('input', handler);
    };
  }, [handleFileChange]);

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
            ? 'border-blue-500 bg-blue-50'
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
          accept=".mp3,.wav,.m4a,.flac,.ogg,.aac"
          disabled={disabled}
          className="hidden"
          key={selectedFile?.name || 'file-input'}
        />

        {/* アイコン */}
        <div className="mb-4">
          {selectedFile ? (
            <svg
              className="mx-auto h-12 w-12 text-blue-500"
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
                {t.selectAnotherFile}
              </button>
            )}
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              {t.dragAndDrop}
            </p>
            <p className="text-sm text-gray-500 mb-3">{t.or}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick();
              }}
              disabled={disabled}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {t.selectFile}
            </button>
          </div>
        )}

        {/* 対応フォーマット表示 */}
        <div className="mt-4 text-xs text-gray-500">
          <p>{t.supportedFormats}: MP3, WAV, M4A, FLAC, OGG</p>
          <p>{t.maxFileSize}: {formatFileSize(MAX_FILE_SIZE)} MB</p>
        </div>
      </div>
    </div>
  );
}
