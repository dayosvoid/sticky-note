import React from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toggleModel } from '../redux/CreateModel';

const Nav = () => {
    // const [openModel,setOpenModel] = useState(false)
    const dispatch = useDispatch()
  return (
    <div className='bg-gray-200 px-1 py-5 w-full overflow-hidden'>
        <div className='container w-11/12 mx-auto flex justify-between items-center gap-1'>
        {/* search div */}
            <div className=' flex flex-1 gap-2 items-center'>
                <div><p className='text-purple-500 font-bold text-xl sm:text-2xl'>Sticktnotes</p></div>
                <form id='search' onSubmit={(e) => e.preventDefault()} className='outline-2 outline-gray-400 px-2 py-0.5 rounded-full flex items-center gap-2 '>
                    <button className=''>
                        <IoSearch className='size-5 text-gray-600'/>
                    </button>
                    <input type="search" placeholder='search' className='text-md font-semibold outline-0 sm:pb-1 w-full min-w-0'/>
                </form>  
            </div>

                {/* add new note section */}
            <div className='shrink-0 flex justify-end items-center text-purple-500'>
                <button className='flex items-center' onClick={()=>dispatch(toggleModel())}>
                    <IoIosAddCircle className='size-8  cursor-pointer'/>
                    <p className='font-bold hidden md:flex'>Add Note</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Nav
