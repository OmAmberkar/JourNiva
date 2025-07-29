import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { SketchPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";

export const VisionBoardCanvas = ({
  elements,
  setElements,
  onRemove,
  addingText,
  setAddingText,
}) => {
  const menuRef = useRef(null);

  const canvasRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
  visible: false,
  x: 0,
  y: 0,
  targetId: null,
  direction: "right", // "left" or "right"
});

  const [colorPicker, setColorPicker] = useState({
    visible: false,
    type: "",
    targetId: null,
  });
  const [marginControl, setMarginControl] = useState({
    visible: false,
    targetId: null,
  });

  useEffect(() => {
    
    const handleLeftClick = (e) => {
      const contextEl = document.querySelector(".context-menu");
      const colorPickerEl = document.querySelector(".color-picker");
      const marginEl = document.querySelector(".margin-control");

      const isClickInside =
        contextEl?.contains(e.target) ||
        colorPickerEl?.contains(e.target) ||
        marginEl?.contains(e.target);

      if (!isClickInside) {
        setContextMenu({ ...contextMenu, visible: false });
        setColorPicker({ ...colorPicker, visible: false });
        setMarginControl({ ...marginControl, visible: false });
      }
    };

    document.addEventListener("mousedown", handleLeftClick);
    return () => document.removeEventListener("mousedown", handleLeftClick);
  }, [contextMenu, colorPicker, marginControl]);
  
  

  const handleCanvasClick = (e) => {
    if (!addingText) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement = {
      id: uuidv4(),
      type: "text",
      content: "",
      x,
      y,
      width: 150,
      height: 50,
      zIndex: elements.length + 1,
      background: "transparent",
      textColor: "var(--color-dark)",
      margin: 4,
      border: false,
      fontSize: 16,
    };

    setElements([...elements, newElement]);
    setAddingText(false);
  };
  

  const updateElement = (id, updates) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const changeZIndex = (id, direction) => {
    setElements((prev) => {
      let sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((el) => el.id === id);
      if (idx === -1) return prev;
      const [target] = sorted.splice(idx, 1);
      direction === "front" ? sorted.push(target) : sorted.unshift(target);
      return sorted.map((el, i) => ({ ...el, zIndex: i + 1 }));
    });
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleDelete = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setContextMenu({ ...contextMenu, visible: false });
  };



  

  

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[var(--color-border)] rounded-md bg-[var(--color-background)] p-4 overflow-hidden"
    >
      {(elements || []).map((el) => (
        <Rnd
          key={el.id}
          default={{ x: el.x, y: el.y, width: el.width, height: el.height }}
          bounds="parent"
          style={{ zIndex: el.zIndex }}
          onContextMenu={(e) => {
  e.preventDefault();
  const canvasRect = canvasRef.current.getBoundingClientRect();
  const menuWidth = 220; // approximate menu width
  const menuHeight = 280; // approximate menu height
  const padding = 8;

  // Convert window (client) coordinates to canvas-relative
  const xInCanvas = e.clientX - canvasRect.left;
  const yInCanvas = e.clientY - canvasRect.top;

  // Default direction
  let direction = "right";

  // Clamp X if menu would overflow
  let finalX = xInCanvas;
  if (xInCanvas + menuWidth > canvasRect.width - padding) {
    finalX = xInCanvas - menuWidth;
    direction = "left";
  }

  // Clamp Y if menu would overflow
  let finalY = yInCanvas;
  if (yInCanvas + menuHeight > canvasRect.height - padding) {
    finalY = canvasRect.height - menuHeight - padding;
  }

  setContextMenu({
    visible: true,
    x: finalX,
    y: finalY,
    targetId: el.id,
    direction,
  });
}}






          onResizeStop={(e, dir, ref, delta, pos) => {
  const newWidth = parseFloat(ref.style.width);
  const newHeight = parseFloat(ref.style.height);

  updateElement(el.id, {
    width: newWidth,
    height: newHeight,
    x: pos.x,
    y: pos.y,
    // ❌ Do NOT update fontSize here
  });
}}


          onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
        >
          {el.type === "text" ? (
            <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  }}
>
  <textarea
  value={el.content}
  onChange={(e) => updateElement(el.id, { content: e.target.value })}
  placeholder="Type here..."
  style={{
    fontWeight: el.textStyle?.bold ? "bold" : "normal",
    fontStyle: el.textStyle?.italic ? "italic" : "normal",
    textDecoration: el.textStyle?.underline ? "underline" : "none",

    fontSize: `${el.fontSize || 16}px`,
    background: el.background,
    color: el.textColor,
    resize: "none",
    border: el.border
      ? `2px solid ${el.borderColor || "var(--color-dark)"}`
      : "none",
    borderRadius: "6px",
    textAlign: "center",
    padding: "4px 8px",
    margin: "0",
    lineHeight: "1.2",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    boxSizing: "border-box",
    outline: !el.border ? "2px dashed #555" : "none"
 // ✨ temporary border if no real border
  }}
  wrap="soft"
  className="outline-none"
/>

</div>
          ) : (
            <img
              src={el.url}
              alt="img"
              className="w-full h-full object-contain"
            />
          )}
        </Rnd>
      ))}

      
  {contextMenu.visible && (
  <div
  ref={menuRef}
  className="context-menu absolute bg-white border shadow-md rounded text-sm z-[9999] fade-in-slide"
  style={{
    top: `${contextMenu.y}px`,
    left: `${contextMenu.x}px`,
  }}
>



    <button
      onClick={() => changeZIndex(contextMenu.targetId, "front")}
      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
    >
      Bring to Front
    </button>
    <button
      onClick={() => changeZIndex(contextMenu.targetId, "back")}
      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
    >
      Send to Back
    </button>

    {elements.find((e) => e.id === contextMenu.targetId)?.type === "text" && (
      <>
        {/* Background Hover Menu */}
        <div className="relative group">
          <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
            Background &raquo;
          </button>
          <div
            className="absolute top-0 hidden group-hover:block bg-white border rounded shadow-lg z-[9999] min-w-[180px] fade-in-slide"
            style={{
              [contextMenu.direction === "right" ? "left" : "right"]: "100%",
            }}
          >
            <button
              onClick={() =>
                updateElement(contextMenu.targetId, { background: "#ffffff" })
              }
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Add Background
            </button>
            <button
              onClick={() =>
                updateElement(contextMenu.targetId, {
                  background: "transparent",
                })
              }
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Remove Background
            </button>
            {elements.find((e) => e.id === contextMenu.targetId)?.background !==
              "transparent" && (
              <button
                onClick={() =>
                  setColorPicker({
                    visible: true,
                    type: "bg",
                    targetId: contextMenu.targetId,
                  })
                }
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Change Background Color
              </button>
            )}
          </div>
        </div>

        {/* Border Hover Menu */}
        <div className="relative group">
          <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
            Border &raquo;
          </button>
          <div
            className="absolute top-0 hidden group-hover:block bg-white border rounded shadow-lg z-[9999] min-w-[180px] fade-in-slide"
            style={{
              [contextMenu.direction === "right" ? "left" : "right"]: "100%",
            }}
          >
            <button
              onClick={() =>
                updateElement(contextMenu.targetId, { border: true })
              }
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Add Border
            </button>
            <button
              onClick={() =>
                updateElement(contextMenu.targetId, { border: false })
              }
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              Remove Border
            </button>
            {elements.find((e) => e.id === contextMenu.targetId)?.border && (
              <button
                onClick={() =>
                  setColorPicker({
                    visible: true,
                    type: "border",
                    targetId: contextMenu.targetId,
                  })
                }
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Change Border Color
              </button>
            )}
          </div>
        </div>

        {/* Font Settings Hover Menu */}
        <div className="relative group">
          <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
            Font &raquo;
          </button>
          <div
            className="absolute top-0 hidden group-hover:block bg-white border rounded shadow-lg z-[9999] min-w-[200px] p-3 space-y-3 fade-in-slide"
            style={{
              [contextMenu.direction === "right" ? "left" : "right"]: "100%",
            }}
          >
            {/* Font Size Controls */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  const el = elements.find(
                    (e) => e.id === contextMenu.targetId
                  );
                  if (!el) return;
                  updateElement(contextMenu.targetId, {
                    fontSize: Math.max(1, el.fontSize - 2),
                  });
                }}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                –
              </button>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={
                  elements.find((e) => e.id === contextMenu.targetId)
                    ?.fontSize || ""
                }
                onChange={(e) => {
                  const val = e.target.value;
                  const num = parseInt(val);
                  if (!isNaN(num)) {
                    updateElement(contextMenu.targetId, {
                      fontSize: Math.max(1, Math.min(100, num)),
                    });
                  }
                }}
                className="w-12 text-center border border-gray-300 rounded px-1 py-0.5 text-sm appearance-none"
              />
              <button
                onClick={() => {
                  const el = elements.find(
                    (e) => e.id === contextMenu.targetId
                  );
                  if (!el) return;
                  updateElement(contextMenu.targetId, {
                    fontSize: el.fontSize + 2,
                  });
                }}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              >
                +
              </button>
            </div>

            {/* Font Color Button */}
            <button
              onClick={() =>
                setColorPicker({
                  visible: true,
                  type: "text",
                  targetId: contextMenu.targetId,
                })
              }
              className="block px-2 py-1 w-full hover:bg-gray-100 text-left rounded"
            >
              Change Text Color
            </button>

            {/* Bold / Italic / Underline Toggle Buttons */}
            <div className="flex items-center justify-between gap-2">
              {["bold", "italic", "underline"].map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    const el = elements.find(
                      (e) => e.id === contextMenu.targetId
                    );
                    if (!el) return;
                    const current = el.textStyle || {};
                    updateElement(contextMenu.targetId, {
                      textStyle: {
                        ...current,
                        [style]: !current[style],
                      },
                    });
                  }}
                  className="px-2 py-1 border rounded hover:bg-gray-200 text-sm capitalize"
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    )}

    <button
      onClick={() => handleDelete(contextMenu.targetId)}
      className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-500"
    >
      Delete
    </button>
  </div>
)}




      {colorPicker.visible && (
  <div
    className="color-picker absolute z-[10000] bg-white p-2 shadow-lg rounded"
    style={{
      top: `${colorPicker.y || 100}px`,
      left: `${colorPicker.x || 100}px`,
    }}
  >
    <SketchPicker
      color={
        colorPicker.type === "bg"
          ? elements.find((e) => e.id === colorPicker.targetId)?.background ||
            "#ffffff"
          : colorPicker.type === "text"
          ? elements.find((e) => e.id === colorPicker.targetId)?.textColor ||
            "var(--color-dark)"
          : elements.find((e) => e.id === colorPicker.targetId)?.borderColor ||
            "var(--color-dark)"
      }
      onChangeComplete={(color) => {
        updateElement(colorPicker.targetId, {
          [colorPicker.type === "bg"
            ? "background"
            : colorPicker.type === "text"
            ? "textColor"
            : "borderColor"]: color.hex,
        });
      }}
    />
    <button
      onClick={() => setColorPicker({ ...colorPicker, visible: false })}
      className="mt-2 bg-[var(--color-dark)] text-white px-3 py-1 rounded"
    >
      Done
    </button>
  </div>
)}

    </div>
  );
};

export default VisionBoardCanvas;
