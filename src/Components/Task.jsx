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
    const [pomo, setPomo] = useState(null);

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
            const newTask = {id: id, item: input, desc: description, isDone: false, isSetting: false, pomo: null };
            setTask(prev => [...prev, newTask]);
            setDescription('');
            setInput('');
            setAddTask(false);
        } else {
            alert('Please input a text');
        }
    }

    const autoCheck = () => {
                        // List of challenge in this feature:
                        // can't modify state from Timer.jsx in Task.jsx (i want to modify totalFocus)
                        // every list has a difference pomodoro time
                        // i can't get an item from local storage in a specific index
                        // handleCheck;
                        console.log(5 - null);
                    }
    
    return(
        <div className={`flex justify-center mt-10 font-display mb-10 ${props.isFocus ? 'text-TextLight' : 'text-BreakText'}`}>           
            <div className="flex flex-col w-100">
                <ul className="">
                    {task.length === 0 ? '' : 
                    <p className={`text-xl font-semibold ${props.isFocus ? 'dark:text-FocusTextDark' : 'dark:text-BreakTextDark'} border-b py-2 -mt-3 mb-6`}>Tasks</p>
                    }
                    {task.map((list) => {
                    const handleRemove = () => {
                        const newList = task.filter(items => items.id !== list.id);
                        console.log(newList);
                        setTask(newList);
                    }

                    const handleUpdate = (e) => {
                        e.preventDefault();

                        const newList = task.map(items => items.id === list.id ? {id: items.id, item: input, desc: description, isDone: items.isDone, isSetting: false} : {id: items.id, item: items.item, desc: items.desc, isDone: items.isDone, isSetting: items.isSetting} )
                        console.log(newList);
                        setTask(newList);
                    }

                    const handleCheck = () => {
                        let newList;
                        if(list.isDone === false){
                            newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, desc: items.desc, isDone: true, isSetting: items.isSetting } : { id: items.id, item: items.item, desc: items.desc, isDone: items.isDone, isSetting: items.isSetting });
                        } else {
                            newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, desc: items.desc, isDone: false, isSetting: items.isSetting } : { id: items.id, item: items.item, desc: items.desc, isDone: items.isDone, isSetting: items.isSetting });
                        }
                        console.log(newList);
                        setTask(newList);
                    }

                    const handleSetting = () => {
                        let newList;
                        setInput(list.item);
                        setDescription(list.desc);
                        
                        if(list.isSetting === false){
                            newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, desc: items.desc, isDone: items.isDone, isSetting: true } : { id: items.id, item: items.item, desc: items.desc, isDone: items.isDone, isSetting: items.isSetting });
                        } else {
                            newList = task.map(items => items.id === list.id ? { id: items.id, item: items.item, desc: items.desc, isDone: items.isDone, isSetting: false } : { id: items.id, item: items.item, desc: items.desc, isDone: items.isDone, isSetting: items.isSetting });
                        }
                        setTask(newList);
                    }

                    // const autoCheck = () => {
                    //     // List of challenge in this feature:
                    //     // can't modify state from Timer.jsx in Task.jsx (i want to modify totalFocus)
                    //     // every list has a difference pomodoro time
                    //     // i can't get an item from local storage in a specific index
                    //     // handleCheck;
                    //     console.log(localStorage.key(0));
                    // }

                    return (
                    <li key={list.id}
                    className={`${props.isFocus ? 'bg-Focus-component/70 dark:text-FocusTextDark' : 'dark:text-BreakTextDark bg-Break-component/30 '}
                    ${list.isDone ? 'brightness-50' : `transiiton duration-150 ease-in-out ${list.isSetting ? 'scale-102' : 'hover:scale-102'}`}
                    relative text-xl font-medium mt-2 p-2 py-3 ${list.isSetting ? 'pl-5' : 'pl-12'} rounded-md max-w-md`}>
                    {list.isSetting ? 
                    <form>
                        <input type="text" defaultValue={list.item} onChange={(e) => {setInput(e.target.value)}}
                        className={`${props.isFocus ? '' : ''} focus:outline-none w-full`} />
                        <p className="italic text-lg mt-2">Description</p>
                        <textarea name="description" id="description" defaultValue={list.desc} onChange={(e) => {setDescription(e.target.value)}} placeholder={'Add some notes...'} cols={37}
                        className="text-base bg-FocusLight dark:text-black rounded p-2 focus:outline-none"></textarea>
                        <div className="flex justify-between pr-3">
                            <label htmlFor="pomodoro" className="text-lg">Pomodoro</label>
                            <input type="number" name="pomodoro" id="pomodoro" max={4} min={1} defaultValue={1}
                            className="bg-FocusLight w-10 px-1 text-base dark:text-black focus:outline-none rounded" />
                        </div>
                        <div className={`flex justify-end items-center h-15 mt-4 border-t ${props.isFocus ? 'border-Focus-component' : 'border-Break-component'}`}>
                           <FontAwesomeIcon icon={faTrash} onClick={handleRemove}
                           className="absolute left-8 bottom-1 p-1 py-2 rounded transform -translate-x-1/2 -translate-y-1/2 hover:bg-Focus-component/30 hover:brightness-150 cursor-pointer" />
                            <button onClick={handleSetting} type="button"
                            className={`px-5 h-10 text-lg mr-3 rounded ${props.isFocus ? 'hover:bg-Focus-component/30' : 'hover:bg-BreakText/20'} hover:brightness-150`}>Cancel</button>
                            <button onClick={handleUpdate} type="submit"
                            className={`px-5 h-10 text-lg mr-3 rounded ${props.isFocus ? 'bg-Focus-component/60 hover:bg-Focus-component/90' : 'bg-Break-component/80 hover:bg-Break-component'}`}>Save</button>
                        </div>
                    </form> :
                    <div>
                        <FontAwesomeIcon icon={faCircleCheck} onClick={handleCheck}
                        className={`absolute left-6 top-6.5 transform -translate-x-1/2 -translate-y-1/2 hover:scale-120 scale-110 hover:brightness-175 cursor-pointer`} />
                        <p className={`${list.isDone ? 'line-through' : ''}`}>{list.item}</p>
                        {list.desc === "" ? '' : 
                            <div className="bg-FocusLight mt-2 -ml-5 p-2 w-85 rounded">
                                <p className="text-base dark:text-black">{list.desc}</p>
                            </div>}
                        <FontAwesomeIcon icon={faEllipsisVertical} onClick={handleSetting} 
                        className="absolute -right-1 top-6.5 py-1 rounded transform -translate-x-1/2 -translate-y-1/2 hover:brightness-175 hover:bg-Focus-component cursor-pointer" />
                    </div> }
                </li>)})}
                </ul>
                {addTask ? 
                <form className={`${props.isFocus ? 'bg-Focus-component/30 dark:text-FocusTextDark' : 'bg-Break-component/30 dark:text-BreakTextDark'} text-xl font-medium mt-2 py-3 p-2 pl-5 rounded-md max-w-md`}>
                    <input type="text" onChange={(e) => {setInput(e.target.value)}} placeholder="What are you working on?"
                    className={`${props.isFocus ? '' : ''} focus:outline-none w-full placeholder:italic`} />
                    <p className="italic text-lg mt-2">Description</p>
                    <textarea name="description" id="description" placeholder={'Add some notes...'} onChange={(e) => {setDescription(e.target.value)}} cols={37}
                    className="text-base bg-FocusLight dark:text-black rounded p-2 focus:outline-none"></textarea>
                    <div className="flex justify-between pr-3">
                        <label htmlFor="pomodoro" className="text-lg">Pomodoro</label>
                        <input type="number" name="pomodoro" id="pomodoro" max={4} min={1} defaultValue={1}
                        className="bg-FocusLight w-10 px-1 text-base dark:text-black focus:outline-none rounded" />
                    </div>
                    <div className={`flex justify-end items-center h-15 mt-4 border-t ${props.isFocus ? 'border-Focus-component' : 'border-Break-component'}`}>
                        <button onClick={handleAddTask} type="button"
                        className={`px-5 h-10 text-lg mr-3 rounded ${props.isFocus ? 'hover:bg-Focus-component/30 hover:brightness-150' : 'hover:bg-Break-component/50'}`}>Cancel</button>
                        <button onClick={handleSubmit} type="submit"
                        className={`px-5 h-10 text-lg mr-3 rounded ${props.isFocus ? 'bg-Focus-component/80 hover:bg-Focus-component/50 hover:brightness-150' : 'bg-Break-component/50 hover:bg-Break-component/90'}`}>Save</button>
                    </div>
                </form> :
                <button onClick={handleAddTask}
                className={`${props.isFocus ? 'dark:text-FocusTextDark bg-Focus-component/30 border-Focus-component hover:bg-Focus-component/80' : 'dark:text-BreakTextDark border-Break-component bg-Break-component/50 hover:bg-Break-component/80'}
                transition ease-in-out duration-150 p-2 mt-5 w-100 px-3 border border-dashed rounded`}>
                <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
                Add your goals</button> }
                {/* <button onClick={autoCheck}>Click me</button> */}
            </div>
        </div>
    );
}
