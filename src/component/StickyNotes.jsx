import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { handleGetAllNote } from '../apiCalls/notes'
import { useDispatch, useSelector } from 'react-redux'
import { noteSlice, setReduxNotes } from '../redux/note'
import { BeatLoader } from 'react-spinners'
import {io} from 'socket.io-client'
import { BsThreeDots } from 'react-icons/bs'
import Sort from './sort'

const socket = io('/')

const StickyNotes = () => {
  const [filter, setFilter] = useState("All")
  const dispatch = useDispatch()
  // from redux
  const AllNote = useSelector(state =>state.note.notes) 

    const [error,setError]=useState("")
    const [loading,setLoading] =useState(false)

    // allnote from redux and filtered if the inital state of filter is not all
    const DisplayedNote = useMemo(()=>{
      return filter ==="All" ? AllNote : AllNote.filter(n => n.category === filter)
    }, [filter, AllNote])



    const getallNotes = async ()=>{
        try {
          setLoading(true)
            const response = await handleGetAllNote()
            console.log(response.data)
               dispatch(setReduxNotes(response.data))
              //  setNotes(note)
          setLoading(false)  
        } catch (error) {
                setError(error.message)
                setLoading(false)
        }
    }

  useEffect(() => {
    getallNotes()
      }, [])

  useEffect(() => {
        socket.on('connect', () => {
            console.log('socket id:', socket.id)
        })

        socket.on('note_created', () => {
         getallNotes()
        })
        return () => {socket.off('connect')
        socket.off('note_created')}
    }, [])

  return (
    
    <div className='relative '>
      {/* loader */}
          {loading && (
          <div className='absolute inset-0 flex items-center justify-center'>
              <BeatLoader color='#7c3aed' size={30} />
          </div>
        )}

        {/* passing the setfilter usestate method as props  */}
        <div className=''>
           <Sort onFilterChange={(val) => setFilter(val)}/>
        </div>
       

        <div  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-screen'>
          {DisplayedNote && DisplayedNote.map((note) =>(
            <div key={note._id}  className='relative min-w-10 min-h-50 py-5 p-2 rounded-bl-4xl rounded-tr-4xl bg-gray-200 rounded-md flex flex-col gap-2 shadow-[-6px_6px_4px_-4px_rgba(0,0,0.2,0.2)]'>
              {/* pin */}
                      <div className='absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
                        <div id='pin' className='w-4 h-4 rounded-full shadow-md border-2'></div>
                      </div>
                    {/* timestamp */}
                    {/* curves */}
                    <div className='h-7 w-6 border-b-3 border-l-3 border-gray-400 absolute self-end  rounded-sm right-0.5 top-0.5 shadow-[-6px_6px_12px_-4px_rgba(0,0,0,0.2)] shadow-xl/40'></div>
                <div className='text-start text-gray-400 text-[12px] font-semibold flex justify-between items-center'>
                  <div>{moment(note.updatedAt).fromNow()}</div>
                  <div className='text-xl text-purple-500 cursor-pointer'><BsThreeDots /></div>
                </div>
                <div className='font-bold text-center text-md flex gap-3'>
                    {/* topic */}
                    {/*a bright coloured ball  */}
                      <div className='flex items-start pt-2 justify-center '>
                          <span className='block bg-blue-400 w-2 h-2 rounded-full '></span>
                      </div>


                    <div className='flex gap-2 items-center'>
                        <p>{note.topic}</p>
                        <span className='bottom-0 left-1 text-gray-500 sm:text-sm text-[12px] '>
                          {note?.category}
                        </span>
                    </div>
                </div>
                {/* the notes dev */}
                <div >
                    
                  <div>
                    <p className='text-start text-sm text-gray-500 font-semibold line-clamp-3'>
                        {note.note}
                    </p>
                  </div>
                </div>
                
            </div>
          ))}
            
          {error && <p className='text-red-500'>{error}</p>}
        </div>
    </div>
  )
}

export default StickyNotes
