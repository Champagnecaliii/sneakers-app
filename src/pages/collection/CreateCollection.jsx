import React, { useEffect, useState, useContext } from "react";
import { imgDB, db } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModeContext, UserContext } from "../../context";
import MyCollection from "./MyCollection";
import { onSnapshot } from "firebase/firestore";

const CreateCollection = () => {
  const [sneakersName, setSneakersName] = useState("");
  const [img, setImg] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const { userUID, username } = useContext(UserContext);
  const { isDarkModeOn } = useContext(ModeContext);

  const handleDelete = async (itemId) => {
    try {
      const itemRef = doc(db, "sneakers", itemId);
      await deleteDoc(itemRef);
      alert("Item deleted");
      getSneakers();
    } catch (error) {
      console.log("Something went wrong...");
      console.log(error.message);
    }
  };

  const handleUpload = (e) => {
    setUploadingImg(true);
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      const imgs = ref(imgDB, `Imgs/${v4()}`);
      uploadBytes(imgs, file).then((data) => {
        getDownloadURL(data.ref).then((val) => {
          setImg(val);
          setUploadingImg(false);
        });
      });
    }
  };

  const handleClick = async () => {
    const valRef = collection(db, "sneakers");
    await addDoc(valRef, {
      sneakersVal: sneakersName,
      imgURL: img,
      brand,
      color,
      releaseDate,
      ownerId: userUID,
      owner: username,
    });
    alert("collection added");
  };

  const getSneakers = () => {
    try {
      setLoading(true);
      const valRef = collection(db, "sneakers");
      const unsubscribe = onSnapshot(valRef, (snapshot) => {
        const updatedData = snapshot.docs
          .map((val) => ({ ...val.data(), id: val.id }))
          .filter((item) => item.ownerId === userUID);
        setData(updatedData);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log("Something went wrong...");
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = getSneakers();

    return () => unsubscribe();
  }, []);

  return (
    <div className={`container ${isDarkModeOn ? "dark-mode" : ""}`}>
      <h2 className={`mt-4 ${isDarkModeOn ? "text-white" : ""}`}>
        Create your own collection
      </h2>
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label
                htmlFor="sneakersName"
                className={`form-label ${isDarkModeOn ? "text-white" : ""}`}
              >
                Sneakers Name
              </label>
              <input
                type="text"
                className="form-control"
                id="sneakersName"
                placeholder="Enter sneakers name"
                onChange={(e) => setSneakersName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="brand"
                className={`form-label ${isDarkModeOn ? "text-white" : ""}`}
              >
                Brand
              </label>
              <input
                type="text"
                className="form-control"
                id="brand"
                placeholder="Enter sneakers brand"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="color"
                className={`form-label ${isDarkModeOn ? "text-white" : ""}`}
              >
                Color
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                placeholder="Enter sneakers color"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="releaseDate"
                className={`form-label ${isDarkModeOn ? "text-white" : ""}`}
              >
                Release Date
              </label>
              <input
                type="text"
                className="form-control"
                id="releaseDate"
                placeholder="Enter sneakers release date"
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {uploadingImg ? (
                <p>Uploading...</p>
              ) : (
                <>
                  <label
                    htmlFor="img"
                    className={`form-label ${isDarkModeOn ? "text-white" : ""}`}
                  >
                    Sneakers Image
                  </label>
                  <input
                    required
                    type="file"
                    className="form-control"
                    id="img"
                    onChange={(e) => handleUpload(e)}
                  />
                  {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                </>
              )}
            </div>
            <button
              disabled={uploadingImg}
              type="button"
              className={`btn btn-primary ${isDarkModeOn ? "btn-dark" : ""}`}
              onClick={handleClick}
            >
              Add Collection
            </button>
          </form>
        </div>
      </div>
      <MyCollection data={data} loading={loading} onDelete={handleDelete} />
    </div>
  );
};

export default CreateCollection;
