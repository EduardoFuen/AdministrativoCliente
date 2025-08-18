
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import data2 from "./data2.json"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { DatePicker } from '@mui/x-date-pickers';
import { Grid, TextField } from '@mui/material';
import {Button} from "@mui/material"




interface Article {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
}

interface ReceptionData {
  ID?: string | number;
  SupplierID?: number;
  Supplier?: { name: string };
  Warehouse?: object;
  WarehouseID?: number;
  Notes?: string;
  Discount?: string | number;
  DiscountEarliyPay?: number;
  SubTotal?: number;
  DiscountGlobal?: number;
  SubtotalWithDiscount?: number;
  CreatedAd?: string;
  Total?: number;
  Tax?: number;
  Status?: number;
  Articles?: Article[];
  detailsReption?: any;
}

const filterByRange = (data: ReceptionData[], property: keyof ReceptionData, range: { min: number, max: number }): ReceptionData[] => {
  if (!Array.isArray(data) || !range || typeof range.min !== 'number' || typeof range.max !== 'number') {
    console.error("Los argumentos de entrada no son válidos.");
    return [];
  }

   return data.filter(item => {
    const value = item[property];

    
    const numericValue = typeof value === 'string' ? new Date(value).getTime() : typeof value === 'number' ? value : undefined;

    if (typeof numericValue !== 'number') {
      return false;
    }

    return numericValue >= range.min && numericValue <= range.max;
  });
};

export default function Filter() {
  const jsonData: ReceptionData[] = data2

  

 const [dataForm, setDataForm] = React.useState<{
        dateFrom: Date | null,
        dateTo: Date | null,
        
    }>({
      dateFrom: new Date(),
      dateTo: new Date(),
      
    })
    const [data, setData] = React.useState<ReceptionData[]>(jsonData);
  const [min, setMin] = React.useState<number>(new Date("2024-01-01").getTime());
  const [max, setMax] = React.useState<number>(new Date("2025-06-20").getTime());
  React.useEffect(() => {
    const filteredData = filterByRange(jsonData, 'CreatedAd', { min, max });
    setData(filteredData)
  
  }, [min, max]);
   console.log (data)
console.log (min,max)
  return (
    <>

<LocalizationProvider dateAdapter={AdapterDateFns}>  
    <Grid container spacing={3}>
  <Grid item xs={8}>
      <DatePicker
                disableFuture
                label='Desde'
                value={dataForm.dateFrom}
                
                inputFormat= "dd/MM/yyyy"
                onChange={(newValue: Date | null) => {
                  setDataForm({ ...dataForm, dateFrom: newValue })
                  const newMin = newValue ? newValue.getTime() : 0;
                  setMin(newMin);
                }}
               renderInput={(params) => <TextField {...params} />}
              />

    
  </Grid>
  <Grid item xs={8}>
      <DatePicker
                disableFuture
                label='Hasta'
                value={dataForm.dateTo}
                minDate={dataForm.dateFrom === null ? undefined : dataForm.dateFrom}
                inputFormat= "dd/MM/yyyy"
                onChange={(newValue: Date | null) => {
                  setDataForm({ ...dataForm, dateTo: newValue })
                  const newMax = newValue ? newValue.getTime() : 0;
                  setMax(newMax);
                }}
               renderInput={(params) => <TextField {...params} />}
              />
  </Grid>
  <Grid item xs = {8}>
  <Button variant='contained' > Filtrar </Button>
</Grid>
</Grid>

</LocalizationProvider>

   </>
  )
}

