import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

var store=new Vuex.Store({
	state:{
		testInfo:{}
	},
	mutations:{
		setT(state,obj){
			state.testInfo=obj;
		}
	}
});
export default store;