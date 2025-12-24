/**
 * YouTubeセクションコンポーネント
 *
 * 現在選択されているルート音とスケールに応じた参考動画を表示します。
 * 動画情報は lib/youtube-data.ts で管理されています。
 */

'use client';

import { getVideosForRootAndScale, getYoutubeEmbedUrl } from '@/lib/youtube-data';
import { useLanguage } from '@/contexts/LanguageContext';

interface YoutubeSectionProps {
  rootNote: string;     // 現在選択中のルート音（例: "G"）
  currentScale: string; // 現在選択中のスケール名（例: "メジャー"）
}

export default function YoutubeSection({ rootNote, currentScale }: YoutubeSectionProps) {
  const { t } = useLanguage();
  // 現在のルート音とスケールに紐づく動画リストを取得
  const videos = getVideosForRootAndScale(rootNote, currentScale);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      {/* セクションヘッダー */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {t.referenceSongs}
          </h3>
          <p className="text-sm text-gray-600">
            {t.scale}: <span className="font-semibold text-gray-800">{rootNote} {t.scaleNames[currentScale]}</span>
          </p>
        </div>

        {/* 動画リスト */}
        {videos.length > 0 ? (
          <div className="space-y-6">
            {videos.map((video, index) => (
              <div key={video.id || index} className="border-t pt-6 first:border-t-0 first:pt-0">
                {/* 動画タイトル */}
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  {video.title}
                </h4>

                {/* YouTube埋め込み（レスポンシブ対応） */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={getYoutubeEmbedUrl(video.url)}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 動画未登録時のメッセージ */
          <div className="text-center py-8">
            <p className="text-gray-500">
              このスケールに紐づく動画はまだ登録されていません。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
