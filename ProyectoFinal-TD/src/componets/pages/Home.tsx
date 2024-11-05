
// import { SidebarHome } from '../ui/SidebarHome/SidebarHome'
// import { PopUpMakeEnterprise } from './PopUpMakeEnterprise/PopUpMakeEnterprise'

import { FC, useEffect, useState } from "react";
import { ListOffice } from "../ui/ListOffice/ListOffice";
import { SucursalService } from "../../services/SucursalService";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
const API_URL = import.meta.env.VITE_API_URL;


interface IHome {
    setDisplayOffice: Function,
    setDisplayPopUpEditOffice:Function
}

export const Home : FC<IHome> = ({setDisplayOffice,setDisplayPopUpEditOffice}) => {
    const [sucursales,setSucursales]=useState<ISucursal[]>([])

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                //consulto todas las sucursales por ID de empresa
                const suc  = await new SucursalService(API_URL + "/sucursales/porEmpresa").getById(1);
                if(suc){
                    setSucursales(Array.isArray(suc) ? suc : [suc])
                }                
            } catch (err) {
                console.error("Error al cargar las empresas:", err);
            }
        };
        fetchSucursales();
    }, []);

    return (<>
            <ListOffice offices={sucursales} setDisplayOffice={setDisplayOffice} setDisplayPopUpEditOffice={setDisplayPopUpEditOffice}/>   
        
    </>)
}

export default Home