import React,{useEffect,useState,Fragment} from 'react';
import clientAxios from '../../config/axios';
import DetailsFarms from './DetailsFarms';
import {Link} from 'react-router-dom';
function Farms (){
    
    const [farms,saveFarms]=useState([]);

    useEffect(()=>{
        const respondApi = async()=>{
            const respond = await clientAxios.get('/farms');
            saveFarms(respond.data)
        }
        respondApi();
    },[])
    return(
        <Fragment>
  
        <h2>Farms</h2>
        <Link to={"/farms/new"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
               New Farm
            </Link>
        <ul className="listado-pedidos">
          {farms.map(farm=>(
            <DetailsFarms
                key={farm._id}
                farm={farm}
            />
          )
          )}
            
        </ul>
        </Fragment>
    )
}

export default Farms;