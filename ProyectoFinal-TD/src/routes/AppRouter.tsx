import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from '../componets/pages/Home';
import Administration from "../componets/pages/Administration";
import Sidebar from "../componets/ui/SidebarHome/Sidebar";
import { useState } from "react";
import { PopUpMakeEnterprise } from "../componets/pages/PopUpMakeEnterprise/PopUpMakeEnterprise";
import { PopUpChekEnterprise } from "../componets/pages/PopUpChekEnterprise/PopUpChekEnterprise";
import { EditEnterpriseModal } from "../componets/pages/PopUpEditEnterprise/PopUpEditEnterprise";




export const AppRouter = () => {
  const [display,setDisplay]=useState(false)
  const [displayModalCheckEnterprise,setdisplayModalCheckEnterprise]=useState(false)
  const [displayModalEditEnterprise, setDisplayModalEditEnterprise]=useState(false)



  return (
    <div className="grid_container">
      
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/admin'>Administración</Link></li>
          </ul>
        </nav>
        
        <PopUpChekEnterprise displayModalCheckEnterprise={displayModalCheckEnterprise} setdisplayModalCheckEnterprise={setdisplayModalCheckEnterprise} />
        <PopUpMakeEnterprise display={display} setDisplay={setDisplay}/>
        <EditEnterpriseModal display={displayModalEditEnterprise} setDisplay={setDisplayModalEditEnterprise}/>
      
        <Sidebar  setDisplay={setDisplay} setdisplayModalCheckEnterprise={setdisplayModalCheckEnterprise} setDisplayModalEditEnterprise={setDisplayModalEditEnterprise}  />
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Administration />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
};
