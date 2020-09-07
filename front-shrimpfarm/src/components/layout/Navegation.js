import React from 'react';
import {Link} from 'react-router-dom';
const Navegation =()=>( 
    <aside className="sidebar col-3">
        <h2>Administration</h2>
        <nav className="navegacion">
            <Link to={"/"} className="productos">Ponds</Link>
            <Link to={"/farms"} className="clientes">Farms</Link>
        </nav>
    </aside>
)
export default Navegation;