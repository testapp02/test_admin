<template>
	<div style="margin-top: 20px;">
		请输入题目 :
		<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="title" style="resize: none;">
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
				fid: this.$route.query.fid,
				typeid: this.$route.query.typeid
			}
		},
		methods: {
			add() {
				if(this.title == "" || this.result == "") {
					this.$message({
						message: "请填写完整",
						type: "warning"
					});
				} else {
					var params = `title=${this.title}&result=${this.result}&fid=${this.fid}&typeid=${this.typeid}&options=`;
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