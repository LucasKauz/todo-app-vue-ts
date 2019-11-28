<template>
  <div id="app" class="App">
    <header class="Header">
      <h1>PawaTask</h1>
      <button class="Btn Header__btn" @click="this.addTask">
        Add a new task
      </button>
    </header>
    <TaskList :addTask="this.addTask" />

    <TaskModal />
    <TaskOverviewModal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import '@/style/main.scss'

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
.App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 980px;
  min-width: 320px;
  padding: 0 16px 90px;
  margin: 90px auto 0;
}
* {
  box-sizing: border-box;
}
.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #eaeaea;
  margin-bottom: 16px;

  &__btn {
    justify-self: flex-end;
    margin-left: 12px;
  }
}
.Btn {
  background-color: #ef4b25;
  color: #fff;
  text-align: center;
  border: none;
  text-decoration: none;
  font-weight: bold;
  padding: 12px 14px;
  cursor: pointer;

  &--withIcon {
    padding: 8px 10px;
  }

  &:hover, &:focus {
    background-color: #ce4626;
  }

  &:active {
    background-color: #9a3219;
  }

  &__icon {
    color: #fff;
    width: 16px;
    height: 16px;

    &:focus {
      outline: none;
    }
  }
}
</style>
