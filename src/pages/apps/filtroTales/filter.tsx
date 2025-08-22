
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from '@mui/x-date-pickers';
import { Grid, TextField } from '@mui/material';
import {Button} from "@mui/material"
import { useFilterContext } from 'contexts/Filter.context';
import React from 'react';
import { Purchase } from 'types/purchase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'store';







export const filterByRange = (data: Purchase[], property: keyof Purchase, range: { min: number, max: number }): Purchase[] => {
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

export function Filter() {
   const { listPurchase } = useSelector((state) => state.purchase);
  
const history = useNavigate();
const filtrar = () => {history("/filter/list")}

  const { lista, setLista } = useFilterContext()

  
  const [dataForm, setDataForm] = React.useState<{
        dateFrom: Date | null,
        dateTo: Date | null,
        
    }>({
      dateFrom: new Date(),
      dateTo: new Date(),
      
    })
    const [data, setData] = React.useState<Purchase[]>(listPurchase);
  const [min, setMin] = React.useState<number>(new Date("2024-01-01").getTime());
  const [max, setMax] = React.useState<number>(new Date("2025-06-20").getTime());
  React.useEffect(() => {
    const filteredData = filterByRange(listPurchase, 'CreatedAt', { min, max });
    setData(filteredData)
    setLista (data)
  
  }, [min, max]);

console.log (lista)
console.log (min)
console.log (max)
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
  <Button variant='contained' onClick={filtrar} > Filtrar </Button>
</Grid>
</Grid>

</LocalizationProvider>

   </>
  )
}

export default Filter