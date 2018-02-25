import Layout from './pages/Layout';
import IndexPage from './pages/IndexPage';
import UserPage from './pages/UserPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import store from 'browser/redux/store'
import { fetchMoods, fetchMood } from 'browser/redux/actions/MoodActions'
import { fetchUser, fetchCurrentUser  } from 'browser/redux/actions/UserActions'
import { fetchNodes, actions as nodeActions } from 'browser/redux/actions/NodeActions'
import {
  fetchSkill,
  fetchSkills,
  fetchRevision,
  fetchRevisions,
  actions as skillActions
} from 'browser/redux/skill/SkillActions'
import {
  fetchForum,
  fetchForums,
  fetchThread,
  fetchThreads,
} from 'browser/redux/forum/ForumActions'

/**
 * fetching is done in router config in order to properly prefetch data in SSR
 */

// reset active tab of SkillTabs
// this is needed to prevent same active tab across all pages while
// browsing through different skills
function resetSkillTab() {
  store.dispatch(skillActions.changeTab(0))
}

const routesConfig = {
  path: '/',
  component: Layout,
  onEnter({params}, replace, done) {
    // check if fetching is needed
    const userId = store.getState().user.get('id')
    if (userId) return done()
    else {
      store
      .dispatch(fetchCurrentUser())
      .then(() => done())
    }
  },
  indexRoute: {
    component: IndexPage,
    // fetch data
    onEnter({params}, replace, done) {
      // check if fetching is needed
      const newSkills = store.getState().skill.getIn(['skills', 'values'])
      if (newSkills && newSkills.size) return done()
      else {
        store
        .dispatch(fetchSkills())
        .then(() => done())
        // Promise
        // .all([
        //   store.dispatch(fetchMoods('new')),
        //   store.dispatch(fetchMoods('random')),
        //   store.dispatch(fetchMoods('popular')),
        // ])
        // .then(() => done())
      }
    }
  },
  childRoutes: [
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
    { path: 'search', component: SearchPage },
    { path: 'about', component: AboutPage },
    {
      path: 'create-skill',
      component: require('browser/pages/CreateSkillPage').default,
      onEnter({params}, replace, done) {
        resetSkillTab()
        done()
      }
    },
    {
      path: 'skill/(:skillSlug)',
      component: require('browser/pages/SkillPage').default,
      onEnter({params}, replace, done) {
        // check if fetching is needed
        const fetchedSkillSlug = store.getState().skill.get('slug')
        if (fetchedSkillSlug == params.skillSlug) return done()
        else {
          resetSkillTab()
          store
          .dispatch(fetchSkill(params.skillSlug))
          .then(action => {
            done()
            // currently togglePageLoading() action is being returned
            // if (action.payload) done()
            // else replace('/404')
          })
        }
      }
    },
// TODO add skill fetching and data checking
{
  path: 'skill/(:skillSlug)/edit',
  component: require('browser/pages/EditSkillPage').default,
  onEnter({params}, replace, done) {
    // check if fetching is needed
    const fetchedSkillSlug = store.getState().skill.get('slug')
    if (fetchedSkillSlug == params.skillSlug) return done()
    else {
      resetSkillTab()
      store
      .dispatch(fetchSkill(params.skillSlug))
      .then(() => done())
    }
  }
},
// TODO add skill fetching and data checking
{
  path: 'skill/(:skillSlug)/dev',
  component: require('browser/pages/DevPage').default,
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
{
  path: 'skill/(:skillSlug)/revision/(:RevisionId)',
  component: require('browser/pages/RevisionPage').default,
  onEnter({params}, replace, done) {
    const fetchedRevision = store.getState().skill.get('revision')
    // check if fetching is needed
    if (fetchedRevision.get('id') == params.RevisionId) return done()
    else {
      store
      .dispatch(fetchRevision(params.RevisionId))
      .then(() => done())
    }
  }
},
    {
      path: 'forums/(:forumSlug)',
      component: require('browser/pages/ForumPage').default,
      onEnter({params}, replace, done) {
        const { forumSlug } = params
        const fetchedForum = store.getState().forum
        // check if fetching is needed
        if (fetchedForum.get('slug') == forumSlug) return done()
        else {
          store
          .dispatch(fetchForum(forumSlug))
          .then(() => done())
        }
      }
    },
    {
      path: 'threads/(:threadSlug)',
      component: require('browser/pages/ThreadPage').default,
      // fetch data
      onEnter({params}, replace, done) {
        const { threadSlug } = params
        const fetchedSlug = store
                              .getState()
                              .forum
                              .getIn(['thread', 'slug'])
        // check if fetching is needed
        if (fetchedSlug == threadSlug) return done()
        else {
          console.log('else is running')
          store
          .dispatch(fetchThread(threadSlug))
          .then(() => done())
        }
      }
    },
{
  path: 'forum',
  component: require('browser/pages/ForumsPage').default,
  onEnter({params}, replace, done) {
    // check if fetching is needed
    const fetchedForums = store.getState().forum.getIn(['forums', 'values'])
    if (fetchedForums.size) return done()
    else {
      store
      .dispatch(fetchForums())
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