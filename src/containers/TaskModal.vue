<template>
  <modal
    name="task-modal"
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
      <TaskForm :getCurrentTask="getCurrentTask"/>
    </template>
  </modal>
</template>

<script lang="ts">
import Vue from 'vue'

import TaskForm from '@/components/TaskForm.vue'

import { Types, Task, Getters } from '@/store/index'
import { mapGetters } from 'vuex'

interface ModalParams {
  params: {
    taskId: number
  }
}
interface Data {
  taskFetched: boolean;
  taskId: null | number;
}

export default Vue.extend({
  name: 'TaskModal',
  data (): Data {
    return {
      taskFetched: false,
      taskId: null
    }
  },
  computed: {
    ...mapGetters({
      getTaskById: Getters.GET_TASK_BY_ID
    })
  },
  methods: {
    getCurrentTask (): Task | null {
      return this.taskId ? this.getTaskById(this.taskId) : null
    },
    dispatchForm (type: Types, formData: Task) {
      const formDispatched = this.$store.dispatch(type, formData)

      formDispatched.finally(() => {
        this.closeModal()
      })
    },
    closeModal () {
      this.$modal.hide('task-modal')
    },
    beforeOpen ({ params }: ModalParams) {
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
    TaskForm
  }
})
</script>
