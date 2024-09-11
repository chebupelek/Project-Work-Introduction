import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddModal from '../addmodal/addmodal';
import { saveTasks, loadTasks } from '../../reducers/taskreducer';
import { useDispatch } from 'react-redux';

function Header(props) {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState(null);

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const handleShowModal = () => {
        setShowModal(true)
    };

    const handleSave = () => {
        dispatch(saveTasks());
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            dispatch(loadTasks(file));
        }
    };

    return (
        <div className='w-100 align-items-center'>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Задачи</h2>
                <Button variant="primary" onClick={handleShowModal}>Добавить</Button>
                <Button variant="success" onClick={handleSave}>Сохранить</Button>
                <input type="file" accept=".json" style={{ display: 'none' }} ref={input => setFile(input)}onChange={handleFileChange}/>
                <Button variant="info" onClick={() => file.click()}>Загрузить</Button>
            </div>
            <AddModal show={showModal} handleClose={handleCloseModal} addTask={props.addTask}/>
        </div>
    );
}

export default Header;