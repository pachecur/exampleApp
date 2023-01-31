import {Route, Switch} from 'react-router-dom'
import TestComponent from './components/testComponent/TestComponent'

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/secondary' >
        <TestComponent />
      </Route>
    </Switch>
  )
}

export default Routes
