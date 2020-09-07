import React,{useEffect,useState} from 'react';
import clientAxios from '../../config/axios';
import Swal from 'sweetalert2';
function DetailsFarms({farm}){


    const{name,areaSize,_id}=farm;

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
        <li className="pedido">
        <div className="info-pedido">
            <p className="id">{name}</p>
            <p className="nombre">{areaSize}</p>
            <div className="articulos-pedido">
                <p className="productos">Artículos Pedido: </p>
                <ul>
                    {farm.ponds.map(element=>
                        (
                            <li key={farm._id+element._id}>
                                <p>{element.pond.name}</p>
                                <p>{element.pond.areaSize}</p>
                                <p>{element.pond.Location}</p>
                            </li>
                        )
                        )}
                   
                </ul>
            </div>
          
            <p className="total">Total:{area.TotalArea} </p>
        </div>
        <div className="acciones">
            <a href="#" className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Pedido
            </a>

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
export default DetailsFarms;