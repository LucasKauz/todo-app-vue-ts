<template>
  <div class="Comment">
    <div class="Comment__header">
      <span class="Comment__name">{{ comment.name ? comment.name : 'Anonymous' }}</span>
      <span class="Comment__date">{{ commentDate(comment.date) }}</span>
    </div>
    <div class="Comment__message">{{ comment.message }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import moment from 'moment'

export default Vue.extend({
  name: 'Comment',
  props: {
    comment: Object
  },
  methods: {
    commentDate (date: string): string {
      return moment(date).calendar()
    }
  }
})
</script>

<style lang="scss" scoped>
.Comment {
  margin-bottom: 20px;
  padding: 0 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &__header {
    font-weight: bold;
    font-size: 16px;
  }

  &__name {
    margin-right: 4px;
  }

  &__date {
    font-weight: normal;
    font-size: 14px;
    color: #6f6f6f;
    display: inline-block;
  }

  &__message {
    margin-top: 4px;
  }
}
</style>
