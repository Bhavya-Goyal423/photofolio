import "./AlbumForm.css";
// Material UI Imports
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// React Imports
import { useState, useRef } from "react";
// React Toaster
import { ToastContainer, toast } from "react-toastify";
import { config } from "../../config/toasterConfig";
import "react-toastify/dist/ReactToastify.css";

// Style for Modal Box
const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AlbumForm({ db, setDoc, doc, allAlbums }) {
  // State to handle Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textAreaRef = useRef();
  const allAlbumNames = allAlbums.map((item) => item.id);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const addAlbum = async () => {
    const albumName = textAreaRef.current.value.toLowerCase();
    if (!albumName) {
      toast.error("Album name cannot be empty", config);
      return;
    }

    if (allAlbumNames.includes(albumName)) {
      toast.error("Album with this name already exist", config);
      return;
    }
    try {
      const albumRef = doc(db, "albums", albumName);
      setDoc(albumRef, { images: [] });
      toast.success("Album created successfully", config);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
    handleClose();
  };

  return (
    <div className="album-form">
      <div className="album-cta">
        <p className="album-form-heading">Your Albums</p>
        <Button
          style={{ fontSize: "1.4rem" }}
          variant="contained"
          onClick={handleOpen}
        >
          New Album
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
            placeholder="Album Name"
            ref={textAreaRef}
          />

          <Button
            style={{ fontSize: "1.4rem" }}
            variant="contained"
            className="btn btn-add"
            onClick={addAlbum}
          >
            Add Album
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
