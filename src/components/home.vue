<template>
  <div id="pre-order-info-bg">
    <div class="content">
      <div class="top">
        <div class="top-left">
          <el-button type="primary" size="small" @click="check">查看占用情况</el-button>
          <el-button type="primary" :disabled="!can_pre_order" size="small" @click="">预定</el-button>
        </div>
        <div class="top-right">
          <div class="pre-order-info">
            <div class="status">
              <span>会议室占用情况:</span>
              <div>
                <div :class="{busy:1 == pre_order_info.status,unknown:0 == pre_order_info.status,avail:2 == pre_order_info.status}"></div>
                <span>{{status_str}}</span>
              </div>
            </div>
            <div class="left_time">
              <span>剩余时间:</span>
              <span>{{pre_order_info.left_time}}</span>
            </div>
            <div class="holder">
              <span>占用者:</span>
              <span>{{pre_order_info.holder}}</span>
            </div>
          </div>
        </div>
      </div>
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
        }
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

      },
      pre_order(){
        if(this.can_pre_order){

        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  #pre-order-info-bg{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    .content{
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: cornsilk;
      width: 80%;
      height: 80%;
      border: 3px solid navy;
      border-radius: 4px;
      .top{
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        padding: 32px;
        box-sizing: border-box;
        width: 100%;
        .top-left{
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          &>.el-button{
            width: 160px;
            padding: 0;
            height: 32px;
            border-radius: 16px;
            margin-left: 0;
            &:last-of-type{
              margin-top: 64px;
            }
          }
        }
        .top-right{
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          &>.pre-order-info{
            width: 100%;
            height: 100%;
            border: 2px dashed dodgerblue;
            border-radius: 8px;
            &>div{
              display: flex;
              align-items: center;
              height: 33.33%;
              &>*{
                margin-left: 32px;
              }
            }
            &>.status{
              &>div{
                display: flex;
                align-items: center;
                &>span{
                  margin-left: 16px;
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
                  background-color: dimgrey;
                }
              }
            }
            &>.left-time{
              margin-top: 16px;
            }
            &>.holder{
              margin-top: 16px;
            }
          }
        }
      }
      .bottom{
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        .el-button{
          width: 160px;
          padding: 0;
          height: 32px;
          border-radius: 16px;
        }
      }
    }
  }
</style>