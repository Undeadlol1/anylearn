import Layout from './pages/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import MoodPage from './pages/MoodPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import store from 'browser/redux/store'
import { fetchUser } from 'browser/redux/actions/UserActions'
import { fetchMoods, fetchMood } from 'browser/redux/actions/MoodActions'
import { fetchSkills, fetchSkill } from 'browser/redux/skill/SkillActions'
import { fetchNodes, actions as nodeActions } from 'browser/redux/actions/NodeActions'

/**
 * fetching is done in router config in order to properly prefetch data in SSR
 */

const routesConfig = {
  path: '/',
  component: Layout,
  indexRoute: {
    component: IndexPage,
    // fetch data
    onEnter({params}, replace, done) {
      // check if fetching is needed
      // console.log('store.getState().skill: ', store.getState().skill.toJS());
      // const newSkills = store.getState().skill.getIn(['new', 'skills'])
      // if (newSkills.size) return done()
      // else {
        Promise
        .all([
          store.dispatch(fetchSkills('new')),
          store.dispatch(fetchSkills('random')),
          store.dispatch(fetchSkills('popular')),
        ])
        .then(() => done())
      // }
    }
  },
  childRoutes: [
    {
      path: 'mood/(:moodSlug)',
      component: MoodPage,
      // fetch data
      onEnter({params}, replace, done) {
        Promise
        .all([
          store.dispatch(fetchMood(params.moodSlug)),
          store.dispatch(fetchNodes(params.moodSlug)),
        ])
        .then(() => done())
      }
    },
    {
      path: 'users/(:username)',
      component: UserPage,
      onEnter({params}, replace, done) {
        const fetchedUserId = store.getState().user.getIn(['fetchedUser', 'id'])
        // check if fetching is needed
        // TODO change username to userId
        if (fetchedUserId == params.username) return done()
        else {
          store
          .dispatch(fetchUser(params.username))
          .then(() => done())
        }
      }
    },
    { path: 'login', component: LoginPage },
    { path: 'search', component: SearchPage },
    { path: 'about', component: AboutPage },
    { path: 'create-skill', component: require('browser/pages/CreateSkillPage').default },
    { path: 'skill', component: require('browser/pages/SkillPage').default },
    {
      path: 'skill/(:skillSlug)',
      component: require('browser/pages/SkillPage').default,
      onEnter({params}, replace, done) {
        // check if fetching is needed
        const fetchedSkillSlug = store.getState().skill.get('slug')
        if (fetchedSkillSlug == params.skillSlug) return done()
        else {
          store
          .dispatch(fetchSkill(params.skillSlug))
          .then(() => done())
        }
      }
    },
// ⚠️ Hook for cli! Do not remove 💀
    // 404 page must go after everything else
    { path: '*', component: NotFound },
  ]
}

module.exports = routesConfig;