<template>
  <div id="pre-order-info-bg">
    <div>
      <el-button type="primary" size="small" @click="check">查看占用情况</el-button>
      <div v-if="check_tapped">
        <div>
          <span>会议室占用情况:</span>
          <div>
            <div></div>
            <span>{{status_str}}</span>
          </div>
        </div>
        <div>
          <span>剩余时间:</span>
          <span>{{pre_order_info.left_time}}</span>
        </div>
        <div>
          <span>占用者:</span>
          <span>{{pre_order_info.holder}}</span>
        </div>
      </div>
    </div>
    <div>
      <el-button type="primary" :disabled="!can_pre_order" size="small" @click="">预定</el-button>
    </div>
  </div>
</template>
<script>

  export default {
    data(){
      return {
        pre_order_info: {
          status: 0,
          holder: '',
          left_time: 0
        },
        check_tapped: false
      }
    },
    computed:{
      status_str(){
        switch (this.pre_order_info.status){
          case 0:
            return '未知';
          case 1:
            return '占用';
          case 2:
            return '空闲';
          default:
            return '';
        }
      },
      can_pre_order(){
        return 1 != this.pre_order_info.status;
      }
    },
    methods:{
      check(){
        this.check_tapped = true;
      },
      pre_order(){
        
      }
    }
  }
</script>
<style lang="scss" scoped>
  #pre-order-info-bg{
    display: flex;
    flex-direction: column;
    align-items: center;
    div:first-of-type{
      display: flex;
      &>div{
        margin-left: 32px;
        width: 200px;
        height: 300px;
        border: 1px dashed navy;
        border-radius: 8px;
        &>div{
          display: flex;
        }
        &>div:first-of-type{
          &>div{
            &>span{
              margin-right: 16px;
            }
            &>div{
              width: 80px;
              height: 80px;
            }
            .busy{
              background-color: red;
            }
            .avail{
              background-color: lime;
            }
            .unknown{
              background-color: aliceblue;
            }
          }
        }
        &>div:nth-of-type(2){
          margin-top: 16px;
        }
        &>div:last-of-type{
          margin-top: 16px;
        }
      }
    }
    div:last-of-type{
      margin-top: 56px;
    }
  }
</style>