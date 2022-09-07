import React, { useState } from 'react';
import HeadrsApp from '../HeadrsApp/HeadrsApp';
import Footer from '../Footer/Footer';
import Task from '../Task/Task';
import AddElement from '../AddElement/AddElement';
import '../Footer/Footer.css'
import TasksFilter from '../TaskFilter/TasksFilter';
import ClearComponentButton from '../ClearComponentButton/ClearComponentButton';

let nextId = 100
let keys = 101
let newArr: { label: any; important: boolean; done: boolean; id: number; key: number; time: Date; min: any; sec: any; }[] = []

const App = () => {
    const createToDoItem = (label: string, min: number, sec: number) => {

        return {
            label,
            important: false,
            done: false,
            id: nextId++,
            key: keys++,
            time: new Date(),
            min: min,
            sec: sec
        }
    }

    const todoData = [createToDoItem("Completed task", 10, 11), createToDoItem("Active task", 10, 11), createToDoItem("Editing task", 10, 11)]
    const [todoTask, setTodoTask] = useState(todoData)
    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')
    newArr = [...todoTask]

    const deletedItem = (id: number) => {
        setTodoTask((todoTask) => {
            const index = todoTask.findIndex((el) => el.id === id)

            const beforeArray = todoTask.slice(0, index)
            const afterArray = todoTask.slice(index + 1)
            const newArray = [...beforeArray, ...afterArray]

            return newArray

        })
    }

    const onAddItem: Function = (text: string, min: number, sec: number) => {
        const newItem = createToDoItem(text, min, sec)
        setTodoTask((todoTask) => {
            const newArr = [...todoTask, newItem]

            return newArr
        })
    }

    const onToggleDone = (id: number) => {
        setTodoTask((todoTask) => {
            const index = todoTask.findIndex((el) => el.id === id)
            const oldData = todoTask[index]

            const newItem = { ...oldData, done: !oldData.done }

            const newArray = [
                ...todoTask.slice(0, index),
                newItem,
                ...todoTask.slice(index + 1)
            ]

            return newArray
        })
    }

    const onToggleImportant = (id: number) => {
        setTodoTask((todoTask) => {
            const index = todoTask.findIndex((el) => el.id === id)
            const oldData = todoTask[index]

            const newItem = { ...oldData, important: !oldData.important }

            const newArray = [
                ...todoTask.slice(0, index),
                newItem,
                ...todoTask.slice(index + 1)
            ]

            return newArray
        })
    }

    const onSearchChange = (term: React.SetStateAction<string>) => {
        setTerm(term)
    };

    const searchItems = (items: any[], term: string) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item: { label: string; }) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    const filterTask = (items: any[], filter: string) => {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item: { done: any; }) => (!item.done));
        } else if (filter === 'completed') {
            return items.filter((item: { done: any; }) => item.done);
        }
    }

    const onFilterChange = (filter: React.SetStateAction<string>) => {
        setFilter(filter);
    };

    const onClearChange = () => {
        todoTask.forEach((el) => {

            if (el.done) {
                deletedItem(el.id)
            }
        })
    }

    const onSaveChange = (id: number, text: string) => {
        setTodoTask((todoTask) => {
            const idx = todoTask.findIndex((el) => el.id === id)
            todoTask[idx].label = text
            return newArr
        })
    }
    const setTimeFromTimer = (id: number, minutes: number, seconds: number) => {
        let todos = todoTask;
        todos.forEach((item) => {
            if (item.id === id) {
                item.min = minutes;
                item.sec = seconds;
            }
        });
        setTodoTask(todos);
    };

    const visibleItems = filterTask(searchItems(todoTask, term), filter)

    const doneCount = todoTask.filter((el) => el.done).length
    const todoCount = todoTask.length - doneCount

    return (
        <section className="todoapp">
            < HeadrsApp
                onSearchChange={onSearchChange}
            />
            <section className="main">
                <Task
                    todos={visibleItems}
                    onDeleted={deletedItem}
                    onToggleImportant={onToggleImportant}
                    onToggleDone={onToggleDone}
                    onSaveChange={onSaveChange}
                    setTimeFromTimer={setTimeFromTimer} onAdded={undefined} />
                <AddElement
                    onAdded={onAddItem}
                />
            </section>
            <footer className="footer">
                < Footer
                    toDo={todoCount}
                    done={doneCount}
                />
                < TasksFilter
                    filter={filter}
                    onFilterChange={onFilterChange}
                />
                <ClearComponentButton
                    onClearChange={onClearChange}
                />
            </footer>
        </section>
    )
}

export default App