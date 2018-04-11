<template>
	<el-row class="tac">
		<el-col :span="24">
			<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>学生管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1"><router-link to="/stuSelect" tag="div">查询信息</router-link></el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>老师管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="2-1">
							<router-link to="/teSelect" tag="div">信息查询</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>题库管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="3-1">
							<router-link to="/selectType" tag="div">
								查询试题类型
							</router-link>	
						</el-menu-item>
						<el-menu-item index="3-2">
							<router-link to="/selectTest" tag="div">
								查询试题
							</router-link>	
						</el-menu-item>
						<el-menu-item index="3-3">
							<router-link to="/addType" tag="div">
								添加试题类型
							</router-link>	
						</el-menu-item>
						<el-menu-item index="3-4">
							<router-link to="/addTest" tag="div">
								添加试题
							</router-link>	
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>考题管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="4-1">考题信息</el-menu-item>
						<el-menu-item index="4-2">添加考题</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>班级管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="5-1">
							<router-link to="/selectClasses" tag="div">班级查询</router-link>
						</el-menu-item>
						<el-menu-item index="5-2">
							<router-link to="/addClasses" tag="div">
								添加班级
							</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="6">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>阶段管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="6-1">阶段类型查询</el-menu-item>
						<el-menu-item index="6-2">添加阶段</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="7">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>方向管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="7-1">
							<router-link to="/selectFxiang" tag="div">方向查询</router-link>
						</el-menu-item>
						<el-menu-item index="7-2">
							<router-link to="/addFxiang" tag="div">添加方向</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
			},
			handleClose(key, keyPath) {
			}
		}
	}
</script>

<style>

</style>