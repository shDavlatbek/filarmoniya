"use client";

import React, { useRef, useEffect } from 'react';

export default function HalftoneCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let animationFrameId;
    
    const draw = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Get accurate CSS pixel dimensions of the parent wrapper
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Setup canvas coordinate system for sharp rendering on high-DPI displays
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Clear Previous
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Halftone Setup
      const spacing = 12; // Grid distance
      const cols = Math.ceil(rect.width / spacing);
      const rows = Math.ceil(rect.height / spacing);
      
      // Generate random organic patches
      const patches = [];
      // create 8-15 patches relying on height
      const numPatches = Math.floor(Math.random() * 8) + 6 + Math.floor(rect.height / 300);
      
      for (let i = 0; i < numPatches; i++) {
        patches.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          radius: (Math.random() * 150) + 100, // 100px to 250px radius patches
          intensity: Math.random() * 0.8 + 0.5 // Patch strength
        });
      }

      ctx.save();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * spacing;
          const cy = r * spacing;
          
          // Calculate influence from all random patches
          let influence = 0;
          for (const p of patches) {
            const dx = cx - p.x;
            const dy = cy - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < p.radius) {
              // Smooth dropoff (cosine ease roughly)
              const normalizedDist = dist / p.radius;
              const strength = (1 - normalizedDist) * p.intensity;
              influence += strength;
            }
          }
          
          // Add some global static noise mimicking ink spray mapping
          influence += (Math.random() * 0.1); 
          
          // Clamp
          influence = Math.min(1, Math.max(0, influence));

          // Interpolate properties
          // Base: radius 0.5, opacity 0.05
          // Peak: radius 1.5, opacity 0.3
          const radius = Number((0.5 + (influence * 1.0)).toFixed(2));
          const opacity = Number((0.05 + (influence * 0.25)).toFixed(2));
          
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.fill();
        }
      }
      ctx.restore();
    };

    draw();

    // Re-draw on window resize
    const handleResize = () => {
      // Use requestAnimationFrame to debounce slightly
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0 // Keep behind content but above actual backgrounds if needed. Usually sits in a dedicated container.
      }}
    />
  );
}
