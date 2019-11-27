<template>
  <div class="Comments">
    <div v-for="(comment, index) in comments" :key="index" class="Comment">
      <div>
        <span>{{ comment.name }}</span>
        <span>{{ comment.date }}</span>
      </div>
      <div>{{ comment.message }}</div>
    </div>
    <form @submit.prevent="sendComment">
      <input type="text" placeholder="Your name" v-model="commentOwner">
      <input type="text" placeholder="Write a comment" v-model="commentMessage">
      <button class="Btn">Add comment</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Comments',
  data () {
    return {
      commentOwner: '',
      commentMessage: ''
    }
  },
  props: {
    comments: Array
  },
  methods: {
    sendComment (e: any) {
      if (this.commentMessage.length < 2) {
        return
      }

      console.log('add new comment')
    }
  }
})
</script>
