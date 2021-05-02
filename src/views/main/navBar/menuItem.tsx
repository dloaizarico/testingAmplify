import React from 'react'
import { PieChart, Group,  AccountBalance, AddShoppingCart} from '@material-ui/icons';

const items = [
  {
    href: '/ordering/dashboard',
    icon: () => <PieChart />,
    title: 'Dashboard'
  }, {
    href: '/ordering/users',
    icon: () => <Group/>,
    title: 'Users'
  }, {
    href: '/ordering/products',
    icon: () => <AccountBalance/>,
    title: 'Products'
  }, {
    href: '/ordering/orders',
    icon: () => <AddShoppingCart/>,
    title: 'Orders'
  }
];

export default items