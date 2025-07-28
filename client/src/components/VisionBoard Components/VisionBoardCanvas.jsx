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
  const canvasRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    targetId: null,
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
            setContextMenu({
              visible: true,
              x: e.clientX,
              y: e.clientY,
              targetId: el.id,
            });
          }}
          onResizeStop={(e, dir, ref, delta, pos) => {
            const newWidth = parseFloat(ref.style.width);
            const newHeight = parseFloat(ref.style.height);
            const newFontSize = Math.min(64, Math.max(8, newHeight * 0.8)); // smooth scaling

            updateElement(el.id, {
              width: newWidth,
              height: newHeight,
              x: pos.x,
              y: pos.y,
              fontSize: newFontSize,
            });
          }}
          onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
        >
          {el.type === "text" ? (
            <textarea
              value={el.content}
              onChange={(e) =>
                updateElement(el.id, { content: e.target.value })
              }
              style={{
                fontSize: `${el.fontSize || 16}px`,
                width: "100%",
                height: "100%",
                background: el.background,
                color: el.textColor,
                resize: "none",
                border: el.border
                  ? `2px solid ${el.borderColor || "var(--color-dark)"}`
                  : "none",
                borderRadius: "6px",
                fontWeight: "bold",
                textAlign: "center",
                padding: "0px",
                margin: "0px",
                lineHeight: "1",
                overflow: "hidden",
                boxSizing: "border-box",
              }}
              className="text-center"
              placeholder="Type here..."
            />
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
          className="context-menu absolute bg-white border shadow-md rounded text-sm z-[9999]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
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
          {elements.find((e) => e.id === contextMenu.targetId)?.type ===
            "text" && (
            <>
              <button
                onClick={() =>
                  updateElement(contextMenu.targetId, {
                    background: "#ffffff",
                  })
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
              <button
                onClick={() =>
                  setColorPicker({
                    visible: true,
                    type: "text",
                    targetId: contextMenu.targetId,
                  })
                }
                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                Change Text Color
              </button>
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
        <div className="color-picker absolute z-[10000] top-[50px] left-[50px] bg-white p-2 shadow-lg rounded">
          <SketchPicker
            color={
              colorPicker.type === "bg"
                ? elements.find((e) => e.id === colorPicker.targetId)
                    ?.background || "#ffffff"
                : colorPicker.type === "text"
                ? elements.find((e) => e.id === colorPicker.targetId)
                    ?.textColor || "var(--color-dark)"
                : elements.find((e) => e.id === colorPicker.targetId)
                    ?.borderColor || "var(--color-dark)"
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

// import React, { useState, useRef, useEffect } from "react";
// import { Rnd } from "react-rnd";
// import { SketchPicker } from "react-color";
// import { v4 as uuidv4 } from "uuid";

// export const VisionBoardCanvas = ({
//   elements,
//   setElements,
//   onRemove,
//   addingText,
//   setAddingText,
// }) => {
//   const canvasRef = useRef(null);
//   const [contextMenu, setContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     targetId: null,
//   });
//   const [colorPicker, setColorPicker] = useState({
//     visible: false,
//     type: "",
//     targetId: null,
//   });
//   const [marginControl, setMarginControl] = useState({
//     visible: false,
//     targetId: null,
//   });

//   useEffect(() => {
//     const handleLeftClick = (e) => {
//       const contextEl = document.querySelector(".context-menu");
//       const colorPickerEl = document.querySelector(".color-picker");
//       const marginEl = document.querySelector(".margin-control");

//       const isClickInside =
//         contextEl?.contains(e.target) ||
//         colorPickerEl?.contains(e.target) ||
//         marginEl?.contains(e.target);

//       if (!isClickInside) {
//         setContextMenu({ ...contextMenu, visible: false });
//         setColorPicker({ ...colorPicker, visible: false });
//         setMarginControl({ ...marginControl, visible: false });
//       }
//     };

//     document.addEventListener("mousedown", handleLeftClick);
//     return () => document.removeEventListener("mousedown", handleLeftClick);
//   }, [contextMenu, colorPicker, marginControl]);

//   const handleCanvasClick = (e) => {
//     if (!addingText) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const newElement = {
//       id: uuidv4(),
//       type: "text",
//       content: "",
//       x,
//       y,
//       width: 150,
//       height: 50,
//       zIndex: elements.length + 1,
//       background: "transparent",
//       textColor: "#3E5973",
//       margin: 4,
//       border: false,
//       fontSize: 16, // ✅ New
//     };

//     setElements([...elements, newElement]);
//     setAddingText(false);
//   };

//   const updateElement = (id, updates) => {
//     setElements((prev) =>
//       prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
//     );
//   };

//   const changeZIndex = (id, direction) => {
//     setElements((prev) => {
//       let sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
//       const idx = sorted.findIndex((el) => el.id === id);
//       if (idx === -1) return prev;
//       const [target] = sorted.splice(idx, 1);
//       direction === "front" ? sorted.push(target) : sorted.unshift(target);
//       return sorted.map((el, i) => ({ ...el, zIndex: i + 1 }));
//     });
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   const handleDelete = (id) => {
//     setElements((prev) => prev.filter((el) => el.id !== id));
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   return (
//     <div
//       ref={canvasRef}
//       onClick={handleCanvasClick}
//       className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden"
//     >
//       {(elements || []).map((el) => (
//         <Rnd
//           key={el.id}
//           default={{ x: el.x, y: el.y, width: el.width, height: el.height }}
//           bounds="parent"
//           style={{ zIndex: el.zIndex }}
//           onContextMenu={(e) => {
//             e.preventDefault();
//             setContextMenu({
//               visible: true,
//               x: e.clientX,
//               y: e.clientY,
//               targetId: el.id,
//             });
//           }}
//           onResizeStop={(e, dir, ref, delta, pos) => {
//             const newWidth = parseFloat(ref.style.width);
//             const newHeight = parseFloat(ref.style.height);
//             const newFontSize = Math.max(8, newHeight * 0.5); // ✅ Scale font by height

//             updateElement(el.id, {
//               width: newWidth,
//               height: newHeight,
//               x: pos.x,
//               y: pos.y,
//               fontSize: newFontSize, // ✅ Set font size
//             });
//           }}
//           onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
//         >
//           {el.type === "text" ? (
//             <textarea
//               value={el.content}
//               onChange={(e) => updateElement(el.id, { content: e.target.value })}
//               style={{
//                 fontSize: `${el.fontSize || 16}px`, // ✅ Dynamic font
//                 width: "100%",
//                 height: "100%",
//                 background: el.background,
//                 color: el.textColor,
//                 resize: "none",
//                 border: el.border
//                   ? `2px solid ${el.borderColor || "#3E5973"}`
//                   : "none",
//                 borderRadius: "6px",
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 padding: "0px",
//                 margin: "0px",
//                 lineHeight: "1",
//                 overflow: "hidden",
//                 boxSizing: "border-box",
//               }}
//               className="text-center"
//               placeholder="Type here..."
//             />
//           ) : (
//             <img
//               src={el.url}
//               alt="img"
//               className="w-full h-full object-contain"
//             />
//           )}
//         </Rnd>
//       ))}

//       {/* Context Menu */}
//       {contextMenu.visible && (
//         <div
//           className="context-menu absolute bg-white border shadow-md rounded text-sm z-[9999]"
//           style={{ top: contextMenu.y, left: contextMenu.x }}
//         >
//           <button
//             onClick={() => changeZIndex(contextMenu.targetId, "front")}
//             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//           >
//             Bring to Front
//           </button>
//           <button
//             onClick={() => changeZIndex(contextMenu.targetId, "back")}
//             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//           >
//             Send to Back
//           </button>
//           {elements.find((e) => e.id === contextMenu.targetId)?.type ===
//             "text" && (
//             <>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { background: "#ffffff" })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Background
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, {
//                     background: "transparent",
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Remove Background
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "bg",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Background Color
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "text",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Text Color
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "border",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Border Color
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { border: true })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Border
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { border: false })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Remove Border
//               </button>
//             </>
//           )}
//           <button
//             onClick={() => handleDelete(contextMenu.targetId)}
//             className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-500"
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       {/* Color Picker */}
//       {colorPicker.visible && (
//         <div className="color-picker absolute z-[10000] top-[50px] left-[50px] bg-white p-2 shadow-lg rounded">
//           <SketchPicker
//             color={
//               colorPicker.type === "bg"
//                 ? elements.find((e) => e.id === colorPicker.targetId)
//                     ?.background || "#ffffff"
//                 : colorPicker.type === "text"
//                 ? elements.find((e) => e.id === colorPicker.targetId)
//                     ?.textColor || "#3E5973"
//                 : elements.find((e) => e.id === colorPicker.targetId)
//                     ?.borderColor || "#3E5973"
//             }
//             onChangeComplete={(color) => {
//               updateElement(colorPicker.targetId, {
//                 [colorPicker.type === "bg"
//                   ? "background"
//                   : colorPicker.type === "text"
//                   ? "textColor"
//                   : "borderColor"]: color.hex,
//               });
//             }}
//           />
//           <button
//             onClick={() => setColorPicker({ ...colorPicker, visible: false })}
//             className="mt-2 bg-[#3E5973] text-white px-3 py-1 rounded"
//           >
//             Done
//           </button>
//         </div>
//       )}

//       {/* Margin Controls */}
//       {marginControl.visible && (
//         <div className="margin-control absolute z-[10000] top-[50px] left-[200px] bg-white p-2 shadow-md rounded flex gap-2 items-center">
//           <button
//             onClick={() => {
//               const el = elements.find((e) => e.id === marginControl.targetId);
//               if (el)
//                 updateElement(el.id, { margin: Math.max(0, el.margin - 2) });
//             }}
//             className="px-2 py-1 bg-gray-200 rounded"
//           >
//             -
//           </button>
//           <span className="text-sm font-medium">
//             {elements.find((e) => e.id === marginControl.targetId)?.margin}px
//           </span>
//           <button
//             onClick={() => {
//               const el = elements.find((e) => e.id === marginControl.targetId);
//               if (el) updateElement(el.id, { margin: el.margin + 2 });
//             }}
//             className="px-2 py-1 bg-gray-200 rounded"
//           >
//             +
//           </button>
//           <button
//             onClick={() =>
//               setMarginControl({ ...marginControl, visible: false })
//             }
//             className="ml-2 px-2 py-1 bg-[#3E5973] text-white rounded"
//           >
//             ✓
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VisionBoardCanvas;

// import React, { useState, useRef, useEffect } from "react";
// import { Rnd } from "react-rnd";
// import { SketchPicker } from "react-color";
// import { v4 as uuidv4 } from "uuid";

// export const VisionBoardCanvas = ({
//   elements,
//   setElements,
//   onRemove,
//   addingText,
//   setAddingText,
// }) => {
//   const canvasRef = useRef(null);
//   const [contextMenu, setContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     targetId: null,
//   });
//   const [colorPicker, setColorPicker] = useState({
//     visible: false,
//     type: "",
//     targetId: null,
//   });
//   const [marginControl, setMarginControl] = useState({
//     visible: false,
//     targetId: null,
//   });

//   useEffect(() => {
//     const handleLeftClick = (e) => {
//       const contextEl = document.querySelector(".context-menu");
//       const colorPickerEl = document.querySelector(".color-picker");
//       const marginEl = document.querySelector(".margin-control");

//       const isClickInside =
//         contextEl?.contains(e.target) ||
//         colorPickerEl?.contains(e.target) ||
//         marginEl?.contains(e.target);

//       if (!isClickInside) {
//         setContextMenu({ ...contextMenu, visible: false });
//         setColorPicker({ ...colorPicker, visible: false });
//         setMarginControl({ ...marginControl, visible: false });
//       }
//     };

//     document.addEventListener("mousedown", handleLeftClick);
//     return () => document.removeEventListener("mousedown", handleLeftClick);
//   }, [contextMenu, colorPicker, marginControl]);

//   const handleCanvasClick = (e) => {
//     if (!addingText) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const newElement = {
//       id: uuidv4(),
//       type: "text",
//       content: "",
//       x,
//       y,
//       width: 150,
//       height: 50,
//       zIndex: elements.length + 1,
//       background: "transparent",
//       textColor: "#3E5973",
//       margin: 4,
//       border: false,
//     };

//     setElements([...elements, newElement]);
//     setAddingText(false);
//   };

//   const updateElement = (id, updates) => {
//     setElements((prev) =>
//       prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
//     );
//   };

//   const changeZIndex = (id, direction) => {
//     setElements((prev) => {
//       let sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
//       const idx = sorted.findIndex((el) => el.id === id);
//       if (idx === -1) return prev;
//       const [target] = sorted.splice(idx, 1);
//       direction === "front" ? sorted.push(target) : sorted.unshift(target);
//       return sorted.map((el, i) => ({ ...el, zIndex: i + 1 }));
//     });
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   const handleDelete = (id) => {
//     setElements((prev) => prev.filter((el) => el.id !== id));
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   return (
//     <div
//       ref={canvasRef}
//       onClick={handleCanvasClick}
//       className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden"
//     >
//       {(elements || []).map((el) => (
//         <Rnd
//           key={el.id}
//           default={{ x: el.x, y: el.y, width: el.width, height: el.height }}
//           bounds="parent"
//           style={{ zIndex: el.zIndex }}
//           onContextMenu={(e) => {
//             e.preventDefault();
//             setContextMenu({
//               visible: true,
//               x: e.clientX,
//               y: e.clientY,
//               targetId: el.id,
//             });
//           }}
//           onResizeStop={(e, dir, ref, delta, pos) => {
//             updateElement(el.id, {
//               width: parseFloat(ref.style.width),
//               height: parseFloat(ref.style.height),
//               x: pos.x,
//               y: pos.y,
//             });
//           }}
//           onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
//         >
//           {el.type === "text" ? (
//             <textarea
//   value={el.content}
//   onChange={(e) => {
//     updateElement(el.id, { content: e.target.value });

//     const textarea = e.target;
//     textarea.style.height = "auto"; // Reset first
//     textarea.style.height = textarea.scrollHeight + "px";

//     // Optional: Resize width dynamically too
//     const span = document.createElement("span");
//     span.style.visibility = "hidden";
//     span.style.position = "absolute";
//     span.style.whiteSpace = "pre";
//     span.style.font = window.getComputedStyle(textarea).font;
//     span.innerText = e.target.value || "Type here...";
//     document.body.appendChild(span);
//     textarea.style.width = span.offsetWidth + 4 + "px";
//     document.body.removeChild(span);
//   }}
//   style={{
//     background: el.background,
//     color: el.textColor,
//     resize: "none",
//     border: el.border
//       ? `2px solid ${el.borderColor || "#3E5973"}`
//       : "none",
//     borderRadius: "6px",
//     fontWeight: "bold",
//     textAlign: "center",
//     overflow: "hidden",
//     padding: "0px",       // 🚫 No padding
//     margin: "0px",        // 🚫 No margin
//     fontSize: "16px",
//     display: "block",
//     boxSizing: "content-box",
//     height: "auto",
//     minHeight: "20px",
//     lineHeight: "1",      // ✅ Tightly pack text, no gap
//   }}
//   className="text-center"
//   placeholder="Type here..."
// />

//           ) : (
//             <img
//               src={el.url}
//               alt="img"
//               className="w-full h-full object-contain"
//             />
//           )}
//         </Rnd>
//       ))}

//       {/* Context Menu */}
//       {contextMenu.visible && (
//          <div
//     className="context-menu absolute bg-white border shadow-md rounded text-sm z-[9999]"
//     style={{ top: contextMenu.y, left: contextMenu.x }}
//   >
//           <button
//             onClick={() => changeZIndex(contextMenu.targetId, "front")}
//             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//           >
//             Bring to Front
//           </button>
//           <button
//             onClick={() => changeZIndex(contextMenu.targetId, "back")}
//             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//           >
//             Send to Back
//           </button>
//           {elements.find((e) => e.id === contextMenu.targetId)?.type ===
//             "text" && (
//             <>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, {
//                     background: "#ffffff",
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Background
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, {
//                     background: "transparent",
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Remove Background
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "bg",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Background Color
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "text",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Text Color
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "border",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Border Color
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { border: true })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Border
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { border: false })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Remove Border
//               </button>
//             </>
//           )}
//           <button
//             onClick={() => handleDelete(contextMenu.targetId)}
//             className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-500"
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       {/* Color Picker */}
//       {colorPicker.visible && (
//         <div className="absolute z-[10000] top-[50px] left-[50px] bg-white p-2 shadow-lg rounded">
//           <SketchPicker
//             color={
//               colorPicker.type === "bg"
//                 ? elements.find((e) => e.id === colorPicker.targetId)
//                     ?.background || "#ffffff"
//                 : colorPicker.type === "text"
//                 ? elements.find((e) => e.id === colorPicker.targetId)
//                     ?.textColor || "#3E5973"
//                 : elements.find((e) => e.id === colorPicker.targetId)
//                     ?.borderColor || "#3E5973"
//             }
//             onChangeComplete={(color) => {
//               updateElement(colorPicker.targetId, {
//                 [colorPicker.type === "bg"
//                   ? "background"
//                   : colorPicker.type === "text"
//                   ? "textColor"
//                   : "borderColor"]: color.hex,
//               });
//             }}
//           />
//           <button
//             onClick={() => setColorPicker({ ...colorPicker, visible: false })}
//             className="mt-2 bg-[#3E5973] text-white px-3 py-1 rounded"
//           >
//             Done
//           </button>
//         </div>
//       )}

//       {/* Margin Controls */}
//       {marginControl.visible && (
//         <div className="absolute z-[10000] top-[50px] left-[200px] bg-white p-2 shadow-md rounded flex gap-2 items-center">
//           <button
//             onClick={() => {
//               const el = elements.find((e) => e.id === marginControl.targetId);
//               if (el)
//                 updateElement(el.id, { margin: Math.max(0, el.margin - 2) });
//             }}
//             className="px-2 py-1 bg-gray-200 rounded"
//           >
//             -
//           </button>
//           <span className="text-sm font-medium">
//             {elements.find((e) => e.id === marginControl.targetId)?.margin}px
//           </span>
//           <button
//             onClick={() => {
//               const el = elements.find((e) => e.id === marginControl.targetId);
//               if (el) updateElement(el.id, { margin: el.margin + 2 });
//             }}
//             className="px-2 py-1 bg-gray-200 rounded"
//           >
//             +
//           </button>
//           <button
//             onClick={() =>
//               setMarginControl({ ...marginControl, visible: false })
//             }
//             className="ml-2 px-2 py-1 bg-[#3E5973] text-white rounded"
//           >
//             ✓
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VisionBoardCanvas;

// import React, { useState, useRef, useEffect } from "react";
// import { Rnd } from "react-rnd";
// import { SketchPicker } from "react-color";
// import { v4 as uuidv4 } from "uuid";

// export const VisionBoardCanvas = ({
//   elements,
//   setElements,
//   onRemove,
//   addingText,
//   setAddingText,
// }) => {
//   const canvasRef = useRef(null);
//   const [contextMenu, setContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     targetId: null,
//   });
//   const [colorPicker, setColorPicker] = useState({
//     visible: false,
//     type: "",
//     targetId: null,
//   });
//   const [marginControl, setMarginControl] = useState({
//     visible: false,
//     targetId: null,
//   });

//   useEffect(() => {
//     const handleLeftClick = (e) => {
//       const contextEl = document.querySelector(".context-menu");
//       const colorPickerEl = document.querySelector(".color-picker");
//       const marginEl = document.querySelector(".margin-control");

//       const isClickInside =
//         contextEl?.contains(e.target) ||
//         colorPickerEl?.contains(e.target) ||
//         marginEl?.contains(e.target);

//       if (!isClickInside) {
//         setContextMenu({ ...contextMenu, visible: false });
//         setColorPicker({ ...colorPicker, visible: false });
//         setMarginControl({ ...marginControl, visible: false });
//       }
//     };

//     document.addEventListener("mousedown", handleLeftClick);
//     return () => document.removeEventListener("mousedown", handleLeftClick);
//   }, [contextMenu, colorPicker, marginControl]);

//   const handleCanvasClick = (e) => {
//     if (!addingText) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const newElement = {
//       id: uuidv4(),
//       type: "text",
//       content: "",
//       x,
//       y,
//       width: 150,
//       height: 50,
//       zIndex: elements.length + 1,
//       background: "transparent",
//       textColor: "#3E5973",
//       margin: 4,
//       border: false,
//     };

//     setElements([...elements, newElement]);
//     setAddingText(false);
//   };

//   const updateElement = (id, updates) => {
//     setElements((prev) =>
//       prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
//     );
//   };

//   const changeZIndex = (id, direction) => {
//     setElements((prev) => {
//       let sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
//       const idx = sorted.findIndex((el) => el.id === id);
//       if (idx === -1) return prev;
//       const [target] = sorted.splice(idx, 1);
//       direction === "front" ? sorted.push(target) : sorted.unshift(target);
//       return sorted.map((el, i) => ({ ...el, zIndex: i + 1 }));
//     });
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   const handleDelete = (id) => {
//     setElements((prev) => prev.filter((el) => el.id !== id));
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   return (
//     <div
//       ref={canvasRef}
//       onClick={handleCanvasClick}
//       className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden"
//     >
//       {(elements || []).map((el, idx) => (
//         <Rnd
//           key={el.id}
//           default={{ x: el.x, y: el.y, width: el.width, height: el.height }}
//           bounds="parent"
//           style={{ zIndex: el.zIndex }}
//           onContextMenu={(e) => {
//             e.preventDefault();
//             setContextMenu({
//               visible: true,
//               x: e.clientX,
//               y: e.clientY,
//               targetId: el.id,
//             });
//           }}
//           onResizeStop={(e, dir, ref, delta, pos) => {
//             updateElement(el.id, {
//               width: parseFloat(ref.style.width),
//               height: parseFloat(ref.style.height),
//               x: pos.x,
//               y: pos.y,
//             });
//           }}
//           onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
//         >
//           {el.type === "text" ? (
//             <div
//   contentEditable
//   suppressContentEditableWarning
//   onInput={(e) => {
//     const content = e.target.innerText;
//     updateElement(el.id, { content });

//     // Auto-resize height
//     e.target.style.height = "auto";
//     e.target.style.height = e.target.scrollHeight + "px";

//     // Auto-resize width
//     const tempSpan = document.createElement("span");
//     tempSpan.style.visibility = "hidden";
//     tempSpan.style.whiteSpace = "pre";
//     tempSpan.style.font = window.getComputedStyle(e.target).font;
//     tempSpan.innerText = content || "Type here...";
//     document.body.appendChild(tempSpan);
//     e.target.style.width = tempSpan.offsetWidth + 4 + "px";
//     document.body.removeChild(tempSpan);
//   }}
//   style={{
//     background: el.background,
//     color: el.textColor,
//     border: el.border
//       ? `2px solid ${el.borderColor || "#3E5973"}`
//       : "none",
//     borderRadius: "6px",
//     fontWeight: "bold",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     resize: "none",
//     overflow: "hidden",
//     padding: "0",
//     margin: "0",
//     minHeight: "1em",
//     width: "fit-content",
//     height: "auto",
//     whiteSpace: "pre-wrap",
//     wordBreak: "break-word",
//     outline: "none",
//   }}
//   className="text-center"
// >
//   {el.content || "Type here..."}
// </div>

//           ) : (
//             <img
//               src={el.url}
//               alt="img"
//               className="w-full h-full object-contain"
//             />
//           )}
//         </Rnd>
//       ))}

//       {/* Context Menu */}
//       {contextMenu.visible && (
//         <div
//           className="context-menu absolute bg-white border shadow-md rounded text-sm z-[9999]"
//           style={{ top: contextMenu.y, left: contextMenu.x }}
//         >
//           <button
//             onClick={() => changeZIndex(contextMenu.targetId, "front")}
//             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//           >
//             Bring to Front
//           </button>
//           <button
//             onClick={() => changeZIndex(contextMenu.targetId, "back")}
//             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//           >
//             Send to Back
//           </button>
//           {elements.find((e) => e.id === contextMenu.targetId)?.type === "text" && (
//             <>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, {
//                     background: "transparent",
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Remove Background
//               </button>

//               {elements.find((e) => e.id === contextMenu.targetId)?.border && (
//                 <button
//                   onClick={() =>
//                     setColorPicker({
//                       visible: true,
//                       type: "border",
//                       targetId: contextMenu.targetId,
//                     })
//                   }
//                   className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//                 >
//                   Change Border Color
//                 </button>
//               )}
//             </>
//           )}

//           {elements.find((e) => e.id === contextMenu.targetId)?.type === "text" && (
//             <>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, {
//                     background: "#ffffff",
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Background
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "bg",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Background Color
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "text",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Text Color
//               </button>
//               <button
//                 onClick={() =>
//                   setMarginControl({
//                     visible: true,
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Margin
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { border: true })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Border
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { border: false })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Remove Border
//               </button>
//             </>
//           )}
//           <button
//             onClick={() => handleDelete(contextMenu.targetId)}
//             className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-500"
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       {/* Color Picker */}
//       {colorPicker.visible && (
//         <div className="color-picker absolute z-[10000] top-[50px] left-[50px] bg-white p-2 shadow-lg rounded">
//           <SketchPicker
//             color={
//               colorPicker.type === "bg"
//                 ? elements.find((e) => e.id === colorPicker.targetId)?.background || "#ffffff"
//                 : colorPicker.type === "text"
//                 ? elements.find((e) => e.id === colorPicker.targetId)?.textColor || "#3E5973"
//                 : elements.find((e) => e.id === colorPicker.targetId)?.borderColor || "#3E5973"
//             }
//             onChangeComplete={(color) => {
//               updateElement(colorPicker.targetId, {
//                 [colorPicker.type === "bg"
//                   ? "background"
//                   : colorPicker.type === "text"
//                   ? "textColor"
//                   : "borderColor"]: color.hex,
//               });
//             }}
//           />
//           <button
//             onClick={() => setColorPicker({ ...colorPicker, visible: false })}
//             className="mt-2 bg-[#3E5973] text-white px-3 py-1 rounded"
//           >
//             Done
//           </button>
//         </div>
//       )}

//       {/* Margin Controls */}
//       {marginControl.visible && (
//         <div className="margin-control absolute z-[10000] top-[50px] left-[200px] bg-white p-2 shadow-md rounded flex gap-2 items-center">
//           <button
//             onClick={() => {
//               const el = elements.find((e) => e.id === marginControl.targetId);
//               if (el)
//                 updateElement(el.id, { margin: Math.max(0, el.margin - 2) });
//             }}
//             className="px-2 py-1 bg-gray-200 rounded"
//           >
//             -
//           </button>
//           <span className="text-sm font-medium">
//             {elements.find((e) => e.id === marginControl.targetId)?.margin}px
//           </span>
//           <button
//             onClick={() => {
//               const el = elements.find((e) => e.id === marginControl.targetId);
//               if (el) updateElement(el.id, { margin: el.margin + 2 });
//             }}
//             className="px-2 py-1 bg-gray-200 rounded"
//           >
//             +
//           </button>
//           <button
//             onClick={() =>
//               setMarginControl({ ...marginControl, visible: false })
//             }
//             className="ml-2 px-2 py-1 bg-[#3E5973] text-white rounded"
//           >
//             ✓
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VisionBoardCanvas;

// import React, { useState, useRef, useEffect } from "react";
// import { FiPlus } from "react-icons/fi";
// import { Rnd } from "react-rnd";

// export const VisionBoardCanvas = ({ elements = [], onRemove, setElements, previewMode = false }) => {
//   const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, targetId: null });
//   const contextRef = useRef();

//   const handleRightClick = (e, id) => {
//     e.preventDefault();
//     setContextMenu({ visible: true, x: e.clientX, y: e.clientY, targetId: id });
//   };

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (contextRef.current && !contextRef.current.contains(e.target)) {
//         setContextMenu({ ...contextMenu, visible: false });
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [contextMenu]);

//   const changeZIndex = (id, direction) => {
//     setElements((prev) => {
//       let sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
//       const targetIndex = sorted.findIndex((el) => el.id === id);
//       if (targetIndex === -1) return prev;

//       const [target] = sorted.splice(targetIndex, 1);
//       if (direction === "front") sorted.push(target);
//       else sorted.unshift(target);

//       return sorted.map((el, index) => ({ ...el, zIndex: index + 1 }));
//     });
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   return (
//     <div className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden">
//       {elements.length === 0 && (
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <FiPlus className="text-6xl text-[#3E5973] opacity-20" />
//         </div>
//       )}

//       {elements.map((el, index) => (
//         <Rnd
//           key={el.id}
//           default={{
//             x: 100 + index * 10,
//             y: 100 + index * 10,
//             width: el.width || 200,
//             height: el.height || 100,
//           }}
//           style={{ zIndex: el.zIndex || index }}
//           bounds="parent"
//           disableDragging={previewMode}
//           enableResizing={!previewMode}
//           className="group"
//           onContextMenu={(e) => handleRightClick(e, el.id)}
//         >
//           {el.type === "text" ? (
//             <DynamicTextBox
//               content={el.content}
//               onRemove={() => onRemove(el.id)}
//               previewMode={previewMode}
//             />
//           ) : (
//             <div className="relative w-full h-full">
//               <img
//                 src={el.url}
//                 alt="vision-img"
//                 className="w-full h-full object-fill rounded-md"
//               />
//               {!previewMode && (
//                 <button
//                   onClick={() => onRemove(el.id)}
//                   className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center z-10"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           )}
//         </Rnd>
//       ))}

//       {contextMenu.visible && (
//         <div
//           ref={contextRef}
//           className="absolute z-[999] bg-white border shadow-md rounded-md text-sm"
//           style={{ top: contextMenu.y, left: contextMenu.x }}
//         >
//           <button
//             className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
//             onClick={() => changeZIndex(contextMenu.targetId, "front")}
//           >
//             Bring to Front
//           </button>
//           <button
//             className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
//             onClick={() => changeZIndex(contextMenu.targetId, "back")}
//           >
//             Send to Back
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const DynamicTextBox = ({ content, onRemove, previewMode }) => {
//   const containerRef = useRef();
//   const [fontSize, setFontSize] = useState(16);

//   useEffect(() => {
//     const resizeFont = () => {
//       if (!containerRef.current) return;
//       const { width, height } = containerRef.current.getBoundingClientRect();
//       const scale = Math.min(width / 10, height / 2); // adjust ratio if needed
//       setFontSize(scale);
//     };

//     resizeFont();
//     const observer = new ResizeObserver(resizeFont);
//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full h-full bg-white rounded-md border border-[#3E5973] flex items-center justify-center text-center"
//     >
//       <div
//         className="text-[#3E5973] font-bold break-words px-2"
//         style={{ fontSize: `${fontSize}px`, lineHeight: 1.2 }}
//       >
//         {content}
//       </div>
//       {!previewMode && (
//         <button
//           onClick={onRemove}
//           className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center z-10"
//         >
//           ×
//         </button>
//       )}
//     </div>
//   );
// };

// export default VisionBoardCanvas;

// import React, { useState, useRef, useEffect } from "react";
// import { Rnd } from "react-rnd";
// import { SketchPicker } from "react-color";
// import { v4 as uuidv4 } from "uuid";

// export const VisionBoardCanvas = ({
//   elements,
//   setElements,
//   onRemove,
//   addingText,
//   setAddingText,
// }) => {
//   const canvasRef = useRef(null);
//   const [contextMenu, setContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     targetId: null,
//   });
//   const [colorPicker, setColorPicker] = useState({
//     visible: false,
//     type: "",
//     targetId: null,
//   });
//   const [marginControl, setMarginControl] = useState({
//     visible: false,
//     targetId: null,
//   });

//   useEffect(() => {

//      const handleLeftClick = (e) => {
//     const contextEl = document.querySelector(".context-menu");
//     const colorPickerEl = document.querySelector(".color-picker");
//     const marginEl = document.querySelector(".margin-control");

//     const isClickInside =
//       contextEl?.contains(e.target) ||
//       colorPickerEl?.contains(e.target) ||
//       marginEl?.contains(e.target);

//     if (!isClickInside) {
//       setContextMenu({ ...contextMenu, visible: false });
//       setColorPicker({ ...colorPicker, visible: false });
//       setMarginControl({ ...marginControl, visible: false });
//     }
//   };

//   document.addEventListener("mousedown", handleLeftClick);
//   return () => document.removeEventListener("mousedown", handleLeftClick);
// }, [contextMenu, colorPicker, marginControl]);

//   const handleCanvasClick = (e) => {
//     if (!addingText) return;
//     const rect = canvasRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const newElement = {
//       id: uuidv4(),
//       type: "text",
//       content: "",
//       x,
//       y,
//       width: 150,
//       height: 50,
//       zIndex: elements.length + 1,
//       background: "transparent",
//       textColor: "#3E5973",
//       margin: 4,
//       border: false,
//     };

//     setElements([...elements, newElement]);
//     setAddingText(false);
//   };

//   const updateElement = (id, updates) => {
//     setElements((prev) =>
//       prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
//     );
//   };

//   const changeZIndex = (id, direction) => {
//     setElements((prev) => {
//       let sorted = [...prev].sort((a, b) => a.zIndex - b.zIndex);
//       const idx = sorted.findIndex((el) => el.id === id);
//       if (idx === -1) return prev;
//       const [target] = sorted.splice(idx, 1);
//       direction === "front" ? sorted.push(target) : sorted.unshift(target);
//       return sorted.map((el, i) => ({ ...el, zIndex: i + 1 }));
//     });
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   const handleDelete = (id) => {
//     setElements((prev) => prev.filter((el) => el.id !== id));
//     setContextMenu({ ...contextMenu, visible: false });
//   };

//   return (
//     <div
//       ref={canvasRef}
//       onClick={handleCanvasClick}
//       className="relative w-full max-w-[1440px] h-[83vh] md:h-[700px] lg:h-[800px] xl:h-[900px] border border-[#aacbe1] rounded-md bg-[#DCEEFF] p-4 overflow-hidden"
//     >
//       {(elements || []).map((el, idx) => (
//         <Rnd
//           key={el.id}
//           default={{ x: el.x, y: el.y, width: el.width, height: el.height }}
//           bounds="parent"
//           style={{ zIndex: el.zIndex }}
//           onContextMenu={(e) => {
//             e.preventDefault();
//             setContextMenu({
//               visible: true,
//               x: e.clientX,
//               y: e.clientY,
//               targetId: el.id,
//             });
//           }}
//           onResizeStop={(e, dir, ref, delta, pos) => {
//             updateElement(el.id, {
//               width: parseFloat(ref.style.width),
//               height: parseFloat(ref.style.height),
//               x: pos.x,
//               y: pos.y,
//             });
//           }}
//           onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
//         >
//           {el.type === "text" ? (
//             <textarea
//   value={el.content}
//   onChange={(e) => {
//     updateElement(el.id, { content: e.target.value });
//     const textarea = e.target;
//     textarea.style.height = "auto";
//     textarea.style.height = textarea.scrollHeight + "px";
//   }}
//   style={{
//     background: el.background,
//     color: el.textColor,
//     padding: "0", // no margin needed for centering
//     width: "100%",
//     resize: "none",
//     border: el.border ? `2px solid ${el.borderColor || "#3E5973"}` : "none",
//     borderRadius: "6px",
//     fontWeight: "bold",
//     textAlign: "center",         // horizontal
//     overflow: "hidden",          // no scrollbars
//     height: "auto",
//     minHeight: "40px",
//     lineHeight: "40px",          // 🔥 vertical alignment trick
//     display: "block",
//   }}
//   className="w-full h-full text-center"
//   placeholder="Type here..."
// />

//           ) : (
//             <img
//               src={el.url}
//               alt="img"
//               className="w-full h-full object-contain"
//             />
//           )}
//         </Rnd>
//       ))}

//       {/* Context Menu */}
//       {contextMenu.visible && (
//         <div
//           className="absolute bg-white border shadow-md rounded text-sm z-[9999]"
//           style={{ top: contextMenu.y, left: contextMenu.x }}
//         >
//           <button
//             onClick={() => changeZIndex(contextMenu.targetId, "front")}
//             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//           >
//             Bring to Front
//           </button>
//           <button
//             onClick={() => changeZIndex(contextMenu.targetId, "back")}
//             className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//           >
//             Send to Back
//           </button>
//           {elements.find((e) => e.id === contextMenu.targetId)?.type === "text" && (
//   <>
//     {/* Existing options... */}
//     <button
//       onClick={() =>
//         updateElement(contextMenu.targetId, { background: "transparent" })
//       }
//       className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       Remove Background
//     </button>

//     {elements.find((e) => e.id === contextMenu.targetId)?.border && (
//       <button
//         onClick={() =>
//           setColorPicker({
//             visible: true,
//             type: "border",
//             targetId: contextMenu.targetId,
//           })
//         }
//         className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//       >
//         Change Border Color
//       </button>
//     )}
//   </>
// )}

//           {elements.find((e) => e.id === contextMenu.targetId)?.type ===
//             "text" && (
//             <>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { background: "#ffffff" })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Background
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "bg",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Background Color
//               </button>
//               <button
//                 onClick={() =>
//                   setColorPicker({
//                     visible: true,
//                     type: "text",
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Change Text Color
//               </button>
//               <button
//                 onClick={() =>
//                   setMarginControl({
//                     visible: true,
//                     targetId: contextMenu.targetId,
//                   })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Margin
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { border: true })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Add Border
//               </button>
//               <button
//                 onClick={() =>
//                   updateElement(contextMenu.targetId, { border: false })
//                 }
//                 className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
//               >
//                 Remove Border
//               </button>
//             </>
//           )}
//           <button
//             onClick={() => handleDelete(contextMenu.targetId)}
//             className="block px-4 py-2 hover:bg-red-100 w-full text-left text-red-500"
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       {/* Color Picker */}
//       {colorPicker.visible && (
//         <div className="absolute z-[10000] top-[50px] left-[50px] bg-white p-2 shadow-lg rounded">
//           <SketchPicker
//             color={
//               colorPicker.type === "bg"
//   ? elements.find((e) => e.id === colorPicker.targetId)?.background || "#ffffff"
//   : colorPicker.type === "text"
//   ? elements.find((e) => e.id === colorPicker.targetId)?.textColor || "#3E5973"
//   : elements.find((e) => e.id === colorPicker.targetId)?.borderColor || "#3E5973"

//             }
//             onChangeComplete={(color) => {
//               updateElement(colorPicker.targetId, {
//   [colorPicker.type === "bg"
//     ? "background"
//     : colorPicker.type === "text"
//     ? "textColor"
//     : "borderColor"]: color.hex,
// });

//             }}
//           />
//           <button
//             onClick={() => setColorPicker({ ...colorPicker, visible: false })}
//             className="mt-2 bg-[#3E5973] text-white px-3 py-1 rounded"
//           >
//             Done
//           </button>
//         </div>
//       )}

//       {/* Margin Controls */}
//       {marginControl.visible && (
//         <div className="absolute z-[10000] top-[50px] left-[200px] bg-white p-2 shadow-md rounded flex gap-2 items-center">
//           <button
//             onClick={() => {
//               const el = elements.find((e) => e.id === marginControl.targetId);
//               if (el)
//                 updateElement(el.id, { margin: Math.max(0, el.margin - 2) });
//             }}
//             className="px-2 py-1 bg-gray-200 rounded"
//           >
//             -
//           </button>
//           <span className="text-sm font-medium">
//             {elements.find((e) => e.id === marginControl.targetId)?.margin}px
//           </span>
//           <button
//             onClick={() => {
//               const el = elements.find((e) => e.id === marginControl.targetId);
//               if (el) updateElement(el.id, { margin: el.margin + 2 });
//             }}
//             className="px-2 py-1 bg-gray-200 rounded"
//           >
//             +
//           </button>
//           <button
//             onClick={() =>
//               setMarginControl({ ...marginControl, visible: false })
//             }
//             className="ml-2 px-2 py-1 bg-[#3E5973] text-white rounded"
//           >
//             ✓
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VisionBoardCanvas;
