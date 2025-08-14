
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import data2 from "./data2.json"
import { useSelector } from 'react-redux';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';



const Filter = () => {


 const [dataForm, setDataForm] = React.useState<{
        dateFrom: Date | null,
        dateTo: Date | null,
        selected: string | number
    }>({
      dateFrom: new Date(),
      dateTo: new Date(),
      selected: -1
    })

const  lista  = useSelector(() => data2);



console.log (lista)


  return (
   <LocalizationProvider dateAdapter={AdapterDateFns}>  
    <DatePicker
                disableFuture
                label='Date From'
                value={dataForm.dateFrom}
                inputFormat= "dd/MM/yyyy"
                onChange={(newValue: Date | null) => {
                  setDataForm({ ...dataForm, dateFrom: newValue })
                }}
               renderInput={(params) => <TextField {...params}  />}
              />
   </LocalizationProvider>
  )
}

export default Filter