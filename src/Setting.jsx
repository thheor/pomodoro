import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export function Setting({ setting, handleSet, isFocus, handleInput }){

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleInput(name, value);
    }

    return(
        <div className={`${setting ? 'block' : 'hidden'} absolute top-10 mx-auto w-100 h-120
         ${isFocus ? 'bg-FocusLight border-Focus-middle' : 'bg-BreakLight border-Break-middle'} border rounded-3xl font-display`}>
            <div className='relative'>
                <h1 className="text-2xl font-semibold mt-3 ml-5">Settings</h1>
                <FontAwesomeIcon icon={faXmark} onClick={handleSet}
                className='absolute top-2 right-5 opacity-80 cursor-pointer' />
            </div>
            <form action="" className="flex flex-col justify-between gap-3 w-[90%] ml-5 mt-5">
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
                    <label className="inline-flex cursor-pointer">Auto resume timer
                        <div className='max-w-46 w-60'></div>
                      <input name='autoResume' onChange={handleChange} type="checkbox" value={false} className="sr-only peer" />
                      <div className={`relative w-10 h-5 bg-neutral-quaternary outline peer-focus:outline-none
                        peer-focus:ring-1 rounded-full peer peer-checked:after:translate-x-full 
                        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute 
                        after:top-[2px] after:start-[2px] after:rounded-full after:h-4 after:w-4 after:transition-all
                        ${isFocus ? 'outline-Focus-middle peer-focus:ring-Focus-middle after:bg-pink-500 peer-checked:bg-pink-300' :
                        'outline-Break-middle peer-focus:ring-Break-middle after:bg-blue-500 peer-checked:bg-blue-300'}`}></div>
                    </label>
                </div>
                <div className='flex justify-between'> 
                    <label className="inline-flex cursor-pointer">Sound
                        <div className='max-w-80 w-67'></div>
                      <input name='sound' onChange={handleChange} type="checkbox" value={true} className="sr-only peer" />
                      <div className={`relative w-10 h-5 bg-neutral-quaternary outline 
                      ${isFocus ? 'outline-Focus-middle peer-focus:ring-Focus-middle after:bg-pink-500 peer-checked:bg-pink-300' :
                         'outline-Break-middle peer-focus:ring-Break-middle after:bg-blue-500 peer-checked:bg-blue-300'}
                         peer-focus:outline-none peer-focus:ring-1 rounded-full 
                         peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                         peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] 
                         after:start-[2px] after:rounded-full after:h-4 after:w-4 
                         after:transition-all`}></div>
                    </label>
                </div>
            </form>
        </div>
    );
}