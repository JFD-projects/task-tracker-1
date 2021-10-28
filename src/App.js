import React, {useEffect, useState} from "react";
import imgList from "./assets/img/list.svg";
import {AddCategory, List, Tasks} from "./components";
import axios from "axios";
import {Route, useHistory, useLocation} from "react-router-dom"

function App() {
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [activeList, setActiveList] = useState([
        {
            id: 'all_tasks'
        }])
    const history = useHistory()
    const location = useLocation()
    useEffect(() => {
        setIsLoading(true)
        const promise1 = axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks');
        const promise2 = axios.get('http://localhost:3001/colors');

        Promise.all([promise1, promise2]).then(function (values) {
            setLists(values[0].data)
            setColors(values[1].data)
        }).finally(() => setIsLoading(false))
    }, [])
    useEffect(() => {
            const listId = location.pathname.split('lists/')[1];
            if (lists) {
                const list = lists.find(list => list.id === Number(listId));
                setActiveList(list);
            }
    }, [lists, location.pathname])
    const onAddList = (obj) => {
        setLists([...lists, obj])
    }
    const onAddTask = (obj) => {
        const newList = lists.map(item => {
            if (item.id === obj.listId){
                item.tasks = [...item.tasks, obj]
            }
            return item
        })
        setLists(newList)
    }
    const onRemoveTask = (listId, taskId)=> {
        if(window.confirm('Вы действительно хотите удалить задачу?')){
            const newList = lists.map(list => {
                if (list.id === listId){
                     list.tasks = list.tasks.filter(task => task.id !== taskId)
                }
                return list
            })
            setLists(newList)
            axios.delete('http://localhost:3001/tasks/' + taskId)
                .catch(()=>{alert('Не удалось удалить задачу')
                })
        }
    }
    const onEditTask = (listId, taskObj)=>{
        const newText = window.prompt('Введите текст', taskObj.text)
        if(newText){
            const newList = lists.map(list => {
                if (list.id === listId){
                    list.tasks = list.tasks.map(task => {
                        if (task.id === taskObj.id){
                            task.text = newText
                        }
                        return task
                    })
                }
                return list
            })
            setLists(newList)
            axios.patch('http://localhost:3001/tasks/' + taskObj.id, {
                text: newText
            })
                .catch(()=>{alert('Не удалось обновить задачу')
                })
        }

    }
    const onCompleteTasks = (listId, taskId, completed)=>{
        const newList = lists.map(list => {
            if (list.id === listId){
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskId){
                        task.completed = completed
                    }
                    return task
                })
            }
            return list
        })
        setLists(newList)
        axios.patch('http://localhost:3001/tasks/' + taskId, {
            completed
        })
            .catch(()=>{alert('Не удалось обновить задачу')
            })
    }
    const onRemoveItem = (id) => {
        const newObj = lists.filter(list => list.id !== id)
        setLists(newObj)
    }
    const onClickCategory = (item) => {
        if (item.id === 'all_tasks'){
            history.push(`/`)
        } else {
            history.push(`/lists/${item.id}`)
        }
    }
    const onEditListTitle =(title,id )=>{
        const newObj = lists.map(list=>{
            if (list.id === id){
                list.name = title
            }
            return list
        })
        setLists(newObj)
    }
    return (
        <div className="todo">
            {isLoading
                ? <h1>Loading</h1>
                :
                <>
                    <div className="todo__sidebar">
                        <List items={[
                            {
                                id: 'all_tasks',
                                name: 'Все задачи',
                                icon: <img src={imgList} alt="List icon"/>
                            }]}
                              activeList={activeList}
                              onClickCategory={onClickCategory}
                        />
                        <List items={lists}
                              onClickCategory={onClickCategory}
                              onRemove={onRemoveItem}
                              activeList={activeList}
                              isRemovable/>
                        <AddCategory onAddList={onAddList}
                                     colors={colors}/>
                    </div>
                    <div className="todo__tasks">
                        <Route exact path="/">
                            {
                                lists && lists.map(list => (
                                    <Tasks key={list.id}
                                           onEditTitle={onEditListTitle}
                                           onAddTask={onAddTask}
                                           withoutEmpty
                                           onCompleteTasks={onCompleteTasks}
                                           onRemoveTask={onRemoveTask}
                                           onEditTask={onEditTask}
                                           list={list}/>
                                ))
                            }
                        </Route>
                        <Route path="/lists/:id">
                            {
                                (lists && activeList) && <Tasks onEditTitle={onEditListTitle}
                                                                onAddTask={onAddTask}
                                                                onEditTask={onEditTask}
                                                                onRemoveTask={onRemoveTask}
                                                                onCompleteTasks={onCompleteTasks}
                                                                list={activeList}/>
                            }
                        </Route>

                    </div>
                </>
            }

        </div>
    );
}

export default App;
