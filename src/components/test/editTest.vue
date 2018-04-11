<template>
	<div style="margin-top: 20px;">
		<div style="margin-bottom: 30px;">
			试题方向 :
			<el-select v-model="datas.fid" placeholder="请选择方向" @change="change()">
				<el-option v-for="item in fDatas" :key="item.fid" :label="item.fname" :value="item.fid">
				</el-option>
			</el-select>
		</div>
		<div>
			试题类型 :
			<el-select v-model="datas.typeid" placeholder="请选择试题类型" @change="change()">
				<el-option :disabled="item.disabled" v-for="item in typeDatas" :key="item.typeid" :label="item.typename" :value="item.typeid">
				</el-option>
			</el-select>
		</div>
		请输入题目 :
		<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="datas.title" style="resize: none;">
		</el-input>
		<div v-if="$route.query.typename!='简答'">
			<el-button type="primary" style="margin:10px 0;" @click="addOption">添加选项</el-button>
			<el-input :placeholder="'请输入第'+(index+1)+'个选项'" :key="index" v-model="item.toString()" v-for="(item,index) in options" style="margin: 5px 0;">
				{{item}}
				<i slot="prefix" class="el-input__icon el-icon-close" style="cursor: pointer;" @click="delOption(index)"></i>
			</el-input>
		</div>
		<div>
			答案 :
			<el-input v-model="datas.result" placeholder="请输入答案"></el-input>
		</div>
		<el-button type="success" style="margin:10px 0;" @click="add">提交</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				options: [],
				datas:{},
				typeDatas:[],
				fDatas:[]
			}
		},
		methods: {
			addOption() {
				this.options.push("");
			},
			delOption(id) {
				this.options.splice(id, 1);
			},
			add() {
				var opt = JSON.stringify(this.options);
				if(this.title == "" || this.result == "" || opt == []) {
					this.$message({
						message: "请填写完整",
						type: "warning"
					});
				} else {
					this.options=this.options.filter(function(val){
						return val;
					});
					var params = `testid=${this.datas.testid}&title=${this.datas.title}&result=${this.datas.result}&fid=${this.datas.fid}&typeid=${this.datas.typeid}&options=${this.options.join("||")}`;
					fetch("/api/test/editTest", {
						method: "post",
						headers: {
							"content-type": "application/x-www-form-urlencoded"
						},
						body: params
					}).then(function(e) {
						return e.text();
					}).then((e) => {
						if(e == "ok") {
							this.$router.go(-1);
							this.$message({
								message: "修改成功",
								type: "success"
							});
						} else {
							this.$message({
								message: "修改失败",
								type: "warning"
							});
						}
					})
				}
			}
		},
		mounted(){
			fetch("/api/test/selectSignTest?testid="+this.$route.query.testid).then(function(e){
				return e.json();
			}).then((e)=>{
				if(e.message=="err"){
					this.$router.go(-1);
				}else{
					this.datas=e[0][0];
					this.fDatas=e[1];
					e[2].forEach((val)=>{
						if(this.datas.typename.indexOf("选")>-1){
							if(val.typename.indexOf("选")<0){
								val.disabled=true;
							}
						}else{
							if(this.datas.typename!=val.typename){
								val.disabled=true;
							}
						}
					});
					this.typeDatas=e[2];
					if(e[0].length!=1){
						this.$router.go(-1);
					}else{
						this.options=this.datas.options.split("||");
					}
				}
			});
		}
	}
</script>

<style scoped="scoped">

</style>