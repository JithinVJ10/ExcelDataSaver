import React from 'react'

const Header = ({total, headerData, setHeaderData}) => {

  const handleChange=(e)=>{
    try {
      const {name, value} = e.target

      setHeaderData({
          ...headerData,
          [name]:value,
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className='header border-2 border-gray-950'>
      <div className='bg-amber-300 text-center'>
            <p>Header</p>
        </div>
      <div className='flex px-8 py-8'>
        <div className='flex'>
            <p>Vr No:- </p>
            <input className="shadow  border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="vr_no"
             name='vr_no'
             value={headerData.vr_no}
             onChange={(e)=>handleChange(e)}
             type="text" />
        </div>

        <div className='flex px-5'>
            <p>Vr Date:- </p>
            <input className="shadow  border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="vrDate"
             name='vrDate'
             value={headerData.vrDate}
             onChange={(e)=>handleChange(e)}
             type="date" />
        </div>
        <div className='flex px-5'>
            <p className='px-2'>Status </p>
            <select id="Status" name="Status" onChange={(e)=>handleChange(e)}>
              <option value={headerData.Status}>{headerData.Status}</option>
              <option value="A">A</option>
              <option value="I">I</option>
            </select>
        </div>
      </div>

      <div className='flex px-5 py-6' >
        <div className='flex'>
            <p className='px-2'>Ac Name:</p>
            <input class="shadow w-96  border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
             id="AcName"
             name='AcName'
             value={headerData.AcName}
             onChange={(e)=>handleChange(e)}
             type="text" />
        </div>
        <div className='flex'>
          <p className='px-3'>Ac amount:</p>
          <input class="shadow w-28  border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           id="AcAmt" 
           value={total}
           type="text" />
        </div>
      </div>
    </header>
  )
}

export default Header
