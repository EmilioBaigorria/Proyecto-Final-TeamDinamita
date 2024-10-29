import { useEffect } from 'react';
import { EmpresaService } from "../../services/EmpresaService";

import { SucursalService } from '../../services/SucursalService';


const API_URL = import.meta.env.VITE_API_URL;

const EjemplosPeticionesApi = () => {

    //ejemplo de peticiones a api de Empresas
    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                //consulto todas las empresas
                const empresas = await new EmpresaService(API_URL + "/empresas").getAll();
                //consulto empresa por id
                const empresaById = await new EmpresaService(API_URL + "/empresas").getById(1);
                //creo nueva empresa
                const createEmpresa = await new EmpresaService(API_URL + "/empresas").post({
                    id: 0,
                    nombre: "TIA RADDA",
                    razonSocial: "LAS MEJORES MILANESAS",
                    cuit: 30546791,
                    logo: "https://benditorufian.com/resources/brand.svg"
                });
                //modifico empresa por id
                const updateEmpresa = await new EmpresaService(API_URL + "/empresas").put(1, {
                    id: 1,
                    eliminado: false,
                    nombre: "BENDITO RUFIAN",
                    razonSocial: "Empresa de Alimentos",
                    cuit: 30546790,
                    logo: "https://benditorufian.com/resources/brand.svg"
                })

                console.log("---------- Todas las empresas ----------");
                console.log(empresas);
                console.log("---------- Empresa por id ----------");
                console.log(empresaById);
                console.log("---------- Creo nueva empresa ----------");
                console.log(createEmpresa);
                console.log("---------- Modifico empresa ----------");
                console.log(updateEmpresa);

            } catch (err) {
                console.error("Error al cargar las empresas:", err);
            }
        };

        fetchEmpresas();
    }, []);


    //ejemplo de peticiones a api de Sucursales
    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                //consulto todas las sucursales por ID de empresa
                const sucursales = await new SucursalService(API_URL + "/sucursales/porEmpresa").getById(1);
                //consulto si la sucrsal es casa Matriz
                const isCasaMatriz = await new SucursalService(API_URL + "/sucursales/existCasaMatriz").getById(1);
                //creo nueva sucursal 
                //hay que verificar esto ya que no me coincide el ejemplo del body de la documentación que indicó el profe y los tipos de tados que indico el profe
                /*
                const createSucursal = await new SucursalService(API_URL + "/sucursales/create").post(
                    {
                        "nombre": "BENDITO RUFIAN - Mendoza Plasa Shopping",
                        "horarioApertura": "17:00:00",
                        "horarioCierre": "00:00:00",
                        "esCasaMatriz": false,
                        "domicilio": {
                            "calle": "Bandera de los Andes",
                            "numero": 1833,
                            "cp": 5519,
                            "piso": 0,
                            "nroDpto": 34,
                            "idLocalidad":2
                        },
                        "idEmpresa": 1
                    }
                );
                */

                //modifico sucursal  por id
                //hay que verificar esto ya que no me coincide el ejemplo del body de la documentación que indicó el profe y los tipos de tados que indico el profe
                /*
                const updateSucursal = await new SucursalService(API_URL + "/sucursales/update").put(1, {
                    "id": 1,
                    "eliminado": false,
                    "nombre": "BENDITO RUFIAN - Bandera De los Andes",
                    "horarioApertura": "17:00:00",
                    "horarioCierre": "00:00:00",
                    "esCasaMatriz": true,
                    "domicilio": {
                        "id": 1,
                        "eliminado": false,
                        "calle": "Bandera de los Andes",
                        "numero": 1833,
                        "cp": 5519,
                        "piso": 0,
                        "nroDpto": 34,
                        "localidad": {
                            "id": 2,
                            "eliminado": false,
                            "nombre": "Guaymallen",
                            "provincia": {
                                "id": 1,
                                "eliminado": false,
                                "nombre": "Mendoza",
                                "pais": {
                                    "id": 1,
                                    "eliminado": false,
                                    "nombre": "Argentina"
                                }
                            }
                        }
                    },
                    "idEmpresa": 1
                })
*/
                console.log("---------- Todas las sucursales por empresa ----------");
                console.log(sucursales);
                console.log("---------- Es casa matriz? ----------");
                console.log(isCasaMatriz);

            } catch (err) {
                console.error("Error al cargar las empresas:", err);
            }
        };

        fetchSucursales();
    }, []);





    return (
        <div>

        </div>
    );
}

export default EjemplosPeticionesApi;
