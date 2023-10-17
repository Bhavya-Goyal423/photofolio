import "./ImageList.css";
import ImageGallery from "react-image-gallery";

export default function ImageList({ allImages, selectedAlbum }) {
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];

  const images = [];

  allImages.forEach((el, idx) => {
    const newEntry = { original: el, thumbnail: "" };
    images.push(newEntry);
    if (idx % 3 === 0) {
      arr1.push(el);
    } else if (idx % 3 === 1) {
      arr2.push(el);
    } else arr3.push(el);
  });

  const handleimg = (e) => {
    const src = e.target.src;
    const index = allImages.indexOf(src);
  };

  console.log(images);

  return (
    <div className="main-grid">
      <ImageGallery items={images} />;
      <div className="grid-1">
        {arr1.map((el, idx) => (
          <img
            key={el}
            className="img"
            src={el}
            alt=""
            onClick={(e) => handleimg(e)}
          />
        ))}
      </div>
      <div className="grid-2">
        {arr2.map((el, idx) => (
          <img
            key={el}
            className="img"
            src={el}
            alt=""
            onClick={(e) => handleimg(e)}
          />
        ))}
      </div>
      <div className="grid-3">
        {arr3.map((el, idx) => (
          <img
            key={el}
            className="img"
            src={el}
            alt=""
            onClick={(e) => handleimg(e)}
          />
        ))}
      </div>
    </div>
  );
}
