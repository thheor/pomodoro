import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCircleCheck, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

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
        if(input !== ''){
            let id = self.crypto.randomUUID();
            const newTask = {id: id, item: input, isDone: false };
            setTask(prev => [...prev, newTask]);
            setInput('');
        } else {
            alert('Please input a text');
        }
    }
    
    return(
        <div className={`flex justify-center mt-10 font-display mb-10 ${props.isFocus ? 'text-TextLight' : 'text-BreakText'}`}>
            {
                !isTask ? <button onClick={handleIsTask} 
                className={`${props.isFocus ? 'bg-Focus-component/30 hover:bg-Focus-component/50' : 'bg-Break-component'}
                transition ease-in-out duration-150 p-2 w-80 px-3 border border-Focus-component border-dashed rounded`}>
                    <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
                    Let's add a task</button> 
                : 
                <div>
                    <form action="" className="flex gap-5 justify-center">
                        <input type="text" name="item" id="task" placeholder="What are you working on?" value={input} onChange={(e) => {setInput(e.target.value)}}
                        className={`${props.isFocus ? 'border-Focus-component ' : 'border-Break-component'}
                        p-2 border rounded-md focus:outline-none w-70`} />
                        <button onClick={handleSubmit}
                        className={`${props.isFocus ? 'bg-Focus-component/60 border-Focus-component text-TextLight hover:bg-Focus-component/30' : 'bg-Break-component/60 border-Break-component hover:bg-Break-component/40'}
                        border p-2 rounded-md cursor-pointer transition duration-200 ease-in-out`}>Add Task</button>
                    </form>
                    <ul className="">{task.map((list) => {

                        const handleRemove = () => {
                            const newList = task.filter(items => items.id !== list.id);
                            console.log(newList);
                            setTask(newList);
                        }

                        const handleCheck = () => {
                            let newList;
                            if(list.isDone === false){
                                newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, isDone: true } : { id: items.id, item: items.item, isDone: items.isDone });
                            } else {
                                newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, isDone: false } : { id: items.id, item: items.item, isDone: items.isDone });
                            }
                            console.log(newList);
                            setTask(newList);
                        }

                        return (
                        <li key={list.id}
                        className={`${props.isFocus ? 'bg-Focus-component/30' : 'bg-Break-component/30 '}
                        ${list.isDone ? 'line-through brightness-50' : 'transiiton duration-150 ease-in-out hover:scale-102'}
                        relative text-xl mt-2 p-2 pr-15 rounded-md max-w-md`}>
                            {list.item}
                            <FontAwesomeIcon icon={faCircleCheck} onClick={handleCheck}
                            className="absolute right-7 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-120 scale-110 hover:brightness-175 hover:right-10 cursor-pointer" />
                            <FontAwesomeIcon icon={faTrash} onClick={handleRemove}
                            className="absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 hover:brightness-175 cursor-pointer" /></li>
                    )})}</ul>
                </div>
            }
        </div>
    );
}