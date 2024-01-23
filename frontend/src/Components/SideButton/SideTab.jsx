import React from 'react'

const SideTab = ({addRow, saveData, newPage, pressPrint }) => {

  return (
    <div className='text-center text-xl font-bold py-36'  id='sidebar'>
      <div className='py-2 side-button'>
        <button onClick={()=>newPage()} >New</button>
      </div>
      <div className='py-2 side-button'>
        <button onClick={()=>addRow()}>Insert</button>
      </div>
      <div className='py-2 side-button'>
        <button onClick={()=>saveData()} >Save</button>
      </div>
      <div className='py-2 side-button'>
        <button id='printButton' onClick={()=>pressPrint()}>Print</button>
      </div>
      
    </div>
  )
}

export default SideTab
