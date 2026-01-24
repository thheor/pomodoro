import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export function Setting({ setting, handleSet, isFocus, handleInput }){

    const [isAutoResume, setisAutoResume] = useState(false);
    const [isSound, setIsSound] = useState(true);

    useEffect(() => {

        isAutoResume ? handleInput('autoResume', true) : handleInput('autoResume', false);
        isSound ? handleInput('sound', true) : handleInput('sound', false);

    }, [isAutoResume, isSound])

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleInput(name, value);
    }

    const handleResume = () => {
        setisAutoResume(!isAutoResume);
    }

    const handleSound = () => {
        setIsSound(!isSound);
    } 

    return(
        <div className='flex justify-center'>
            <div className={`${setting ? 'block' : 'hidden'} absolute top-50 w-100 max-sm:w-75 h-75
             ${isFocus ? 'bg-FocusLight border-Focus-component/50' : 'bg-BreakLight border-Break-component/50'} border rounded-3xl font-display`}>
                <div className='relative'>
                    <h1 className="text-2xl font-semibold mt-3 ml-5">Settings</h1>
                    <FontAwesomeIcon icon={faXmark} onClick={handleSet}
                    className='absolute top-1 right-5 p-1 rounded opacity-80 cursor-pointer hover:bg-Focus-component/70' />
                </div>
                <form action="" className="flex flex-col justify-between gap-3 text-lg w-[90%] ml-5 mt-5">
                    <div className=''>
                        <h2 className='font-medium'>Focus length</h2>
                        <div className='flex justify-between'>
                            <label htmlFor="focusMinutes" className='ml-5 opacity-90'>Minutes</label>
                            <input type="number" name='focusMinutes' id='focusMinutes' max={30} min={0} defaultValue={20} onChange={handleChange} 
                            className={`${isFocus ? 'bg-Focus-component/30' : 'bg-Break-component/40'} rounded p-0.5 text-center cursor-pointer`} />
                            <label htmlFor="focusSeconds" className='opacity-90'>Seconds</label>
                            <input type="number" name='focusSeconds' id='focusSeconds' max={59} min={0} defaultValue={0} onChange={handleChange} 
                            className={`${isFocus ? 'bg-Focus-component/30' : 'bg-Break-component/40'} rounded p-0.5 text-center cursor-pointer`} />
                        </div>
                    </div>
                    <div className=''>
                        <h2 className='font-medium'>Break length</h2>
                        <div className='flex justify-between'>
                            <label htmlFor="breakMinutes" className='ml-5 opacity-90'>Minutes</label>
                            <input type="number" name='breakMinutes' id='breakMinutes' max={10} min={0} defaultValue={5} onChange={handleChange} 
                            className={`${isFocus ? 'bg-Focus-component/30' : 'bg-Break-component/40'} rounded p-0.5 text-center cursor-pointer`} />
                            <label htmlFor="breakSeconds" className='opacity-90'>Seconds</label>
                            <input type="number" name='breakSeconds' id='breakSeconds' max={59} min={0} defaultValue={0} onChange={handleChange} 
                            className={`${isFocus ? 'bg-Focus-component/30' : 'bg-Break-component/40'} rounded p-0.5 text-center cursor-pointer`} />
                        </div>
                    </div>
                    <div className='flex justify-between'> 
                        <h2 className='font-medium'>Auto resume</h2>
                        <button type="button" role="switch" aria-checked={isAutoResume} onClick={handleResume}
                          className={`relative w-10 h-5 rounded-full outline transition-colors
                            ${isFocus
                              ? isAutoResume
                                ? 'bg-pink-300 outline-Focus-component ring-Focus-component'
                                : 'bg-neutral-quaternary outline-Focus-component ring-Focus-component'
                              : isAutoResume
                                ? 'bg-blue-300 outline-Break-component ring-Break-component'
                                : 'bg-neutral-quaternary outline-Break-component ring-Break-component'
                            }
                            focus:outline-none focus:ring-1`}
                        >
                          <span className={`absolute top-[2px] left-[2px] h-4 w-4 rounded-full transition-transform
                              ${isFocus ? 'bg-pink-500' : 'bg-blue-500'}
                              ${isAutoResume ? 'translate-x-5' : 'translate-x-0'}`}/>
                        </button>

                    </div>
                    <div className='flex justify-between'> 
                        <h2 className='font-medium'>Sound</h2>
                        <button type="button" role="switch" aria-checked={isSound} onClick={handleSound}
                          className={`relative w-10 h-5 rounded-full outline transition-colors
                            ${isFocus
                              ? isSound
                                ? 'bg-pink-300 outline-Focus-component ring-Focus-component'
                                : 'bg-neutral-quaternary outline-Focus-component ring-Focus-component'
                              : isSound
                                ? 'bg-blue-300 outline-Break-component ring-Break-component'
                                : 'bg-neutral-quaternary outline-Break-component ring-Break-component'
                            }
                            focus:outline-none focus:ring-1`}
                        >
                          <span className={`absolute top-[2px] left-[2px] h-4 w-4 rounded-full transition-transform
                              ${isFocus ? 'bg-pink-500' : 'bg-blue-500'}
                              ${isSound ? 'translate-x-5' : 'translate-x-0'}`}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
