<script setup>

import { ref } from 'vue'; // 引入ref模块

const listNote = ref([]);

// 发送get请求
async function getNote(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return (await response.json()); // 解析JSON响应
  } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
  }
}

async function searchNote() {
  const responseJson = await getNote('http://localhost:3001/api/data');
  //
  // console.log(responseJson);
  // console.log("responseJson = "+JSON.stringify(responseJson));
  // console.log("responseJson.length = "+responseJson.length);

  for(let i=0;i<responseJson.length;i++){
    listNote.value.push(responseJson[i]);
    // console.log("responseJson[i] = "+JSON.stringify(responseJson[i]));
  }

  return;
}

searchNote(); // 查询留言


// 发送post请求
async function postDataUsingFetch(url = '', data = {}) {

  // 默认选项是POST方法
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // 没有模式：'no-cors' or 'same-origin'
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // 包括、省略、同源
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // 手动处理、跟随、错误
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // 将数据转换为JSON字符串
  });

  return response.json(); // 解析 JSON 响应为原生 JavaScript 对象
}

let dataName = ref('Frank_Star');
let dataMessage = ref('');

async function addNote() {
  const formData = {
      name: dataName.value,
      message: dataMessage.value
  };
  if(dataMessage.value.length>0){
    postDataUsingFetch('http://localhost:3001/api/addnote', formData);
    addNoteHere(dataName.value, dataMessage.value);
  }else{
    console.log("消息为空");
  }
}

function addNoteHere(userVal, textVal){
  listNote.value.unshift({
      user: userVal,
      date: new Date(),
      content: textVal,
  })
  dataMessage.value = '';
}

</script>

<template>
<div class="md-max-w-2p5xl mx-auto mt-6">
  <div></div>
  <div class="bg-theme-1 p-2">
    <div class="flex justify-content-between">
        <div>
          <span>
            <strong>{{ dataName }}</strong>
            留言板.
          </span>
        </div>

        <div></div>
    </div>
  </div>


  <div class="mt-6 mb-4">
    <h2 class="my-2 text-3xl text-theme-4 font-light">
      留言板
    </h2>
    <div>留言板测试</div>
  </div>

  <div class="">
    <div class="flex flex-col items-end">

      <div class="">
        <div class="py-1">
          <span>你以</span>
          <span>{{ dataName }}</span>
          <span>在评论</span>
        </div>
        <div></div>
      </div>

    </div>
    <div></div>
    <div></div>

    <div>
      <div>
        <div></div>

        <div class="flex p-2 bg-theme-1">
          <div class="basis-10/12">
            <textarea name="" id="" class="hidden"></textarea>
            <div class="h-16.5">
              <!-- 双向绑定 -->
              <div class="">
                <input
                  v-model="dataMessage" type="text" placeholder="您的信息*"
                  class="w-full h-16 px-3 py-2 border"
                />
              </div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="basis-2/12 flex justify-center">
            <button type="button" @click="addNote" class="w-11 h-7.5 bg-theme-2 text-white">
              <i class=""></i>
              保存
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-for="(item) in listNote" v-bind:key="item">
      <div class="flex mt-2">
        <div class="flex-none w-10 h-10 mt-2 mr-2 bg-theme-3 text-white rounded-full text-26px text-center">
          F
        </div>

        <div class="flex-1 px-4 py-2 bg-grey-f8f9fa">
          <div class="">
            <div>
              <strong>{{ item.user }}</strong>
              <span class="px-2 text-grey-868e96">·</span>
              <span class="text-grey-868e96">{{ new Date(item.date).toLocaleString() }}</span>
            </div>
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>

    <div></div>
    <div></div>
    <div></div>
  </div>
</div>

<div>
  <div class="-z-10 fixed bottom-13.5 w-full h-42.5 bg-grey-e1e1e1"></div>

  <div class="-z-10 fixed bottom-0 w-full h-13.5 py-3 text-center bg-black-373a3c text-grey-383">
      <div class="leading-7.5">
        © 2024 Frank_Star
      </div>
  </div>
</div>

</template>

<style scoped>
</style>
