import "./ImageList.css";
import ImageGallery from "react-image-gallery";
import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { config } from "../../config/toasterConfig";

export default function ImageList({ allImages, handleDelete }) {
  const [selected, setSelected] = useState(null);
  const [crsl, setcrsl] = useState(false);
  const imageGalleryRef = useRef();

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
    toast.info("Press ESC to exit the carousel", config);
    const src = e.target.src;
    const index = allImages.indexOf(src);
    setcrsl(true);
    setSelected(index);
    setTimeout(() => {
      imageGalleryRef.current.toggleFullScreen();
    }, 0);
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setcrsl(false);
      setSelected(null);
    }
  });

  return (
    <>
      {crsl && (
        <div className="crsl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
            className="close-icon"
          >
            <path
              d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"
              fill="currentColor"
            />
          </svg>
          <ImageGallery
            items={images}
            startIndex={selected}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
            ref={imageGalleryRef}
            additionalClass="caro"
          />
        </div>
      )}
      <div className="main-grid">
        <div className="grid-1">
          {arr1.map((el) => (
            <div className="img-helper">
              <img
                key={el}
                className="img"
                src={el}
                alt=""
                onClick={(e) => handleimg(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="del-icon"
                id={el}
                onClick={(e) => handleDelete(e)}
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"
                  id={el}
                />
              </svg>
            </div>
          ))}
        </div>
        <div className="grid-2">
          {arr2.map((el) => (
            <div className="img-helper">
              <img
                key={el}
                className="img"
                src={el}
                alt=""
                onClick={(e) => handleimg(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="del-icon"
                id={el}
                onClick={(e) => handleDelete(e)}
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"
                  id={el}
                />
              </svg>
            </div>
          ))}
        </div>
        <div className="grid-3">
          {arr3.map((el) => (
            <div className="img-helper">
              <img
                key={el}
                className="img"
                src={el}
                alt=""
                onClick={(e) => handleimg(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="del-icon"
                id={el}
                onClick={(e) => handleDelete(e)}
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"
                  id={el}
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
