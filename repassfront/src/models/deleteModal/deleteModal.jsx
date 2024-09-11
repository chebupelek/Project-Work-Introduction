import { Modal, Button } from 'react-bootstrap';

function DeleteModal(props) {
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Подтвердите действие</Modal.Title>
            </Modal.Header>
            <Modal.Body>Вы точно хотите удалить эту задачу?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Нет
                </Button>
                <Button variant="danger" onClick={props.delete}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;