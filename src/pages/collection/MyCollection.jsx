import React from "react";

const MyCollection = ({ data, loading, onDelete }) => {
  return (
    <div className="row mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        data.map((value) => (
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
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(value.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>There are no created collections here</p>
      )}
    </div>
  );
};

export default MyCollection;