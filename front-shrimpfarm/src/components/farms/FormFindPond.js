import React from 'react';

function FormFindPond(props){
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
                onChange={props.readData}
                />
    </div>
    <input 
        type="submit" 
        value="Find Pond" 
        className="btn btn-azul btn-block"/>
   
    </form>

    )
}

export default FormFindPond