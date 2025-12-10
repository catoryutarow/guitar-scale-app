/**
 * スケールマッチングカード コンポーネント
 *
 * 役割：
 * - 解析結果からマッチしたスケールを表示
 * - マッチ率の高い順にランキング表示
 * - 「このスケールに切り替える」ボタンで既存のスケール選択と連携
 */

'use client';

import type { ScaleMatchCardProps } from '@/lib/audio-analysis-types';

export default function ScaleMatchCard({
  matchingScales,
  onScaleSelect,
  currentRootNote,
  currentScale,
}: ScaleMatchCardProps) {
  // マッチ率に応じたランク表示
  const getRankBadge = (index: number) => {
    const badges = [
      { label: '1位', color: 'bg-yellow-400 text-yellow-900', icon: '🥇' },
      { label: '2位', color: 'bg-gray-300 text-gray-900', icon: '🥈' },
      { label: '3位', color: 'bg-orange-300 text-orange-900', icon: '🥉' },
    ];

    if (index < badges.length) {
      const badge = badges[index];
      return (
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${badge.color} font-bold text-sm`}>
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-200 text-gray-700 font-semibold text-sm">
        <span>{index + 1}位</span>
      </div>
    );
  };

  // マッチ率に応じた色を取得
  const getMatchRateColor = (matchRate: number): string => {
    if (matchRate >= 0.9) return 'text-green-600';
    if (matchRate >= 0.8) return 'text-blue-600';
    if (matchRate >= 0.7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  // 現在選択中のスケールかどうか
  const isCurrentScale = (rootNote: string, scale: string): boolean => {
    return currentRootNote === rootNote && currentScale === scale;
  };

  // スケール切り替えボタンのクリック処理
  const handleSelectScale = (rootNote: string, scale: string) => {
    onScaleSelect(rootNote, scale);

    // 成功メッセージ（オプション）
    // alert(`スケールを ${rootNote} ${scale} に切り替えました`);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        マッチするスケール
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        検出されたコード進行にマッチする可能性の高いスケールです
      </p>

      {/* スケールが見つからない場合 */}
      {matchingScales.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">マッチするスケールが見つかりませんでした</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matchingScales.map((match, index) => {
            const matchRateColor = getMatchRateColor(match.matchRate);
            const isCurrent = isCurrentScale(match.rootNote, match.scale);

            return (
              <div
                key={index}
                className={`
                  p-5 rounded-lg border-2 transition-all
                  ${isCurrent
                    ? 'bg-blue-50 border-blue-400 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }
                `}
              >
                {/* ヘッダー部分 */}
                <div className="flex items-center justify-between mb-3">
                  {/* 左側：ランクバッジ */}
                  <div>{getRankBadge(index)}</div>

                  {/* 右側：マッチ率 */}
                  <div className="text-right">
                    <div className="text-xs text-gray-500">マッチ率</div>
                    <div className={`text-2xl font-bold ${matchRateColor}`}>
                      {Math.round(match.matchRate * 100)}%
                    </div>
                  </div>
                </div>

                {/* スケール情報 */}
                <div className="mb-3">
                  <div className="text-2xl font-bold text-gray-800">
                    {match.rootNote} {match.scale}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    マッチしたコード: {match.matchingChords.join(', ')}
                  </div>
                </div>

                {/* 切り替えボタン */}
                <div>
                  {isCurrent ? (
                    <div className="flex items-center justify-center py-2 px-4 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      現在選択中のスケール
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSelectScale(match.rootNote, match.scale)}
                      className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
                    >
                      このスケールに切り替える
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 説明テキスト */}
      {matchingScales.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            💡 <strong>ヒント：</strong>
            マッチ率が高いスケールほど、検出されたコード進行との相性が良いです。
            スケールを切り替えると、指板上の表示も自動的に更新されます。
          </p>
        </div>
      )}
    </div>
  );
}
