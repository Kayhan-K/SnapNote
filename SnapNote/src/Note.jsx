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
    transition: isExpanded ? "transition duration-700 z-20 " : "",
    top: isExpanded ? `${centerLocation.y}px` : "",
    left: isExpanded ? `${centerLocation.x}px` : "",
    overflow: isExpanded ? "overflow-auto" : "overflow-hidden",
  };

  return (
    <div
      className={`bg-white rounded-2xl px-6 py-6 hover:shadow-inner shadow-xl cursor-pointer mx-6 transition-all relative text-clip text-justify z-10  ${expandedStyles.width} ${expandedStyles.height} ${expandedStyles.transition} ${expandedStyles.position} ${expandedStyles.overflow}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={expandNote}
      style={{
        position: isExpanded ? "fixed" : "",
        top: `${expandedStyles.top}`,
        left: `${expandedStyles.left}`,
        transform: isExpanded ? "translate(-50%, -50%)" : "",
      }}
    >
      {!isExpanded && hover && (
        <div className="relative flex justify-center items-center z-20">
          <Trash
            onClick={(e) => {
              e.stopPropagation(); //Prevent click event to transfer to parent divs onClick function.
              onDelete();
            }}
            className="text-black text-2xl absolute right-0 top-1  z-20"
          />
        </div>
      )}

      {note.text}
    </div>
  );
}
