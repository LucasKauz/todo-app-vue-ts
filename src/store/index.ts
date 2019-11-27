import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface Comment {
  name: string;
  date: string;
  message: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  comment: string;
  comments: Comment[];
}

interface TasksStore {
  tasks: Task[];
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
  EDIT_TASK = 'EDIT_TASK',
  LOAD_TASK = 'LOAD_TASK',
  UPDATE_TASK = 'UPDATE_TASK'
}

export const enum Getters {
  GET_TASK_BY_ID = 'GET_TASK_BY_ID'
}

export default new Vuex.Store<TasksStore>({
  state: {
    tasks: []
  },
  getters: {
    [Getters.GET_TASK_BY_ID]: state => (taskId: number) => {
      return state.tasks.find((task) => {
        return task.id === taskId
      })
    }
  },
  mutations: {
    [Types.UPDATE_TASKS]: (state, payload: Task[]) => {
      state.tasks = [ ...payload ]
    },
    [Types.ADD_TASK]: (state, payload: Task) => {
      state.tasks = [ ...state.tasks, payload ]
    },
    [Types.UPDATE_TASK]: (state, payload: { taskIndex: number, task: Task }) => {
      if (payload.taskIndex < 0) return

      state.tasks.splice(payload.taskIndex, 1, payload.task)
    }
  },
  actions: {
    [Types.LOAD_TASKS] () {
      return fetch('http://localhost:3000/tasks')
        .then(response => response.json())
    },
    [Types.LIST_TASKS] ({ commit, dispatch }) {
      dispatch(Types.LOAD_TASKS).then((response) => {
        commit(Types.UPDATE_TASKS, response)
      })
    },
    [Types.ADD_TASK] ({ commit }, payload) {
      fetch('http://localhost:3000/add')
        .then((response) => response.json())
        .then((jsonResponse) => {
          const task = jsonResponse.data[0]
          commit(Types.ADD_TASK, task)
        })
    },
    [Types.EDIT_TASK] ({ commit }, payload) {
      fetch('http://localhost:3000/edit')
        .then((response) => response.json())
        .then((jsonResponse) => {
          const task = jsonResponse.data[0]
          commit(Types.ADD_TASK, task)
        })
    },
    [Types.LOAD_TASK] ({ commit, state }, taskId) {
      return fetch(`http://localhost:3000/tasks/${taskId}`)
        .then((response) => response.json())
        .then((task) => {
          const taskIndex = state.tasks.findIndex((task: Task) => task.id === taskId)

          commit(Types.UPDATE_TASK, { taskIndex, task })
        })
    }
  },
  modules: {
  }
})
