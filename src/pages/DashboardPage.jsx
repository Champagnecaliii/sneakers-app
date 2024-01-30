import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { ModeContext, UserContext } from "../context";
import "../custom.css";

const DashboardPage = ({ isUserAuthenticated }) => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const { userUID } = useContext(UserContext);
  const { isDarkModeOn } = useContext(ModeContext);

  const handleComment = async (sneakerId, comment) => {
    try {
      const valRef = doc(db, "sneakers", sneakerId);
      const newComment = { userId: userUID, text: comment };

      await updateDoc(valRef, {
        comments: [...comments[sneakerId], newComment],
      });

      setComments((prevComments) => ({
        ...prevComments,
        [sneakerId]: [...prevComments[sneakerId], newComment],
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleLike = async (sneakerId) => {
    const valRef = doc(db, "sneakers", sneakerId);
    await updateDoc(valRef, { likes: likes[sneakerId] + 1 });
    setLikes((prevLikes) => ({
      ...prevLikes,
      [sneakerId]: prevLikes[sneakerId] + 1,
    }));
  };

  const getSneakers = async () => {
    const valRef = collection(db, "sneakers");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    const commentsObj = {};
    const likesObj = {};
    allData.forEach((sneaker) => {
      commentsObj[sneaker.id] = sneaker.comments || [];
      likesObj[sneaker.id] = sneaker.likes || 0;
    });
    setComments(commentsObj);
    setLikes(likesObj);
  };

  useEffect(() => {
    getSneakers();
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.sneakersVal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={`container ${isDarkModeOn ? "dark-mode" : "light-mode"}`}>
      <h2 className={`mt-4 ${isDarkModeOn ? "text-white" : ""}`}>
        Sneakers collection
      </h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, brand, or color"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row mt-4">
        {filteredData.map((value) => (
          <div key={value.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={value.imgURL}
                className="card-img-top img-fluid"
                alt={value.sneakersVal}
                style={{ height: "260px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{value.sneakersVal}</h5>
                <p className="card-text">{value.color}</p>
                <p className="card-text">{value.brand}</p>
                <p className="card-text">{value.releaseDate}</p>
                <p className="card-text">Owner: {value.owner?.name}</p>
                <div className="mt-3">
                  <p>Comments:</p>
                  <ul>
                    {comments[value.id] &&
                      comments[value.id].map((comment, index) => (
                        <li key={index}>{comment.text}</li>
                      ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    onChange={(e) => handleCommentChange(e)}
                    disabled={!isUserAuthenticated}
                  />

                  <button
                    className="btn btn-secondary btn-sm ml-2"
                    onClick={() => handleComment(value.id, comment)}
                    disabled={!isUserAuthenticated}
                  >
                    Add Comment
                  </button>
                </div>

                <div className="mt-3">
                  <p>Likes: {likes[value.id]}</p>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleLike(value.id)}
                    disabled={!isUserAuthenticated}
                  >
                    Like
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
