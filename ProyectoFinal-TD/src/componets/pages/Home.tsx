
// import { SidebarHome } from '../ui/SidebarHome/SidebarHome'
// import { PopUpMakeEnterprise } from './PopUpMakeEnterprise/PopUpMakeEnterprise'

import { FC, useEffect, useState } from "react";
import { ListOffice } from "../ui/ListOffice/ListOffice";
import { SucursalService } from "../../services/SucursalService";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { HomeHeader } from "../ui/HomeHeader/HomeHeader";
const API_URL = import.meta.env.VITE_API_URL;


interface IHome {
    setDisplayOffice: Function,
    setDisplayPopUpEditOffice:Function,
    displayListOffice:boolean,
    displayPopUpEditOffice: boolean
}

export const Home : FC<IHome> = ({setDisplayOffice,setDisplayPopUpEditOffice,displayListOffice,displayPopUpEditOffice}) => {
    const [sucursales,setSucursales]=useState<ISucursal[]>([])
    const sucuService=new SucursalService(API_URL)
    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                //consulto todas las sucursales por ID de empresa
                const suc  = await sucuService.sucursalPorEmpresa(1);
                if(suc){
                    setSucursales(Array.isArray(suc) ? suc : [suc])
                }                
            } catch (err) {
                console.error("Error al cargar las empresas:", err);
            }
        };
        fetchSucursales();
    }, [displayPopUpEditOffice]);


    return (<div style={{
        display:displayListOffice ? "flex":"none",
        flexDirection:"column"
    }}>
            <HomeHeader/>
            <ListOffice offices={sucursales} setDisplayOffice={setDisplayOffice} setDisplayPopUpEditOffice={setDisplayPopUpEditOffice}/>     
        </div>
        )
}

export default Home