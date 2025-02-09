import React, { useState, useEffect, useRef } from 'react';

const MapViewer = ({ children }) => {
  // State management
  const [screenSize, setScreenSize] = useState({ 
    width: 0, 
    height: 0 
  });
  const [mouseDelta, setMouseDelta] = useState({ 
    x: 0, 
    y: 0 
  });
  const [transform, setTransform] = useState({
    translateX: 0,
    translateY: 0,
    scale: 1
  });
  const [cursorPos, setCursorPos] = useState({ 
    x: 0, 
    y: 0 
  });

  // Refs for persistent values
  const prevMousePos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Track screen size
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: document.body.clientWidth,
        height: document.body.clientHeight
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Mouse movement handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update cursor position
      const rect = document.body.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });

      // Calculate deltas
      setMouseDelta({
        x: e.clientX - prevMousePos.current.x,
        y: e.clientY - prevMousePos.current.y
      });
      
      prevMousePos.current = { 
        x: e.clientX, 
        y: e.clientY 
      };

      // Panning while dragging
      if (isDragging.current) {
        setTransform(prev => ({
          ...prev,
          translateX: prev.translateX + e.movementX,
          translateY: prev.translateY + e.movementY
        }));
      }
    };

    const handleMouseDown = () => {
      isDragging.current = true;
      document.body.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'grab';
    };

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mousedown', handleMouseDown);
    document.body.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mousedown', handleMouseDown);
      document.body.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Zoom handler using a functional update to always have the latest transform values
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const zoomIntensity = 0.1;
      const delta = e.deltaY > 0 ? -1 : 1;

      // Get the mouse position relative to the viewport
      const rect = document.body.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setTransform(prev => {
        const newScale = prev.scale * (1 + delta * zoomIntensity);
        const clampedScale = Math.min(Math.max(newScale, 1), 5);

        // Calculate new translate so that the zoom centers on the mouse cursor
        // Formula derived from: newTranslate = oldTranslate * (newScale/oldScale) + mouse * (1 - newScale/oldScale)
        const newTranslateX = mouseX * (1 - clampedScale / prev.scale) + (prev.translateX * clampedScale) / prev.scale;
        const newTranslateY = mouseY * (1 - clampedScale / prev.scale) + (prev.translateY * clampedScale) / prev.scale;

        return {
          scale: clampedScale,
          translateX: newTranslateX,
          translateY: newTranslateY
        };
      });
    };

    // Attach the wheel handler once
    document.body.addEventListener('wheel', handleWheel);
    return () => document.body.removeEventListener('wheel', handleWheel);
  }, []); // No dependency needed since we use functional updates

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        cursor: 'grab',
        transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default MapViewer;
