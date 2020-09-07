import React,{Fragment,useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import clientAxios from '../../config/axios';
import Swal from 'sweetalert2';
function UpdatePond(props){


    const{id}=props.match.params;
    const[pond,pondData]=useState({
        name:'',
        areaSize:0,
        location:''
    });
    const responseApi= async ()=>{
        const query= await clientAxios.get(`/ponds/${id}`);
        pondData(query.data);
    }
    useEffect(
        ()=>{
        responseApi();
    },[]);

const sendPond =e =>{
    e.preventDefault();
    clientAxios.put(`/ponds/${pond._id}`,pond)
    .then(
        res=>{
            if (res.status!==200) {
                Swal.fire({
                    type:'error',
                    text:'Was an error inserting the new pond',
                    title:'ERROR!'}
                  )
            }
            else{
                Swal.fire(
                    'Updated pond',
                    'Updated successfully!',
                    'success'
                  )

            }
           
              props.history.push('/');
        }
    );
}
const updateState= e =>{
    pondData({
        ...pond,
        [e.target.name]:e.target.value

    })
}
const validatePond=()=>{
    const {name,areaSize,location} = pond;
    let state= !name.length || !areaSize.toString().length||!location.length
    return state
}

    return(
        <Fragment>

            <form
               onSubmit={sendPond}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        placeholder="Name of the pond." 
                        name="name"
                        onChange={updateState}
                        value={pond.name}
                        />
                    </div>

                    <div className="campo">
                        <label>Area:</label>
                        <input 
                        type="text" 
                        placeholder="Area (in hectareas) of the pond" 
                        name="areaSize"
                        onChange={updateState}
                        
                        value={pond.areaSize}
                        />
                    </div>

                    <div className="campo">
                        <label>Location:</label>
                        <input 
                        type="text" 
                        placeholder="Location inside of the farm (Exm:A)" 
                        name="location"
                        onChange={updateState}
                        value={pond.location}
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
export default withRouter(UpdatePond);