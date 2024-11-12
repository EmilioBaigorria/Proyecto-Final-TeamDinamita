
// import { SidebarHome } from '../ui/SidebarHome/SidebarHome'
// import { PopUpMakeEnterprise } from './PopUpMakeEnterprise/PopUpMakeEnterprise'

import { FC, useEffect, useState } from "react";
import { ListOffice } from "../ui/ListOffice/ListOffice";
import { SucursalService } from "../../services/SucursalService";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { HomeHeader } from "../ui/HomeHeader/HomeHeader";
import { useAppSelector } from "../../hooks/redux";
const API_URL = import.meta.env.VITE_API_URL;


interface IHome {
    setDisplayListOffice:Function
    setDisplayPopUpCreateOffice:Function,
    setDisplayOffice: Function,
    setDisplayPopUpEditOffice:Function,
    displayListOffice:boolean,
    displayPopUpEditOffice: boolean,
    displayPopUpCreateOffice:boolean
    
}

export const Home : FC<IHome> = ({setDisplayOffice,setDisplayPopUpEditOffice,displayListOffice,setDisplayListOffice,displayPopUpEditOffice,setDisplayPopUpCreateOffice,displayPopUpCreateOffice}) => {
    const [sucursales,setSucursales]=useState<ISucursal[]>([])
    const sucuService=new SucursalService(API_URL)
    const activeEnterprise=useAppSelector(
        (state)=>state.ActiveEntrepriseReducer.activeEnterprise
    )
    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                //consulto todas las sucursales por ID de empresa
                if(typeof activeEnterprise?.id=="number"){
                    
                    const suc  = await sucuService.sucursalPorEmpresa(activeEnterprise?.id);
                    if(suc){
                    setSucursales(Array.isArray(suc) ? suc : [suc])
                    }
                    setDisplayListOffice(true)
                }             
            } catch (err) {
                console.error("Error al cargar las empresas:", err);
            }
        };
        fetchSucursales();
    }, [displayPopUpEditOffice,displayPopUpCreateOffice,displayListOffice]);


    return (<div style={{
        display:displayListOffice ? "flex":"none",
        flexDirection:"column"
    }}>
            <HomeHeader setDisplayPopUpCreateOffice={setDisplayPopUpCreateOffice} setDisplayListOffice={setDisplayListOffice}/>
            <ListOffice offices={sucursales} setDisplayOffice={setDisplayOffice} setDisplayPopUpEditOffice={setDisplayPopUpEditOffice}/>     
        </div>
        )
}

export default Home