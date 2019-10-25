import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddTaskModal(props) {



    return (
        <Modal {...props} className="add-task-modal" centered>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={props.onHide}>
                Add
            </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default AddTaskModal;