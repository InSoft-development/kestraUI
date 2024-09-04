<template>
  <div class="container">
    <div class="row">
      <div v-if="errorE">{{ error }}</div>
      <div v-else-if="executions.total">
        <ExecutionsList :executions="executions.results" @choice="setChoice" />
      </div>
      <div v-else>Loading...</div>
    </div>
    <div class="row">
      <nav>
        <router-link :to="{ name: 'Logs' }" class="btn btn-outline-secondary">
          Просмотреть логи
        </router-link>
      </nav>
    </div>
  </div>
  <loadingRModal
    :body="errorE"
    :title="'Error loading executions'"
    @close="closeHandle"
    @reload="reload"
  />
</template>

<script>
import { onMounted, ref, watch } from "vue";
import ExecutionsList from "../components/execution/ExecutionsList.vue";
import getExecutions from "../composables/executions/getExecutions";
import loadingRModal from "../components/modal/LoadingRModal.vue";

export default {
  components: {
    ExecutionsList,
    loadingRModal,
  },
  setup() {
    const id_execution = ref(-1);
    const { executions, errorE, loadE } = getExecutions();
    let loadingrmod;

    loadE();

    onMounted(() => {
      loadingrmod = new bootstrap.Modal(document.getElementById("loadingRMod"));
    });

		const closeHandle = () => {
      errorE.value = null;
    };

    const reload = () => {
      loadE(namespaceComputed.value);
    };

		watch(errorE, (newVal) => {
      if (newVal) {
        loadingrmod.show();
      } else {
        loadingrmod.hide();
      }
    });

    const setChoice = (chosen_id) => {
      id_execution.value = chosen_id;
    };

    console.log(executions);

    return {
      executions,
      errorE,
      setChoice,
      id_execution,
			closeHandle,
			reload
    };
  },
};
</script>

<style>
</style>