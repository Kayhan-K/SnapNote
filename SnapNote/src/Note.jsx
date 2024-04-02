import { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import { X } from "react-bootstrap-icons";

export default function Note({
  noteItem,
  onDelete,
  isExpanded,
  expandNote,
  setNote,
}) {
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
    width: isExpanded ? "w-96 max-custom_xsm:w-60" : "w-60",
    height: isExpanded ? "h-80 max-custom_xsm:h-56" : "h-56",
    transition: isExpanded ? "transition duration-700 z-20 mx-0" : "",
    top: isExpanded ? `${centerLocation.y}px` : "",
    left: isExpanded ? `${centerLocation.x}px ` : "",
    // overflow: isExpanded ? "overflow-auto" : "overflow-hidden",
  };

  return (
    <div
      className={`bg-white rounded-2xl px-6 py-7 hover:shadow-inner shadow-xl cursor-pointer transition-all relative text-clip text-justify z-10 overflow-hidden  ${expandedStyles.width} ${expandedStyles.height} ${expandedStyles.transition} ${expandedStyles.position} ${expandedStyles.overflow}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => !isExpanded && expandNote()} // only expand note if not expanded
      style={{
        position: isExpanded ? "fixed" : "",
        top: `${expandedStyles.top}`,
        left: `${expandedStyles.left}`,
        transform: isExpanded ? "translate(-50%, -50%)" : "",
      }}
    >
      {isExpanded && (
        <div className="relative flex justify-center items-center ">
          <X
            className="text-black text-2xl absolute right-0 -top-5 z-20"
            onClick={expandNote}
          />
        </div>
      )}
      {!isExpanded && hover && (
        <div className="relative flex justify-center items-center z-20">
          <Trash
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from transferring to parent divs onClick function (expanding).
              onDelete();
            }}
            className="text-black text-2xl absolute right-0 -top-5 z-20 select-none"
          />
        </div>
      )}
      {isExpanded ? (
        <textarea
          className="w-full h-full resize-none rounded-md p-2 focus:outline-none"
          value={noteItem.text}
          onChange={(e) => {
            const newNoteText = e.target.value;

            setNote((prevNote) =>
              prevNote.map((item) =>
                item.id === noteItem.id ? { ...item, text: newNoteText } : item
              )
            );

            /*
        Changing the value of the note text, we are updating the state passed down from the parent.
        Mapping all previous notes and updating the matching one.
      */
          }}
        />
      ) : noteItem.text !== "" ? (
        noteItem.text
      ) : (
        <p className="text-lg text-slate-500 w-full h-full justify-center flex items-center">
          Empty Note
        </p>
      )}
    </div>
  );
}
