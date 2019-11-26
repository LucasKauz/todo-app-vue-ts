<template>
  <div class="TaskItem">
    <input type="checkbox" />
    {{ task.title }}
    {{ task.dueDate }}
    <button class="Btn" @click="viewTask">C</button>
    <button class="Btn" @click="editTask">E</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TaskItem',
  props: {
    task: Object,
    editTask: Function,
    viewTask: Function
  }
})
</script>
