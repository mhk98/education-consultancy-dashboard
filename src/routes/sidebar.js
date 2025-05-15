
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },

  {
    path: '/app/user-management',
    icon: 'PeopleIcon',
    name: 'User Management',
  },
  {
    path: '/app/task',
    icon: 'EditIcon',
    name: 'Task',
  },

  {
    path: '/app/students',
    icon: 'OutlinePersonIcon',
    name: 'Students',
  },

  {
    path: '/app/applications',
    icon: 'FormsIcon',
    name: 'Applications',
  },
  {
    path: '/app/programs',
    icon: 'PagesIcon',
    name: 'Add Programs',
  },
  {
    path: '/app/wallet',
    icon: 'MoneyIcon',
    name: 'Wallet',
  },
  {
    path: '/app/commission-payments',
    icon: 'ChartsIcon',
    name: 'Commission Payments',
  },
  {
    path: '/app/manage-enquiries',
    icon: 'ChatIcon',
    name: 'Manage Enquiries',
  },
 
]

export default routes
