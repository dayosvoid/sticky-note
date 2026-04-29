import React, { useEffect, useState } from 'react' // Added useState import
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { hideModel } from '../redux/CreateModel'
import { handleCreateNote } from '../apiCalls/notes'

const CreateNote = () => {
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)
    // stores tehe form data
    const [formData, setformData] = useState({ topic: "", note: "", category:"Personal" })
    // stores the form errors
    const [formError,setFormError] = useState({})
    // handle which input is in focus abd shows error accordingly
    const [istouched, setIstouched] = useState({note:false, topic:false})

    // form validation function
    const validation=(data)=>{
        let validationErrors = {};

    if (data.topic.length > 10) {
        validationErrors.topic = "Topic is too long";
    }
    if (!data.topic) {
        validationErrors.topic = "Topic is required";
    }
    if (!data.note) {
        validationErrors.note = "Note is required";
    }

    return validationErrors

    }
    // to return error on every dependenvy array change
    useEffect(()=>{
        const errors = validation(formData)
        setFormError(errors)
        
    },[istouched,formData])

    const handleBlur=(e)=>{
        const {name} = e.target
        setIstouched({...istouched,[name]:true})
    }

    const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    setIstouched({ topic: true, note: true })

    const validationErrors = validation(formData)
    if (Object.keys(validationErrors).length > 0) {
        return setFormError(validationErrors)
    }

    try {
        setcreateButton(true)
        const response = await handleCreateNote({ ...formData })
        if (response.success) {
            alert("Note created successfully!")
            dispatch(hideModel())
            setIsLoading(false)
        } else {
            alert(response.message || "Failed to create note")
            setIsLoading(false)
        }
    } catch (error) {
        alert("An error occurred: " + error.message)
        setIsLoading(false)
    }
}
    return (
        /* Using fixed positioning ensures it displays "over" the full screen */
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
            <div className='bg-gray-200 p-6 space-y-4 rounded-xl w-full max-w-lg shadow-2xl'>
                
                {/* Header */}
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-2xl text-gray-800 font-manrope'>Sticky Note</span>
                    <button onClick={() => dispatch(hideModel())} className='hover:bg-gray-300 rounded-full p-1'>
                        <IoClose className='text-2xl text-gray-600' />
                    </button>
                </div>
                <hr className='border-gray-300' />

                <h3 className='text-xl font-semibold text-gray-600'>Create Notes</h3>

                {/* Form */}
                <form onSubmit={handleSubmit} className='flex flex-col text-4 gap-4 w-full'>
                    <span className='relative bottom-0 left-0 py-2'>
                        <input
                            name="topic" 
                            value={formData.topic} 
                            onChange={(e) => setformData({ ...formData, topic: e.target.value })} 
                            type="text"
                            onBlur={handleBlur} 
                            placeholder='Topic' 
                            className='w-full p-2 outline-none border border-gray-300 rounded focus:border-purple-500' 
                        />
                        {/* error field */}
                        {formError.topic && istouched.topic && <p className='text-red-500 absolute '>{formError?.topic}</p>}
                    </span>

                    <span className='relative bottom-0 left-0 py-2'>
                        <textarea 
                            name="note"
                            value={formData.note} 
                            onChange={(e) => setformData({ ...formData, note: e.target.value })} 
                            placeholder='Type your note...'
                            onBlur={handleBlur} 
                            rows={5}
                            className='w-full p-2 outline-none border border-gray-300 rounded focus:border-purple-500 resize-none' 
                        />
                        {/* error field */}
                        {formError.note && istouched.note && <p className='text-red-500 absolute '>{formError?.note}</p>}
                    </span>
                    {/* category */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-gray-600'>Category</label>
                        <select 
                            name="category"
                            value={formData.category}
                            onChange={(e) => setformData({ ...formData, category: e.target.value })}
                            className='w-full p-2 outline-none border border-gray-300 rounded focus:border-purple-500 bg-white'
                        >
                            <option value="Personal">Personal</option>
                            <option value="Business">Business</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex justify-end'>
                        <button 
                            type="submit"
                           disabled={isLoading}
                            className='bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-2 px-8 rounded shadow-md transition-all active:scale-95'
                        >
                            {isLoading ? "Creating.." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNote