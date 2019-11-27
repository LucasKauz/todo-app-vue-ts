<template>
  <div>
    <header>
      <h2>{{ currentTask.title }}</h2>
      <button @click="closeModal">Close</button>
      <button @click="() => editTask(currentTask.id)">Edit task</button>
    </header>
    <div>{{ currentTask.description }}</div>
    <div>
      <div>Date: {{ formatedDate }}</div>
      <div>Priority: {{ currentTask.priority }}</div>
    </div>
    <Comments
      :comments="currentTask.comments"
      :taskId="currentTask.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Comments from '@/components/Comments.vue'

export default Vue.extend({
  name: 'TaskOverview',
  props: {
    currentTask: Object,
    editTask: Function,
    closeModal: Function
  },
  computed: {
    formatedDate () {
      const date = new Date(this.currentTask.dueDate)
      const formatedMonth = String(date.getMonth()).padStart(2, '0')
      return `${date.getDate()}/${formatedMonth}/${date.getFullYear()}`
    }
  },
  components: {
    Comments
  }
})
</script>
