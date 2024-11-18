import { FC, useEffect, useState } from "react"
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal"
import { Button } from "react-bootstrap"
import { CategoriaService } from "../../../services/CategoriaService"
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { CategoryDropdown } from "../CategoryDropdown/CategoryDropdown";

const API_URL = import.meta.env.VITE_API_URL;

interface ICategoriasPage{
  office:ISucursal
}

export const CategoriasPage:FC<ICategoriasPage> = ({office}) => {
  
  const cateService=new CategoriaService(API_URL)
  const [categories,setCategories]=useState<ICategorias[] | null>([])
  const handleuwumoment=()=>{
    console.log(office?.categorias)
  }
  /*Por alguna razon me tira error 500, parece ser un problema con el backend, preguntar al profe 

  (Comentado para evitar mostrar el error en la consola)
  const getCategories=useEffect(()=>{
    const getCate=async ()=>{
      try {
        const categoryData=await cateService.todasCategoriasPadresPorSucursal(office?.id)
        setCategories(categoryData)
      } catch (error) {
        console.log("Hubo un error con el fetch de las categorias: ",error)
      }
    }
    getCate()
    
  },[])*/
  return (
    <div>CategoriasPage
      <h2>{office ? office.nombre: "hubo un error"}</h2>
      <Button variant="light" onClick={handleuwumoment}>Tocame uwu</Button>
      {categories?.map((cate)=>(
        <CategoryDropdown/>
      ))
      }
    </div>
  )
}
