import React,{useEffect, useState,Fragment} from 'react';
import clientAxios from '../../config/axios';
import Pond from '../ponds/Pond';
import {Link} from 'react-router-dom';
function Ponds (){

    const [ponds,savePonds]=useState([]);

    const responseApi= async ()=>{
        const query= await clientAxios.get('/ponds');
        savePonds(query.data);
    }
    useEffect(
        ()=>{
        responseApi();
    },[ponds])
    return(
        <Fragment>
            <h2>
                Ponds
            </h2>
            <Link to={"/pond/new"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
               New pond
            </Link>
            <ul className="listado-clientes">
                {
                    ponds.map(pond=>
                       (<Pond 
                        key={pond._id}
                        pond={pond} />) 
                    )
               }
            </ul>
        </Fragment>
    
    )
}

export default Ponds;