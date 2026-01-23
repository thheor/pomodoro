import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCircleCheck, faCirclePlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export function Task(props){
    const [task, setTask] = useState(() => {
        const savedData = localStorage.getItem('Tasks');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [addTask, setAddTask] = useState(false);
    const [input, setInput] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        
        // task.length === 0 ? setIsTask(false) : setIsTask(true);

        localStorage.setItem('Tasks', JSON.stringify(task));
    }, [task]);

    const handleAddTask = () => {
        setAddTask(!addTask);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input !== ''){
            let id = self.crypto.randomUUID();
            const newTask = {id: id, item: input, desc: description, isDone: false, isSetting: false };
            setTask(prev => [...prev, newTask]);
            setInput('');
            setAddTask(false);
        } else {
            alert('Please input a text');
        }
    }
    
    return(
        <div className={`flex justify-center mt-10 font-display mb-10 ${props.isFocus ? 'text-TextLight' : 'text-BreakText'}`}>           
            <div className="flex flex-col w-100">
                {/* <form action="" className="flex gap-5 justify-center">
                    <input type="text" name="item" id="task" placeholder="What are you working on?" value={input} onChange={(e) => {setInput(e.target.value)}}
                    className={`${props.isFocus ? 'border-Focus-component ' : 'border-Break-component'}
                    p-2 border rounded-md focus:outline-none w-70`} />
                    <button onClick={handleSubmit}
                    className={`${props.isFocus ? 'bg-Focus-component/60 border-Focus-component text-TextLight hover:bg-Focus-component/30' : 'bg-Break-component/60 border-Break-component hover:bg-Break-component/40'}
                    border p-2 rounded-md cursor-pointer transition duration-200 ease-in-out`}>Add Task</button>
                </form> */}
                <ul className="">{task.map((list) => {
                    const handleRemove = () => {
                        const newList = task.filter(items => items.id !== list.id);
                        console.log(newList);
                        setTask(newList);
                    }

                    const handleUpdate = (e) => {
                        e.preventDefault();
                        const newList = task.map(items => items.id === list.id ? {id: items.id, item: input, desc: items.desc, isDone: items.isDone} : {id: items.id, item: items.item, desc: items.desc, isDone: items.isDone} )
                        console.log(newList);
                        setTask(newList);
                        setIsSetting(!isSetting);
                    }

                    const handleCheck = () => {
                        let newList;
                        if(list.isDone === false){
                            newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, isDone: true, isSetting: items.isSetting } : { id: items.id, item: items.item, isDone: items.isDone, isSetting: items.isSetting });
                        } else {
                            newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, isDone: false, isSetting: items.isSetting } : { id: items.id, item: items.item, isDone: items.isDone, isSetting: items.isSetting });
                        }
                        console.log(newList);
                        setTask(newList);
                    }

                    const handleSetting = () => {
                        let newList;
                        if(list.isSetting === false){
                            newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, isDone: items.isDone, isSetting: true } : { id: items.id, item: items.item, isDone: items.isDone, isSetting: items.isSetting });
                        } else {
                            newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, isDone: items.isDone, isSetting: false } : { id: items.id, item: items.item, isDone: items.isDone, isSetting: items.isSetting });
                        }
                        setTask(newList);
                    }

                    return (
                    <li key={list.id}
                    className={`${props.isFocus ? 'bg-Focus-component/30' : 'bg-Break-component/30 '}
                    ${list.isDone ? 'line-through brightness-50' : `transiiton duration-150 ease-in-out ${list.isSetting ? 'scale-102' : 'hover:scale-102'}`}
                    relative text-xl font-medium mt-2 p-2 py-3 ${list.isSetting ? 'pl-5' : 'pl-12'} rounded-md max-w-md`}>
                    {list.isSetting ? 
                    <form className="">
                        <input type="text" defaultValue={list.item} onChange={(e) => {setInput(e.target.value)}}
                        className={`${props.isFocus ? '' : ''} focus:outline-none w-full`} />
                        <p className="italic text-lg mt-2">Description</p>
                        <textarea name="description" id="description" placeholder={'Add some notes...'} cols={37}
                        className="text-base bg-FocusLight rounded p-2 focus:outline-none"></textarea>
                        <div className="flex justify-between pr-3">
                            <label htmlFor="pomodoro" className="text-lg">Pomodoro</label>
                            <input type="number" name="pomodoro" id="pomodoro" max={4} min={1} defaultValue={1}
                            className="bg-FocusLight w-10 px-1 text-base focus:outline-none rounded" />
                        </div>
                        <div className="flex justify-end items-center h-15 mt-4 border-t border-Focus-component">
                           <FontAwesomeIcon icon={faTrash} onClick={handleRemove}
                           className="absolute left-8 bottom-1 p-1 py-2 rounded transform -translate-x-1/2 -translate-y-1/2 hover:bg-Focus-component/30 hover:brightness-150 cursor-pointer" />
                            <button onClick={handleSetting} type="button"
                            className="px-5 h-10 text-lg mr-3 rounded hover:bg-Focus-component/30 hover:brightness-150">Cancel</button>
                            <button onClick={handleUpdate} type="submit"
                            className="px-5 h-10 text-lg mr-3 bg-Focus-component/80 rounded hover:bg-Focus-component/50">Save</button>
                        </div>
                    </form> :
                    <div>
                        <FontAwesomeIcon icon={faCircleCheck} onClick={handleCheck}
                        className="absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-120 scale-110 hover:brightness-175 cursor-pointer" />
                        {list.item}
                        <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleSetting} 
                        className="absolute -right-1 top-1/2 py-1 rounded transform -translate-x-1/2 -translate-y-1/2 hover:brightness-175 hover:bg-Focus-component cursor-pointer" />
                    </div> }
                </li>)})}
                </ul>
                {addTask ? 
                <form className={`${props.isFocus ? 'bg-Focus-component/30' : ''} text-xl font-medium mt-2 py-3 p-2 pl-5 rounded-md max-w-md`}>
                    <input type="text" onChange={(e) => {setInput(e.target.value)}} placeholder="What are you working on?"
                    className={`${props.isFocus ? '' : ''} focus:outline-none w-full placeholder:italic`} />
                    <p className="italic text-lg mt-2">Description</p>
                    <textarea name="description" id="description" placeholder={'Add some notes...'} cols={37}
                    className="text-base bg-FocusLight rounded p-2 focus:outline-none"></textarea>
                    <div className="flex justify-between pr-3">
                        <label htmlFor="pomodoro" className="text-lg">Pomodoro</label>
                        <input type="number" name="pomodoro" id="pomodoro" max={4} min={1} defaultValue={1}
                        className="bg-FocusLight w-10 px-1 text-base focus:outline-none rounded" />
                    </div>
                    <div className="flex justify-end items-center h-15 mt-4 border-t border-Focus-component">
                        <button onClick={handleAddTask} type="button"
                        className="px-5 h-10 text-lg mr-3 rounded hover:bg-Focus-component/30 hover:brightness-150">Cancel</button>
                        <button onClick={handleSubmit} type="submit"
                        className="px-5 h-10 text-lg mr-3 bg-Focus-component/80 rounded hover:bg-Focus-component/50">Save</button>
                    </div>
                </form> :
                <button onClick={handleAddTask}
                className={`${props.isFocus ? 'bg-Focus-component/30 hover:bg-Focus-component/50' : 'bg-Break-component'}
                transition ease-in-out duration-150 p-2 mt-5 w-100 px-3 border border-Focus-component border-dashed rounded`}>
                <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
                Add your goals</button> }
                
            </div>
        </div>
    );
}