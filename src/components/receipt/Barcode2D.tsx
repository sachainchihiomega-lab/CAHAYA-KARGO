import React from 'react';

interface Barcode2DProps {
  value: string;
  size?: number;
  className?: string;
  label?: string;
}

export const Barcode2D: React.FC<Barcode2DProps> = ({
  value,
  size = 120,
  className = '',
  label
}) => {
  // Deterministic 2D matrix generator based on input string (e.g. resi number)
  // Generates 21x21 QR Code matrix with standard finder patterns
  const generateMatrix = (str: string) => {
    const matrixSize = 25;
    const grid: boolean[][] = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(false));

    // Helper: Draw 7x7 Finder Pattern at (row, col)
    const drawFinderPattern = (r: number, c: number) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (
            i === 0 || i === 6 || j === 0 || j === 6 || // Outer box
            (i >= 2 && i <= 4 && j >= 2 && j <= 4)     // Inner 3x3 solid box
          ) {
            grid[r + i][c + j] = true;
          } else {
            grid[r + i][c + j] = false;
          }
        }
      }
    };

    // Draw 3 corner finder patterns
    drawFinderPattern(0, 0); // Top-left
    drawFinderPattern(0, matrixSize - 7); // Top-right
    drawFinderPattern(matrixSize - 7, 0); // Bottom-left

    // Timing patterns (alternating row 6 and col 6)
    for (let i = 8; i < matrixSize - 8; i++) {
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    // Alignment pattern around (matrixSize - 9, matrixSize - 9)
    const alignR = matrixSize - 9;
    const alignC = matrixSize - 9;
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        if (Math.abs(i) === 2 || Math.abs(j) === 2 || (i === 0 && j === 0)) {
          grid[alignR + i][alignC + j] = true;
        }
      }
    }

    // Fill data areas deterministically from string hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        // Skip finder pattern zones
        const inTopLeft = r < 8 && c < 8;
        const inTopRight = r < 8 && c >= matrixSize - 8;
        const inBottomLeft = r >= matrixSize - 8 && c < 8;
        const inTiming = r === 6 || c === 6;
        const inAlignment = Math.abs(r - alignR) <= 2 && Math.abs(c - alignC) <= 2;

        if (!inTopLeft && !inTopRight && !inBottomLeft && !inTiming && !inAlignment) {
          // Pseudorandom pseudo-data bits seeded by character code and coordinate
          const seed = (r * 31 + c * 17 + hash) & 0xffff;
          grid[r][c] = ((seed ^ (r * c)) % 3) === 0 || ((seed >> 3) % 2 === 0);
        }
      }
    }

    return { grid, matrixSize };
  };

  const { grid, matrixSize } = generateMatrix(value);
  const cellSize = size / matrixSize;

  return (
    <div className={`inline-flex flex-col items-center bg-white p-2 rounded-lg border border-slate-300 shadow-xs ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <rect width={size} height={size} fill="#ffffff" />

          {/* QR 2D Data Cells */}
          {grid.map((row, r) =>
            row.map((filled, c) =>
              filled ? (
                <rect
                  key={`${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize + 0.1}
                  height={cellSize + 0.1}
                  fill="#0f172a"
                />
              ) : null
            )
          )}

          {/* Center Brand Badge (2D Matrix Center Emblem) */}
          <rect
            x={size / 2 - cellSize * 2}
            y={size / 2 - cellSize * 2}
            width={cellSize * 4}
            height={cellSize * 4}
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="1"
            rx="2"
          />
          <text
            x={size / 2}
            y={size / 2 + cellSize * 0.7}
            textAnchor="middle"
            fill="#f59e0b"
            fontSize={cellSize * 2.2}
            fontWeight="900"
            fontFamily="sans-serif"
          >
            CK
          </text>
        </svg>
      </div>

      {label && (
        <span className="text-[9px] font-mono font-bold text-slate-600 mt-1 uppercase tracking-wider text-center">
          {label}
        </span>
      )}
    </div>
  );
};
export default Barcode2D;
