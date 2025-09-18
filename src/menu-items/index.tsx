// project import
import applications from './applications';
import applications2 from './applications2';
import applications3 from './application3';
import applications4 from './applications4';
import applications5 from './applications5';
import { NavItemType } from 'types/menu';
// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[],  items2: NavItemType[], items3: NavItemType[], items4: NavItemType[], items5: NavItemType[]} = {
  
  items: [applications],
  items2: [applications2],
  items3: [applications3],
  items4: [applications4],
  items5: [applications5]
};

export default menuItems;
