import { lazy } from 'react'
import Students from '../pages/Students'
import Applications from '../pages/Applications'
import Wallet from '../pages/Wallet'
import CommissionPayment from '../pages/CommissionPayment'
import Enquiries from '../pages/Enquiries'
import StudentEditProfile from '../components/Students/StudentEditProfile'
import Programs from '../pages/Programs'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/students',
    component: Students,
  },
  {
    path: '/editprofile/:id',
    component: StudentEditProfile,
  },
  {
    path: '/applications',
    component: Applications,
  },
  {
    path: '/programs',
    component: Programs,
  },
  {
    path: '/wallet',
    component: Wallet,
  },
  {
    path: '/commission-payments',
    component: CommissionPayment,
  },
  {
    path: '/manage-enquiries',
    component: Enquiries,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
