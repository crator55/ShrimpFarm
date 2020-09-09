import React from 'react';
function FormPonds(props){
    const{pond,deletePond} =props
    return(
        <li>
        <div className="text-color">
            <p className="name">Name: {pond.name}</p>
            <p className="area">Location: {pond.location}</p>
        </div>
        <div className="accions">
            <div className="container-quantity">
            <p className="area">Area: {pond.areaSize} [ha]</p>
            </div>
            <button 
            type="button" 
            className="btn btn-red"
            onClick={()=>deletePond(pond.pond)}
            >
                <i className="fas fa-minus-circle"></i>
                    Delete Pond
            </button>
        </div>
    </li>
    )
}
export default FormPonds