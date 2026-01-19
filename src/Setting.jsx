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
            <div className={`${setting ? 'block' : 'hidden'} absolute top-60 w-100 h-65
             ${isFocus ? 'bg-FocusLight border-Focus-component/50' : 'bg-BreakLight border-Break-component/50'} border rounded-3xl font-display`}>
                <div className='relative'>
                    <h1 className="text-2xl font-semibold mt-3 ml-5">Settings</h1>
                    <FontAwesomeIcon icon={faXmark} onClick={handleSet}
                    className='absolute top-2 right-5 opacity-80 cursor-pointer' />
                </div>
                <form action="" className="flex flex-col justify-between gap-3 text-lg w-[90%] ml-5 mt-5">
                    <div className='flex justify-between'>
                        <label htmlFor="focus" className=''>Focus length</label>
                        <input type="number" name='focus' id='focus' max={25} min={1} defaultValue={20} onChange={handleChange} 
                        className='border rounded p-0.5 text-center cursor-pointer' />
                    </div>
                    <div className='flex justify-between'>
                        <label htmlFor="break">Break length</label>
                        <input type="number" name='break' id='break' max={25} min={1} defaultValue={5} onChange={handleChange} 
                        className='border rounded p-0.5 text-center cursor-pointer' />
                    </div>
                    <div className='flex justify-between'> 
                        <p>Auto resume</p>
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
                        <p>Sound</p>
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