import "./ImageList.css";

export default function ImageList({ allImages, selectedAlbum }) {
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];

  allImages.forEach((el, idx) => {
    if (idx % 3 === 0) {
      arr1.push(el);
    } else if (idx % 3 === 1) {
      arr2.push(el);
    } else arr3.push(el);
  });

  return (
    <div className="main-grid">
      <div className="grid-1">
        {arr1.map((el) => (
          <img className="img" src={el} alt="" />
        ))}
      </div>
      <div className="grid-2">
        {arr2.map((el) => (
          <img className="img" src={el} alt="" />
        ))}
      </div>
      <div className="grid-3">
        {arr3.map((el) => (
          <img className="img" src={el} alt="" />
        ))}
      </div>
    </div>
  );
}
