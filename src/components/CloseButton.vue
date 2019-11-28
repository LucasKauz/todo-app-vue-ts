<template>
  <button @click="() => onClick()" class="CloseIcon">
    <img
      src="@/assets/times.svg"
      svg-inline
      svg-sprite
      alt="Close modal"
      class="CloseIcon__icon"/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CloseIcon',
  props: {
    onClick: Function
  }
})
</script>

<style lang="scss" scoped>
.CloseIcon {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: 0;
  cursor: pointer;
  margin: 12px 8px;
  &__icon {
    width: 24px;
    height: 24px;
    color: #000;
  }
}
</style>
