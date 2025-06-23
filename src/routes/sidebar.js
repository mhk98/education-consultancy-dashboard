
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
    roles: ['admin', 'employee', 'superAdmin'],
  },

  {
    path: '/app/user-management',
    icon: 'PeopleIcon',
    name: 'User Management',
    roles: ['superAdmin'],
  },
  {
    path: '/app/task',
    icon: 'EditIcon',
    name: 'Task',
    roles: ['admin', 'employee', 'superAdmin'],
    
  },

  {
    path: '/app/students',
    icon: 'OutlinePersonIcon',
    name: 'Students',
    roles: ['admin', 'employee', 'superAdmin', 'student'],

  },

  {
    path: '/app/applications',
    icon: 'FormsIcon',
    name: 'Applications',
    roles: ['admin', 'employee', 'superAdmin', 'student'],

  },
  {
    path: '/app/programs',
    icon: 'PagesIcon',
    name: 'Add Programs',
    roles: ['superAdmin',],

  },
  {
    path: '/app/leads',
    icon: 'PagesIcon',
    name: 'Leads',
    roles: ['employee', 'admin', 'superAdmin',],

  },
  {
    path: '/app/wallet',
    icon: 'MoneyIcon',
    name: 'Wallet',
    roles: ['admin', 'superAdmin', ],

  },
  {
    path: '/app/commission-payments',
    icon: 'ChartsIcon',
    name: 'Commission Payments',
    roles: ['admin', 'superAdmin', ],

  },
  {
    path: '/app/manage-enquiries',
    icon: 'ChatIcon',
    name: 'Manage Enquiries',
    roles: ['admin', 'superAdmin', 'student', 'employee' ],

  },
 
]

export default routes
