<template>
  <div class="Comments">
    <Comment
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment" />
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

import { mapMutations, mapActions } from 'vuex'

import { Types } from '../store'

import Comment from '@/components/Comment.vue'

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
    }
  },
  components: {
    Comment
  }
})
</script>

<style lang="scss" scoped>
.Comments {
  border-top: 1px solid #eaeaea;
  padding-top: 20px;
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
