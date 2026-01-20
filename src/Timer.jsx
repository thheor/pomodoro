import { Setting } from './Setting.jsx';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faEllipsis, faForward, faPause, faBrain, faArrowRotateRight, faMugHot } from '@fortawesome/free-solid-svg-icons';
import alarm from './assets/alarm.mp3';

export function Timer(){
    const [isRunning, setIsRunning] = useState(false);
    const [isFocus, setIsFocus] = useState(true);
    const [isSetting, setIsSetting] = useState(false);
    const [dataSetting, setDataSetting] = useState({
        focusMinutes: 20,
        focusSeconds: 0,
        breakMinutes: 5,
        breakSeconds: 0,
        autoResume: false,
        sound: true,
    })
    const [elapseTime, setElapseTime] = useState(dataSetting.focusMinutes * 60 + dataSetting.focusSeconds);
    const sound = useRef(null);

    const focusTime = (dataSetting.focusMinutes * 60) + dataSetting.focusSeconds % 60;
    const breakTime = dataSetting.breakMinutes * 60 + dataSetting.breakSeconds % 60;

    useEffect(() => {
        let timer;

        if(isRunning){
            timer = setInterval(() => {
                setElapseTime(elapseTime - 1)
            }, 1000);

        }
        console.log('useeffect')
        
        return () => {
            console.log('return')
            clearInterval(timer);
        }

    }, [isRunning, elapseTime])

    useEffect(() => {
        console.log('useEffect 2')

        if(elapseTime === 0 && isRunning){
            
            if(dataSetting.sound){
                sound.current = new Audio(alarm);
                sound.current.play();
            }

            console.log('elapse time: ', elapseTime)
            
            dataSetting.autoResume ? setIsRunning(true) : setIsRunning(false);

            setIsFocus(!isFocus);
            setElapseTime(isFocus ? breakTime : focusTime);
        }
        
    }, [elapseTime]);

    useEffect(() => {

        if(isSetting && !isRunning){
            setElapseTime(isFocus ? focusTime : breakTime);
            console.log(dataSetting);
        }

    }, [isSetting, forward]);

    function start(){
        setIsRunning(true);

        if(sound.current){
            sound.current.pause();
        }
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapseTime(isFocus ? focusTime : breakTime);
        setIsRunning(false);
    }

    function forward(){
        setElapseTime(isFocus ? breakTime : focusTime);        
        setIsFocus(!isFocus);
    }

    function handleSetting(){
        setIsSetting(!isSetting);
    }

    function handleData(data, value){
        setDataSetting((prev) => ({
            ...prev,
            [data]: value,
    }))};

    function formatTime(){

        let minutes = Math.floor(elapseTime / (60) % 60);
        let second = Math.floor(elapseTime % 60);

        minutes = String(minutes).padStart(2, "0");
        second = String(second).padStart(2, "0");

        return `${minutes}:${second}`;
    }

    return(
        <>
        <div className={`w-screen h-screen overflow-hidden 
        ${isFocus ? 'bg-FocusLight' : 'bg-BreakLight'}
        ${isSetting ? 'blur-[5px]' : ''}`}>
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
                    <FontAwesomeIcon icon={faEllipsis} onClick={handleSetting}
                    className={`p-5 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component/20 hover:bg-Focus-component/50' : 'text-BreakText bg-Break-component/30 hover:bg-Break-component/60'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:text-mainText hover:scale-105`} />
                    <FontAwesomeIcon icon={faPause} onClick={stop}
                    className={`p-5 px-8 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component/60 hover:bg-Focus-component/80' : 'text-BreakText bg-Break-component/70 hover:bg-Break-component'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:scale-105`} />
                    <FontAwesomeIcon icon={faArrowRotateRight} onClick={reset} 
                    className={`p-5 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component/20 hover:bg-Focus-component/50' : 'text-BreakText bg-Break-component/30 hover:bg-Break-component/60'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:text-mainText hover:scale-105`} />
                </> 
                : 
                <>
                    <FontAwesomeIcon icon={faEllipsis} onClick={handleSetting}
                    className={`p-5 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component/20 hover:bg-Focus-component/50' : 'text-BreakText bg-Break-component/30 hover:bg-Break-component/60'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:text-mainText hover:scale-105`} />
                    <FontAwesomeIcon icon={faPlay} onClick={start}
                    className={`p-5 px-8 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component/60 hover:bg-Focus-component/80' : 'text-BreakText bg-Break-component/70 hover:bg-Break-component'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:scale-105`} />
                    <FontAwesomeIcon icon={faForward} onClick={forward}
                    className={`p-5 cursor-pointer ${isFocus ? 'text-TextLight bg-Focus-component/20 hover:bg-Focus-component/50' : 'text-BreakText bg-Break-component/30 hover:bg-Break-component/60'} text-5xl transition duration-300 ease-in-out rounded-2xl hover:text-mainText hover:scale-105`} />
                </>
                }
            </div>
        </div>    
        <Setting setting={isSetting} handleSet={handleSetting} isFocus={isFocus} handleInput={handleData} />
        </>
    );
}