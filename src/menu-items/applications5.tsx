// assets
import { UsergroupAddOutlined, BarsOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { UsergroupAddOutlined, BarsOutlined };

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
      icon: icons.UsergroupAddOutlined,
      mainTitle: 'createAcc'
    },
    {
      id: 'accList',
      type: 'item',
      title: 'Lista de Cuentas',
      url: '/accList',
      param: true,
      icon: icons.BarsOutlined,
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
