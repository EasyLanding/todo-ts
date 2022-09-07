import './Task.css';
import TaskInfo from './TaskInfo';

const Task = (props: any) => {
    const elements = props.todos.map((el: any) => {
        const { id, ...itemProps } = el;
        return (
            <TaskInfo
                key={id}
                {...itemProps}
                onDeleted={() => props.onDeleted(id)}
                onToggleImportant={() => props.onToggleImportant(id)}
                onToggleDone={() => props.onToggleDone(id)}
                onAdded={() => props.onAdded(id)}
                onSaveChange={props.onSaveChange}
                id={id}
                setTimeFromTimer={props.setTimeFromTimer}
            />
        );
    });
    return (
        <ul className="todo-list">
            {elements}
        </ul>
    );
}

export default Task