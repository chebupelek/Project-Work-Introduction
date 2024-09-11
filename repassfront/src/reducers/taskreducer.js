const DELETE_TASK = "DELETE_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";
const ADD_TASK = "ADD_TASK";
const CLEAR_TASKS = "CLEAR_TASKS";
const LOAD_TASKS = "LOAD_TASKS";

let initialState = {
    num: 0,
    tasks: []
}

const tasksReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case DELETE_TASK:
            newState.tasks = newState.tasks.filter(task => task.id !== action.id);
            newState.num = newState.num - 1;
            return newState;
        case UPDATE_TASK:
            newState.tasks = newState.tasks.map(task =>
                task.id === action.id
                    ? {...task, title: action.title, content: action.content}
                    : task);
            console.log(newState);
            return newState;
        case UPDATE_TASK_STATUS:
            newState.tasks = newState.tasks.map(task =>
                task.id === action.id
                    ? {...task, status: action.status}
                    : task);
            return newState;
        case ADD_TASK:
            let allId = newState.tasks.map(task => task.id);
            let maxId = Math.max(...allId);
            if(maxId < 0){
                maxId = -1;
            }
            const newTask = {
                id: maxId + 1,
                title: action.title,
                content: action.content,
                status: 'nodone'
            };
            newState.tasks.unshift(newTask);
            newState.num = newState.num + 1;
            return newState;
        case CLEAR_TASKS:
            newState = {};
            return newState;
        case LOAD_TASKS:
            newState = action.data;
            return newState;
        default:
            return newState;
    }
}

export function deleteTask(id){
    return {type: DELETE_TASK, id: id}
}

export function updateTask(id, title, content){
    return {type: UPDATE_TASK, id: id, title: title, content: content}
}

export function updateTaskStatus(id, status){
    return {type: UPDATE_TASK_STATUS, id: id, status: status}
}

export function addTask(title, content){
    return {type: ADD_TASK, title: title, content: content}
}

export function saveTasks() {
    return (dispatch, getState) => {
        const state = getState();
        const jsonTasks = JSON.stringify(state.tasks, null, 2);
        const now = new Date();
        const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}.${now.getFullYear()}`;
        const formattedTime = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}.${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
        const fileName = `${formattedDate}_${formattedTime}.json`;
        let doc = document.createElement('a');
        let file = new Blob([jsonTasks], { type: 'application/json' });
        doc.href = URL.createObjectURL(file);
        doc.download = fileName;
        doc.click();
        URL.revokeObjectURL(doc.href);
    };
}

export function loadTasks(file) {
    return dispatch => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            try {
                const parsedData = JSON.parse(content);
                console.log(parsedData);
                dispatch({ type: CLEAR_TASKS});
                dispatch({ type: LOAD_TASKS, data: parsedData });
            } catch (error) {
                alert("Ошибка при загрузке файла. Пожалуйста, убедитесь, что файл в правильном формате.");
            }
        };
        reader.readAsText(file);
    };
}

export default tasksReducer;