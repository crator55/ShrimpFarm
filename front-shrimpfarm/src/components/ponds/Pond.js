
import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
function Pond({pond}){

  const{_id,areaSize,location,name}=pond;
  
  const DeletePond = idPond => {
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

            clientAxios.delete(`/ponds/${idPond}`).then(
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

                <li className="pond">
                    <div className="info-pond">
                        <p className="name">Name: {name}</p>
                        <p className="location">Location: {location}</p>
                        <p>Area: {areaSize} [ha]</p>
                      
                    </div>
                    <div className="accions">
                        <Link to={`/pond/update/${_id}`} className="btn btn-blue">
                            <i className="fas fa-pen-alt"></i>
                            Update pond
                        </Link>
                        <button 
                        type="button" 
                        className="btn btn-red btn-delete"
                        onClick={()=> DeletePond(_id)}
                        >
                            <i className="fas fa-times"></i>
                            Delete Pond
                        </button>
                    </div>
                </li>
    )
}
    export default Pond 
