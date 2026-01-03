'use client';

/**
 * 右上に配置される大きな背景ロゴ
 * スクロールに追従（fixed）し、はみ出すくらい大胆に配置
 */
export default function BackgroundLogo() {
  return (
    <div
      className="fixed top-0 right-0 pointer-events-none z-0"
      style={{
        width: '800px',
        height: '800px',
        transform: 'translate(30%, -20%)', // 右上にはみ出すように配置
        opacity: 0.03, // 非常に薄く
      }}
    >
      <svg viewBox="0 0 512 512" className="w-full h-full text-gray-800">
        {/* 音叉のようなシンボル */}
        <g transform="translate(256, 200)">
          {/* 上部の横棒 */}
          <line
            x1="-100"
            y1="0"
            x2="100"
            y2="0"
            stroke="currentColor"
            strokeWidth="30"
            strokeLinecap="round"
          />

          {/* 左右の丸 */}
          <circle cx="-100" cy="0" r="20" fill="currentColor" />
          <circle cx="100" cy="0" r="20" fill="currentColor" />

          {/* 中央の大きな円 */}
          <circle
            cx="0"
            cy="0"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="30"
          />

          {/* 下に伸びる2本の脚 */}
          <path
            d="M -30,30 Q -40,100 -60,180"
            fill="none"
            stroke="currentColor"
            strokeWidth="40"
            strokeLinecap="round"
          />
          <path
            d="M 30,30 Q 40,100 60,180"
            fill="none"
            stroke="currentColor"
            strokeWidth="40"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
