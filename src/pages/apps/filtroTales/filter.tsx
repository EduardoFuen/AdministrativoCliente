
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from '@mui/x-date-pickers';
import { Grid, TextField } from '@mui/material';
import {Button} from "@mui/material"
import { useFilterContext } from 'contexts/Filter.context';
import React, { useState } from 'react';
import { Purchase } from 'types/purchase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'store';




const parseDDMMYYYY = (dateString: string): Date | null => {
    // Usa una expresión regular para manejar ambos separadores
    const parts = dateString.split(/[\/-]/);
    
    if (parts.length !== 3) {
        return null; 
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return null;
    }
    
    const dateObject = new Date(Date.UTC(year, month - 1, day));
    
    if (dateObject.getUTCFullYear() !== year || dateObject.getUTCMonth() !== month - 1 || dateObject.getUTCDate() !== day) {
        return null;
    }
    
    return dateObject;
};


// Tu función de filtro, usando solo la función de parseo robusta
export const filterByRange = (data: Purchase[], property: keyof Purchase, range: { min: number, max: number }): Purchase[] => {
    return data.filter(item => {
        const value = item[property];
        let numericValue: number | undefined;

        if (typeof value === 'string') {
            const customDate = parseDDMMYYYY(value);
            
            if (customDate) {
                numericValue = customDate.getTime();
            }
        } else if (typeof value === 'number') {
            numericValue = value;
        }

        if (typeof numericValue !== 'number') {
            return false;
        }

        return numericValue >= range.min && numericValue <= range.max;
    });
};
export function Filter() {
    const { listPurchase } = useSelector((state) => state.purchase);
    const history = useNavigate();
    const { setLista } = useFilterContext();
    
    
    const [dataForm, setDataForm] = useState<{
        dateFrom: Date | null,
        dateTo: Date | null,
    }>({
        dateFrom: new Date(),
        dateTo: new Date(),
    });

   
    const handleFilter = () => {
   
    const fromDate = dataForm.dateFrom;
    const toDate = dataForm.dateTo;
    
   
    const min = fromDate ? new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime() : 0;
    
   
    const max = toDate ? new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59, 999).getTime() : Infinity;
    
  
    const filteredData = filterByRange(listPurchase, 'CreatedAt', { min, max });
    setLista(filteredData);
    console.log(min,max)
    
    history("/filter/list");
    console.log(listPurchase)
};
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <DatePicker
                        disableFuture
                        label='Desde'
                        value={dataForm.dateFrom}
                        onChange={(newValue: Date | null) => {
                            setDataForm({ ...dataForm, dateFrom: newValue });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={8}>
                    <DatePicker
                        disableFuture
                        label='Hasta'
                        value={dataForm.dateTo}
                        // Aquí está la solución: si dataForm.dateFrom es null, se usa undefined
                        minDate={dataForm.dateFrom ?? undefined} 
                        onChange={(newValue: Date | null) => {
                            setDataForm({ ...dataForm, dateTo: newValue });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button variant='contained' onClick={handleFilter}>Filtrar</Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}

export default Filter;