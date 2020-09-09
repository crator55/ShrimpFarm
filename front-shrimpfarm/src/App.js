import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Header from './components/layout/Header';
import Navegation from  './components/layout/Navegation';
import Farms from  './components/farms/Farms';
import Ponds from  './components/ponds/Ponds';
import NewPond from './components/ponds/NewPond';
import UpdatePond from './components/ponds/UpdatePond';
import NewFarm from './components/farms/NewFarm';
import UpdateFarms from './components/farms/UpdateFarms';
function App(){
  return(
    <Router>
      <Fragment>
        <Header />
          <div className="grid container content-principal">
            <Navegation />
              <main className="box-content col-9">
                <Switch>
                  <Route exact path="/" component={Ponds}/>
                  <Route exact path="/pond/new" component={NewPond}/>
                  <Route exact path="/pond/update/:id" component={UpdatePond}/>
                  <Route exact path="/farms" component={Farms}/>
                  <Route exact path="/farms/new" component={NewFarm}/>
                  <Route exact path="/farms/update/:id" component={UpdateFarms}/>
                </Switch>
              </main>
          </div>
      </Fragment>
    </Router>
  )
}

export default App;
