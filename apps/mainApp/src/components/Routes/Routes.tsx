import {Route, Switch, useLocation, withRouter} from 'react-router-dom'
import {lazy, Suspense, useMemo} from 'react'


const asyncComponent = (importComponent: any) => {
  const AsyncComponent = () => {
    const LazyComponent = useMemo(() => lazy(() => importComponent()), [])
    return(
      <>
          <Suspense fallback={<div style={{display: 'flex'}} />}>
            <LazyComponent/>
          </Suspense>
      </>
    )
  }
  return AsyncComponent
}

const SecondaryApp = asyncComponent(() => import('secondaryApp/App'))


const Routes = () => {
  const location = useLocation()
  const pathname = location.pathname
  const params = new URLSearchParams(location.search)
  const redirect = params.get('redirect')
  return (
    <Switch>
      <Route exact path='/'>
        {<div>main</div>}
      </Route>
      <Route path='/secondary'>
        <SecondaryApp />
      </Route>
      <Route path={['/notFound', pathname]} notFound>
        <div>error</div>
      </Route>
    </Switch>
  )
}

export default withRouter(Routes)
