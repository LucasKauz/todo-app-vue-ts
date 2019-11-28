<template>
  <div class="TaskList">
    <template v-if="tasks && tasks.length > 0">
      <TaskItem
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :editTask="editTask"
        :viewTask="viewTask"
        :toggleListTask="toggleListTask"
      />
      <button
        class="Btn TaskList__remove"
        @click="deleteSelectedTasks"
        v-if="selectedTasks.length > 0"
      >Delete selected</button>
    </template>
    <template v-else>
      You do not have any tasks
      <button class="Link" @click="addTask">add a new task</button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

import { Types, Task } from '@/store/index'

import TaskItem from '@/components/TaskItem.vue'

interface TaskList {
  selectedTasks: string[];
}

export default Vue.extend({
  name: 'TaskList',
  data (): TaskList {
    return {
      selectedTasks: []
    }
  },
  props: {
    addTask: Function
  },
  components: {
    TaskItem
  },
  computed: {
    ...mapState([
      'tasks'
    ])
  },
  methods: {
    ...mapActions({
      'deleteTasks': Types.DELETE_TASKS
    }),
    editTask (taskId: string) {
      this.$modal.show('task-modal', {
        taskId
      })
    },
    viewTask (taskId: string) {
      this.$modal.show('task-overview-modal', {
        taskId
      })
    },
    toggleListTask (taskId: string) {
      let selectedTask = this.selectedTasks.findIndex((currentTaskId: string) => {
        return currentTaskId === taskId
      })

      if (selectedTask === -1) {
        this.selectedTasks.push(taskId)
        return
      }

      this.selectedTasks.splice(selectedTask, 1)
    },
    deleteSelectedTasks () {
      this.deleteTasks(this.selectedTasks)
      this.selectedTasks = []
    }
  }
})
</script>

<style lang="scss" scoped>
.TaskList {
  &__remove {
    margin-top: 25px
  }
}
</style>
