import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface Task {
  title: string,
  description: string,
  dueDate: string,
  priority: string,
  comment: string
}

interface TasksStore {
  tasks: Task[]
}

export enum PriorityLevels {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export const enum Types {
  LIST_TASKS = 'LIST_TASKS',
  LOAD_TASKS = 'LOAD_TASKS',
  UPDATE_TASKS = 'UPDATE_TASKS',
  ADD_TASK = 'ADD_TASK',
  EDIT_TASK = 'EDIT_TASK'
}

export default new Vuex.Store<TasksStore>({
  state: {
    tasks: []
  },
  mutations: {
    [Types.UPDATE_TASKS]: (state, payload: Task[]) => {
      state.tasks = [ ...payload ]
    },
    [Types.ADD_TASK]: (state, payload: Task) => {
      state.tasks = [ ...state.tasks, payload ]
    }
  },
  actions: {
    [Types.LOAD_TASKS] () {
      return fetch('https://gist.githubusercontent.com/LucasKauz/43eefb1402b8578328199156254bef33/raw/0ca703a9b9f992aca578f395cc50d004bb0bc9dc/todo-list.json')
        .then(response => response.json())
    },
    [Types.LIST_TASKS] ({ commit, dispatch }) {
      dispatch(Types.LOAD_TASKS).then((response) => {
        const { data = [] } = response
        commit(Types.UPDATE_TASKS, data)
      })
    },
    [Types.ADD_TASK] ({ commit }, payload) {
      fetch('https://gist.githubusercontent.com/LucasKauz/43eefb1402b8578328199156254bef33/raw/0ca703a9b9f992aca578f395cc50d004bb0bc9dc/todo-list.json')
        .then((response) => response.json())
        .then((jsonResponse) => {
          const task = jsonResponse.data[0]
          commit(Types.ADD_TASK, task)
        })
    },
    [Types.EDIT_TASK] ({ commit }, payload) {
      fetch('https://gist.githubusercontent.com/LucasKauz/43eefb1402b8578328199156254bef33/raw/0ca703a9b9f992aca578f395cc50d004bb0bc9dc/todo-list.json')
        .then((response) => response.json())
        .then((jsonResponse) => {
          const task = jsonResponse.data[0]
          commit(Types.ADD_TASK, task)
        })
    }
  },
  modules: {
  }
})
