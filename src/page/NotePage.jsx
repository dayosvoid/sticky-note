import React from 'react'
import StickyNotes from '../component/StickyNotes'
import Nav from '../component/Nav'

const NotePage = () => {

  return (
   <div className=''>
      <div className='flex flex-col gap-3'>
          <Nav/>
            <div className='container w-11/12 mx-auto flex justify-center'>
              <StickyNotes/>
            </div>
      </div>
   </div>
  )
}

export default NotePage
