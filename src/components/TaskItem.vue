<template>
  <div class="TaskItem">
    <span :class="[
      'TaskItem__square',
      isSelected ? 'TaskItem__square--active' : ''
    ]" @click="selectTask">
      <img class="TaskItem__check" src="@/assets/check.svg" svg-inline svg-sprite />
    </span>
    <span class="TaskItem__title">{{ task.title }}</span>
    <img src="@/assets/calendar-alt.svg" svg-inline svg-sprite class="CalendarIcon TaskItem__column" alt="calendar icon" aria-hidden="true"/>
    <span class="TaskItem__column TaskItem__dueDate">
      {{ dueDate }}
    </span>
    <button class="Btn Btn--withIcon TaskItem__column TaskItem__comment" @click="() => viewTask(task.id)">
      <img src="@/assets/comment.svg" svg-inline svg-sprite class="Btn__icon" alt="Comment" aria-label="Comment task"/>
    </button>
    <button class="Btn Btn--withIcon TaskItem__edit" @click="() => editTask(task.id)">
      <img src="@/assets/pencil-alt.svg" svg-inline svg-sprite class="Btn__icon TaskItem__pencil" alt="Edit" aria-label="Edit task"/>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import moment from 'moment'

export default Vue.extend({
  name: 'TaskItem',
  props: {
    task: Object,
    editTask: Function,
    viewTask: Function,
    toggleListTask: Function
  },
  data () {
    return {
      isSelected: false
    }
  },
  computed: {
    dueDate (): string {
      return moment(this.task.dueDate, 'YYYY-MM-DD', true).format('DD/MM/YYYY')
    }
  },
  methods: {
    selectTask () {
      this.isSelected = !this.isSelected

      this.toggleListTask(this.task.id)
    }
  }
})
</script>

<style lang="scss" scoped>
.TaskItem {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: solid 1px #eaeaea;

  &__square {
    width: 15px;
    height: 15px;
    margin-right: 9px;
    border: solid 1px #333;
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.22);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &--active {
      & .TaskItem__check {
        opacity: 1;
      }
    }
  }

  &__check {
    transition: opacity .3s;
    width: 10px;
    height: 10px;
    opacity: 0;
  }

  &__title {
    flex: 1;
  }

  &__column {
    margin-right: 8px;
  }

  &__dueDate {
    margin-right: 12px;
  }

  &__pencil {
    width: 13px;
    height: 13px;
    margin-top: 2px;
  }

  @media screen and (max-width: 420px) {
    flex-wrap: wrap;

    &__square {
      display: none;
    }
    &__title {
      min-width: 100%;
      margin-bottom: 12px;
    }
  }
}
.CalendarIcon {
  width: 21px;
  height: 21px;
  pointer-events: none;
}
</style>
