import axios from "axios";


export const listsAPI = {
    getLists() {
        return axios.get('http://localhost:3001/lists?_expand=color')
            .then(res => res.data)
    },
    addList(newList) {
        return axios.post('http://localhost:3001/lists/', newList).then(res => res.data)
    },
    removeList(id) {
        return axios.delete('http://localhost:3001/lists/' + id).then(res => res)
    },
    editTitle (listId, newTitle) {
        return axios.patch('http://localhost:3001/lists/' + listId, {
            name: newTitle
        }).then(res => res.status)
    }

}

export const tasksAPI = {
    getTasks() {
        return axios.get('http://localhost:3001/tasks/').then(res => res.data)
    },
    addTask(objTask){
        return axios.post('http://localhost:3001/tasks/', objTask).then(res => res.data)
    },
    removeTask(taskId, listId) {
        if (listId) {
            /*return axios.post('http://localhost:3001/tasks/', ...newTasks).then(res => res.data)*/
            return axios.delete('http://localhost:3001/tasks/', {params: {listId: listId}}).then(res => res)
        } else {
            return axios.delete('http://localhost:3001/tasks/' + taskId).then(res => res)

        }
    },
    editTask (taskId, newTitle) {
        return axios.patch('http://localhost:3001/tasks/' + taskId, {
            text: newTitle
        }).then(res => res.status)
    },
    editAttitudeTask(taskId, attitude){
        return axios.patch('http://localhost:3001/tasks/' + taskId, {
            attitude
        }).then(res => res.status)
    }
}