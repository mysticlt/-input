<template>
  <div class="chart-input">
    <el-input
      class="textArea"
      type="textarea"
      ref="mark"
      v-model="textareaText"
      :rows="10"
      @keydown="KD($event)"
    >
    </el-input>
    <div class="temp">
      <span>{{ tempText }}</span>
      <span ref="nowPos">?</span>
    </div>
    <!-- @选框 -->
    <div id="selectuser" class="selectbox" v-show="showFrendList" ref="selectuser" :style="nowPos">
      <div id="selectlist">
        <div class="selectLi" v-for="item in friendList" @click="choosePeople(item.name, item.userId)" :key="item.userId">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// getCurrentInstance
import { defineComponent, reactive, toRefs, getCurrentInstance } from "vue";
export default defineComponent ({
  name: 'ChatInput',
  props: {
    friendList: Array
  },
  setup() {
    const { ctx } = getCurrentInstance()
    const data = reactive({
      showFrendList: false,
      textareaText: '',
      tempText: '',
      nowPos:'top: 0; left: 0',
      messagesMsgString: ''
    })
    const methods = reactive({
      KD(event) {
        let MsgString = data.textareaText
        data.tempText = data.textareaText
        // 按键判断
        if(event.shiftKey && event.which === 50 && isNaN(MsgString[MsgString.length-1]/1)) {
          data.showFrendList = true;
          const top = ctx.$refs.nowPos.offsetHeight + 10
          const left = ctx.$refs.nowPos.offsetLeft - 15
          data.nowPos = `top: ${top}px; left: ${left}px;`
        }else if(event.which===8) {
          let msgLen = data.messagesMsgString.length;
          if (data.messagesMsgString[msgLen - 1] === ']') {
            for (let i = msgLen; i >= 0; i--) {
              if (data.messagesMsgString[i] === '[') {
                if (data.messagesMsgString[i + 1] === '2' && data.messagesMsgString[i + 2] === 'f') {
                  data.messagesMsgString = data.messagesMsgString.substring(0, i);
                  for (let j = MsgString.length - 1; j >= 0; j--) {
                    if (MsgString[j] === '@') {
                      data.textareaText = MsgString.substring(0, j + 1);
                      data.showFrendList = false;
                      break
                    }
                  }
                }
                break
              }
            }
          }
        }
      },
      // 选择成员
      choosePeople(name,id){
        data.messagesMsgString +=data.textareaText.substring(data.messagesMsgStringLen,data.textareaText.length-1);
        data.messagesMsgString+='[2f'+name+'/'+id+']';
        data.textareaText += name;
        data.messagesMsgStringLen=data.textareaText.length;
        data.showFrendList = false;
        ctx.$refs.mark.focus()
      },
    })
    return {
      ...toRefs(data),
      ...toRefs(methods)
    }
  }

})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.chart-input {
  width: 500px;
  margin: 200px auto 0;
  position: relative;
  .temp {
    width: 100%;
    height: 222px;
    font: 400 13.3333px Arial;
    font-size: 14px;
    position: relative;
    text-align: left;
    line-height: 1.5;
    padding: 6px 16px;
    letter-spacing: normal;
    word-spacing: normal;
    word-break: break-all;
    word-wrap: break-word;
    box-sizing: border-box;
    visibility: hidden;
  }
}
#selectuser {
  width: 230px;
  height: 150px;
  /* border: 1px solid #000; */
  border-radius: 5px;
  overflow: auto;
  background: #fff;
  position: absolute;
}
#selectuser::-webkit-scrollbar {
  width: 4px;
}
#selectuser::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
#selectuser::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
#selectlist {
  height: 100%;
  width: 100%;
}
.selectLi {
  width: 100%;
  height: 30px;
  line-height: 30px;
  &:hover {
    background: #ccc;
  }
}
</style>
