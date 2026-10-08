import { useEffect, useRef } from "react";

const WaveDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let time = 0;
    let visible = false;
    let previous = 0;
    let pointer = { x: .65, y: .5 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const styles = getComputedStyle(document.documentElement);
    const background = `hsl(${styles.getPropertyValue('--background')})`;
    const waveColor = `hsl(${styles.getPropertyValue('--paper')})`;
    const sourceColor = `hsl(${styles.getPropertyValue('--figure-a')})`;
    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth);
      canvas.height = Math.round(canvas.clientHeight);
    };
    const draw = (now: number) => {
      if (!visible) return;
      const { width: w, height: h } = canvas;
      if (!reduced.matches) time += Math.min(now - (previous || now), 40) * .003;
      previous = now;
      ctx.globalAlpha = 1;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);
      const sources = [{ x: w * .35, y: h * .5 }, { x: w * pointer.x, y: h * pointer.y }];
      const cell = Math.max(5, Math.ceil(w / 180));
      ctx.fillStyle = waveColor;
      for (let x = 0; x < w; x += cell) {
        for (let y = 0; y < h; y += cell) {
          let value = 0;
          for (const source of sources) value += Math.sin(Math.hypot(x-source.x, y-source.y) * .045 - time);
          ctx.globalAlpha = ((value + 2) / 4) * .8;
          ctx.fillRect(x, y, cell - 1, cell - 1);
        }
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = sourceColor;
      sources.forEach(source => { ctx.beginPath(); ctx.arc(source.x, source.y, 5, 0, Math.PI * 2); ctx.fill(); });
      if (!reduced.matches) raf = requestAnimationFrame(draw);
    };
    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: Math.max(.05, Math.min(.95, (event.clientX - rect.left) / rect.width)), y: Math.max(.05, Math.min(.95, (event.clientY - rect.top) / rect.height)) };
      if (reduced.matches && visible) draw(performance.now());
    };
    const updateKeyboard = (event: KeyboardEvent) => {
      const shifts: Record<string, [number, number]> = { ArrowLeft: [-.03,0], ArrowRight: [.03,0], ArrowUp: [0,-.03], ArrowDown: [0,.03] };
      const shift = shifts[event.key];
      if (!shift) return;
      event.preventDefault();
      pointer = { x: Math.max(.05, Math.min(.95, pointer.x + shift[0])), y: Math.max(.05, Math.min(.95, pointer.y + shift[1])) };
      if (reduced.matches && visible) draw(performance.now());
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      cancelAnimationFrame(raf);
      previous = 0;
      if (visible) raf = requestAnimationFrame(draw);
    });
    const resizer = new ResizeObserver(() => { resize(); if (visible && reduced.matches) draw(performance.now()); });
    resize();
    observer.observe(canvas);
    resizer.observe(canvas);
    canvas.addEventListener("pointermove", updatePointer);
    canvas.addEventListener("pointerdown", updatePointer);
    canvas.addEventListener("keydown", updateKeyboard);
    return () => {
      cancelAnimationFrame(raf); observer.disconnect(); resizer.disconnect();
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerdown", updatePointer);
      canvas.removeEventListener("keydown", updateKeyboard);
    };
  }, []);
  return <canvas ref={canvasRef} tabIndex={0} className="w-full h-full block outline-none focus-visible:ring-1 focus-visible:ring-figure-a" aria-label="Interactive wave interference: move a source with your pointer or arrow keys" />;
};
export default WaveDemo;
