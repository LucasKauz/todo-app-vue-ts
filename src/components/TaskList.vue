<template>
  <div class="TaskList">
    <template v-if="tasks && tasks.length < 0">
      Task list
    </template>
    <template v-else>
      You do not have any tasks
      <button class="Link" @click="addTask">add a new task</button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TaskList',
  props: {
    tasks: Array,
    addTask: Function
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
