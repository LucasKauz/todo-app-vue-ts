<template>
  <form @submit.prevent="sendForm" class="DefaultForm TaskForm">
    <header class="ModalHeader">
      <h2 class="ModalHeader__title">{{ isEdit ? title : 'Add new Task' }}</h2>
      <CloseButton :onClick="closeModal" />
    </header>
    <div class="DefaultForm__fieldset">
      <label class="DefaultForm__label" for="title">Title</label>
      <input
        type="text"
        v-model.trim="title"
        placeholder="Task title"
        @change="validateInput('title')"
        id="title"
        required
        class="DefaultForm__input"
      />
      <label class="hasError" v-if="titleError"  for="title">
        {{ titleError }}
      </label>
    </div>
    <div class="DefaultForm__fieldset">
      <label>Description</label>
      <textarea
        v-model.trim="description"
        class="DefaultForm__textarea"
      ></textarea>
    </div>
    <div class="DefaultForm__fieldset DefaultForm__fieldset--row TaskForm__date">
      <label class="DefaultForm__label" for="day">Due date</label>
      <input
        type="text"
        maxlenght="2"
        v-model.number="day"
        placeholder="DD"
        id="day"
        class="DefaultForm__input"
      />
      <input
        type="text"
        maxlenght="2"
        v-model.number="month"
        placeholder="MM"
        class="DefaultForm__input"
      />
      <input
        type="text"
        maxlenght="2"
        v-model.number="year"
        placeholder="YYYY"
        class="DefaultForm__input TaskForm__year"/>
      <label class="hasError" v-if="dueDateError">{{ dueDateError }}</label>
    </div>
    <div class="DefaultForm__fieldset">
      <label class="DefaultForm__label" for="priority">Priority</label>
      <select
        v-model="priority"
        required
        id="priority"
        class="DefaultForm__select TaskForm__priority"
      >
        <option
          v-for="level in levels"
          v-bind:key="level"
          :selected="priority === level"
        >
          {{ level }}
        </option>
      </select>
    </div>
    <div class="DefaultForm__fieldset">
      <label class="DefaultForm__label" for="comments">Comments</label>
      <textarea
        name="comments"
        placeholder="Place the first task comment"
        v-model="comment"
        id="comments"
        class="DefaultForm__textarea"
      ></textarea>
    </div>
    <div class="DefaultForm__fieldset">
      <button class="Btn DefaultForm__submit">
        {{ isEdit ? 'Edit task' : 'Add task' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import CloseButton from '@/components/CloseButton.vue'

import { Types, Task, PriorityLevels } from '@/store/index'

import { changeDatePart, validateDate } from '@/helpers/formValidate'

export default Vue.extend({
  name: 'TaskForm',
  props: {
    getCurrentTask: Function,
    dispatchForm: Function,
    currentData: Object,
    closeModal: Function,
    isEdit: Boolean
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
  components: {
    CloseButton
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
      get (): string | number {
        return Number.parseInt(this.dueDate.split('-')[2]) || ''
      },
      set (val: string) {
        this.dueDate = changeDatePart(2, val, this.dueDate)
        this.validateInput('dueDate')
      }
    },
    month: {
      get (): string | number {
        return Number.parseInt(this.dueDate.split('-')[1]) || ''
      },
      set (val: string) {
        this.dueDate = changeDatePart(1, val, this.dueDate)
        this.validateInput('dueDate')
      }
    },
    year: {
      get (): string | number {
        return Number.parseInt(this.dueDate.split('-')[0]) || ''
      },
      set (val: string) {
        this.dueDate = changeDatePart(0, val, this.dueDate)
        this.validateInput('dueDate')
      }
    }
  },
  methods: {
    sendForm () {
      const formData: Omit<Task, 'id' | 'comments'> = {
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        comment: this.comment
      }

      this.dispatchForm(formData)
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

<style lang="scss" scoped>
.TaskForm {
  padding: 20px;

  &__priority {
    max-width: 160px;
  }

  &__date {
    max-width: 320px;
    .DefaultForm__input {
      flex: 0.8;
      text-align: center;
    }
  }

  &__year.DefaultForm__input {
    flex: 1;
  }
}
</style>>
