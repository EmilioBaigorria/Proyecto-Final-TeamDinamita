import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from '../componets/pages/Home';
import Administration from "../componets/pages/Administration";
import Sidebar from "../componets/ui/SidebarHome/Sidebar";
import { useState } from "react";
import { PopUpMakeEnterprise } from "../componets/pages/PopUpMakeEnterprise/PopUpMakeEnterprise";
import { PopUpChekEnterprise } from "../componets/pages/PopUpChekEnterprise/PopUpChekEnterprise";
import { EditEnterpriseModal } from "../componets/pages/PopUpEditEnterprise/PopUpEditEnterprise";
import { PopUpSeeOffice } from "../componets/pages/PopUpSeeOffice/PopUpSeeOffice";
import { PopUpEditOffice } from "../componets/pages/PopUpEditOffice/PopUpEditOffice";
import { PopUpCreateOffice } from "../componets/pages/PopUpCreateOffice/PopUpCreateOffice";
import { PopUpCreateUpdateAlergeno } from "../componets/pages/PopUpCreateUpdateAlergeno/PopUpCreateUpdateAlergeno";





export const AppRouter = () => {
    const [display, setDisplay] = useState(false)
    const [displayModalCheckEnterprise, setdisplayModalCheckEnterprise] = useState(false)
    const [displayModalEditEnterprise, setDisplayModalEditEnterprise] = useState(false)
    const [displayPopUpOffice, setDisplayPopUpOffice] = useState(false)
    const [displayPopUpEditOffice, setDisplayPopUpEditOffice] = useState(false)
    const [displayListOffice, setDisplayListOffice] = useState(true)
    const [displayPopUpCreateOffice, setDisplayPopUpCreateOffice] = useState(false)
    const [activeSubPage,setActiveSubPage]=useState("none")

    const [displayCreateUpdateAlergeno,setDisplayCreateUpdateAlergeno]=useState(false)
    const [isCreate,setIsCreate]=useState(true)



    return (
        <div className="grid_container">
            <BrowserRouter>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/admin'>Administración</Link></li>
                    </ul>
                </nav>
                <PopUpCreateOffice displayPopUpCreateOffice={displayPopUpCreateOffice} setDisplayPopUpCreateOffice={setDisplayPopUpCreateOffice} />
                <PopUpEditOffice displayPopUpEditOffice={displayPopUpEditOffice} setDisplayPopUpEditOffice={setDisplayPopUpEditOffice} setDisplayListOffice={setDisplayListOffice} />
                <PopUpChekEnterprise displayModalCheckEnterprise={displayModalCheckEnterprise} setdisplayModalCheckEnterprise={setdisplayModalCheckEnterprise} />
                <PopUpMakeEnterprise display={display} setDisplay={setDisplay} />
                <EditEnterpriseModal display={displayModalEditEnterprise} setDisplay={setDisplayModalEditEnterprise} />
                <PopUpSeeOffice displayPopUpOffice={displayPopUpOffice} setDisplayPopUpOffice={setDisplayPopUpOffice} />

                <PopUpCreateUpdateAlergeno
                isCreate={isCreate}
                displayCreateUpdateAlergeno={displayCreateUpdateAlergeno} 
                setDisplayCreateUpdateAlergeno={setDisplayCreateUpdateAlergeno}/>

                <Sidebar setDisplay={setDisplay} 
                setdisplayModalCheckEnterprise={setdisplayModalCheckEnterprise} 
                setDisplayModalEditEnterprise={setDisplayModalEditEnterprise}
                setActiveSubPage={setActiveSubPage} />


                <Routes>
                    <Route path="/" element={<Home
                        setDisplayOffice={setDisplayPopUpOffice}
                        setDisplayPopUpEditOffice={setDisplayPopUpEditOffice}
                        displayListOffice={displayListOffice}
                        setDisplayListOffice={setDisplayListOffice}
                        displayPopUpEditOffice={displayPopUpEditOffice}
                        setDisplayPopUpCreateOffice={setDisplayPopUpCreateOffice}
                        displayPopUpCreateOffice={displayPopUpCreateOffice} />} />
                    <Route path="/admin" element={<Administration 
                        activeSubPage={activeSubPage}
                        setDisplayCreateUpdateAlergeno={setDisplayCreateUpdateAlergeno}
                        setIsCreate={setIsCreate} />} />
                </Routes>

            </BrowserRouter>
        </div>
    );
};
