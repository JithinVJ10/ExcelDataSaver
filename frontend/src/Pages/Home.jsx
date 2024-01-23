import React, { useState } from 'react'
import Header from '../Components/Header/Header'
import Details from '../Components/Details/Details'
import SideTab from '../Components/SideButton/SideTab'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Components/Modal/Modal'
import axios from 'axios'

const Home = () => {
  
  const [tableData, setTableData] = useState([
    {
      sr_no : 1,
      item_code:"",
      item_name:"",
      description:"",
      qty:"",
      rate:"",
    },
  ])
  const [total, setTotal] = useState(0)
  const [showModal, setShowModal] = useState(false);
  const [headerData, setHeaderData] = useState({
    vr_no:'',
    vrDate:"",
    Status :'A',
    AcName:"",
  })
 


  // Add row
  const addRow = () => {
    const newRow = {
      sr_no : tableData.length + 1,
      item_code:"",
      item_name:"",
      description:"",
      qty:"",
      rate:"",
    };
    setTableData([...tableData, newRow]);
  };

  // Total
  const subTotalUpdate = async () => {
    try {
      if (tableData) {
        const subTotal = tableData.reduce((accumulator, item) => {
          return accumulator + item.rate * item.qty;
        }, 0);
        setTotal(subTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //validateTableData
  const validateTableData = () => {

    const { vr_no, vrDate, AcName } = headerData;
    
    const isEmpty = tableData.some(item => (
      item.item_code.trim() === '' ||
      item.item_name.trim() === '' ||
      item.qty === '' ||
      item.rate === ''
    ));
  
    if (isEmpty) {
      toast.error('All fields must be filled');
      return false;
    }
  
    
    const isInvalidNumber = tableData.some(item => (
      (isNaN(item.qty) || item.qty < 1) ||
      (isNaN(item.rate) || item.rate < 1)
    ));
  
    if (isInvalidNumber) {
      toast.error('Qty and Rate must be valid positive numbers');
      return false;
    }

    if (!vr_no || isNaN(vr_no)) {
      toast.error('Vr No must be a non-empty number');
      return false;
    }
  
    // Basic validation for Vr Date
    if (!vrDate) {
      toast.error('Vr Date must be selected');
      return false;
    }
  
    // Basic validation for Ac Name
    if (!AcName.trim()) {
      toast.error('Ac Name must be a non-empty string');
      return false;
    }


  
    return true; 
  };

  // Save to DataBase
  
  const saveData = async () => {
    if (validateTableData()) {
      try {
        // Create an object representing the entire data structure
        const requestData = {
          header_table: {
            vr_no: headerData.vr_no,
            vr_date: headerData.vrDate,
            ac_name: headerData.AcName,
            ac_amt: total, 
            status: headerData.Status,
          },
          detail_table: tableData.map((rowData) => ({
            vr_no: headerData.vr_no,
            sr_no: rowData.sr_no,
            item_code: rowData.item_code,
            item_name: rowData.item_name,
            description: rowData.description,
            qty: rowData.qty,
            rate: rowData.rate,
          })),
        };
  
        // Make a single request to send both header and detail data
        const response = await axios.post('http://5.189.180.8:8010/header/multiple', requestData);
  
        if (response.data.success) {
          console.log('Data saved successfully');
          toast.success('Saved');
          setTableData([
            {
              item_code: '',
              item_name: '',
              description: '',
              qty: '',
              rate: '',
            },
          ]);
  
          setTotal(0);
        } else {
          console.error('Failed to save data');
          toast.error('Error saving data');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error saving data');
      }
    }
  };
  
  

  // New Page
  const newPage = ()=>{
    setShowModal(true)
  }

  const action = (choice)=>{
    if (choice === "saved") {
      setShowModal(false)
      saveData()
    }else{
      setTableData([
        {
          item_code: "",
          item_name: "",
          description: "",
          qty: "",
          rate: "",
        },
      ]);

      setTotal(0)
      setShowModal(false)
    }
  }

  return (
    <div className='grid-container'>
      <ToastContainer/>
    
      <Header total={total} headerData={headerData} setHeaderData={setHeaderData} />
   
    
      <Details tableData={tableData} setTableData={setTableData} subTotalUpdate={subTotalUpdate} total={total} />
    
    
      <SideTab  addRow={addRow} saveData={saveData} newPage={newPage} />

      <Modal showModal={showModal} setShowModal={setShowModal} action={action} />
    
    </div>
  )
}

export default Home
