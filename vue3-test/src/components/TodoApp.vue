<script setup>
  import { ref } from 'vue'; // 引入ref模块

  const text1 = ref('')
  const listNote = ref([
    {
      isComplete: false,
      text:"吃饭"
    },
    {
      isComplete: false,
      text:"睡觉"
    },
    {
      isComplete: true,
      text:"打豆豆"
    },
  ])

  function add() {
    listNote.value.push({
      isComplete: false,
      text: text1.value,
    })
    text1.value = ''
  }

  function del(index){
    listNote.value.splice(index,1)
  }

</script>

<template>
  <div>
    <h1 class="text-3xl">Todo App</h1>

    <!-- 双向绑定v-model -->
    <input v-model="text1" type="text" class="border"/>
     <!-- 按钮事件@click -->
    <button @click="add" class="bg-blue-200">Add Todo</button>

    <!-- 循环v-for -->
    <div
      v-for="(item,index) in listNote"
      :class="[item.isComplete ? 'bg-gray-200' : 'bg-red-200']"
      v-bind:key="item"
    >
      <div class="flex px-1">
        <div>
          <input v-model="item.isComplete" type="checkbox" class="">
          <span>{{ item.text }}</span>
        </div>
        <div @click="del(index)" class="px-5">del</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
