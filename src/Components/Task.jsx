import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export function Task(props){
    const [task, setTask] = useState(() => {
        const savedData = localStorage.getItem('Tasks');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [isTask, setIsTask] = useState(task.length === 0 ? false : true);
    const [input, setInput] = useState('');

    useEffect(() => {
        
        task.length === 0 ? setIsTask(false) : setIsTask(true);

        localStorage.setItem('Tasks', JSON.stringify(task));
    }, [task]);

    const handleIsTask = () => {
        setIsTask(!isTask);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let id = self.crypto.randomUUID();
        const newTask = {id: id, item: input, isDone: false };
        setTask(prev => [...prev, newTask]);
        setInput('');
    }
    
    return(
        <div className={`flex justify-center mt-10 font-display ${props.isFocus ? 'text-TextLight' : 'text-BreakText'}`}>
            {
                !isTask ? <button onClick={handleIsTask} 
                className={`${props.isFocus ? 'bg-Focus-component/60 hover:bg-Focus-component/80' : 'bg-Break-component'}
                transition ease-in-out duration-200 p-2 px-3 rounded-xl`}>Let's add a task</button> 
                : 
                <div>
                    <form action="" className="flex gap-5">
                        <input type="text" name="item" id="task" placeholder="add a task..." value={input} onChange={(e) => {setInput(e.target.value)}}
                        className={`${props.isFocus ? 'border-Focus-component ' : 'border-Break-component'}
                        p-2 border rounded-md focus:outline-none w-70`} />
                        <button onClick={handleSubmit}
                        className={`${props.isFocus ? 'bg-Focus-component/60 border-Focus-component text-TextLight hover:bg-Focus-component/30' : 'bg-Break-component/60 border-Break-component hover:bg-Break-component/40'}
                        border p-2 rounded-md cursor-pointer transition duration-200 ease-in-out`}>Add Task</button>
                    </form>
                    <ul className="relative">{task.map((list) => {

                        const handleRemove = () => {
                            const newList = task.filter(items => items.id !== list.id);
                            console.log(newList);
                            setTask(newList);
                        }

                        const handleCheck = () => {
                            console.log('clicked')
                            const newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, isDone: true } : { id: items.id, item: items.item, isDone: items.isDone });
                            console.log(newList);
                            setTask(newList);
                        }

                        return (
                        <li key={list.id}
                        className={`${props.isFocus ? 'bg-Focus-component/30' : 'bg-Break-component/30 '}
                        ${list.isDone ? 'line-through brightness-50 pointer-events-none' : 'transiiton duration-300 ease-in-out hover:scale-102'}
                        mt-2 p-2 rounded-md `}>
                            {list.item}
                            <FontAwesomeIcon icon={faCircleCheck} onClick={handleCheck}
                            className="absolute right-8 hover:scale-120 scale-110 hover:brightness-175 cursor-pointer" />
                            <FontAwesomeIcon icon={faTrash} onClick={handleRemove}
                            className="absolute right-2 hover:scale-110 hover:brightness-175 cursor-pointer pointer-events-auto" /></li>
                    )})}</ul>
                </div>
            }
        </div>
    );
}