import React,{Fragment,useState,useEffect} from 'react';
import {withRouter,Link} from 'react-router-dom';
import clientAxios from '../../config/axios';
import Swal from 'sweetalert2';
function UpdatePond(props){

    const{id} = props.match.params;
    const[pond,pondData] = useState({
        name:'',
        areaSize:0,
        location:''
    });
   
    useEffect(
        ()=>{

            const responseApi = async ()=> {
                const query = await clientAxios.get(`/ponds/${id}`);
                pondData(query.data);
            }
        responseApi();
    },[id]);

    const sendPond = e => {
    e.preventDefault();
    clientAxios.put(`/ponds/${pond._id}`,pond)
    .then(
        res=>{
            if (res.status !== 200) {
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
    const updateState = e => {
        pondData({
            ...pond,
            [e.target.name]:e.target.value

        })
    }
    const validatePond = () => {
    const {name,areaSize,location} = pond;
    let state = !name.length || !areaSize.toString().length||!location.length
    return state
    }

    return(
        <Fragment>

            <form
               onSubmit={sendPond}
            >
            <legend>All fields are required!</legend>
                <div className="field">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        name="name"
                        maxLength="30"
                        onChange={updateState}
                        value={pond.name}
                        />
                    </div>

                    <div className="field">
                        <label>Area:</label>
                        <input 
                        type="text" 
                        name="areaSize"
                        maxLength="30"
                        onChange={updateState}
                        
                        value={pond.areaSize}
                        />
                    </div>

                    <div className="field">
                        <label>Location:</label>
                        <input 
                        type="text" 
                        name="location"
                        maxLength="30"
                        onChange={updateState}
                        value={pond.location}
                        />
                    </div>
                    <div className="send">
                        <input 
                        type="submit" 
                        className="btn btn-blue" 
                        value="Update pond"
                        disabled={validatePond()}
                        />
                    </div>
                    <Link to={`/`} className="btn btn-yellow">
                            <i className="fas fa-sign-out-alt"></i>
                            Cancel
                        </Link>

            </form>
        </Fragment>
        
    )
}
    export default withRouter(UpdatePond);