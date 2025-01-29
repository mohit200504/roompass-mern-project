
import './App.css';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Userregi from './userRegi/userregi';
import Userlogin from './userLogin/userlogin';
import UserDash from './userdashboard/userdash';
import Organisation from './organisation/organisation';
import Messcard from './messcard/messcard';
import Roompass from './roompass/roompass';
import Gatepass from './gatepass/gatepass';
import OrgRegi from './orgRegi/orgRegi';
import Orglogin from './orglogin/orglogin';
import Orgdash from './orgdash/orgdash';
import Roomdata from './ordroomdata/orgroom';
import Gatepassorg from './orgagtepass/orggate';


    
   function App(){

    return (
      <Router>
        <Routes>
          <Route path="/userregister" element={<Userregi/>}/>
          <Route path="/userlogin" element={<Userlogin/>}/>
          <Route path="/userdashboard" element={<UserDash/>}/>
          <Route path="/organisation/:id" element={<Organisation/>}/>
          <Route path="/messcard" element={<Messcard/>}/>
          <Route path="/roompass" element={<Roompass/>}/>
          <Route path="/gatepass" element={<Gatepass/>}/>
          <Route path="/organisation_register" element={<OrgRegi/>}/>
          <Route path="/organisation_login" element={<Orglogin/>}/>
          <Route path="/orgdash" element={<Orgdash/>}/>
          <Route path="/orgroomdata" element={<Roomdata/>}/>
          <Route path="/orgatepass" element={<Gatepassorg/>}/>

        </Routes>
      </Router>
    )

   }

export default App;
