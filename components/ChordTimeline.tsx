/**
 * コード進行タイムライン コンポーネント
 *
 * 役割：
 * - 検出されたコード進行を時系列で表示
 * - 各コードの開始・終了時刻とコード名を表示
 * - 信頼度に応じて色分け表示（オプション）
 */

'use client';

import type { ChordTimelineProps } from '@/lib/audio-analysis-types';

export default function ChordTimeline({
  chordProgression,
  currentTime,
  onSeek,
}: ChordTimelineProps) {
  // 時刻を "分:秒" 形式にフォーマット
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 信頼度に応じた色を取得
  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.9) return 'bg-green-100 border-green-300 text-green-800';
    if (confidence >= 0.8) return 'bg-blue-100 border-blue-300 text-blue-800';
    if (confidence >= 0.7) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-gray-100 border-gray-300 text-gray-800';
  };

  // コードがアクティブ（現在再生中）かどうか
  const isActive = (startTime: number, endTime: number): boolean => {
    return currentTime !== undefined && currentTime >= startTime && currentTime < endTime;
  };

  // コードをクリックしたときの処理
  const handleChordClick = (startTime: number) => {
    if (onSeek) {
      onSeek(startTime);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        コード進行タイムライン
      </h3>

      {/* コード進行が空の場合 */}
      {chordProgression.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          コード進行が検出されませんでした
        </div>
      ) : (
        <div className="space-y-3">
          {chordProgression.map((chord, index) => {
            const confidenceColor = getConfidenceColor(chord.confidence);
            const active = isActive(chord.startTime, chord.endTime);

            return (
              <div
                key={index}
                onClick={() => handleChordClick(chord.startTime)}
                className={`
                  flex items-center justify-between p-4 rounded-lg border-2 transition-all
                  ${active
                    ? 'bg-yellow-200 border-yellow-400 shadow-lg scale-105'
                    : confidenceColor
                  }
                  ${onSeek ? 'cursor-pointer hover:shadow-md' : ''}
                `}
              >
                {/* 左側：時刻 */}
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-mono text-gray-600 min-w-[80px]">
                    {formatTime(chord.startTime)} - {formatTime(chord.endTime)}
                  </div>

                  {/* コード名 */}
                  <div>
                    <div className="text-2xl font-bold">
                      {chord.chord}
                    </div>
                    <div className="text-xs text-gray-600">
                      {chord.rootNote} {chord.quality}
                    </div>
                  </div>
                </div>

                {/* 右側：信頼度 */}
                <div className="flex items-center space-x-2">
                  {active && (
                    <span className="text-xs font-semibold text-yellow-700 mr-2">
                      ▶ 再生中
                    </span>
                  )}
                  <div className="text-right">
                    <div className="text-xs text-gray-500">信頼度</div>
                    <div className="text-lg font-semibold">
                      {Math.round(chord.confidence * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 説明テキスト */}
      <div className="mt-4 text-sm text-gray-500 text-center">
        {onSeek && (
          <p>コードをクリックすると、その位置から再生できます</p>
        )}
        <p className="mt-1">
          信頼度が高いほど、コード検出の精度が高いことを示します
        </p>
      </div>
    </div>
  );
}
