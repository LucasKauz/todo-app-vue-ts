<template>
  <div class="TaskOverview">
    <div class="TaskOverview__content">
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
        <div><strong>Date:</strong> {{ dueDate }}</div>
        <div><strong>Priority:</strong> {{ currentTask.priority }}</div>
      </div>
    </div>
    <div>
      <Comments
        :comments="currentTask.comments"
        :taskId="currentTask.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import moment from 'moment'

import Comments from '@/containers/Comments.vue'
import CloseButton from '@/components/CloseButton.vue'

export default Vue.extend({
  name: 'TaskOverview',
  props: {
    currentTask: Object,
    editTask: Function,
    closeModal: Function
  },
  computed: {
    dueDate () {
      return moment(this.currentTask.dueDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
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
  &__content {
    padding: 20px;
  }
  &__description {
    margin-bottom: 16px;
  }
  &__meta {
    display:flex;
    justify-content: space-between;
  }
}
</style>
