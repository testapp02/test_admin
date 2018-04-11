<template>
	<div>
		<div style="padding: 10px 20px 10px 20px;">
			<div style="display: inline-block;width: 300px;">
				<input v-model="findInfo" placeholder="搜索..." style="width: 300px;" @keydown.13="find" class="el-input__inner"></input>
			</div>
			<el-button icon="el-icon-search" circle @click="find"></el-button>
			<el-button type="primary" icon="el-icon-plus" size="small" @click="jump('stuAddSign')">单个添加</el-button>
			<el-button type="primary" icon="el-icon-more" size="small" @click="jump('stuAddMore')">批量添加</el-button>
			<div style="float: right;">
				<el-button :type="type" icon="el-icon-delete" size="small" @click="changeState" style="float: right;margin-left: 20px;width: 100px;transition: all 0.5s;">{{info}}</el-button>
			<el-button :type="allType" size="small" v-if="!flag" @click="delMore">删除</el-button>
			</div>
		</div>
		<el-table :data="tableData" border style="width: 100%;border-radius: 20px;">
			<el-table-column fixed prop="sid" label="id">
			</el-table-column>
			</el-table-column>
			<el-table-column prop="sname" label="姓名">
			</el-table-column>
			<el-table-column prop="cname" label="班级">
			</el-table-column>
			<el-table-column prop="fname" label="方向">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="200">
				<template slot-scope="scope">
					<div v-if="flag">
						<el-button @click="handleClick(scope.row.sid)" type="text" size="big">删除</el-button>
						<router-link :to="{path:'/stuEdit',query:{sid:scope.row.sid,cname:scope.row.cname,sname:scope.row.sname,cid:scope.row.cid}}" tag="span" class="edit">编辑</router-link>
						<el-button @click="reset(scope.row.sid)" type="text" size="big">重置密码</el-button>
					</div>
					<div v-else>
						<!--<el-checkbox v-model="delData[scope.row.sid]" @change="a(scope.row.sid)"></el-checkbox>-->
						<input type="checkbox" v-model="delData[scope.row.sid]" @change="a(scope.row.sid)" style="width: 20px;height: 20px;"/>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<div style="float: right;margin: 10px;">
			<el-button @click="fy('up')">上一页</el-button>
			<el-button @click="fy('next')">下一页</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				flag:true,
				isAll:false,
				delData:{},
				tableData:[],
				page:0,
				pages:0,
				findInfo:"",
				n:0
			}
		},
		methods:{
			find(){
				if(this.n==0){
					if(this.findInfo==""){
						return;
					}
				}
				this.n=1;
				if(this.findInfo==""){
					this.n=0;
				}
				fetch("/api/stu/select?like="+this.findInfo+"&page=0").then(function(e){
					return e.json();
				}).then(function(e){
					if(e.message!="err"){
						this.tableData=e;
					}
				}.bind(this));
				fetch("/api/stu/selectAll?like="+this.findInfo).then(function(e){
					return e.text();
				}).then((e)=>{
					this.pages=e;
				});
			},
			a(val){
				this.isAll=true;
				if(!this.delData[val.toString()]){
					delete this.delData[val.toString()];
				}
				if(JSON.stringify(this.delData)=="{}"){
					this.isAll=false;
				}
			},
			handleClick(sid){
				this.$emit("sure","del",(next)=>{
					fetch("/api/stu/del?sid="+sid).then(function(e){
						return e.text();
					}).then((e)=>{
						if(e=="ok"){
							this.tableData=this.tableData.filter(function(val){
								return val.sid!=sid;
							});
							next("success");
						}else{
							next("fail");
						}
					});
				});
			},
			reset(sid){
				this.$emit("sure","密码将重置!",function(next){
					fetch("/api/stu/reset?sid="+sid).then(function(e){
						return e.text();
					}).then(function(e){
						if(e=="ok"){
							next("success","密码重置");
						}else{
							next("fail","密码重置");
						}
					});
				});
			},
			jump(str){
				this.$router.push("/"+str);
			},
			delMore(){
				if(!this.isAll){
					return;
				}
				var n=0;
				for(let i in this.delData){
					n++;
				}
				this.$emit("sure",n+"条数据将被删除?",(next)=>{
					fetch("/api/stu/delMore",{
						method:"post", 
						body:"datas="+JSON.stringify(this.delData),
						headers:{
							"content-type":"application/x-www-form-urlencoded"
						}
					}).then(function(e){
						return e.text();
					}).then((e)=>{
						if(e=="ok"){
							this.tableData=this.tableData.filter((val)=>{
								var x=0;
								for(let i in this.delData){
									if(i==val.sid){
										x=1;
										delete this.delData[val.sid.toString()];
									}
								}
								if(x==0){
									return true;
								}
							});
							next("success");						
						}else{
							next("fail");						
						}
						this.flag=true;
					});
				});
			},
			changeState(){
				this.flag=!this.flag;
			},
			fy(str){
				if(str=="up"){
					if(this.page==0){
						return;
					}
					this.page--;
				}else if(str=="next"){
					if(this.page==this.pages-1){
						return;
					}
					this.page++;
				}
				fetch("/api/stu/select?page="+this.page+"&like="+this.findInfo).then(function(e){
					return e.json();
				}).then((e)=>{
					this.tableData=e;
				})
			}
		},
		mounted(){
			fetch("/api/stu/select?page="+this.page).then(function(e){
				return e.json();
			}).then((e)=>{
				if(e.message!="err"){
					this.tableData=e;
				}
			});
			fetch("/api/stu/selectAll").then(function(e){
				return e.text();
			}).then((e)=>{
				this.pages=e;
			});
		},
		computed:{
			info(){
				return this.flag?"批量删除":"取消";
			},
			type(){
				return this.flag?"danger":"";
			},
			allType(){
				return this.isAll?"primary":"";
			}
		},
		watch:{
			flag(){
				if(this.flag){
					this.isAll=false;
					this.delData={};
				}
			}
		}
	}
</script>

<style>
	td,th{
		text-align: center !important;
		height: 70px;
		box-sizing: border-box;
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