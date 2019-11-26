<template>
  <div class="TaskList">
    <template v-if="tasks && tasks.length > 0">
      <TaskItem
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :editTask="editTask"
        :viewTask="viewTask"
      />
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

import { Types } from '@/store/index'

import TaskItem from '@/components/TaskItem.vue'

export default Vue.extend({
  name: 'TaskList',
  props: {
    addTask: Function
  },
  async mounted () {
    this.$store.dispatch(Types.LIST_TASKS)
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
    editTask (taskId: number) {
      this.$modal.show('task-modal', {
        taskId
      })
    },
    viewTask (taskId: number) {
      this.$modal.show('task-modal', {
        taskId
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.Link {
  background: transparent;
  text-decoration: underline;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-size: 15px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
