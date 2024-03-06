export default function Overlay({ closeOverlay }) {
  return (
    <div
      onClick={closeOverlay}
      className="w-full h-full bg-black z-10 fixed opacity-75"
    ></div>
  );
}
