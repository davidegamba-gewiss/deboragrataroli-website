import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Debora Grataroli – Cantautrice e Pianista';
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#7b4397',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: '-2px',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Debora Grataroli
        </div>
        <div
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 36,
            fontWeight: 400,
            marginTop: 24,
            textAlign: 'center',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Cantautrice e Pianista
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
