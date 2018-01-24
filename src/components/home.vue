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
              <el-table width="100%" height="meetings" :data="room1_info.meetings">
                <el-table-column prop="holder" label="预订人"></el-table-column>
                <el-table-column prop="meeting_title" label="主题"></el-table-column>
                <el-table-column prop="start_time" label="预定开始时间"></el-table-column>
                <el-table-column prop="end_time" label="预定结束时间"></el-table-column>
              </el-table>
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
              <el-table width="100%" height="meetings" :data="room2_info.meetings">
                <el-table-column prop="holder" label="预订人"></el-table-column>
                <el-table-column prop="meeting_title" label="主题"></el-table-column>
                <el-table-column prop="start_time" label="预定开始时间"></el-table-column>
                <el-table-column prop="end_time" label="预定结束时间"></el-table-column>
              </el-table>
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
  import util from '../util'
  export default {
    components:{PreOrderTime},
    data(){
      return {
        room1_info: {
          current:{},
          meetings: []
        },
        room2_info:{
          current:{},
          meetings: []
        },
        dialog_show: false,
        dialog_title: '',
        which: 0
      }
    },
    computed:{

    },
    mounted(){
      this.check_room();
    },
    methods:{
      check_room(){
        let vm = this;
        Api.get_all_meetings({current_time:util.format(new Date())}).then(res=>{
          if(200 == res.status && 200 == res.data.code){
            vm.room1_info = res.data.room_info.room1;
            vm.room2_info = res.data.room_info.room2;
          }else{
            this.$alert('提示','查看会议室信息失败,',{
              type: 'warning'
            });
          }
        }).catch(err=>{
          this.$alert('提示','查看会议室信息失败,'+err,{
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
        let now = new Date();
        let start_time = util.format(new Date(timerange[0]));
        let end_time = util.format(new Date(timerange[1]));
        Api.pre_order_meeting_room({
          which_meeting_room: this.which,
          start_time: start_time,
          end_time: end_time,
          holder: '毛毛莎',
          current_time:util.format(now)
        }).then(res=>{
          if(200 == res.status && 200 == res.data.code){
            vm.$alert("会议室"+this.which+"预订成功",'提示',{
              type: 'success'
            });
            console.log(res.data);
            if(1 == this.which){
              vm.room1_info = res.data.room1_info;
            }else if(2 == this.which){
              vm.room2_info = res.data.room2_info;
            }
          }else{
            vm.$alert("会议室"+this.which+"预订失败,"+res.data.msg,'提示',{
              type: 'warning'
            });
          }
          this.which = 0;
        }).catch(err=>{
          vm.$alert("会议室"+this.which+"预订失败,"+err,'提示',{
            type: 'warning'
          });
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
            width: 15%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            height: 100%;
          }
          .top-right{
            width: 30%;
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
            width: 55%;
            height: 100%;
            display: flex;
            align-items: center;
            &>.pre-order-info{
              width: 100%;
              height: 100%;
              padding: 2px;
              border: 2px dashed dodgerblue;
              border-radius: 8px;
              &>.el-table{
                height: 100%;
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
            width: 15%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            height: 100%;
          }
          .top-right{
            width: 30%;
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
            width: 55%;
            height: 100%;
            display: flex;
            align-items: center;
            &>.pre-order-info{
              width: 100%;
              height: 100%;
              border: 2px dashed dodgerblue;
              border-radius: 8px;
              &>.el-table{
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>