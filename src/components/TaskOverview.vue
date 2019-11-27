<template>
  <div>
    TaskOverview {{ currentTask }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TaskOverview',
  props: {
    currentTask: Object
  }
})
</script>
