import "./AlbumList.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { config } from "../../config/toasterConfig";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";

export default function AlbumsList({
  allAlbums,
  doc,
  deleteDoc,
  db,
  getDoc,
  setDoc,
  selectAlbum,
}) {
  return (
    <div className="margin-top-90px grid grid--col-5">
      {allAlbums.map((data) => (
        <Album
          data={data}
          key={data.id}
          doc={doc}
          deleteDoc={deleteDoc}
          db={db}
          allAlbums={allAlbums}
          getDoc={getDoc}
          setDoc={setDoc}
          selectAlbum={selectAlbum}
        />
      ))}
    </div>
  );
}

function Album({
  data,
  doc,
  deleteDoc,
  db,
  getDoc,
  allAlbums,
  setDoc,
  selectAlbum,
}) {
  const [isOptionsClicked, setIsOptionsClicked] = useState(false);
  const [edit, setEdit] = useState(false);
  const nameTextRef = useRef();

  const style = {
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setEdit(false);
  };

  const handleDelete = async (name) => {
    await deleteDoc(doc(db, "albums", name));
    toast.success("Album Deleted");
  };

  const handleEdit = (name) => {
    setTimeout(() => {
      nameTextRef.current.value = name;
    }, 0);
    localStorage.setItem("name", name);
    setEdit(true);
  };

  const updateDoc = async () => {
    const newName = nameTextRef.current.value;
    const check = allAlbums.some((el) => el.id === newName);

    if (check) {
      return toast.error("Album with this name already present", config);
    }

    const docRef = doc(db, "albums", localStorage.getItem("name"));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await deleteDoc(doc(db, "albums", localStorage.getItem("name")));
      const ref = doc(db, "albums", newName);
      setDoc(ref, docSnap.data());
      toast.success("Album Edited", config);
    }
  };

  return (
    <div className="album">
      <div className="helper">
        <div className="stack stack-1"></div>
        <div className="stack stack-2"></div>
        <div className="album-img-box" onClick={() => selectAlbum(data.id)}>
          <div className="scale-helper">
            <img
              className={`${data.count < 1 ? "no-image" : ""} album-img`}
              src={data.count < 1 ? "/default.jpg" : data.images.at(-1)}
              alt={`${data.id}`}
            />
          </div>
        </div>
        <div className="cta-edit-delete-album">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="options"
            onClick={() => {
              setIsOptionsClicked((value) => !value);
            }}
          >
            <path
              fill="currentColor"
              d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0zm0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0z"
            ></path>
          </svg>
          {isOptionsClicked && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="edit-icon"
                onClick={() => handleEdit(data.id)}
              >
                <path
                  fill="currentColor"
                  d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="delete-icon"
                onClick={() => {
                  handleDelete(data.id);
                }}
              >
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"
                ></path>
              </svg>
            </>
          )}
        </div>

        <div className="album-label">
          <p className="album-name">{data.id}</p>
          <p className="photos-count">
            {data.count < 2 ? `${data.count} photo` : `${data.count} photos`}
          </p>
        </div>
      </div>
      <Modal
        className="album-modal"
        open={edit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="album-box" sx={style}>
          <input
            className="album-input"
            placeholder="Album Name"
            style={{ color: "black" }}
            ref={nameTextRef}
          />

          <Button
            style={{ fontSize: "1.4rem" }}
            variant="contained"
            className="btn btn-add"
            onClick={updateDoc}
          >
            Edit Album
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
