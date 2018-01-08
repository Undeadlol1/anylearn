/* POLYFILLS */
import 'es6-promise/auto'
import 'isomorphic-fetch' // TODO move to server? or to webpack?
// material-ui dependency
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

/* DEPENDENCIES */
<<<<<<< HEAD
// import { VK } from 'react-vk'
=======
>>>>>>> f09cd9b6073a78131c483a1a75e84389d7cb3de4
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Router from 'react-router/lib/Router'
import RouterContext from 'react-router/lib/RouterContext'
import browserHistory from 'react-router/lib/browserHistory'
import { Provider as ReduxProvider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import store from './redux/store'
import routesConfig from './routes'
import Translator from './containers/Translator'
import { syncHistoryWithStore } from 'react-router-redux'
import { actions } from 'browser/redux/actions/UserActions'
import { CookiesProvider } from 'react-cookie'

/* STYLES */
if (process.env.BROWSER) require('./styles.scss')
import customMuiTheme from './theme.js'
import { ThemeProvider } from 'styled-components'
import { BASE_CONF } from 'react-styled-flexboxgrid'
// import customMuiTheme from 'material-ui/styles/baseThemes/customMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// supply userAgent for material-ui prefixer in ssr
// http://stackoverflow.com/a/38100609
customMuiTheme.userAgent = navigator.userAgent
const muiTheme = getMuiTheme(customMuiTheme)

// scroll to top of the page on route change
function scrollToTop () {
  return window.scrollTo(0, 0)
}

class App extends Component {
  // if SSR provided logged in user, put object in state
  componentWillMount() {
    store.dispatch(
      actions.recieveCurrentUser(this.props.user)
    )
  }

  render() {
    const cookies = process.env.SERVER ? this.props.cookies : null
    return  <MuiThemeProvider muiTheme={muiTheme}>
                <ThemeProvider theme={BASE_CONF}>
                  <ReduxProvider store={store} key="provider">
                    {/* universal cookies */}
                    <CookiesProvider cookies={cookies}>
                      <Translator>
                        {
                          process.env.BROWSER
                          ? <Router history={syncHistoryWithStore(browserHistory, store)} routes={routesConfig} onUpdate={scrollToTop} />
                          : <RouterContext {...this.props} />
                        }
                      </Translator>
                    </CookiesProvider>
                  </ReduxProvider>
                </ThemeProvider>
            </MuiThemeProvider>
  }
}

if (process.env.BROWSER) ReactDOM.render(<App />, document.getElementById('react-root'));

App.propTypes = {
  user: PropTypes.object
}

export default App