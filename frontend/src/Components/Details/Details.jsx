import React, { useState } from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Details = ({tableData, setTableData, total, subTotalUpdate}) => {


 
  const handleChange = (e, index) => {
    try {
      const { name, value } = e.target;

      if ((name === 'qty' || name === 'rate') && isNaN(value)) {
        // Display an error message or take appropriate action
        toast.error(`${name} must be a number`);
        return;
      }

      if ((name === 'qty' || name === 'rate') && value  < 1) {
        toast.error(`${name} should be Positive number`);
        return;
      }
  
      const updatedTableData = [...tableData];
  
      // Update the specific property for the given index
      updatedTableData[index][name] = value;
  
      // Set the updated tableData state
      setTableData(updatedTableData);

      subTotalUpdate()

      
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <main className='main-container border-2 border-gray-950'>
      <ToastContainer/>
      
      <div className='py-5'>
        <div className='bg-orange-300 text-center'>
            <p>Details</p>
        </div>
        <div className='px-2'>
        <table className='border-2 px-4 w-full' >
          <thead className='border-2 px-4'>
            <tr >
              <th className='border-2 px-4'>Sr NO</th>
              <th className='border-2 px-4'>Item Code</th>
              <th className='border-2 px-4 w-6/12'>Item Name</th>
              <th className='border-2 px-4'>Description</th>
              <th className='border-2 px-4'>Qty</th>
              <th className='border-2 px-4'>Rate</th>
            </tr>
          </thead>
          <tbody >
            
            {
              tableData.map((data, index)=>{
                return(
                  <>
                    <tr key={index}>
                      <td className='border-2 px-4'>
                        {data.sr_no}
                      </td>
                      <td className='border-2 px-4'>
                      <input
                       className='w-full'
                       type="text"
                       name='item_code'
                       value={data.item_code}
                       onChange={(e) => handleChange(e, index)} 
                      />
                      </td>
                      <td className='border-2 px-4'>
                      <input
                       className='w-full'
                       type="text"
                       name='item_name'
                       value={data.item_name}
                       onChange={(e) => handleChange(e, index)} 
                      />
                      </td>
                      <td className='border-2 px-4'>
                      <input
                       className='w-full'
                       type="text"
                       name='description'
                       value={data.description}
                       onChange={(e) => handleChange(e, index)} 
                      />
                      </td>
                      <td className='border-2 px-4'>
                      <input
                       className='w-full'
                       type="number"
                       name='qty'
                       value={data.qty}
                       onChange={(e) => handleChange(e, index)} 
                      />
                      </td>
                      <td className='border-2 px-4'>
                      <input
                       className='w-full'
                       type="number"
                       name='rate'
                       value={data.rate}
                       onChange={(e) => handleChange(e, index)} 
                      />
                      </td>
                    </tr>
                  </>
                )
              })
            }

            
            <tr>
              <td className='border-2 px-4' colSpan="5" align="right">Total:-</td>
              <td className='border-2 px-4'>{total}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      
    </main>
  )
}

export default Details
