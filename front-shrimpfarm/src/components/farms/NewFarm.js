import React,{useState,useEffect,Fragment} from 'react';
import FormFindPond from './FormFindPond';
import FormPonds from './FormPonds';
import clientAxios from '../../config/axios';
import Swal from 'sweetalert2';

function NewFarm(){

    const [search,saveSearch]=useState('');
    const [ponds,savePonds]=useState([]);
    const [totalSize,saveTotal]=useState(0);
    useEffect(
        ()=>{
        updateTotalSize();
           
    },[ponds])
   const searchPond = async e=>{
       e.preventDefault();
       const respond = await clientAxios.post(`/ponds/find/${search}`);
       if (respond.data[0]) {
           let pondRespond= respond.data[0];
           pondRespond.pond=respond.data[0]._id;
           savePonds([...ponds,pondRespond]);
       }
       else{
        Swal.fire({
            icon: 'error',
            title:'No data',
            text:'No pond matches'
        })
       }
   }

   const deletePond=id=>{
    const allPonds= ponds.filter(pond=>pond.pond !==id);
    savePonds(allPonds);
   }
   const readData =e=>{
    saveSearch(e.target.value);
    }

    const updateTotalSize=()=>{
        if (ponds.length===0) {
            saveTotal(0);
            return;
        }
        let newTotal=0;
        ponds.map(pond=>newTotal+=(pond.areaSize));
        saveTotal(newTotal);
    }
    const submitFarm = async e =>{
        e.preventDefault();
        const farm ={

            "name":"farm3",
            "areaSize":totalSize,
            "location":"farm3",
            "ponds":ponds
        }
        const respond= await clientAxios.post('/farms',farm);
        if (respond.status===200) {
            Swal.fire({
                icon: 'success',
                title: respond.data.message,
                text:'New farm added succesfully'
            })
        }else{
            Swal.fire({
                icon: 'error',
                title:'Was an error',
                text:'Please try again!'
            })
        }
    }
    return(
<Fragment>
        <h2>New Farm</h2>
            
            <FormFindPond
            searchPond={searchPond}
            readData={readData}
            />

                <ul className="resumen">
                    {ponds.map((pond,index)=>(
                    <FormPonds
                        key={pond.pond}
                        pond={pond}
                        deletePond={deletePond}
                    />
                    ))}
                </ul>
                    <p className="total">Total size: <span>{totalSize}</span> </p>
                        {
                           totalSize > 0 ?(
                               <form
                               onSubmit={submitFarm}
                               >
                                   <input type="submit"
                                        className="btn btn-verde btn-block"
                                        value="Realizar Pedido"/>
                               </form>
                           ):null
                        }
         

            </Fragment>
    )
}
export default NewFarm;