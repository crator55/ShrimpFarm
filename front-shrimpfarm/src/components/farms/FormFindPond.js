import React,{useState} from 'react';

function FormFindPond(props){

    const[pond,savePond] = useState("");
    const updateState = e => {
    savePond({
        ...pond,
        [e.target.name]:e.target.value
    })
    }
    const validatePond = () => {
                let state = pond.ponds === ""||pond.ponds === undefined?true:false ;
                return state  
    }
    return(
    <form
    onSubmit = {props.searchPond}
    >
    <legend>Find a pond</legend>

    <div className="field">
        <label>Ponds:</label>
            <input 
                type="text" 
                placeholder="find a pond by the name" 
                name="ponds"
                onChange={updateState}
                onInput={props.readData}
                />
    </div>
    <input 
        type="submit" 
        value="Find Pond" 
        className="btn btn-blue btn-block"
        disabled={validatePond()}

        />

    </form>

    )
}

export default FormFindPond