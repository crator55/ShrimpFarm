import React from 'react';
function FormPonds(props){
    const{pond,deletePond} =props
    return(
        <li>
        <div className="texto-producto">
            <p className="nombre">{pond.name}</p>
            <p className="precio">{pond.location}</p>
        </div>
        <div className="acciones">
            <div className="contenedor-cantidad">
            <p className="precio">{pond.areaSize}</p>
            </div>
            <button 
            type="button" 
            className="btn btn-rojo"
            onClick={()=>deletePond(pond.pond)}
            >
                <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
            </button>
        </div>
    </li>
    )
}
export default FormPonds