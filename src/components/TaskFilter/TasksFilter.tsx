import './TaskFilter.css'

const TasksFilter = (props: any) => {
    let buttons = [
        { name: "all", label: "All" },
        { name: "active", label: "Active" },
        { name: "completed", label: "Completed" }
    ]

    const buttonsEl = buttons.map(({ name, label }) => {
        const isActive = props.filter === name
        const cl = isActive ? "selected" : ""
        return (
            <li key={name}>
                <button className={`${cl}`}

                    onClick={() => props.onFilterChange(name)}

                >{label}</button>
            </li>
        )
    })
    return (
        <ul className="filters">
            {buttonsEl}
        </ul>
    )
}

export default TasksFilter