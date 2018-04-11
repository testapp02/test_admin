<template>
	<div>
		<div>
			<el-select placeholder="方向" v-model="fid">
				<el-option :label="fDatas[item]" :value="item" v-for="item in fDatas" :key="item"></el-option>
			</el-select>
			<el-select placeholder="类型" v-model="typeid">
				<el-option :label="typeDatas[item]" :value="item" :key="item" v-for="item in typeDatas"></el-option>
			</el-select>
			<el-input placeholder="请输入内容" class="input-with-select" style="width: 300px;float: right;" v-model="like">
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<div class="test-box">
			<el-collapse accordion>
				<el-collapse-item class="row" v-for="item in datas" :key="item.testid" :title="typeDatas[item.typeid]+':das啊大叔所所所所所所所所所所所所所所所所所所所啊大叔所所所所所所所所所所所所所所所所所所所大时代大大多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多所所'+item.title">
					<div>{{item.options}}</div>
					<div>{{item.result}}</div>
				</el-collapse-item>
			</el-collapse>
		</div>
		<el-pagination background layout="prev, pager, next" :total="70" style="margin: 20px auto 20px;">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				datas: [],
				activeNames: ['1'],
				fDatas: {},
				typeDatas: [],
				fid: "",
				typeid: "",
				page: 0,
				pages: "",
				like:''
			}
		},
		methods: {
			handleChange(val) {
				console.log(val);
			},
			selectAll(){
				fetch("/api/test/selectAll?like="+this.like).then(function(e) {
					return e.text();
				}).then((e) => {
					this.page=e;
				}
			)
			},
			selectTest(){
				fetch("/api/test/selectTest?like="+this.like+"&page="+this.page).then(function(e){
					return e.json();
				}).then((e)=>{
					this.datas=e;
				});
			}
		},
		mounted() {
			this.selectAll();
			this.selectTest();
			fetch("/api/fxiang/select").then(function(e) {
				return e.json();
			}).then((e) => {
				var obj={};
				e.forEach((val)=>{
					obj[val.fid]=val.fname;
				});
				this.fDatas=obj;
			});
			fetch("/api/test/selectType").then(function(e) {
				return e.json();
			}).then((e) => {
				var obj={};
				e.forEach((val)=>{
					obj[val.typeid]=val.typename;
				});
				this.typeDatas=obj;
			});
		}
	}
</script>

<style>
	/*.test-box {
		padding: 10px;
		background: #fff;
		margin-top: 10px;
		font: 20px;
	}
	.el-collapse-item__content{
		background: ;
	}
	.el-collapse-item__header{
		font-size: 16px;
		color: #000;
	}
	.row{
		padding: 5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;*/
	}
</style>