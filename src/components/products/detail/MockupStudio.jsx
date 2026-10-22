'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { RotateCcw, Move, Download, ZoomIn, ZoomOut, Sliders } from 'lucide-react';

export default function MockupStudio({ baseImage, uploadedLogo, logoState, setLogoState }) {
  const canvasRef    = useRef(null);
  const isDragging   = useRef(false);
  const isResizing   = useRef(false);
  const dragStart    = useRef({ x: 0, y: 0 });
  const initialState = useRef(null);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!uploadedLogo || !logoState) return;

    const { x, y, w, h, rotation } = logoState;
    const logoImg = new Image();
    logoImg.src = uploadedLogo;
    logoImg.onload = () => {
      ctx.save();
      ctx.translate(x + w / 2, y + h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(logoImg, -w / 2, -h / 2, w, h);

      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(-w / 2, -h / 2, w, h);

      ctx.fillStyle = '#2563eb';
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    };
  }, [uploadedLogo, logoState]);

  useEffect(() => { redraw(); }, [redraw]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top)  * scaleY,
    };
  };

  const hitLogo = (x, y, ls) => {
    if (!ls) return false;
    return x >= ls.x && x <= ls.x + ls.w && y >= ls.y && y <= ls.y + ls.h;
  };

  const hitResize = (x, y, ls) => {
    if (!ls) return false;
    const rx = ls.x + ls.w, ry = ls.y + ls.h;
    return Math.abs(x - rx) < 16 && Math.abs(y - ry) < 16;
  };

  const handleMouseDown = (e) => {
    if (!logoState || !uploadedLogo || !canvasRef.current) return;
    const pos = getPos(e, canvasRef.current);
    if (hitResize(pos.x, pos.y, logoState)) {
      isResizing.current = true;
      dragStart.current = pos;
      initialState.current = { ...logoState };
    } else if (hitLogo(pos.x, pos.y, logoState)) {
      isDragging.current = true;
      dragStart.current = pos;
      initialState.current = { ...logoState };
    }
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current && !isResizing.current) return;
    const pos = getPos(e, canvasRef.current);
    const dx  = pos.x - dragStart.current.x;
    const dy  = pos.y - dragStart.current.y;
    const s   = initialState.current;
    if (isDragging.current) {
      setLogoState(prev => ({ ...prev, x: s.x + dx, y: s.y + dy }));
    } else if (isResizing.current) {
      const newW = Math.max(30, s.w + dx);
      const newH = Math.max(30, s.h + dy);
      setLogoState(prev => ({ ...prev, w: newW, h: newH }));
    }
    e.preventDefault();
  };

  const handleMouseUp = () => {
    isDragging.current  = false;
    isResizing.current  = false;
    initialState.current = null;
  };

  const downloadMockup = () => {
    const offscreen = document.createElement('canvas');
    offscreen.width = 600;
    offscreen.height = 600;
    const ctx = offscreen.getContext('2d');

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = baseImage || '/active-wear.png';
    baseImg.onload = () => {
      ctx.drawImage(baseImg, 0, 0, 600, 600);
      if (uploadedLogo && logoState) {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.src = uploadedLogo;
        logoImg.onload = () => {
          const scale = 600 / 520;
          const { x, y, w, h, rotation } = logoState;
          ctx.save();
          ctx.translate((x + w / 2) * scale, (y + h / 2) * scale);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(logoImg, (-w / 2) * scale, (-h / 2) * scale, w * scale, h * scale);
          ctx.restore();

          const a = document.createElement('a');
          a.download = 'custom-mockup.png';
          a.href = offscreen.toDataURL('image/png');
          a.click();
        };
      } else {
        const a = document.createElement('a');
        a.download = 'product-mockup.png';
        a.href = offscreen.toDataURL('image/png');
        a.click();
      }
    };
  };

  const resetLogo  = () => setLogoState({ x: 160, y: 130, w: 140, h: 140, rotation: 0 });
  const rotateLogo = () => setLogoState(s => s ? { ...s, rotation: (s.rotation + 15) % 360 } : s);

  return (
    <div className="space-y-3">
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-square flex items-center justify-center">
        <img
          src={baseImage || '/active-wear.png'}
          alt="Product View"
          className="w-full h-full object-cover"
        />

        {uploadedLogo && (
          <canvas
            ref={canvasRef}
            width={520}
            height={520}
            className="absolute inset-0 w-full h-full cursor-move z-10"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          />
        )}

        {uploadedLogo && (
          <div className="absolute top-3 right-3 z-20 flex gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-slate-800">
            <button onClick={rotateLogo} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors" title="Rotate 15°">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button onClick={resetLogo} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors" title="Center Logo">
              <Move className="w-3.5 h-3.5" />
            </button>
            <button onClick={downloadMockup} className="w-7 h-7 rounded-lg flex items-center justify-center text-emerald-400 hover:bg-emerald-950/40 transition-colors" title="Download Mockup PNG">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {uploadedLogo && (
          <div className="absolute bottom-3 left-3 z-20 text-[10px] font-medium text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/50">
            Drag to position · Corner dot to scale
          </div>
        )}
      </div>

      {uploadedLogo && logoState && (
        <div className="border border-slate-200 rounded-xl p-3 space-y-2 text-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-slate-400" /> Artwork Scale
            </span>
            <div className="flex gap-1">
              <button onClick={() => setLogoState(s => ({ ...s, w: Math.max(30, s.w - 15), h: Math.max(30, s.h - 15) }))} className="w-6 h-6 border border-slate-200 bg-slate-50 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer text-slate-600">
                <ZoomOut className="w-3 h-3" />
              </button>
              <button onClick={() => setLogoState(s => ({ ...s, w: s.w + 15, h: s.h + 15 }))} className="w-6 h-6 border border-slate-200 bg-slate-50 rounded flex items-center justify-center hover:bg-slate-100 cursor-pointer text-slate-600">
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>
          </div>
          <input
            type="range" min="40" max="280"
            value={logoState.w}
            onChange={e => { const v = parseInt(e.target.value); setLogoState(s => ({ ...s, w: v, h: v })); }}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-900"
          />
        </div>
      )}
    </div>
  );
}
