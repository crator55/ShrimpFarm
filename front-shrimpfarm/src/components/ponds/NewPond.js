import React,{Fragment,useState} from 'react';
import pondAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';

function NewPond({history}){
const[pond,savePond]=useState({
    name:'',
    areaSize:'',
    location:''
});
const updateState= e =>{
    savePond({
        ...pond,
        [e.target.name]:e.target.value

    })
}
const validatePond=()=>{
    const {name,areaSize,location} = pond;
    let state= !name.length || !areaSize.length||!location.length
    return state
}
const addPond =e =>{
    e.preventDefault();
    pondAxios.post('/ponds',pond)
        .then(res=>{
            if (res.status!==200) {
                Swal.fire({
                    type:'error',
                    text:'Was an error inserting the new pond',
                    title:'ERROR!'}
                  )
            }
            Swal.fire(
                'Added new pond',
                res.data.message,
                'success'
              )
              history.push('/');
        });
}
    return(
        <Fragment>

            <form
                onSubmit={addPond}
            >
                <legend>All fields are required!</legend>

                    <div className="campo">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        placeholder="Name of the pond." 
                        name="name"
                        onChange={updateState}
                        />
                    </div>

                    <div className="campo">
                        <label>Area:</label>
                        <input 
                        type="number" 
                        placeholder="Area (in hectareas) of the pond" 
                        name="areaSize"
                        onChange={updateState}
                        step=".01"
                        />
                    </div>

                    <div className="campo">
                        <label>Location:</label>
                        <input 
                        type="text" 
                        placeholder="Location inside of the farm (Exm:A)" 
                        name="location"
                        onChange={updateState}
                        />
                    </div>
                    <div className="enviar">
                        <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente"
                        disabled={validatePond()}
                        />
                    </div>
                  

            </form>
        </Fragment>
        
    )
}
export default withRouter(NewPond);