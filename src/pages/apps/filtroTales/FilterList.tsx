import { useMemo, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Stack, Tooltip, Typography, CircularProgress, Box, Button} from '@mui/material';
// third-party
import NumberFormat from 'react-number-format';
// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import ReactTable from 'components/ReactTable';
//import PDF from 'components/PDF';
import { newDataExport } from 'utils/PurchaseTransform';
import { getProducts } from 'store/reducers/product';

//import { useSelector, useDispatch, store } from 'store';
import { useDispatch } from 'store';
import { deletePurchase, getPurchaseList, resetItemsPurchase } from 'store/reducers/purcharse';

// types
import { Purchase } from 'types/purchase';
// assets
import { DeleteTwoTone, EyeTwoTone } from '@ant-design/icons';
import { useFilterContext } from 'contexts/Filter.context';
import { findTopComprador, findTopVenta } from './filter';







// ==============================|| RECEPTION - LIST VIEW ||============================== //

const ReceptionList = () => { const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  


const context = useFilterContext ();
const { lista } = context;


const topComprador = findTopComprador(lista)
  


console.log (topComprador)
const topVenta = findTopVenta (lista)
console.log (topVenta?.Total)
  
  useEffect(() => {
    dispatch(getPurchaseList());
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddPurchase = () => {
    dispatch(resetItemsPurchase());
    history(`/purchase/add`);
  };

  const handleViewPurchase = (id: number) => {
    //dispatch(resetItemsPurchase());
    history(`/purchase/view/${id}`);
  };

  const filtrar = () => {history("/filter")}

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ textAlign: 'center', width: 90 }}>
            Cliente
          </Stack>
        ),
        accessor: 'BusinessName',
         Cell: ({ value }: any) => {
           return (
             <Stack direction="row" spacing={1.5} alignItems="center">
               <Stack spacing={0}>
                 <Typography variant="subtitle1" className="font-size">
                 {value || 'N/A'}
          </Typography>
        </Stack>
      </Stack>
          );
        }
      },
      {
  Header: 'Fecha OC',
  accessor: 'CreatedAt',
  Cell: ({ value }: any) => {
 
  
    return (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Stack spacing={0}>
          <Typography className="cell-center font-size">{value}</Typography>
        </Stack>
      </Stack>
    );
  }
},
      {
        Header: 'Sin verificar',
        accessor: 'Total1',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Verificado',
        accessor: 'Total2',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Total',
        accessor: 'Total',
        className: 'cell-center font-size',
        Cell: ({ value }: any) => <NumberFormat value={value} displayType="text" prefix="$" />
      },
      {
        Header: 'Estado',
        accessor: 'Status',
        Cell: ({ value }: any) => {
          switch (value) {
            case 2:
              return <Chip color="error" label="Cancelled" size="small" variant="light" />;
            case 1:
              return <Chip color="info" label="Send" size="small" variant="light" />;
            case 0:
            default:
              return <Chip color="warning" label="New" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Ver">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    if (row?.original?.sk) handleViewPurchase(row?.original?.sk);
                  }}
                >
                  <EyeTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
              <IconButton
                    color="error"
                    onClick={async (e: any) => {
                      e.stopPropagation();
                      setIsLoadingDelete(true);
                      await dispatch(deletePurchase(Number(row?.original?.sk)));
                      setIsLoadingDelete(false);
                    }}
                  >
                    {!isLoadingDelete ? (
                      <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                    ) : (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress color="success" size={20} />
                      </Box>
                    )}
                  </IconButton>
              </Tooltip>
              {row.original?.ReceptionStatus === 0 && (
                <Tooltip title="Cancelar">
                  <IconButton
                    color="error"
                    onClick={async (e: any) => {
                      e.stopPropagation();
                      setIsLoadingDelete(true);
                      await dispatch(deletePurchase(Number(row?.original?.sk)));
                      setIsLoadingDelete(false);
                    }}
                  >
                    {!isLoadingDelete ? (
                      <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                    ) : (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress color="success" size={20} />
                      </Box>
                    )}
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  let list: Purchase[] = lista && lista.length > 0 ? lista : [];
const sumaTotal = list.reduce((acumulador, pedido) => {
  return (acumulador + (pedido.Total ?? 0));
}, 0);


  return (
    <MainCard content={false}>
  
      <ScrollX>
         <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: 3, 
        marginTop: 4,
        marginBottom: -2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h5" component="h2">
          Total de las Ventas: 
        </Typography>
        <Typography variant="h5" color="primary">
          ${sumaTotal.toFixed(2)}
        </Typography>

        <br />
        
         <Typography variant="h5" component="h2">
          Top Venta:
        </Typography>
        <Typography variant="h5" color="primary">
          ${topVenta?.Total}
        </Typography>

        <br />

         <Typography variant="h5" component="h2">
          Comprador mas Frecuente: 
        </Typography>
        <Typography variant="h5" color="primary">
          {topComprador}
        </Typography>


      </Box>
      
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, marginRight: 3, marginTop: 2 }}>
        <Button variant='contained' onClick={filtrar}>
        Filtrar
      </Button>
      </Box>
        <ReactTable
          columns={columns}
          data={list as []}
          handleImport={() => {}}
          handleAdd={handleAddPurchase}
          TitleButton="Agregar"
          FileName="Purchase"
          hideButton={false}
          dataExport={newDataExport(list) as []}
          /*     handlePagination={(page: number) => {
            dispatch(getPurchaseList(page + 1));
          }} */
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          /*        isLoading={isLoading}
          numberPage={page}
          totalRows={totalPages} */
        />
      </ScrollX>
      
    </MainCard>
  );
};

export default ReceptionList;
