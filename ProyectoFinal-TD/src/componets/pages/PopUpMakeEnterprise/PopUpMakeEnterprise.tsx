import { FC } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"


interface IDisplayPopUp{
    display:boolean,
    setDisplay:Function
}
export const PopUpMakeEnterprise: FC<IDisplayPopUp> = ({display,setDisplay}) => {
    
return (
    <div style={{
        position:"absolute",
        width:"100vw",
        height:"100vh",
        display:display ? "flex" : "none",
        alignItems:"center",
        justifyContent:"center",
        backdropFilter:"blur(4px)"  

    }}>
        <div style={{
            width:"30vw",
            height:"60vh",
            backgroundColor:"#E5E7C6",
            borderRadius:".4rem",
            position:"absolute",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            gap:".4rem",
            boxShadow:"5px 2px 10px 10px grey",
        }}>
            <h2>Crear empresa</h2>
            {/*Inputs*/}
            <FloatingLabel
                label="Ingrese nombre">
                <Form.Control style={{
                        width:"20rem",  
                }} type="text" placeholder="JonhDoe" />
            </FloatingLabel>
            <FloatingLabel
                label="Razon social">
                <Form.Control style={{
                        width:"20rem",  
                }} type="text" placeholder="22331155" />
            </FloatingLabel>
            <FloatingLabel
                label="Cuit">
                <Form.Control style={{
                        width:"20rem",  
                }} type="text" placeholder="462984313" onChange={()=>{
                    
                }} />
            </FloatingLabel>
            {/*Imagen*/}
            <div style={{
                width:"100%",
                height:"100%",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                gap:"1rem"
            }}>
                <Button  variant="warning">Agregar Imagen</Button>
                {/*Un placeholder hasta que se añada la funcion de subir imagenes*/}
                <img src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg" style={{
                    width:"128px"
                }}/>
            </div>
            {/*Botones inferiores*/}
            <div style={{
                width:"100%",
                height:"100%",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                gap:"25%"
            }}>
                <Button variant="danger" onClick={()=>{
                    setDisplay(!display)   
                }}>Cancelar</Button>
                <Button variant="success">Aceptar</Button>
            </div>
            
        </div>
    </div>
)

}
