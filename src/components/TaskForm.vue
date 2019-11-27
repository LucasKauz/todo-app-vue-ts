<template>
  <form @submit.prevent="sendForm">
    <header>
      <h1>{{ title || 'Add new Task' }}</h1>
      <button @click="() => closeModal()">X</button>
    </header>
    <fieldset>
      <label>Title</label>
      <input
        type="text"
        v-model.trim="title"
        placeholder="Task title"
        @change="validateInput('title')"
        required
      />
      <label class="hasError" v-if="titleError">{{ titleError }}</label>
    </fieldset>
    <fieldset>
      <label>Description</label>
      <textarea v-model.trim="description"></textarea>
    </fieldset>
    <fieldset>
      <label>Due date</label>
      <input
        type="text"
        maxlenght="2"
        v-model.number="day"
        placeholder="DD"
      />
      <input
        type="text"
        maxlenght="2"
        v-model.number="month"
        placeholder="MM"
      />
      <input
        type="text"
        maxlenght="2"
        v-model.number="year"
        placeholder="YYYY"/>
      <label class="hasError" v-if="dueDateError">{{ dueDateError }}</label>
    </fieldset>
    <fieldset>
      <label>Priority</label>
      <select v-model="priority" required>
        <option
          v-for="level in levels"
          v-bind:key="level"
          :selected="priority === level"
        >
          {{ level }}
        </option>
      </select>
    </fieldset>
    <fieldset>
      <label>Comments</label>
      <textarea
        name="comments"
        placeholder="Place the first task comment"
        v-model="comment"
      ></textarea>
    </fieldset>
    <fieldset>
      <button class="Btn">Add task</button>
    </fieldset>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import { Types, Task, PriorityLevels } from '@/store/index'

import { changeDatePart, validateDate } from '@/helpers/formValidate'

export default Vue.extend({
  name: 'TaskForm',
  props: {
    getCurrentTask: Function,
    dispatchForm: Function,
    currentData: Object
  },
  async mounted () {
    const data = await this.getCurrentTask()

    if (!data) return

    this.title = data.title
    this.description = data.description
    this.dueDate = data.dueDate
    this.comment = data.comment
    this.priority = data.priority
  },
  data () {
    return {
      title: '',
      titleError: '',
      description: '',
      dueDate: '',
      dueDateError: '',
      comment: '',
      priority: PriorityLevels.LOW
    }
  },
  computed: {
    levels: {
      get () { return PriorityLevels }
    },
    day: {
      get (): string {
        return this.dueDate.split('-')[1] || ''
      },
      set (val: string) {
        this.dueDate = changeDatePart(1, val, this.dueDate)
        this.validateInput('dueDate')
      }
    },
    month: {
      get (): string {
        return this.dueDate.split('-')[0] || ''
      },
      set (val: string) {
        this.dueDate = changeDatePart(0, val, this.dueDate)
        this.validateInput('dueDate')
      }
    },
    year: {
      get (): string {
        return this.dueDate.split('-')[2] || ''
      },
      set (val: string) {
        this.dueDate = changeDatePart(2, val, this.dueDate)
        this.validateInput('dueDate')
      }
    }
  },
  methods: {
    sendForm () {
      const formData: Omit<Task, 'id'> = {
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        comment: this.comment
      }

      this.dispatchForm(Types.ADD_TASK, formData)
    },
    validateInput (name: string) {
      switch (name) {
        case 'title':
          if (this.title.length < 1 || this.title.length > 255) {
            this.titleError = 'Title must be between than 1 and 255 characters.'
          }
          break

        case 'dueDate':
        default:
          this.dueDateError = validateDate(this.dueDate)
          break
      }
    }
  }
})
</script>
