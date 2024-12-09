<script setup>
  // import TodoApp from './components/TodoApp.vue'
  import ChangeableBox from './components/ChangeableBox.vue'
  import '@/assets/main_output.css' // 全局引入

  function add(str) {
    console.log(str);
  }

</script>

<template>
  <div>
    <!-- <TodoApp /> -->
    <ChangeableBox @ok="add" text="box 1" />
    <ChangeableBox @ok="add" text="box 2" />


  </div>


</template>

<style scoped>
  /* 局部引入 */
  /* @import '@/assets/main.css'; */
</style>
