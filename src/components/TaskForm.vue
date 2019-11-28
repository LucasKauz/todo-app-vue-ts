<template>
  <form @submit.prevent="sendForm" class="DefaultForm TaskForm">
    <header class="ModalHeader">
      <h2 class="ModalHeader__title">{{ isEdit ? title : 'New Task' }}</h2>
      <CloseButton :onClick="closeModal" />
    </header>
    <div class="DefaultForm__fieldset">
      <label class="DefaultForm__label" for="title">Title:</label>
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
      <label>Description:</label>
      <textarea
        v-model.trim="description"
        class="DefaultForm__textarea"
      ></textarea>
    </div>
    <div class="DefaultForm__fieldset DefaultForm__fieldset--row TaskForm__date">
      <label class="DefaultForm__label" for="day">Set due date:</label>
      <input
        type="text"
        maxlenght="2"
        v-model="day"
        placeholder="DD"
        id="day"
        :class="[
          'DefaultForm__input',
          (dayError) ? 'DefaultForm__input--withErrors' : ''
        ]"
      />
      <input
        type="text"
        maxlenght="2"
        v-model="month"
        placeholder="MM"
        class="DefaultForm__input"
        :class="[
          'DefaultForm__input',
          (monthError) ? 'DefaultForm__input--withErrors' : ''
        ]"
      />
      <input
        type="text"
        maxlenght="2"
        v-model="year"
        placeholder="YYYY"
        class="DefaultForm__input TaskForm__year"
        :class="[
          'DefaultForm__input',
          (yearError) ? 'DefaultForm__input--withErrors' : ''
        ]"
      />
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
      <label class="DefaultForm__label" for="comments">Comments:</label>
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

import {
  changeDatePart,
  isValidDate,
  getDay,
  getMonth,
  getYear
} from '@/helpers/formValidate'
import moment from 'moment'

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

    const momentDate = moment(this.dueDate)
    this.day = String(momentDate.date())
    this.month = String(momentDate.month() + 1).padStart(2, '0')
    this.year = String(momentDate.year())
  },
  watch: {
    day (newDay) {
      if (Number.parseInt(newDay) < 1) {
        this.dayError = true
        return
      }

      this.dayError = false

      this.updateDueDate()
    },
    month (newMonth) {
      if (Number.parseInt(newMonth) < 1) {
        this.monthError = true
        return
      }

      this.monthError = false

      this.updateDueDate()
    },
    year (newYear) {
      this.updateDueDate()

      if (Number.parseInt(newYear) <= 1900) {
        this.yearError = true
        return
      }

      this.yearError = false
    },
    dueDate (newDueDate) {
      if (isValidDate(newDueDate)) {
        this.dueDateError = 'Invalid date.'
        return
      }

      this.dueDateError = ''
    }
  },
  components: {
    CloseButton
  },
  data () {
    return {
      title: '',
      titleError: '',
      description: '',
      day: '',
      dayError: false,
      month: '',
      monthError: false,
      year: '',
      yearError: false,
      dueDate: '',
      dueDateError: '',
      comment: '',
      priority: PriorityLevels.LOW
    }
  },
  computed: {
    levels: {
      get () { return PriorityLevels }
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

      if (!this.isFormValid()) return

      this.dispatchForm(formData)
    },
    isFormValid (): boolean {
      return (this.validateInput('name') &&
      this.validateInput('dueDate'))
    },
    validateInput (name: string) {
      switch (name) {
        case 'title':
          if (this.title.length < 1 || this.title.length > 255) {
            this.titleError = 'Title must be between than 1 and 255 characters.'
            return false
          }
          break

        case 'dueDate':
        default:
          this.dueDateError = isValidDate(`${this.year}-${this.month}-${this.day}`, true)
          if (this.dueDateError.length > 0) {
            return false
          }
          break
      }

      return true
    },
    updateDueDate () {
      if (
        Number.parseInt(this.day) > 0 &&
        Number.parseInt(this.month) > 0
      ) {
        this.dueDate = `${this.year}-${this.month}-${this.day}`
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
