<template>
	<div>
			<div style="display: inline-block;width: 300px;">
					<input v-model="like" placeholder="搜索..." style="width: 300px;" @keydown.13="gaibian" class="el-input__inner"></input>
				</div>
				<el-button icon="el-icon-search" circle @click="gaibian"></el-button>
		<div style="float: right;">
			<el-select placeholder="方向" v-model="fid" @change="gaibian" filterable clearable>
				<el-option :label="item" :value="key" v-for="(item,key) of fDatas" :key="key"></el-option>
			</el-select>
			<el-select placeholder="类型" v-model="typeid" @change="gaibian" filterable clearable>
				<el-option :label="item" :value="key" :key="key" v-for="(item,key) of typeDatas"></el-option>
			</el-select>
		</div>
		<div class="test-box">
			<ul>
				<li v-for="(item,index) in datas" class="list">
					<div>
						<div class="title">
							<span v-text="(page	)*5+index+1+'.'" class="num"></span>
							<span v-text="item.title" class="title1"></span>
						</div>
						<div class="option" v-if='item.optionArr.length>0'>
							<div v-for="(item1,index) in item.optionArr">
								<span v-text="String.fromCharCode(65 + parseInt(index))+' . '"></span><span v-text="item1"></span>
							</div>
						</div>
						<div class="option">
							<span>答案：</span>
							<span v-text="item.results" v-if="item.results"></span>
							<span v-text="item.result" v-else></span>
						</div>
					</div>
					<div class="option">
						<el-button type="primary" icon="el-icon-edit" class="btn" @click="edit(item)"></el-button>
						<el-button type="primary" icon="el-icon-delete" class="btn" @click="delSign(item)"></el-button>
					</div>
				</li>
			</ul>
		</div>
		<el-pagination @current-change="change" background layout="prev, pager, next" :total="pages*10" style="margin:20px auto 20px;width: 500px;display: flex;justify-content: center;">
		</el-pagination>
	</div>
</template>
<script>export default {
	data() {
		return {
			fDatas: {},
			typeDatas: {},
			fid: "",
			typeid: "",
			like: "",
			datas: [],
			page: 0,
			pages: "",
		}
	},
	mounted() {
		fetch("/api/fxiang/select").then(function(e) {
			return e.json();
		}).then((e) => {
			var obj = {};
			e.forEach((val) => {
				obj[val.fid] = val.fname;
			});
			this.fDatas = obj;
		});
		fetch("/api/test/selectType").then(function(e) {
			return e.json();
		}).then((e) => {
			this.selectAll();
			this.selectTest();
			var obj = {};
			e.forEach((val) => {
				obj[val.typeid] = val.typename;
			});
			this.typeDatas = obj;
		});
	},
	methods: {
		delSign(testid) {
			this.$emit("sure", "del", (next) => {
				fetch("/api/test/delTest?testid=" + testid).then(function(e) {
					return e.text();
				}).then((e) => {
					if(e == "ok") {
						this.datas = this.datas.filter(function(val) {
							return val.testid != testid;
						})
						next();
					} else {
						next("fail");
					}
				})
			});
		},
		selectAll() {
			fetch("/api/test/selectAll?like=" + this.like + "&fid=" + this.fid + "&typeid=" + this.typeid).then(function(e) {
				return e.text();
			}).then((e) => {
				this.pages = parseInt(e);
			})
		},
		selectTest() {
			fetch("/api/test/selectTest?like=" + this.like + "&page=" + this.page + "&fid=" + this.fid + "&typeid=" + this.typeid).then(function(e) {
				return e.json();
			}).then((e) => {
				this.datas = e;
				this.datas.forEach((val, index) => {
					if(this.typeDatas[val.typeid].indexOf("选") > -1) {
						val.optionArr = val.options.split("||");
						var resultArr = val.result.split(",");
						resultArr = resultArr.map(function(val1) {
							return String.fromCharCode(65 + parseInt(val1));
						});
						val.results = resultArr.join(",");
					} else {
						val.optionArr = []
					}
				});
			});
		},
		change(n) {
			this.page = n - 1;
			this.selectAll();
			this.selectTest();
		},
		edit(item) {
			this.$router.push("/editTest?testid=" + item.testid + "&typename=" + this.typeDatas[item.typeid]);
		},
		gaibian(item) {
			this.page = 0;
			this.selectAll();
			this.selectTest();
		}
	}
}</script>
<style scoped="scoped">.test-box {
	/*background: #fff;*/
	margin-top: 20px;
}

.num {
	font-size: 20px;
}

.title1 {
	color: #66f;
}

.list {
	padding: 10px 20px;
	border-bottom: 1px solid #ccc;
}

.option {
	padding: 20px;
	color: #333333;
}

.option>div {
	margin-bottom: 5px;
}

.btn {
	width: 40px;
	height: 30px;
	padding: 0;
}</style>