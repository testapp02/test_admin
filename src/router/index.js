import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import stuSelect from '@/components/stu/select'
import stuAddSign from '@/components/stu/addSign'
import stuEdit from '@/components/stu/Edit'
import stuAddMore from '@/components/stu/addMore'
import Welcome from '@/components/Welcome'
import selectFxiang from '@/components/fxiang/selectFxiang.vue'
import addFxiang from '@/components/fxiang/addFxiang.vue'
import editFxiang from '@/components/fxiang/editFxiang.vue'
import addClasses from '@/components/classes/add.vue'
import editClasses from '@/components/classes/edit.vue'
import selectClasses from '@/components/classes/select.vue'
import addTest from '@/components/test/addTest.vue'
import selectTest from '@/components/test/selectTest.vue'
import addType from '@/components/test/addType.vue'
import selectType from '@/components/test/selectType.vue'
import editType from '@/components/test/editType.vue'
import option from '@/components/test/options.vue'
import answer from '@/components/test/answer.vue'
import teAddSign from '@/components/teacher/addSign.vue'
import teSelect from '@/components/teacher/select.vue'
import teEdit from '@/components/teacher/Edit.vue'
import teAddMore from '@/components/teacher/addMore.vue'
import editTest from '@/components/test/editTest.vue'


Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		component: Main,
		children: [{
			path:':flag',
			components: {
				selectFxiang,
				addFxiang,
				editFxiang,
				editClasses,
				addClasses,
				selectClasses,
				stuSelect,
				stuAddSign,
				stuAddMore,
				stuEdit,
				selectType,
				addType,
				selectTest,
				addTest,
				editType,
				teAddSign,
				teSelect,
				teEdit,
				teAddMore,
				editTest
			},
			children:[{
				path:'option',
				component:option			
			},{
				path:'answer',
				component:answer
			}]
		},
		{
			path:"",
			components:{
				Welcome
			}
		}
		]
	}]
})