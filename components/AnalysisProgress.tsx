/**
 * 解析進捗表示 コンポーネント
 *
 * 役割：
 * - アップロード・解析中の進捗を視覚的に表示
 * - プログレスバーと状態メッセージを表示
 * - 処理段階に応じたアイコンとメッセージを表示
 */

'use client';

import type { AnalysisProgressProps } from '@/lib/audio-analysis-types';

export default function AnalysisProgress({
  progress,
  status,
  message,
}: AnalysisProgressProps) {
  // 状態に応じたメッセージとアイコンを取得
  const getStatusInfo = () => {
    switch (status) {
      case 'uploading':
        return {
          icon: '📤',
          title: 'アップロード中',
          defaultMessage: '音源ファイルをアップロードしています...',
          color: 'blue',
        };
      case 'analyzing':
        return {
          icon: '🎵',
          title: '解析中',
          defaultMessage: 'コード進行を解析しています...',
          color: 'purple',
        };
      case 'completed':
        return {
          icon: '✅',
          title: '解析完了',
          defaultMessage: '解析が完了しました！',
          color: 'green',
        };
      default:
        return {
          icon: '⏳',
          title: '処理中',
          defaultMessage: '処理を実行しています...',
          color: 'gray',
        };
    }
  };

  const statusInfo = getStatusInfo();
  const displayMessage = message || statusInfo.defaultMessage;

  // プログレスバーの色
  const progressBarColor = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    gray: 'bg-gray-500',
  }[statusInfo.color];

  // 背景色
  const bgColor = {
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
    green: 'bg-green-50',
    gray: 'bg-gray-50',
  }[statusInfo.color];

  // テキスト色
  const textColor = {
    blue: 'text-blue-700',
    purple: 'text-purple-700',
    green: 'text-green-700',
    gray: 'text-gray-700',
  }[statusInfo.color];

  return (
    <div className={`w-full rounded-lg p-6 ${bgColor} border border-${statusInfo.color}-200`}>
      {/* ステータス表示 */}
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{statusInfo.icon}</span>
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${textColor}`}>
            {statusInfo.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{displayMessage}</p>
        </div>
      </div>

      {/* プログレスバー */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${progressBarColor} transition-all duration-300 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {/* アニメーション効果（処理中のみ） */}
          {status !== 'completed' && (
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
          )}
        </div>
      </div>

      {/* 進捗率表示 */}
      <div className="mt-2 text-right">
        <span className={`text-sm font-semibold ${textColor}`}>
          {Math.round(progress)}%
        </span>
      </div>

      {/* 完了時の追加メッセージ */}
      {status === 'completed' && (
        <div className="mt-4 text-center text-sm text-gray-600">
          下にスクロールして解析結果をご確認ください
        </div>
      )}

      {/* ローディングアニメーション（処理中のみ） */}
      {status !== 'completed' && (
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
    </div>
  );
}
