import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import StudentEditProfile from './components/Students/StudentEditProfile'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './app/store'
import PaymentStatus from './components/Students/PaymentStatus'
import PrivateRoute from './components/PrivateRoute'
import EditLeads from './components/Leads/EditLeads'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {
  return (
    <>
      <Provider store={store}>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <PrivateRoute path="/app" component={Layout} />
          <PrivateRoute path="/editprofile" component={StudentEditProfile} />
          <PrivateRoute path="/editLeads" component={EditLeads} />
          <PrivateRoute path="/archive-student" component={StudentEditProfile} />
          <PrivateRoute path="/payments" component={PaymentStatus} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
      <Toaster/>
        </Provider>
    </>
  )
}

export default App
