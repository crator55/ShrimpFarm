import React from 'react';
import {Link} from 'react-router-dom';

const Navegation = () => ( 
    <aside className="sidebar col-3">
        <h2>Administration</h2>
        <nav className="navegation">
            <Link to={"/"} className="ponds">Ponds</Link>
            <Link to={"/farms"} className="pondss">Farms</Link>
        </nav>
    </aside>
)
export default Navegation;