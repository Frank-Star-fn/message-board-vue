<script setup>
  import { ref } from 'vue'; // 引入ref模块
  import { defineProps, defineEmits } from 'vue';
  import { watch } from 'vue'; // 监听器watch

  const props = defineProps(['text']);
  const emit = defineEmits(['ok']);

  const isBig = ref(false);

  // const str = ref('');
  const str = ref({
    text: '',
  });

  function send() {
    let str = props.text;
    if (isBig.value === true) {
      str = str + ' 变小';
    } else {
      str = str + ' 变大';
    }
    emit('ok', str);
    isBig.value = !isBig.value;
  }

  function add(newVal, oldVal){
    console.log('str changed, newVal.text = '+newVal.text+", oldVal.text = "+oldVal.text);
  }

  // 使用监听器,监听str的变化
  // watch(str, add);
  watch(str, add, {deep: true}); // 深度监听
</script>

<template>

  <!-- 条件渲染v-if(不创建盒子) -->
  <div v-if="true">

    <!-- 条件渲染v-show(创建但不显示盒子,适合频繁切换显示的场景) -->
    <h1 v-show="false" class="text-3xl">Box</h1>

    <div class="m-2">
      <div
        @click="send"
        :class="[isBig?'w-48 h-48 bg-yellow-300 flex justify-center items-center':'w-12 h-12 bg-yellow-400 flex justify-center items-center']"
      >
      <span>{{ props.text }}</span>
      </div>
    </div>

    <!-- 使用v-model进行双向绑定 -->
    <input v-model="str.text" class="border"/>

  </div>

</template>

<style scoped>
</style>
