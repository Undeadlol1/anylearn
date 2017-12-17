import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as toastr } from 'react-redux-toastr'
import { routerReducer as routing } from 'react-router-redux'

import global, { initialState as globalState } from './GlobalReducer'
import user, { initialState as userState } from './UserReducer'
import mood, { initialState as moodState } from './MoodReducer'
import node, { initialState as nodeState } from './NodeReducer'
import skill, { initialState as skillState } from 'browser/redux/skill/SkillReducer'
import forum, { initialState as forumState } from 'browser/redux/forum/ForumReducer'
import ui, { initialState as uiState } from 'browser/redux/ui/UiReducer'
// ⚠️ First hook for cli! Do not remove 💀

export const initialState = {
    global: globalState,
    user: userState,
    mood: moodState,
    node: nodeState,
skill: skillState,
forum: forumState,
ui: uiState,
// ⚠️ Second hook for cli! Do not remove 💀
}

export default combineReducers({
    global,
    user,
    mood,
    node,
    form,
    toastr,
    routing,
skill,
forum,
ui,
// ⚠️ Third hook for cli! Do not remove 💀
})