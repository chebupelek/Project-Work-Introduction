import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function AddModal(props) {
    const [newTask, setNewTask] = useState({ title: '', content: '' });

    const handleSubmit = () => {
        props.addTask(newTask.title, newTask.content);
        setNewTask({ title: '', content: '' });
        props.handleClose();
    };

    const isFormValid = newTask.title.trim() !== '' && newTask.content.trim() !== '';

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить задачу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" placeholder="Название" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Описание" value={newTask.content} onChange={(e) => setNewTask({ ...newTask, content: e.target.value })} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>Отмена</Button>
                <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid} > Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddModal;