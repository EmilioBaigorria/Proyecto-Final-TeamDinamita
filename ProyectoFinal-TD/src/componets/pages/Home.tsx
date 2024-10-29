
// import { SidebarHome } from '../ui/SidebarHome/SidebarHome'
// import { PopUpMakeEnterprise } from './PopUpMakeEnterprise/PopUpMakeEnterprise'

import EjemplosPeticionesApi from "../ui/EjemplosPeticionesApi"
import { OfficeCard } from "../ui/OfficeCard/OfficeCard"


export const Home = () => {
    return (<>
        <main>
            <OfficeCard office={null}/>
            
            <EjemplosPeticionesApi/>
        </main>
    </>)
}

export default Home