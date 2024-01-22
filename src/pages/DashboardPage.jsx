import React, { useState, useEffect } from 'react'
import { db, } from '../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const DashboardPage = ({isUserAuthenticated}) => {
const [data, setData] = useState([]);
const [comments, setComments] = useState({});
const [likes, setLikes] = useState({});
const [searchQuery, setSearchQuery] = useState('');


const handleComment = async (sneakerId, comment) => {
    const valRef = doc(db, 'sneakers', sneakerId);
    await updateDoc(valRef, { comments: [...comments[sneakerId], comment] });
    setComments((prevComments) => ({ ...prevComments, [sneakerId]: [...prevComments[sneakerId], comment] }));
};

const handleLike = async (sneakerId) => {
    const valRef = doc(db, 'sneakers', sneakerId);
    await updateDoc(valRef, { likes: likes[sneakerId] + 1 });
    setLikes((prevLikes) => ({ ...prevLikes, [sneakerId]: prevLikes[sneakerId] + 1 }));
};


const getSneakers = async () => {
    const valRef = collection(db, 'sneakers')
    const dataDb = await getDocs(valRef)
    const allData = dataDb.docs.map(val => ({...val.data(), id:val.id}))
    setData(allData)
    const commentsObj = {};
    const likesObj = {};
    allData.forEach((sneaker) => {  
        commentsObj[sneaker.id] = sneaker.comments || [];
        likesObj[sneaker.id] = sneaker.likes || 0; 
    });
    setComments(commentsObj);
    setLikes(likesObj);
}

useEffect(() => {
    getSneakers()
},[])

const filteredData = data.filter(
    (item) =>
      item.sneakersVal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
    <h2 className="mt-4">Sneakers collection</h2>
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
                    <img src={value.imgURL} className="card-img-top" alt={value.sneakersVal} />
                    <div className="card-body">
                        <h5 className="card-title">{value.sneakersVal}</h5>
                        <p className="card-text">{value.color}</p>
                        <p className="card-text">{value.brand}</p>
                        <p className="card-text">{value.releaseDate}</p>
                        <div className="mt-3">
                                    <p>Comments:</p>
                                    <ul>
                                        {comments[value.id] &&
                                            comments[value.id].map((comment, index) => (
                                                <li key={index}>{comment}</li>
                                            ))}
                                    </ul>
                                    <input
                                        type="text"
                                        placeholder="Add a comment"
                                        onChange={(e) => setComments((prevComments) => ({ ...prevComments, [value.id]: [...prevComments[value.id], e.target.value] }))}
                                        disabled={!isUserAuthenticated}
                                    />
                                    <button
                                        className="btn btn-secondary btn-sm ml-2"
                                        onClick={() => handleComment(value.id, comments[value.id][comments[value.id].length - 1])}
                                        disabled={!isUserAuthenticated}
                                    >
                                        Add Comment
                                    </button>
                                </div>

                                <div className="mt-3">
                                    <p>Likes: {likes[value.id]}</p>
                                    <button className="btn btn-info btn-sm" onClick={() => handleLike(value.id)} disabled={!isUserAuthenticated}>
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

export default DashboardPage