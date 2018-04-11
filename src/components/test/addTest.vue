<template>
	<div>
		<div style="margin-bottom: 30px;">
			试题方向 :
			<el-select v-model="fid" placeholder="请选择方向" @change="change()">
				<el-option v-for="item in fDatas" :key="item.fid" :label="item.fname" :value="item.fid">
				</el-option>
			</el-select>
		</div>
		<div>
			试题类型 :
			<el-select v-model="typeid" placeholder="请选择试题类型" @change="change()">
				<el-option v-for="item in typeDatas" :key="item.typeid" :label="item.typename" :value="item.typeid">
				</el-option>
			</el-select>
			<router-view @refresh="refresh"></router-view>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				fDatas: [],
				typeDatas: [],
				fid: "",
				typeid: "",
				fid1: "",
				typeid1: ""
			}
		},
		methods: {
			change() {
				if(this.fid == "" || this.typeid == "") {

				} else {
					var fid=this.fid;
					var typeid=this.typeid;
					if(!Number(this.fid)){
						fid=this.fid1;
					}
					if(!Number(this.typeid)){
						typeid=this.typeid1;
						console.log(typeid);
					}
					var params = "fid=" + fid + "&typeid=" + typeid;
					switch(Number(typeid)) {
						case 1:
							{
								this.$router.push("/addTest/option?" + params);
							}
							break;
						case 3:
							{
								this.$router.push("/addTest/answer?" + params);
							}
							break;
						case 4:
							{
								console.log(111);
								this.$router.push("/addTest/option?" + params);
							}
							break;
						default:
							break;
					}
				}
			},
			refresh(fid,typeid){
				this.fid1=fid;
				this.typeid1=typeid;
			}
		},
		mounted() {
			fetch("/api/fxiang/select").then(function(e) {
				return e.json();
			}).then((e) => {
				this.fDatas = e;
				if(this.fid1!=""){
					this.fDatas.forEach((val)=>{
						if(val.fid==this.fid1){
							this.fid=val.fname;
						}
					});
				}
			});
			fetch("/api/test/selectType").then(function(e) {
				return e.json();
			}).then((e) => {
				this.typeDatas = e;
				if(this.typeid1!=""){
					this.typeDatas.forEach((val)=>{
						if(val.typeid==this.typeid1){
							this.typeid=val.typename;
						}
					});
				}
			});
		}
	}
</script>