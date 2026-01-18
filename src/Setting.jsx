import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export function Setting(props){

    return(
        <div className={`${props.setting ? 'block' : 'hidden'} absolute top-10 mx-auto w-100 h-120
         bg-FocusLight border border-Focus-middle rounded-3xl font-display`}>
            <div className='relative'>
                <h1 className="text-2xl font-semibold mt-3 ml-5">Settings</h1>
                <FontAwesomeIcon icon={faXmark} onClick={props.handleSet}
                className='absolute top-2 right-5 opacity-80 cursor-pointer' />
            </div>
            <form action="" className="flex flex-col justify-between gap-3 w-[90%] ml-5 mt-5">
                <div className='flex justify-between'>
                    <label htmlFor="focus" className=''>Focus length</label>
                    <select name="focus" id="focus" className="border rounded-xl p-1 cursor-pointer">
                        <option value="25">25</option>
                        <option value="24">24</option>
                        <option value="23">23</option>
                        <option value="22">22</option>
                        <option value="21">21</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className='flex justify-between'>
                    <label htmlFor="break">Break length</label>
                    <select name="break" id="break" className="border rounded-xl p-1 cursor-pointer">
                        <option value="10">10</option>
                        <option value="9">9</option>
                        <option value="8">8</option>
                        <option value="7">7</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div className='flex justify-between'> 
                    <label className="inline-flex cursor-pointer">Auto resume timer
                        <div className='max-w-46 w-60'></div>
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-10 h-5 bg-neutral-quaternary outline outline-Focus-middle peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-Focus-middle rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-pink-500 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-300"></div>
                    </label>
                </div>
                <div className='flex justify-between'> 
                    <label className="inline-flex cursor-pointer">Sound
                        <div className='max-w-80 w-67'></div>
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-10 h-5 bg-neutral-quaternary outline outline-Focus-middle peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-Focus-middle rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-pink-500 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-300"></div>
                    </label>
                </div>
            </form>
        </div>
    );
}