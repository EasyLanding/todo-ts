import './Footer.css'

const Footer = (props: any) => {
    return (
        <span className="todo-count">
            {props.toDo} more to do, {props.done} done
        </span>
    )
}
export default Footer