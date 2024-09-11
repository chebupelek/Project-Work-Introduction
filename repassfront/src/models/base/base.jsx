import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Container, Row, Col } from 'react-bootstrap';
import { deleteTask, updateTask, updateTaskStatus, addTask } from '../../reducers/taskreducer';
import TaskCard from '../taskcard/taskcard';
import DeleteModal from '../deleteModal/deleteModal';
import Header from '../header/header';

function Base() {
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.tasks);
    const [isShowModal, setIsShowModal] = useState(false);
    const [taskForDeleting, setTaskForDeleting] = useState(null);

    const handleIsDelete = (id) => {
        setTaskForDeleting(id);
        setIsShowModal(true);
    };

    const handleDelete = () => {
        dispatch(deleteTask(taskForDeleting));
        setIsShowModal(false);
    };

    const handleClose = () => {
        setIsShowModal(false);
    };

    const handleEditTask = (id, title, content) => {
        dispatch(updateTask(id, title, content));
    };

    const handleStatusChange = (id, status) => {
        dispatch(updateTaskStatus(id, status));
        console.log(tasks);
    };

    const handleAddTask = (title, content) => {
        dispatch(addTask(title, content));
    };

    return (
        <Container>
            <Col sm={12}>
                <Row>
                    <Col sm={12} className="mb-3">
                        <Header addTask={handleAddTask}/>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm={2}></Col>
                    <Col sm={8}>
                        <Accordion alwaysOpen>
                            {tasks.tasks.map((task) => (
                                <TaskCard key={task.id} task={task} delete={handleIsDelete} edit={handleEditTask} statusChange={handleStatusChange}/>
                            ))}
                        </Accordion>
                    </Col>
                    <Col sm={2}></Col>
                </Row>
            </Col>
            <DeleteModal show={isShowModal} close={handleClose} delete={handleDelete}/>
        </Container>
    );
}

export default Base;