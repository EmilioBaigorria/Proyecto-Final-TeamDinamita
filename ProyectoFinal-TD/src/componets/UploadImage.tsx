import { FC } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import noImage from "../assets/images/noImage.jpeg";
import { IImagen } from "../types/IImagen";
import { ImageService } from "../services/ImageService";

interface IUploadImage {
  image?: string | null; 
  setImage?: (image: string | null) => void; 
  imageObjeto?: IImagen | null; 
  setImageObjeto?: (image: IImagen | null) => void; 
  typeElement?: string; 
}


export const UploadImage: FC<IUploadImage> = ({
  image,
  setImage,
  imageObjeto,
  setImageObjeto,
  typeElement,
}) => {
  const imageService = new ImageService("images");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("uploads", file);

      Swal.fire({
        title: "Subiendo...",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const data = await imageService.uploadImage(formData);

        if (setImage) {
          setImage(data);
        }

        if (setImageObjeto) {
          setImageObjeto({
            url: data,
            name: file.name,
          });
        }
      } catch (error) {
        console.log(error); 
      }

      Swal.close();
    }
  };

  const elementActive = { id: 45 };

  const handleDeleteImagen = async () => {
    if (imageObjeto && setImageObjeto && elementActive && typeElement) {
      await imageService
        .deleteImgItems(elementActive?.id, imageObjeto.url, typeElement)
        .then(() => {
          setImageObjeto(null);
        });
    }
    
    else if (image && setImage) {
      await imageService.deleteImgCloudinary(image).then(() => {
        setImage(null);
      });
    }
  };

  return (
    <div
      style={{
        width: "22vw",
        border: "1px solid #ccc",
        borderRadius: ".4rem",
        padding: ".4rem",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {image || imageObjeto ? (
        <div
          style={{
            borderRadius: ".4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: ".4rem",
          }}
        >
          <div style={{ width: "10vw" }}>
            <Button
              onClick={handleDeleteImagen}
              variant="outlined"
              color="error"
            >
              ELIMINAR LOGO
            </Button>
          </div>
          <img
            src={imageObjeto ? imageObjeto.url : image!}
            alt="Uploaded"
            style={{
              backgroundColor: "#ccc",
              width: "10vw",
              borderRadius: ".4rem",
              height: "10vh",
              objectFit: "fill",
            }}
          />
        </div>
      ) : (
        <>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="outlined" component="span">
              AGREGAR LOGO
            </Button>
          </label>
          <div>
            <img
              src={noImage}
              alt="Uploaded"
              style={{ maxWidth: "100px", height: "auto" }}
            />
          </div>
        </>
      )}
    </div>
  );
};
