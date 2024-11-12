
import Swal from "sweetalert2";
import { BackendClient } from "./BackendClient";
import { IImagen } from "../types/IImagen";

const API_URL = import.meta.env.VITE_API_URL;

export class ImageService extends BackendClient<IImagen> {
  
  constructor(baseUrl: string) {
    super(`${API_URL}/${baseUrl}`);
  }

  // Método para subir una imagen a la API
  async uploadImage(data: FormData): Promise<string> {
    
    Swal.fire({
      title: "Subiendo Imagen...",
      allowOutsideClick: false, // Impide que el usuario cierre el mensaje accidentalmente
      didOpen: () => {
        Swal.showLoading(); 
      },
    });

    try {
      
      console.log(`${this.baseUrl}/uploads`);
      
      const response = await fetch(`${this.baseUrl}/uploads`, {
        method: "POST",
        body: data, // El cuerpo de la solicitud es el FormData con el archivo
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const newData = await response.text();
      return newData; // Retorna la URL de la imagen
    } finally {
      Swal.close(); // Cierra el mensaje de carga
    }
  }

  async deleteImgItems(
    idElement: number,
    url: string,
    pathDelete: string
  ): Promise<void> {
    // Regex para extraer el ID público de la imagen desde su URL de Cloudinary
    const regex =
      /https:\/\/res\.cloudinary\.com\/[\w\-]+\/image\/upload\/([\w\-]+)/;
    const publicId = url.match(regex);

    
    Swal.fire({
      title: "Eliminando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Activa el icono de carga
      },
    });

    try {
      
      if (!publicId) {
        throw new Error("ID público de la imagen no encontrado");
      }

      const response = await fetch(
        `${API_URL}/${pathDelete}/deleteImg?id=${idElement}&publicId=${publicId[1]}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la imagen del servidor");
      }
    } finally {
      Swal.close();
    }
  }

  async deleteImgCloudinary(url: string): Promise<void> {
    const regex =
      /https:\/\/res\.cloudinary\.com\/[\w\-]+\/image\/upload\/([\w\-]+)/;
    const match = url.match(regex);

    Swal.fire({
      title: "Eliminando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Activa el icono de carga
      },
    });

    try {
      if (!match) {
        throw new Error("URL no válida o no se pudo extraer el ID público.");
      }

      const response = await fetch(
        `${this.baseUrl}/deleteImg?publicId=${match[1]}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la imagen en Cloudinary");
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la imagen.", "error");
    } finally {
      Swal.close(); 
    }
  }
}
