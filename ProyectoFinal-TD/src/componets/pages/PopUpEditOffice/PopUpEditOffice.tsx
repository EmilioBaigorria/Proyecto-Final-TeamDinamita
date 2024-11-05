import React, { FC, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
interface IPopUpEditOffice{
    displayPopUpEditOffice :boolean,
    setDisplayPopUpEditOffice: Function
}
export const PopUpEditOffice: FC<IPopUpEditOffice> = ({displayPopUpEditOffice,setDisplayPopUpEditOffice}) => {
    

    const handleClose = () => setDisplayPopUpEditOffice(false);
    const handleShow = () => setDisplayPopUpEditOffice(true);
return (
    <>
    <Modal show={displayPopUpEditOffice} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
    </>
)
}
