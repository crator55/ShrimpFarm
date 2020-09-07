
import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../../config/axios';
function Pond({pond}){

  const{_id,areaSize,location,name}=pond;
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

<li className="cliente">
                    <div className="info-cliente">
                        <p className="nombre">{name}</p>
                        <p className="empresa">{location}</p>
                        <p>{areaSize}</p>
                      
                    </div>
                    <div className="acciones">
                        <Link to={`/pond/update/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Update pond
                        </Link>
                        <Link to={`/farms/new`} className="btn btn-amarillo">
                            <i className="fas fa-plus"></i>
                           New farm
                        </Link>
                        <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={()=> deletePond(_id)}
                        >
                            <i className="fas fa-times"></i>
                            Delete Pond
                        </button>
                    </div>
                </li>
)
}
export default Pond 
