<template>
	<el-upload name="addMore" class="upload-demo" ref="upload" action="/api/te/addMore" :file-list="fileList" :auto-upload="false" :on-success="success" accept=".xlsx">
		<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
		<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
	</el-upload>
</template>
<script>
	export default {
		data() {
			return {
				fileList: []
			};
		},
		methods: {
			submitUpload() {
				this.$refs.upload.submit();
			},
			success(res, file, fileList){
				if(file.response=="ok"){
					this.$emit("success","批量添加成功");
				}else{
					this.$emit("err","添加失败");
				}
			},
			err(err, file, fileList){
				this.$emit("err","添加失败");
			}
		},
		mounted(){
			this.$emit("info","只支持上传.xlsx格式的文件");
		}
	}
</script>