// assets


// type
import { NavItemType } from 'types/menu';

// icons


// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications5: NavItemType = {
  id: 'group-applications',
  type: 'group',
  children: [
    
    {
      id: 'createAcc',
      type: 'item',
      title: 'Crear Cuenta',
      url: '/createAcc',
      param: true,
      mainTitle: 'createAcc'
    },
     {
      id: 'accList',
      type: 'item',
      title: 'Lista de Cuentas',
      url: '/accList',
      param: true,
      mainTitle: 'accList'
    },
     
    {
      id: 'accList',
      type: 'item',
      title: 'Lista de Cuentas',
      url: '/acc',
      hide: true,
      param: true,
      mainTitle: 'cuentas',
      mainUrl: '/acc'
    }
    /*{
      id: 'edit',
      type: 'item',
      title: 'Registrar Usuario',
      url: '/auth/register',
      param: true,
      mainTitle: 'Registro Usuario',
      mainUrl: '/register'
    }*/
  ]
};

export default applications5;