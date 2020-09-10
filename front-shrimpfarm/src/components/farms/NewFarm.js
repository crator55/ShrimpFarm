import React,{useState,useEffect,Fragment} from 'react';
import FormFindPond from './FormFindPond';
import FormPonds from './FormPonds';
import clientAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter,Link} from 'react-router-dom';

function NewFarm({history}){

    const [search,saveSearch] = useState('');
    const [ponds,savePonds] = useState([]);
    const [totalSize,saveTotal] = useState(0);
    const[farmtags,saveFarm] = useState({
        name:'',
        location:''
    });

    useEffect(
        ()=>{
            const updateTotalSize = () => {
                if (ponds.length === 0) {
                    saveTotal(0);
                    return;
                }
                let newTotal=0;
                ponds.map(pond => newTotal += (pond.areaSize));
                saveTotal(newTotal);
            }
        updateTotalSize();
           
    },[ponds])

   const searchPond = async e => {
       e.preventDefault();
       const respond = await clientAxios.post(`/ponds/find/${search}`);
       if (respond.data[0]) {
           let pondRespond = respond.data[0];
           pondRespond.pond = respond.data[0]._id;
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

    const DeletePond = id => {
        const allPonds = ponds.filter(pond => pond.pond !== id);
        savePonds(allPonds);
    }

    const readData = e => {
        saveSearch(e.target.value);
    }

    const submitFarm = async e => {
        e.preventDefault();
        const farm ={

            "name":farmtags.name,
            "areaSize":totalSize,
            "location":farmtags.location,
            "ponds":ponds
        }
        const respond= await clientAxios.post('/farms',farm);
        if (respond.status === 200) {
            Swal.fire({
                icon: 'success',
                title: respond.data.message,
                text:'New farm added succesfully'
            })
            history.push('/farms');
        }else{
            Swal.fire({
                icon: 'error',
                title:'Was an error',
                text:'Please try again!'
            })
        }
    }
    const validatePond = () => {
        const {name,location} = farmtags;  
        let state= !name.length || !location.length
        return state
    }
    const updateState = e => {
        saveFarm({
            ...farmtags,
            [e.target.name]:e.target.value
        })

    }
    return(
<Fragment>
        <h2>New Farm</h2>
                    
            <FormFindPond
            searchPond={searchPond}
            readData={readData}
            />

                <ul className="summary">
                    {ponds.map((pond,index)=>(
                    <FormPonds
                        key={index}
                        pond={pond}
                        DeletePond={DeletePond}
                    />
                    ))}
                </ul>
                    <p className="total">Total size: <span>{totalSize}</span> </p>
                        {
                           totalSize > 0 ?(
                               <form
                               onSubmit={submitFarm}
                               >
                                    <legend>All fields are required!</legend>
                        <div className="field">
                            <label>Name:</label>
                                <input 
                                type="text" 
                                name="name"
                                maxLength="30"
                                onChange={updateState}
                                />
                        </div>
                        <div className="field">
                            <label>Location:</label>
                                <input 
                                type="text" 
                                name="location"
                                maxLength="30"
                                onChange={updateState}
                                />
                        </div>
                  
                                   <input type="submit"
                                        className="btn btn-green btn-block"
                                        value="Add new farm"
                                        disabled={validatePond()}
                                        />
                               </form>
                           ):null
                        }
            <Link to={`/farms`} className="btn btn-yellow">
                            <i className="fas fa-sign-out-alt"></i>
                            Cancel
                        </Link>

            </Fragment>
    )
}
export default withRouter(NewFarm);