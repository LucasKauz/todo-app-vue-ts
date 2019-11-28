<template>
  <div class="Comments">
    <div v-for="(comment, index) in comments" :key="index" class="Comment">
      <div class="Comment__header">
        <span class="Comment__name">{{ comment.name ? comment.name : 'Anonymous' }}</span>
        <span class="Comment__date">{{ commentDate(comment.date) }}</span>
      </div>
      <div class="Comment__message">{{ comment.message }}</div>
    </div>
    <form @submit.prevent="sendComment" class="CommentForm">
      <input
        type="text"
        placeholder="Your name"
        v-model="commentOwner"
        class="DefaultForm__input CommentForm__input"
      >
      <input
        type="text"
        placeholder="Write a comment"
        v-model="commentMessage"
        class="DefaultForm__input CommentForm__input"
      >
      <button class="Btn" type="submit">Add comment</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import moment from 'moment'
import { mapMutations, mapActions } from 'vuex'

import { Types } from '../store'

export default Vue.extend({
  name: 'Comments',
  data () {
    return {
      commentOwner: '',
      commentMessage: ''
    }
  },
  props: {
    comments: Array,
    taskId: {
      type: String,
      required: true
    }
  },
  methods: {
    sendComment () {
      if (this.commentMessage.length < 2) {
        return
      }

      this.$store.dispatch(Types.ADD_COMMENT, {
        message: this.commentMessage,
        name: this.commentOwner,
        taskId: this.taskId
      })

      this.commentMessage = ''
    },
    commentDate (date: string): string {
      return moment(date).calendar()
    }
  }
})
</script>

<style lang="scss" scoped>
.Comments {
  border-top: 1px solid #eaeaea;
  padding-top: 20px;
}
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
.CommentForm {
  padding: 20px;
  background: #ececec;
  border-top: solid 1px #ccc;
  display: flex;
  flex-wrap: wrap;

  &__input {
    flex: 1;
    margin-right: 8px;
  }

  @media screen and (max-width: 480px){
    &__input {
      min-width: 100%;
      margin: 0 0 8px 0;
    }
  }
}
</style>
