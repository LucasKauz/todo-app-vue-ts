<template>
  <modal
    name="task-modal"
    :adaptive="true"
    :scrollable="true"
    :width="'90%'"
    :height="'auto'"
    :maxWidth="900">
    <header>
      <h1>Add new Task</h1>
      <button @click="() => closeModal()">X</button>
    </header>

    <TaskForm />
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'

import TaskForm from '@/components/TaskForm.vue'

import { Types, Task } from '@/store/index'

export default Vue.extend({
  name: 'TaskModal',
  methods: {
    dispatchForm (type: Types, formData: Task) {
      const formDispatched = this.$store.dispatch(type, formData)

      formDispatched.finally(() => {
        this.closeModal()
      })
    },
    closeModal () {
      this.$modal.hide('task-modal')
    }
  },
  components: {
    TaskForm
  }
})
</script>
