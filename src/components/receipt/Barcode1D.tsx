import React from 'react';

interface Barcode1DProps {
  value: string;
  height?: number;
  className?: string;
  showText?: boolean;
}

export const Barcode1D: React.FC<Barcode1DProps> = ({
  value,
  height = 42,
  className = '',
  showText = true,
}) => {
  // Deterministic Code 128 style bar widths generator
  const bars: number[] = [
    2, 1, 1, 2, 3, 2, // Start guard
  ];

  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const b1 = (code % 3) + 1;
    const b2 = ((code >> 2) % 3) + 1;
    const b3 = ((code >> 4) % 2) + 1;
    const b4 = 2;
    bars.push(b1, b2, b3, b4);
  }

  // End guard
  bars.push(2, 3, 3, 1, 1, 1, 2);

  const totalWidth = bars.reduce((sum, b) => sum + b, 0);

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full max-w-[240px] h-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <rect width={totalWidth} height={height} fill="#ffffff" />
        {(() => {
          let currentX = 0;
          return bars.map((w, idx) => {
            const isBar = idx % 2 === 0;
            const x = currentX;
            currentX += w;
            if (!isBar) return null;
            return (
              <rect
                key={idx}
                x={x}
                y={0}
                width={w}
                height={height}
                fill="#0f172a"
              />
            );
          });
        })()}
      </svg>
      {showText && (
        <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-slate-800 mt-1 uppercase">
          *{value}*
        </span>
      )}
    </div>
  );
};
export default Barcode1D;
