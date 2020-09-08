import React,{useState} from 'react';

function FormFindPond(props){

    
const[pond,savePond]=useState("");

const updateState= e =>{
    savePond({
        ...pond,
        [e.target.name]:e.target.value
    })

}
    const validatePond=()=>{
                let state= pond.ponds===""||pond.ponds===undefined?true:false ;
                return state  
    }
    return(
    <form
    onSubmit={props.searchPond}
    >
    <legend>Search a pond</legend>

    <div className="campo">
        <label>Ponds:</label>
            <input 
                type="text" 
                placeholder="search a pond by the name" 
                name="ponds"
                onChange={updateState}
                onInput={props.readData}
                />
    </div>
    <input 
        type="submit" 
        value="Find Pond" 
        className="btn btn-azul btn-block"
        disabled={validatePond()}

        />

    </form>

    )
}

export default FormFindPond