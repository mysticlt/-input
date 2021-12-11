<template>
  <ChatInput :friendList="friendList"/>
</template>

<script>
import ChatInput from './components/ChartInput.vue'
export default {
  name: 'App',
  components: {
    ChatInput
  },
  setup() {
    const friendList = [ 
      {
        name: '明日香',
        userId: '1'
      }, 
      {
        name: '艾伦',
        userId: '2'
      }, 
      {
        name: '三笠',
        userId: '3'
      }, 
      {
        name: '鲁鲁修',
        userId: '4'
      }, 
      {
        name: '圣罗兰',
        userId: '5'
      },
      {
        name: '穿山甲',
        userId: '6'
      }
    ]
    return {
      friendList
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
