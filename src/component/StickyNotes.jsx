import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { handleGetAllNote } from '../apiCalls/notes'
import { useDispatch, useSelector } from 'react-redux'
import { noteSlice, setReduxNotes } from '../redux/note'
import { BeatLoader } from 'react-spinners'
import {io} from 'socket.io-client'
import { BsThreeDots } from 'react-icons/bs'

const socket = io('/')

const StickyNotes = () => {



  const dispatch = useDispatch()
  const {note} = useSelector(state =>state.note)

    const [notes,setNotes]=useState([])
    const [error,setError]=useState("")
    const [loading,setLoading] =useState(false)



    const getallNotes = async ()=>{
        try {
          setLoading(true)
            const response = await handleGetAllNote()
            console.log(response.data)
              setNotes(response.data)
               dispatch(setReduxNotes(response.data))
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
    
    <div className='container relative h-screen'>
      {/* loader */}
          {loading && (
          <div className='absolute inset-0 flex items-center justify-center'>
              <BeatLoader color='#7c3aed' size={30} />
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {notes && notes.map((note) =>(
            <div key={note._id} className='min-w-10 min-h-10 p-2  bg-gray-200 rounded-md flex flex-col gap-2'>
                    {/* timestamp */}
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
                    <p>{note.topic}</p>
                </div>
                {/* the notes dev */}
                <div >
                    
                  <div>
                    <p className='text-start text-sm text-gray-500 font-semibold'>
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
