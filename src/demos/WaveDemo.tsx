import { useEffect, useRef } from "react";

/**
 * Sample interactive demo: an animated interference-wave canvas.
 * Each demo is custom-coded and registered in src/demos/registry.tsx.
 */
const WaveDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx) return;
      const { width: w, height: h } = canvas;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const sources = [
        { x: w * 0.35, y: h * 0.5, f: 0.04 },
        { x: w * 0.65, y: h * 0.5, f: 0.04 },
      ];

      const cell = 6;
      for (let x = 0; x < w; x += cell) {
        for (let y = 0; y < h; y += cell) {
          let v = 0;
          for (const s of sources) {
            const d = Math.hypot(x - s.x, y - s.y);
            v += Math.sin(d * s.f - t);
          }
          const a = (v + 2) / 4; // 0..1
          ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.85})`;
          ctx.fillRect(x, y, cell - 1, cell - 1);
        }
      }
      t += 0.05;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-label="Interference wave simulation"
    />
  );
};

export default WaveDemo;
