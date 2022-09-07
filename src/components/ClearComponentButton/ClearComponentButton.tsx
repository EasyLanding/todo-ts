import '../Footer/Footer.css'

const ClearComponentButton = (props: any) => {
    return (
        <button
            className="clear-completed"
            key={"abcdf"}
            onClick={() => props.onClearChange()}
        > Clear completed</button>
    )
}

export default ClearComponentButton