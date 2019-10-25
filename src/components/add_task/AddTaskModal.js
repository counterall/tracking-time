import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

function AddTaskModal(props) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (form.checkValidity() === true) {
            console.log(form);
        }
    };

    return (
        <Modal {...props} className="add-task-modal" centered>
            <Modal.Header closeButton>
            <Modal.Title>Add new task to track</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="add-task-modal__form">
                    <Form.Group controlId="task-tag">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Task tag"
                            defaultValue=""
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please give a Tag for this task.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="task-name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Task name"
                            defaultValue=""
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please name your task.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.onHide}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );

}

export default AddTaskModal;