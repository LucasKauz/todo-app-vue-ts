import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import uuid from 'uuid/v4'
import moment from 'moment'

Vue.use(Vuex)

export interface Comment {
  id: string;
  name?: string;
  message: string;
  date: string;
}

export interface AddCommentPayload extends Pick<Comment, 'name' | 'message'> {
  taskId: string;
}

export interface Task {
  id: string;
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

export interface AddCommentResponse {
  success: boolean;
  comment: Comment;
}

export enum PriorityLevels {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export const enum Types {
  UPDATE_TASKS = 'UPDATE_TASKS',
  ADD_TASK = 'ADD_TASK',
  EDIT_TASK = 'EDIT_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  ADD_COMMENT = 'ADD_COMMENT',
  DELETE_TASKS = 'DELETE_TASKS'
}

export const enum Getters {
  GET_TASK_BY_ID = 'GET_TASK_BY_ID'
}

const vuexLocal = new VuexPersistence<TasksStore>({
  storage: window.localStorage
})

export default new Vuex.Store<TasksStore>({
  state: {
    tasks: []
  },
  getters: {
    [Getters.GET_TASK_BY_ID]: state => (taskId: string) => {
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
    },
    [Types.ADD_COMMENT]: (state, payload: { comment: Comment, taskId: string }) => {
      // find comment related task index
      const taskIndex = state.tasks.findIndex((task) => task.id === payload.taskId)

      if (taskIndex === -1) return

      if (!state.tasks[taskIndex].comments) {
        state.tasks[taskIndex].comments = [payload.comment]
      }

      state.tasks[taskIndex].comments.push(payload.comment)
    },
    [Types.DELETE_TASKS]: (state, payload: string[]) => {
      const newTasks = state.tasks.filter((task) => {
        return !payload.some(taskId => task.id === taskId)
      })

      state.tasks = [...newTasks]
    }
  },
  actions: {
    [Types.ADD_TASK] ({ commit }, payload: Task) {
      const task = {
        ...payload,
        id: uuid(),
        date: moment().format('YYYY-MM-DD'),
        comments: []
      }

      commit(Types.ADD_TASK, task)
    },
    [Types.EDIT_TASK] ({ state, commit }, payload) {
      const task = {
        ...payload,
        comments: []
      }

      const taskIndex = state.tasks.findIndex((task: Task) => task.id === payload.id)

      commit(Types.UPDATE_TASK, {
        taskIndex,
        task
      })
    },
    [Types.ADD_COMMENT] ({ commit }, payload: AddCommentPayload) {
      let comment: Comment = {
        name: payload.name,
        message: payload.message,
        id: uuid(),
        date: moment().format('YYYY-MM-DD')
      }

      commit(Types.ADD_COMMENT, {
        taskId: payload.taskId,
        comment: comment
      })
    },
    [Types.DELETE_TASKS] ({ commit, state }, payload: string[]) {
      commit(Types.DELETE_TASKS, payload)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
