
import { FC, useEffect, useState } from "react";
import { ListOffice } from "../ui/ListOffice/ListOffice";
import { SucursalService } from "../../services/SucursalService";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { HomeHeader } from "../ui/HomeHeader/HomeHeader";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSucursales } from "../../redux/slices/sucursalSlice";
const API_URL = import.meta.env.VITE_API_URL;


interface IHome {
    setDisplayListOffice: Function
    setDisplayPopUpCreateOffice: Function,
    setDisplayOffice: Function,
    setDisplayPopUpEditOffice: Function,
    displayListOffice: boolean,
    displayPopUpEditOffice: boolean,
    displayPopUpCreateOffice: boolean
    refreshOffice: boolean
}

export const Home: FC<IHome> = ({ setDisplayOffice, setDisplayPopUpEditOffice, displayListOffice, setDisplayListOffice, displayPopUpEditOffice, setDisplayPopUpCreateOffice, displayPopUpCreateOffice, refreshOffice }) => {
    //const [sucursales, setSucursales] = useState<ISucursal[]>([])
    const sucuService = new SucursalService(API_URL)
    const activeEnterprise = useAppSelector(
        (state) => state.ActiveEntrepriseReducer.activeEnterprise
    )

    //Estado Global
    const dispatch = useDispatch()
    const sucursales = useSelector((state: RootState) => state.sucursales.sucursales)

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                if (typeof activeEnterprise?.id === "number") {
                    const suc: ISucursal | null = await sucuService.sucursalPorEmpresa(activeEnterprise.id);
                    if (suc && Array.isArray(suc)) {
                        dispatch(setSucursales(suc));
                    } else if (suc) {
                        dispatch(setSucursales([suc])); 
                    }
                }

            } catch (err) {
                console.error("Error al cargar las sucursales:", err);
            }
            setDisplayListOffice(true);
        };
        fetchSucursales();
    }, [activeEnterprise?.id, refreshOffice]);


    return (<main style={{
        display: displayListOffice ? "flex" : "none",
        flexDirection: "column",
        height:"100vh"
    }}>
        <HomeHeader setDisplayPopUpCreateOffice={setDisplayPopUpCreateOffice} setDisplayListOffice={setDisplayListOffice} />
        <ListOffice offices={sucursales} setDisplayOffice={setDisplayOffice} setDisplayPopUpEditOffice={setDisplayPopUpEditOffice}  />
    </main>
    )
}

export default Home