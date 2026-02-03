import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ギタースケールわかる君';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Decorative fretboard pattern - left */}
        <div
          style={{
            position: 'absolute',
            left: 50,
            top: 200,
            width: 300,
            height: 180,
            background: 'rgba(30, 64, 175, 0.1)',
            borderRadius: 8,
            display: 'flex',
          }}
        />

        {/* Decorative fretboard pattern - right */}
        <div
          style={{
            position: 'absolute',
            right: 50,
            top: 250,
            width: 300,
            height: 180,
            background: 'rgba(30, 64, 175, 0.1)',
            borderRadius: 8,
            display: 'flex',
          }}
        />

        {/* Main icon */}
        <div
          style={{
            fontSize: 180,
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
            display: 'flex',
          }}
        >
          ギ
        </div>

        {/* Site title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          ギタースケールわかる君
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#64748b',
            marginBottom: 24,
            display: 'flex',
          }}
        >
          Guitar Scale Visualizer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            display: 'flex',
          }}
        >
          スケールを視覚的に学習 • Learn scales visually
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
