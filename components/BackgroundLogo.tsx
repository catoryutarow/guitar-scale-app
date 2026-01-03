'use client';

import Image from 'next/image';

/**
 * 右上に配置される大きな背景ロゴ
 * スクロールに追従（fixed）し、はみ出すくらい大胆に配置
 */
export default function BackgroundLogo() {
  return (
    <div
      className="fixed top-0 right-0 pointer-events-none z-0"
      style={{
        width: '1200px',
        height: '1200px',
        transform: 'translate(35%, -25%)', // 右上にはみ出すように配置
        opacity: 0.04, // 非常に薄く
      }}
    >
      <Image
        src="/bg.svg"
        alt=""
        width={1745}
        height={1729}
        className="w-full h-full text-gray-800"
        priority
      />
    </div>
  );
}
