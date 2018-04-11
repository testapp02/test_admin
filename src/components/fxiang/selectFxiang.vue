<template>
	<el-table :data="tableData" border style="width: 100%;border-radius: 20px;">
		<el-table-column fixed prop="fid" label="id">
		</el-table-column>
		<el-table-column prop="fname" label="方向名称">
		</el-table-column>
		<el-table-column fixed="right" label="操作" width="200">
			<template slot-scope="scope">
				<el-button @click="handleClick(scope.row.fid)" type="text" size="big">删除</el-button>
				<!--<el-button type="text" size="small">编辑</el-button>-->
				<router-link :to="'/editFxiang?fid='+scope.row.fid+'&fname='+scope.row.fname" tag="span" class="edit">编辑</router-link>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		methods: {
			handleClick(fid) {
				this.$emit("sure","del",(next)=>{
					fetch("/api/fxiang/del?fid="+fid).then(function(e){
						return e.text();
					}).then((e)=>{
						if(e=="ok"){
							this.tableData=this.tableData.filter(function(val){
								return val.fid!=fid;
							})
							next("success");
						}else{
							next("fail");
						}
					});
				});
			}
		},
		data() {
			return {
				tableData: []
			}
		},
		mounted(){
			fetch("/api/fxiang/select").then(function(e){
				return e.json();
			}).then(function(e){
				if(e.message!="err"){
					this.tableData=e;
				}
			}.bind(this));
		}
	}
</script>

<style>
	td,th{
		text-align: center !important;
	}
	.edit{
		color: #409EFF;
		cursor: pointer;
		transition: all 0.3s;
	}
	.edit:hover{
		color: #408Eff;
	}
</style>