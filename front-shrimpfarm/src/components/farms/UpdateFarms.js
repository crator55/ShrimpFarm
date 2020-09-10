import React,{Fragment,useState,useEffect} from 'react';
import {withRouter,Link} from 'react-router-dom';
import clientAxios from '../../config/axios';
import Swal from 'sweetalert2';
import FormFindPond from './FormFindPond';
import FormPonds from './FormPonds';


function UpdateFarms(props){
    
    const{id} = props.match.params;
    const[farm,farmData] = useState({
        name:'',
        location:'',
        ponds:[]
    });
    const [ponds,savePonds] = useState([]);
    const [totalSize,saveTotal] = useState(0);
    const validatePond = () => {
        const {name,location} = farm;  
        let state = !name.length || !location.length
        return state
    }
    useEffect(
        ()=>{
            const responseApi = async () => {
                const query = await clientAxios.get(`/farms/${id}`);
                farmData(query.data);
            }
        responseApi();
            },[id]);
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
    });
    
    const sendFarm = e => {
        e.preventDefault();
        farm.ponds = ponds;
        clientAxios.put(`/farms/${farm._id}`,farm)
        .then(
            res => {
                if (res.status !== 200) {
                    Swal.fire({
                        type:'error',
                        text:'Was an error inserting the new farm',
                        title:'ERROR!'}
                    )
                }
                else{
                    Swal.fire(
                        'Updated farm',
                        'Updated successfully!',
                        'success'
                    )

                }
            
                props.history.push('/farms');
            }
        );
    }

    const updateState= e => {
    farmData({
            ...farm,
            [e.target.name]:e.target.value
        })
    }
    const [search,saveSearch] = useState('');

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
    const readData = e => {
        saveSearch(e.target.value);
        }
        const DeletePond= id => {
            const allPonds = ponds.filter(pond => pond.pond !== id);
            savePonds(allPonds);
        }    
    return(   
    <Fragment>
        <FormFindPond
            searchPond={searchPond}
            readData={readData}
            />
             <ul className="summary">
                    {ponds.map((pond, index) => (
                    <FormPonds
                        key={index}
                        pond={pond}
                        DeletePond={DeletePond}
                    />
                    ))}
                </ul>
                <p className="total">Total size: <span>{totalSize}</span> </p>
        <form
            onSubmit={sendFarm}
        >
            <legend>All fields are required!</legend>
            <div className="field">
                    <label>Name:</label>
                    <input 
                    type="text" 
                    name="name"
                    onChange={updateState}
                    value={farm.name}
                    />
                </div>

                <div className="field">
                    <label>Location:</label>
                    <input 
                    type="text" 
                    name="location"
                    onChange={updateState}
                    value={farm.location}
                    />
                </div>
                
                <div className="send">
                    <input 
                    type="submit" 
                    className="btn btn-blue" 
                    value="update farm"
                    disabled={validatePond()}
                    />
                </div>
                <Link to={`/farms`} className="btn btn-yellow">
                            <i className="fas fa-sign-out-alt"></i>
                            Cancel
                        </Link>
        </form>  
        
    </Fragment>
    )
}
    export default withRouter(UpdateFarms);