<template>
  <modal
    name="task-overview-modal"
    :adaptive="true"
    :scrollable="true"
    :width="'90%'"
    :height="'auto'"
    :maxWidth="900"
    @before-open="beforeOpen"
    @closed="closed">
    <template v-if="!taskFetched">
      Loading...
    </template>
    <template v-else>
      <TaskOverview :currentTask="currentTask"/>
    </template>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'

import TaskOverview from '@/components/TaskOverview.vue'

import { Types, Task, Getters } from '@/store/index'
import { mapGetters } from 'vuex'

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
    closeModal () {
      this.$modal.hide('task-modal')
    },
    beforeOpen ({ params }: { params: any }) {
      if (!params || !params.taskId) {
        this.taskFetched = true
        return
      }

      this.taskId = params.taskId

      this.$store.dispatch(Types.LOAD_TASK, params.taskId)
        .then(() => {
          this.taskFetched = true
        })
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
