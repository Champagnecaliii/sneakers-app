import React, { useEffect, useState } from 'react'
import { imgDB, db } from '../firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateCollection = () => {
    const [sneakersName, setSneakersName] = useState('');
    const [img, setImg] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [uploadingImg, setUploadingImg] = useState(false)
    const [data, setData] = useState([]);
    

    const handleUpload = (e) => {
        setUploadingImg(true);

        console.log(e.target.files[0])
        const imgs = ref(imgDB, `Imgs/${v4()}`)
        uploadBytes(imgs, e.target.files[0]).then(data => {
            console.log(data, 'imgs')
            getDownloadURL(data.ref).then(val => {
                setImg(val)
                setUploadingImg(false)
            })
        })
    }

    const handleClick = async () =>{
        const valRef = collection(db, 'sneakers')
        await addDoc(valRef, {
            sneakersVal:sneakersName,
            imgURL: img,
            brand,
            color,
            releaseDate,
            ownerId: "user.id" }) // NOTE !!!
        alert("Data added")
    }


    const getSneakers = async () => {
        const valRef = collection(db, 'sneakers')
        const dataDb = await getDocs(valRef)
        const filteredData = dataDb.docs.map(val => ({...val.data(), id:val.id})).filter((item) => item.ownerId === "user.id")
        setData(filteredData)
        
    }

    useEffect(() => {
        getSneakers()
    }, [])

  
 
  return (
    <div className="container">
    <h2 className="mt-4">Create your own collection</h2>
    <div className="form-group">
        <form>
        <input type="text" className="form-control" placeholder="Enter sneakers name" onChange={(e) => setSneakersName(e.target.value)} />
        <input type="text" className="form-control" placeholder="Enter sneakers brand" onChange={(e) => setBrand(e.target.value)} />
        <input type="text" className="form-control" placeholder="Enter sneakers color" onChange={(e) => setColor(e.target.value)} />
        <input type="text" className="form-control" placeholder="Enter sneakers release date" onChange={(e) => setReleaseDate(e.target.value)} />

        {
            uploadingImg ? <p>Uploading...</p> : <input required type="file" className="form-control-file" onChange={(e) => handleUpload(e)} />
        }
        
        </form>
    </div>
    <div className="form-group">
    </div>
    <button disabled={uploadingImg} className="btn btn-primary" onClick={handleClick}>
        Add
    </button>

    <div className="row mt-4">
        {data.length > 0 ? data.map((value) => (
            <div key={value.id} className="col-md-4 mb-4">
                <div className="card">
                    <img src={value.imgURL} className="card-img-top" alt={value.sneakersName} />
                    <div className="card-body">
                        <h5 className="card-title">{value.sneakersName}</h5>
                        <p className="card-text">{value.color}</p>
                        <p className="card-text">{value.brand}</p>
                        <p className="card-text">{value.releaseDate}</p>
                    </div>
                </div>
            </div>
        )) : <p>There are no created collections here</p>
    }
    </div>
</div>
);
};

export default CreateCollection;