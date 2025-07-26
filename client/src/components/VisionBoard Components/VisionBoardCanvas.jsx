

import React, { useState, useRef, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { Rnd } from "react-rnd";

export const VisionBoardCanvas = ({ elements = [], onRemove, setElements, previewMode = false }) => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, targetId: null });
  const contextRef = useRef();

  const handleRightClick = (e, id) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, targetId: id });
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (contextRef.current && !contextRef.current.contains(e.target)) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [contextMenu]);

  const changeZIndex = (id, direction) => {
    setElements((prev) => {
      let sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
      const targetIndex = sorted.findIndex((el) => el.id === id);
      if (targetIndex === -1) return prev;

      const [target] = sorted.splice(targetIndex, 1);
      if (direction === "front") sorted.push(target);
      else sorted.unshift(target);

      return sorted.map((el, index) => ({ ...el, zIndex: index + 1 }));
    });
    setContextMenu({ ...contextMenu, visible: false });
  };

  return (
    <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <FiPlus className="text-6xl text-[#3E5973] opacity-20" />
        </div>
      )}

      {elements.map((el, index) => (
        <Rnd
          key={el.id}
          default={{
            x: 100 + index * 10,
            y: 100 + index * 10,
            width: el.width || 200,
            height: el.height || 100,
          }}
          style={{ zIndex: el.zIndex || index }}
          bounds="parent"
          disableDragging={previewMode}
          enableResizing={!previewMode}
          className="group"
          onContextMenu={(e) => handleRightClick(e, el.id)}
        >
          {el.type === "text" ? (
            <DynamicTextBox
              content={el.content}
              onRemove={() => onRemove(el.id)}
              previewMode={previewMode}
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={el.url}
                alt="vision-img"
                className="w-full h-full object-fill rounded-md"
              />
              {!previewMode && (
                <button
                  onClick={() => onRemove(el.id)}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center z-10"
                >
                  ×
                </button>
              )}
            </div>
          )}
        </Rnd>
      ))}

      {contextMenu.visible && (
        <div
          ref={contextRef}
          className="absolute z-[999] bg-white border shadow-md rounded-md text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
            onClick={() => changeZIndex(contextMenu.targetId, "front")}
          >
            Bring to Front
          </button>
          <button
            className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
            onClick={() => changeZIndex(contextMenu.targetId, "back")}
          >
            Send to Back
          </button>
        </div>
      )}
    </div>
  );
};

const DynamicTextBox = ({ content, onRemove, previewMode }) => {
  const containerRef = useRef();
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const resizeFont = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const scale = Math.min(width / 10, height / 2); // adjust ratio if needed
      setFontSize(scale);
    };

    resizeFont();
    const observer = new ResizeObserver(resizeFont);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-white rounded-md border border-[#3E5973] flex items-center justify-center text-center"
    >
      <div
        className="text-[#3E5973] font-bold break-words px-2"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.2 }}
      >
        {content}
      </div>
      {!previewMode && (
        <button
          onClick={onRemove}
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center z-10"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default VisionBoardCanvas;




