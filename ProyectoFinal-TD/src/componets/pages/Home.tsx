
// import { SidebarHome } from '../ui/SidebarHome/SidebarHome'
// import { PopUpMakeEnterprise } from './PopUpMakeEnterprise/PopUpMakeEnterprise'

import { useEffect, useState } from "react";
import { ListOffice } from "../ui/ListOffice/ListOffice";
import { SucursalService } from "../../services/SucursalService";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
const API_URL = import.meta.env.VITE_API_URL;



export const Home = () => {
    const [sucursales,setSucursales]=useState<ISucursal[]>([])

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                //consulto todas las sucursales por ID de empresa
                const sucusal  = await new SucursalService(API_URL + "/sucursales/porEmpresa").getById(1);
                //consulto si la sucrsal es casa Matriz
                const isCasaMatriz = await new SucursalService(API_URL + "/sucursales/existCasaMatriz").getById(1);
                
                console.log("---------- Todas las sucursales por empresa ----------");
                console.log(sucusal);
                if(sucusal){
                    setSucursales(Array.isArray(sucusal) ? sucusal : [sucusal])
                }
                console.log("---------- Es casa matriz? ----------");
                console.log(isCasaMatriz);

            } catch (err) {
                console.error("Error al cargar las empresas:", err);
            }
        };
        fetchSucursales();
    }, []);

    return (<>
            <ListOffice offices={sucursales}/>   
        
    </>)
}

export default Home