import { useState } from "react";
import { Trash } from "react-bootstrap-icons";

export default function Note({ note, onDelete, isExpanded, expandNote }) {
  const [hover, setHover] = useState(false);

  function calculateCenter() {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  }

  const centerLocation = calculateCenter();

  console.log(centerLocation.x, centerLocation.y);
  const expandedStyles = {
    width: isExpanded ? "w-96" : "w-60",
    height: isExpanded ? "h-80" : "h-56",
    transition: isExpanded ? "transition duration-700 z-20" : "",
    top: isExpanded ? `${centerLocation.y}px` : "",
    left: isExpanded ? `${centerLocation.x}px` : "",
  };

  return (
    <div
      className={`bg-white rounded-2xl px-6 py-6 hover:shadow-inner shadow-xl cursor-pointer mx-6 transition-all relative overflow-hidden text-clip text-justify  ${expandedStyles.width} ${expandedStyles.height} ${expandedStyles.transition} ${expandedStyles.position}`}
      //onClick={onDelete}
      onClick={expandNote}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: isExpanded ? "fixed" : "",
        top: `${expandedStyles.top}`,
        left: `${expandedStyles.left}`,
        transform: isExpanded ? "translate(-50%, -50%)" : "",
      }}
    >
      {hover && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-black rounded-xl opacity-45 flex justify-center items-center ">
            <Trash className="text-white text-2xl " />
          </div>
        </div>
      )}

      {note.text}
    </div>
  );
}
