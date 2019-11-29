<template>
  <modal
    name="task-overview-modal"
    :adaptive="true"
    :scrollable="true"
    :width="'90%'"
    :height="'auto'"
    :maxWidth="500"
    @before-open="beforeOpen"
    @closed="closed">
    <template v-if="!taskFetched">
      Loading...
    </template>
    <template v-else>
      <TaskOverview
        :currentTask="currentTask"
        :editTask="editTask"
        :closeModal="closeModal"/>
    </template>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'

import { mapGetters } from 'vuex'

import TaskOverview from '@/components/TaskOverview.vue'

import { Types, Task, Getters } from '@/store/index'

export default Vue.extend({
  name: 'TaskModal',
  data () {
    return {
      taskFetched: false,
      taskId: null
    }
  },
  computed: {
    ...mapGetters({
      getTaskById: Getters.GET_TASK_BY_ID
    }),
    currentTask (): Task | null {
      return this.taskId ? this.getTaskById(this.taskId) : null
    }
  },
  methods: {
    editTask () {
      this.$modal.hide('task-overview-modal')
      this.$modal.show('task-modal', {
        taskId: this.taskId
      })
    },
    closeModal () {
      this.$modal.hide('task-overview-modal')
    },
    beforeOpen ({ params }: { params: any }) {
      if (!params || !params.taskId) {
        this.taskFetched = true
        return
      }

      this.taskId = params.taskId
      this.taskFetched = true
    },
    closed () {
      this.taskId = null
      this.taskFetched = false
    }
  },
  components: {
    TaskOverview
  }
})
</script>
