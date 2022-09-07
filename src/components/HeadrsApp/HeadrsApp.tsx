import { useState } from 'react';
import "./HeadrsApp.css"

const HeadrsApp = (props: any) => {
    const [term, setTerm] = useState('')

    const onTermChange = (e: any) => {
        setTerm(e.target.value);

        props.onSearchChange(e.target.value);
    }

    return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo"
                placeholder="Search you Task ToDay..."
                value={term}
                onChange={onTermChange}
            />
        </header>
    )
}

export default HeadrsApp