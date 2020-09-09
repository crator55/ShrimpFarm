import React,{useEffect,useState} from 'react';
import clientAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
function DetailsFarms({farm}){


    const{name,location,_id}=farm;

    const [area,saveFarms]=useState([]);

    useEffect(()=>{
        const respondApi = async()=>{
            const respond = await clientAxios.get(`/farms/area/${farm._id}`);
            saveFarms(respond.data)
        }
        respondApi();
    },[farm])

    const deletePond = idPond =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
    
                clientAxios.delete(`/farms/${farm._id}`).then(
                    res=>{
                        Swal.fire(
                            'Deleted!',
                            res.data.message,
                            'success'
                          )
                    }
                )
            }
          })
      }
    return(
        <li className="farm">
        <div className="info-farm">
            <p className="id">Name: {name}</p>
            <p className="name">Location: {location}</p>
            <div className="colorFarm-farm">
                <p className="ponds">Ponds: </p>
                <ul>
                    {farm.ponds.map((element,index)=>
                        (
                            <li key={index}>
                                <p>Name: {element.pond.name}</p>
                                <p>Area size: {element.pond.areaSize} [ha]</p>
                                <p>Location: {element.pond.location}</p>
                            </li>
                        )
                        )}
                   
                </ul>
            </div>
          
            <p className="total">Total area: {area.TotalArea} [hectares] </p>
        </div>
        <div className="accions">
        <Link to={`/farms/update/${_id}`} className="btn btn-blue">
                            <i className="fas fa-pen-alt"></i>
                            Update pond
                        </Link>

                        <button 
                        type="button" 
                        className="btn btn-red btn-delete"
                        onClick={()=> deletePond(_id)}
                        >
                            <i className="fas fa-times"></i>
                            Delete Pond
                        </button>
        </div>
    </li>
    )
}
export default withRouter(DetailsFarms);