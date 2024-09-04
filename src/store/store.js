import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
			kestra_api: 'http://localhost:8080',
			namespace: 'dev',
			execution_log: 1
    };
  },
  mutations: {
		updateKestra_api(state, value) {
      state.kestra_api = value;
    },
		updateNamespace(state, value) {
      state.namespace = value;
    },
		updateExecution_log(state, value) {
      state.execution_log = value;
    },
  },
  actions: {
		setKestra_api({ commit }, value) {
      commit('updateKestra_api', value);
    },
		setNamespace({ commit }, value) {
      commit('updateNamespace', value);
    },
		setExecution_log({ commit }, value) {
      commit('updateExecution_log', value);
    }
  },
  getters: {

  }
});

export default store;