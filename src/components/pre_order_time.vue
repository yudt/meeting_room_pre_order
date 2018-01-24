<template>
	<el-dialog size="small" :title="title" @open="on_open" :before-close="cancel" :visible.sync="dialog_show">
		<div class="pre_order_time_bg">
			<el-date-picker size="large" v-model="timerange" format="yyyy-MM-dd HH:mm" type="datetimerange" placeholder="选择日期时间" range-separator="至" start-placeholder="开始日期"end-placeholder="结束日期"></el-date-picker>
		</div>
		<div class="" slot="footer">
			<el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="confirm">预 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		props:['visible','title'],
		data(){

			return {
				timerange: [(new Date()).getTime(),(new Date()).getTime() + 3600 * 1000]
			}
		},
		computed:{
			dialog_show:{
				get(){
					return this.visible;
				},
				set(){

				}
			}
		},
		methods:{
			on_open(){
				this.timerange = [(new Date()).getTime(),(new Date()).getTime() + 3600 * 1000];
			},
			confirm(){
				this.$emit('closeDialog',this.timerange);
			},
			cancel(){
				this.$emit('closeDialog');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.pre_order_time_bg{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>