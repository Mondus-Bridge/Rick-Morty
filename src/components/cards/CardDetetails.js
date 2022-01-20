import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const CardDetetails = () => {
    let [fetchedData, updateFetchedData] = useState([]);
    let {name, image, origin, location, gender, species, status, type} = fetchedData;
    let {id} = useParams();
    let api = `https://rickandmortyapi.com/api/character/${id}`
    useEffect(()=>{
        (async function(){
          let data = await fetch(api).then((res)=>res.json());
          updateFetchedData(data)
        })();
      },[api])

    return (
        <div className="container d-flex justify-content-center">
            <div className="d-flex flex-column gap-3">
                <h1 className="text-center">
                    {name}
                </h1>
                <img src={image} alt="" className="img-fluid"/>

                {(()=>{
                    if(status === "Dead") {
                        return (
                            <div className="badge bg-danger fs-5">{status}</div>
                        )}
                    else if(status === "Alive") {
                        return (
                        <div className="badge bg-success fs-5">{status}</div>
                        )}
                    else {
                        return (
                        <div className="badge bg-secondary fs-5">{status}</div>
                        )}
                })()}

                <div className="content">
                    <div className="">
                    <div className=""><span className="fw-bold"> Gender : {gender}</span></div>
                    <div className=""><span className="fw-bold"> Species : {species}</span></div>
                    <div className=""><span className="fw-bold"> Type : {type ===""? "Unknown": type}</span></div>
                    <div className=""><span className="fw-bold"> Origin : {origin?.name}</span></div>
                    <div className=""><span className="fw-bold"> Location : {location?.name}</span></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CardDetetails
