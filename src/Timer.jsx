import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faEllipsis, faForward, faPause, faBrain, faArrowRotateRight, faMugHot } from '@fortawesome/free-solid-svg-icons';
import alarm from './assets/alarm.mp3';

export function Timer(){
    const [isRunning, setIsRunning] = useState(false);
    const [elapseTime, setElapseTime] = useState(1000 * 5);
    const [isFocus, setIsFocus] = useState(true);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    const sound = new Audio(alarm);

    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapseTime(startTimeRef.current - Date.now())
            }, 10);

        }
        console.log('useeffect')

        return () => {
            console.log('return')
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])

    useEffect(() => {

        if(elapseTime <= 60 && isRunning){
            console.log('elapse time: ', elapseTime)
            sound.play();
            setIsRunning(false);
            forward();
            console.log('second elapse time:', elapseTime)
        }
        
    }, [elapseTime, isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() + elapseTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapseTime(isFocus ? 1000 * 5 : 1000 * 3);
        setIsRunning(false);
    }

    function forward(){
        if(!isFocus){
            setElapseTime(1000 * 5);
        } else {
            setElapseTime(1000 * 3);
        }
        
        setIsFocus(!isFocus);
    }

    function formatTime(){
        if(elapseTime <= 0){
            return "00:00";
        }

        let minutes = Math.floor(elapseTime / (1000 * 60) % 60);
        let second = Math.floor(elapseTime / (1000) % 60);

        minutes = String(minutes).padStart(2, "0");
        second = String(second).padStart(2, "0");

        return `${minutes}:${second}`;
    }

    return(
        <div className={`w-screen h-screen overflow-hidden ${isFocus ? 'bg-FocusLight' : 'bg-BreakLight'}`}>
            <div className="flex justify-center h-20 items-center">
                {isFocus ? 
                <p className="font-display font-medium text-TextLight text-xl p-2 border border-Blue rounded-2xl">
                    <FontAwesomeIcon icon={faBrain} className="pr-1" /> 
                    Focus 
                </p>
                :
                <p className="font-display font-medium text-BlueLight text-xl p-2 border border-Blue rounded-2xl">
                    <FontAwesomeIcon icon={faMugHot} className="pr-1 mb-0.5" />
                    Break 
                </p>}
            </div>
            <div className={`font-display font-bold text-center text-[200px] w-auto hx-80 ${isFocus ? 'text-TextLight' : 'text-BreakText'}`}>{formatTime()}</div>
            <div className="flex justify-center gap-5">
                {isRunning ?
                <>
                    <FontAwesomeIcon icon={faEllipsis}
                    className={`p-5 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component' : 'text-BreakText bg-Break-component'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:text-mainText hover:scale-105`} />
                    <FontAwesomeIcon icon={faPause} onClick={stop}
                    className={`p-5 px-8 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-middle' : 'text-BreakText bg-Break-middle'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:scale-105`} />
                    <FontAwesomeIcon icon={faArrowRotateRight} onClick={reset} 
                    className={`p-5 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component' : 'text-BreakText bg-Break-component'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:text-mainText hover:scale-105`} />
                </> 
                : 
                <>
                    <FontAwesomeIcon icon={faEllipsis}
                    className={`p-5 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component' : 'text-BreakText bg-Break-component'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:text-mainText hover:scale-105`} />
                    <FontAwesomeIcon icon={faPlay} onClick={start}
                    className={`p-5 px-8 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-middle' : 'text-BreakText bg-Break-middle'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:scale-105`} />
                    <FontAwesomeIcon icon={faForward} onClick={forward}
                    className={`p-5 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component' : 'text-BreakText bg-Break-component'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:text-mainText hover:scale-105`} />
                </>
                }
            </div>
        </div>    
    );
}