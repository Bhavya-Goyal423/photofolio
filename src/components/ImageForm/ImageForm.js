import "./ImagesForm.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useRef, useEffect } from "react";
import ImageList from "../ImagesList/ImageList";
import { db } from "../../config/firebaseInit";
import { doc, setDoc } from "firebase/firestore";

export default function ImageForm({ selectedAlbum, handleBacK, allAlbums }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const textAreaRef = useRef();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const addPhoto = () => {
    setIsModalOpen(true);
  };

  const addPhotoToDB = async () => {
    const src = textAreaRef.current.value;
    await setDoc(doc(db, "albums", selectedAlbum), {
      images: [...allImages, src],
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    allAlbums.forEach((el) => {
      if (el.id === selectedAlbum) {
        setAllImages(el.images);
      }
    });
  }, [allAlbums, selectedAlbum]);

  const style = {
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div className="album-cta">
        <Button
          variant="contained"
          onClick={handleBacK}
          style={{ fontSize: "1.4rem" }}
        >
          Go Back
        </Button>
        <h3 className="count">{allImages.length} Photos</h3>
        <Button
          style={{ fontSize: "1.4rem" }}
          variant="contained"
          onClick={addPhoto}
        >
          Add Photo
        </Button>
      </div>
      <Modal
        className="album-modal"
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="album-box" sx={style}>
          <input
            className="album-input"
            placeholder="image Address"
            ref={textAreaRef}
          />

          <Button
            style={{ fontSize: "1.4rem" }}
            variant="contained"
            className="btn btn-add"
            onClick={addPhotoToDB}
          >
            Add Photo
          </Button>
        </Box>
      </Modal>
      <ImageList allImages={allImages} selectedAlbum={selectedAlbum} />
    </div>
  );
}
