import { useState } from 'react';
import { useEffect } from 'react';
import { Accordion, Card, Button, Form, Col } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function TaskCard(props) {
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ title: props.task.title, content: props.task.content });

    useEffect(() => {
        setEditData({ title: props.task.title, content: props.task.content });
    }, [props.task]);

    console.log(props.task);
    console.log(editData);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveEdit = () => {
        if (editData.title.trim() !== '' && editData.content.trim() !== ''){
            props.edit(props.task.id, editData.title, editData.content);
            setEditMode(false);
        }
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        props.statusChange(props.task.id, newStatus);
    };

    const openTask = useAccordionButton(props.task.id.toString());

    return (
        <Card className="mb-3">
            <Card.Header style={{backgroundColor: props.task.status === 'done' ? '#d4edda' : '#f8d7da'}}>
                <div className="d-flex justify-content-between align-items-center">
                    <Col sm={7}>
                        {editMode ? (
                                <Form.Control type="text" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })}/>
                            ) : (
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.task.title}</span>
                        )}
                    </Col>
                    <Col sm={2} className="text-center">
                        <Form.Select size="sm" value={props.task.status} onChange={handleStatusChange}>
                            <option value='done'>Готово</option>
                            <option value='nodone'>Делаю</option>
                        </Form.Select>
                    </Col>
                    <Col sm={1} className="text-center">
                        {editMode ? (
                                <Button variant="success" size="sm" className="me-1" onClick={handleSaveEdit} disabled={editData.title.trim()==='' || editData.content.trim()===''}>Ok</Button>
                            ) : (
                                <Button variant="warning" size="sm" className="me-1" onClick={handleEditClick}>Ред.</Button>
                        )}
                    </Col>
                    <Col sm={1} className="text-center">
                        <Button variant="danger" size="sm" onClick={() => props.delete(props.task.id)}>Уд.</Button>
                    </Col>
                    <Col sm={1} className="text-center">
                        <Button size="sm" onClick={openTask}>Открыть</Button>
                    </Col>
                </div>
            </Card.Header>
            <Accordion.Collapse eventKey={props.task.id.toString()}>
                <Card.Body>
                    {editMode ? (
                            <Form.Control as="textarea" rows={3} value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })}/>
                        ) : (
                            props.task.content
                    )}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default TaskCard;
