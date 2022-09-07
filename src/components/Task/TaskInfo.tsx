import { useEffect, useState } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

const TaskInfo = (props: any) => {
    const [edit, setEdit] = useState(false)

    const [timeFlag, setTimeFlag] = useState({
        minutes: 0,
        seconds: 0,
    });
    const [timerOn, setTimerOn] = useState(false);

    useEffect(() => {
        setTimeFlag(() => {
            if (props.min === '') {
                props.min = 0;
            }
            if (props.sec === '') {
                props.sec = 0;
            }
            return {
                minutes: props.min,
                seconds: props.sec,
            };
        });
    }, []);

    useEffect(() => {
        let interval: any = null;
        if (timerOn) {
            interval = setInterval(() => {
                if (timeFlag.seconds > 0) {
                    setTimeFlag(() => {
                        return {
                            seconds: timeFlag.seconds - 1,
                            minutes: timeFlag.minutes,
                        };
                    });
                    props.setTimeFromTimer(props.id, timeFlag.minutes, timeFlag.seconds);
                }
                if (timeFlag.seconds === 0 && timeFlag.minutes > 0) {
                    setTimeFlag((timeFlag) => {
                        return {
                            seconds: timeFlag.seconds + 59,
                            minutes: timeFlag.minutes - 1,
                        };
                    });
                    props.setTimeFromTimer(props.id, timeFlag.minutes, timeFlag.seconds);
                } else {
                    clearInterval(interval);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerOn, timeFlag.minutes, timeFlag.seconds]);

    let m: string | number = timeFlag.minutes;
    let s: string | number = timeFlag.seconds;

    m < 10 && (m = '0' + m);
    s < 10 && (s = '0' + s);

    const editToDo = () => {
        setEdit(!edit)
    }

    let classNames = '';
    let classNamesD = 'description';
    if (props.done) {
        classNames = 'completed';
    }

    if (props.important) {
        classNamesD += ' important';
    }

    return (
        <li className={classNames}>
            <div className="view">
                <input className="toggle" type="checkbox" onClick={props.onToggleImportant} />
                <label>
                    {
                        edit ?
                            <div>
                                <input
                                    className="inputChangeValue"
                                    defaultValue={props.label}
                                    onKeyDown={(e: any) => {
                                        if (e.key === 'Escape' || e.key === 'Enter') {
                                            props.onSaveChange(props.id, e.target.value)
                                            setEdit(false)
                                        }
                                    }}
                                />
                            </div>
                            : <div className={classNamesD}><span onClick={props.onToggleDone}>{props.label}</span></div>
                    }
                    <span className="description">
                        <button
                            onClick={() => setTimerOn(true)}
                            className="icon-play"
                        ></button>
                        <button
                            onClick={() => setTimerOn(false)}
                            className="icon-pause"></button>
                        <p className="timeTask">{m}:{s}</p>
                    </span>
                    <span className="created">{formatDistanceToNow(props.time, { includeSeconds: true })}</span>
                </label>
                <button
                    className="icon icon-edit"
                    onClick={editToDo}
                ></button>
                <button className="icon icon-destroy" onClick={props.onDeleted}></button>
            </div>
        </li>
    );
}

export default TaskInfo