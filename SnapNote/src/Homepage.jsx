import { useState } from "react";
import Note from "./Note";
import Overlay from "./Overlay";

export default function Homepage() {
  const [noteInput, setNoteInput] = useState("");
  const [note, setNote] = useState([]);

  function displayNote() {
    if (noteInput !== "") {
      const noteItem = { id: Date.now(), text: noteInput };
      setNote([...note, noteItem]);
    }
    setNoteInput("");
  }

  //filter out current note and update state. Removing it...
  function deleteNote(noteItemID) {
    const updatedNote = note.filter((noteItem) => noteItem.id !== noteItemID);
    setNote(updatedNote);
  }

  const [expandedNote, isExpandedNote] = useState(null);
  const [fixedNote, setFixedNotes] = useState("");

  function onClickExpandNote(noteID) {
    if (noteID === expandedNote) {
      isExpandedNote(null);
      setFixedNotes("");
    } else {
      isExpandedNote(noteID);
      setFixedNotes("fixed");
    }
  }

  function onClickCloseOverlay() {
    isExpandedNote(null);
  }

  return (
    <div
      id="container"
      className="flex flex-col justify-center w-full h-screen bg-gray-200 m-0 "
    >
      <div
        id="input-section"
        className="flex justify-center items-center w-screen mt-10 "
      >
        <img className="absolute left-10 -top-10 h-55" src="/SnapNote.png" />

        <div className="relative lg:w-2/6 md:w-2/6">
          <input
            onChange={(event) => {
              setNoteInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                displayNote();
              }
            }}
            onPaste={(event) => {
              setNoteInput(event.target.value);
            }}
            value={noteInput}
            type="text"
            placeholder="Create note..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-xl hover:shadow-inner sm:text-sm px-4 outline-none focus:border-2 focus:border-green-600"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-700"
              onClick={displayNote}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          </span>
        </div>
      </div>

      <div
        id="note-section"
        className="flex grow justify-center items-start h-full w-screen overflow-y-auto	 "
      >
        <div
          id="note-container"
          className="flex justify-center items-start w-full flex-wrap gap-x-1 gap-y-6 my-14 "
        >
          {note.map((noteItem, index) => (
            <Note
              key={index}
              noteItem={noteItem}
              setNote={setNote}
              onDelete={() => deleteNote(noteItem.id)}
              expandNote={() => onClickExpandNote(index)}
              isExpanded={index === expandedNote}
              className={{ position: fixedNote }}
            />
          ))}
        </div>
      </div>
      {expandedNote !== null ? (
        <Overlay closeOverlay={onClickCloseOverlay} />
      ) : (
        ""
      )}
    </div>
  );
}
