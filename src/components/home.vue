<template>
  <div id="pre-order-info-bg">
    <div class="content">
      <div class="left">
        <el-button type="primary" size="small" @click="check_room">查看占用情况</el-button>
      </div>
      <div class="right">
        <div class="room1">
          <div class="top-left">会议室1</div>
          <div class="top-middle">
            <div class="pre-order-info">
              <div class="status">
                <span>占用情况:</span>
                <div>
                  <div :class="{busy:1 == room1_info.status,unknown:0 == room1_info.status,avail:2 == room1_info.status}"></div>
                  <span>{{room1_status_str}}</span>
                </div>
              </div>
              <div class="left-time">
                <span>剩余时间:</span>
                <span>{{room1_info.left_time}}</span>
              </div>
              <div class="holder">
                <span>占用者:</span>
                <span>{{room1_info.holder}}</span>
              </div>
            </div>
          </div>
          <div class="top-right">
            <el-button type="primary" size="small" @click="show_select_time_dialog(1)">预定</el-button>
          </div>
        </div>
        <div class="room2">
          <div class="top-left">会议室2</div>
          <div class="top-middle">
            <div class="pre-order-info">
              <div class="status">
                <span>占用情况:</span>
                <div>
                  <div :class="{busy:1 == room2_info.status,unknown:0 == room2_info.status,avail:2 == room2_info.status}"></div>
                  <span>{{room2_status_str}}</span>
                </div>
              </div>
              <div class="left-time">
                <span>剩余时间:</span>
                <span>{{room2_info.left_time}}</span>
              </div>
              <div class="holder">
                <span>占用者:</span>
                <span>{{room2_info.holder}}</span>
              </div>
            </div>
          </div>
          <div class="top-right">
            <el-button type="primary" size="small" @click="show_select_time_dialog(2)">预定</el-button>
          </div>
        </div>
      </div>
    </div>
    <PreOrderTime :visible="dialog_show" :title="dialog_title" @closeDialog="time_dialog_on_close"></PreOrderTime>
  </div>
</template>
<script>
  import Api from '../api/api';
  import PreOrderTime from './pre_order_time';
  export default {
    components:{PreOrderTime},
    data(){
      return {
        room1_info: {
          meeting_title: '',
          holder: '',
          start_time: '',
          end_time: ''
        },
        room2_info:{
          meeting_title: '',
          holder: '',
          start_time: '',
          end_time: ''
        },
        dialog_show: false,
        dialog_title: '',
        which: 0
      }
    },
    computed:{
      room1_status_str(){
        switch (this.room1_info.status){
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
      room2_status_str(){
        switch (this.room2_info.status){
          case 0:
            return '未知';
          case 1:
            return '占用';
          case 2:
            return '空闲';
          default:
            return '';
        }
      }
    },
    methods:{
      check_room(){
        let vm = this;
        Api.get_meeting_room_pre_order().then(res=>{
          if(200 == res.status && 200 == res.data.code){
            vm.room1_info = res.data.hold_info.room1;
            vm.room2_info = res.data.hold_info.room2;
          }else{
            this.$alert('提示','查看会议室信息失败',
              {
                type: 'warning'
              });
          }
        }).catch(err=>{
          this.$alert('提示',err,
              {
                type: 'warning'
              });
        })
      },
      time_dialog_on_close(timerange){
        this.dialog_show = false;
        if(timerange && timerange.length && 2 == timerange.length){
          this.pre_order(timerange);
        }
      },
      show_select_time_dialog(which){
        if(1 == which){
          this.dialog_title = '会议室1预定';
        }else{
          this.dialog_title = '会议室2预定';
        }
        this.dialog_show = true;
        this.which = which;
      },
      pre_order(timerange){
        let vm = this;
        timerange.forEach(time=>{
          var ntime = new Date(time);
          console.log(ntime);
        })
        let start_time = timerange[0];
        let end_time = timerange[1];
        Api.pre_order_meeting_room({
          which_meeting_room: this.which,
          start_time: start_time,
          end_time: end_time,
          holder: '毛毛莎'
        }).then(res=>{
          if(200 == res.status && 200 == res.data.code){
            this.$alert("会议室"+this.which+"预订成功",'提示',{
              type: 'success'
            });
          }else{
            this.$alert("会议室"+this.which+"预订失败"+","+res.data.msg,'提示',{
              type: 'warning'
            });
          }
          this.which = 0;
        }).catch(err=>{
          console.log(err);
          this.which = 0;
        })
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
    &>.content{
      display: flex;
      background-color: cornsilk;
      width: 80%;
      height: 80%;
      border: 3px solid navy;
      border-radius: 4px;
      &>.left{
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 3px solid navy;
        &>.el-button{
          width: 75%;
        }
      }
      &>.right{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 75%;
        &>.room1{
          display: flex;
          height: 50%;
          justify-content: center;
          align-items: center;
          padding: 32px 0;
          box-sizing: border-box;
          width: 100%;
          .top-left{
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            height: 100%;
          }
          .top-right{
            width: 40%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &>.el-button{
              width: 75%;
              max-width: 160px;
              padding: 0;
              height: 32px;
              margin-left: 0;
            }
          }
          .top-middle{
            width: 40%;
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
                width: 100%;
                padding: 0 8px;
                box-sizing: border-box;
                &>span{
                  flex-shrink: 0;
                }
              }
              &>.status{
                &>div{
                  display: flex;
                  align-items: center;
                  height: 100%;
                  width: 100%;
                  margin-left: 16px;
                  &>span{
                    margin-left: 16px;
                    flex-shrink: 0;
                  }
                  &>div{
                    width: 90%;
                    height: 90%;
                    max-width: 100%;
                    max-height: 100%;
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
                border-bottom: 2px dashed dodgerblue;
              }
              &>.left-time{
                margin-top: 0;
                border-bottom: 2px dashed dodgerblue;
              }
              &>.holder{
                margin-top: 0;
              }
            }
          }
        }
        &>.room2{
          display: flex;
          height: 50%;
          justify-content: center;
          align-items: center;
          padding: 32px 0;
          box-sizing: border-box;
          width: 100%;
          .top-left{
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            height: 100%;
          }
          .top-right{
            width: 40%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &>.el-button{
              width: 75%;
              max-width: 160px;
              padding: 0;
              height: 32px;
              margin-left: 0;
            }
          }
          .top-middle{
            width: 40%;
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
                width: 100%;
                padding: 0 8px;
                box-sizing: border-box;
                &>span{
                  flex-shrink: 0;
                }
              }
              &>.status{
                &>div{
                  display: flex;
                  align-items: center;
                  height: 100%;
                  width: 100%;
                  margin-left: 16px;
                  &>span{
                    margin-left: 16px;
                    flex-shrink: 0;
                  }
                  &>div{
                    width: 90%;
                    height: 90%;
                    max-width: 100%;
                    max-height: 100%;
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
                border-bottom: 2px dashed dodgerblue;
              }
              &>.left-time{
                margin-top: 0;
                border-bottom: 2px dashed dodgerblue;
              }
              &>.holder{
                margin-top: 0;
              }
            }
          }
        }
      }
    }
  }
</style>