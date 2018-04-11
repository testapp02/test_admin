<template>
	<div style="margin-top: 20px;">
		请输入题目 :
		<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="title" style="resize: none;">
		</el-input>
		<el-button type="primary" style="margin:10px 0;" @click="addOption">添加选项</el-button>
		<el-input :placeholder="'请输入第'+(index+1)+'个选项'" :key="index" v-model="item.con" v-for="(item,index) in options" style="margin: 5px 0;">
			<i slot="prefix" class="el-input__icon el-icon-close" style="cursor: pointer;" @click="delOption(index)"></i>
		</el-input>
		<div>
			答案 :
			<el-input v-model="result" placeholder="请输入答案"></el-input>
		</div>
		<el-button type="success" style="margin:10px 0;" @click="add">提交</el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				result: "",
				options: [],
				fid: this.$route.query.fid,
				typeid: this.$route.query.typeid
			}
		},
		methods: {
			addOption() {
				var obj = {
					con: ""
				};
				this.options.push(obj);
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
					var arr = this.options.map(function(val) {
						return val.con;
					});
					var params = `title=${this.title}&result=${this.result}&fid=${this.fid}&typeid=${this.typeid}&options=${arr.join("||")}`;
					fetch("/api/test/addTest", {
						method: "post",
						headers: {
							"content-type": "application/x-www-form-urlencoded"
						},
						body: params
					}).then(function(e) {
						return e.text();
					}).then((e) => {
						if(e == "ok") {
							this.title = "";
							this.result = "";
							this.options = "";
							this.$message({
								message: "添加成功",
								type: "success"
							});
						} else {
							this.$message({
								message: "添加失败",
								type: "warning"
							});
						}
					})
				}
			}
		},
		mounted(){
			this.$emit("refresh",this.fid,this.typeid);
		}
	}
</script>

<style scoped="scoped">

</style>