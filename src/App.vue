<template>
  <div id="app" class="App">
    <header class="Header">
      <h1>PawaTask</h1>
      <button class="Btn Header__btn" @click="this.addTask">
        Add new task
      </button>
    </header>
    <TaskList :addTask="this.addTask" />

    <TaskModal />
    <TaskOverviewModal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskList from './containers/TaskList.vue'
import TaskModal from './containers/TaskModal.vue'
import TaskOverviewModal from './containers/TaskOverviewModal.vue'

export default Vue.extend({
  name: 'app',
  components: {
    TaskList,
    TaskModal,
    TaskOverviewModal
  },
  methods: {
    addTask () {
      this.$modal.show('task-modal')
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  box-sizing: border-box;
}
.Header {
  display: flex;

  &__btn {
    justify-self: flex-end;
  }
}
.Btn {
  background: red;
}
</style>
