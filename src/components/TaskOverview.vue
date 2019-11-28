<template>
  <div class="TaskOverview">
    <header class="ModalHeader ModalHeader--withButton">
      <h2 class="ModalHeader__title">
        {{ currentTask.title }}
      </h2>
      <button @click="() => editTask(currentTask.id)" class="ModalHeader__btn Link">
        Edit task
      </button>
      <CloseButton :onClick="closeModal"/>
    </header>
    <div class="TaskOverview__description">{{ currentTask.description }}</div>
    <div class="TaskOverview__meta">
      <div><strong>Date:</strong> {{ formatedDate }}</div>
      <div><strong>Priority:</strong> {{ currentTask.priority }}</div>
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
import CloseButton from '@/components/CloseButton.vue'

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
    Comments,
    CloseButton
  }
})
</script>

<style lang="scss" scoped>
.TaskOverview {
  &__description {
    margin-bottom: 16px;
  }
  &__meta {
    display:flex;
    justify-content: space-between;
  }
}
</style>
