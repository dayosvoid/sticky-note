import React from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { toggleModel } from '../redux/CreateModel';

const Nav = () => {
    // const [openModel,setOpenModel] = useState(false)
    const dispatch = useDispatch()
  return (
    <div className='bg-gray-200 px-1 py-5'>
        <div className='container w-11/12 mx-auto flex justify-between items-center gap-2'>
        {/* search div */}
            <div className='w-full flex gap-2 items-center'>
                <div><p className='text-purple-500 font-bold text-2xl'>Sticktnotes</p></div>
                <form onSubmit={(e) => e.preventDefault()} className='outline-2 outline-gray-400 px-2 py-0.5 rounded-full flex items-center gap-2 '>
                    <span className=''>
                        <IoSearch className='size-5 text-gray-600'/>
                    </span>
                    <input type="search" placeholder='search' className='text-md font-semibold outline-0 pb-1 '/>
                </form>  
            </div>

                {/* add new note section */}
            <div className='w-full flex justify-end '>
                <button  onClick={()=>dispatch(toggleModel())}>
                    <IoIosAddCircle className='size-5 text-purple-500  cursor-pointer'/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Nav
