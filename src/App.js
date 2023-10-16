import "./App.css";
import AlbumForm from "./components/AlbumForm/AlbumForm";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { db } from "./config/firebaseInit";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import AlbumsList from "./components/AlbumsList/AlbumsList";

function App() {
  const [allAlbums, setAllAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      onSnapshot(collection(db, "albums"), (snapshot) => {
        const albumNames = snapshot.docs.map((doc) => ({
          id: doc.id,
          count: doc.data().images.length,
          images: doc.data().images,
        }));
        setAllAlbums(albumNames);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="wrapper">
      <AlbumForm db={db} doc={doc} setDoc={setDoc} allAlbums={allAlbums} />
      {loading && (
        <Box sx={{ display: "flex", alignSelf: "center" }}>
          <CircularProgress />
        </Box>
      )}
      <AlbumsList
        allAlbums={allAlbums}
        doc={doc}
        deleteDoc={deleteDoc}
        db={db}
        getDoc={getDoc}
        setDoc={setDoc}
      />
    </div>
  );
}

export default App;
