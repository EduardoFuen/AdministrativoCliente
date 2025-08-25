import { useCallback, useEffect, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Tooltip, Dialog, Box, CircularProgress } from '@mui/material';

import { useNavigate } from 'react-router-dom';

// third-party
import { useSelector, useDispatch } from 'store';

// project import
import ReactTable from 'components/ReactTable';
import DeliveryView from './view';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Import from './ImportDelivery';
import { DefaultSupplier } from 'config';
import { DeliveryExport } from 'utils/DeliveryTransform';

// assets
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { deleteDelivery, getDeliveryList } from 'store/reducers/delivery';


// ==============================|| SUPPLIER - LIST ||============================== //

const DeliveryListPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [addImport, setActiveImport] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDeliveryList());
  }, [dispatch]);

  const { deliveryList } = useSelector((state) => state.delivery);
  const data = (deliveryList.length >= 0 && DeliveryExport(deliveryList)) || [];

  const handleEditDelivery = (id: any) => {
    history(`/delivery/edit/${id}`);
  };

  const handleAddDelivery = () => {
    history(`/delivery/add`);
  };

  const handleImport = () => {
    setActiveImport(!addImport);
  };

  const columns = useMemo(
    () => [
      
     
      {
        Header: 'Nombre',
        className: 'cell-center font-size',
        accessor: 'NameContact'
      },
      {
        Header: 'Teléfono',
        className: 'cell-center font-size',
        accessor: 'PhoneContact',
      },
    
      {
        Header: 'Acciones',
        className: 'cell-center font-size',
        disableSortBy: true,
        Cell: ({ row }: any) => {
          const [isLoading, setIsLoading] = useState<boolean>(false);



          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleEditDelivery(row?.original?.sk);
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={async (e: any) => {
                    e.stopPropagation();
                    setIsLoading(true);
                    await dispatch(deleteDelivery(row?.original?.sk));
                    setIsLoading(false);
                  }}
                >
                  {!isLoading ? (
                    <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                  ) : (
                    <Box sx={{ display: 'flex' }}>
                      <CircularProgress color="success" size={20} />
                    </Box>
                  )}
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }: any) => <DeliveryView data={deliveryList[row.id]} />, [deliveryList]);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          handleImport={handleImport}
          handleAdd={handleAddDelivery}
          data={deliveryList as []}
          getHeaderProps={(column: any) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
          TitleButton="Agregar"
          FileName="Deliverys"
          dataExport={data as []}
          FileNameTemplate="Descargar Plantilla"
          download
          dataTemplate={DefaultSupplier as []}
        />
      </ScrollX>
      <Dialog maxWidth="sm" fullWidth onClose={handleImport} open={addImport} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {addImport && <Import onCancel={handleImport} />}
      </Dialog>
    </MainCard>
  );
};

export default DeliveryListPage;
