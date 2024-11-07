import React from 'react'

export const PopUpCreateOffice = () => {
  return (
    <>
    
    <Modal show={displayPopUpEditOffice} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton >
            <Modal.Title>Editar Sucursal</Modal.Title>
        </Modal.Header> 
        {/*Datos de entrada*/}
        <Modal.Body>
        <div className={styles.main_container_inputs}>
            {/*primer set de inputs*/}
            <div className={styles.inpunts_style}>
                <FloatingLabel
                    label="Ingrese nombre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.nombre} type="text" placeholder="JonhDoe" name={"nombre"} onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Apertura">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.horarioApertura}  type="text" name='horarioApertura' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Hora de Cierre">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.horarioCierre}  type="text" name='horarioCierre' onChange={handleChangeInputs} />
                </FloatingLabel>
                <div>
                    <UploadImage image={updatedSucursal.logo} setImage={()=>{
                        updatedSucursal.logo=logo
                    }} />
                </div>
            </div>
            {/*Segundo set de inputs */}
            <div className={styles.inpunts_style}>
                <FloatingLabel
                    label="Pais">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={country}  type="text" placeholder="Argentina" onChange={(e)=>{
                        (e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Provincia">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={province}  type="text" placeholder="Mendoza" onChange={(e)=>{
                        setProvince(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Localidad">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={locality}  type="text" placeholder="Mendoza" onChange={(e)=>{
                        setLocality(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Latitud">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.latitud}  type="text" name='latitud' onChange={handleChangeInputs} />
                </FloatingLabel>
                <FloatingLabel
                    label="Longitud">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.longitud}  type="text" name='longitud' onChange={handleChangeInputs} />
                </FloatingLabel>
            </div>
            {/*Tercer set de inputs */}
            <div className={styles.inpunts_style}>
            <FloatingLabel
                    label="Nombre Calle">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={updatedSucursal.domicilio.calle}  type="text" name='domicilio' onChange={(e)=>{
                        updatedSucursal.domicilio.calle=e.target.value
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Numero de Calle">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={streetNumber}  type="text" placeholder="1212" onChange={(e)=>{
                        updatedSucursal.domicilio.numero=Number(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Codigo postal">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={postalCode}  type="text" placeholder="4450" onChange={(e)=>{
                        setPostalCode(Number(e.target.value))
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Piso">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={floorNumber}  type="text" placeholder="3" onChange={(e)=>{
                        setFloorNumber(Number(e.target.value))
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    label="Departamento">
                    <Form.Control style={{
                            width:"20rem",  
                    }} value={deparmentNumber}  type="text" placeholder="14" onChange={(e)=>{
                        setDeparmentNumber(Number(e.target.value))
                    }} />
                </FloatingLabel>
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="success" onClick={()=>{
                handleSave()
            }}>
                Guardar Cambios
            </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
