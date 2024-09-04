<template>
  <div class="container">
    <div class="home">
      <div v-if="errorF">{{ errorF }}</div>
      <div v-else-if="flows.length" class="workflow">
        <WorkflowsList :flows="flows" @choice="setChoice" />
      </div>
      <div v-else><h3>Loading...</h3></div>

      <Inputs :idflow="id_workflow" :namespace="namespaceComputed" />

      <loadingRModal 
        :body="errorF"
        :title="'Error loading flows'"
        @close="closeHandle"
        @reload="reload"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import WorkflowsList from "../components/workflow/WorkflowsList.vue";
import Inputs from "../components/workflow/input/Inputs.vue";
import getFlows from "../composables/flows/getFlows";
import ErrorModal from "../components/modal/ErrorModal.vue";
import loadingRModal from "../components/modal/LoadingRModal.vue";

export default {
  name: "Workflows",
  components: {
    WorkflowsList,
    Inputs,
    ErrorModal,
    loadingRModal,
  },
  setup() {
    const store = useStore();
    const id_workflow = ref(-1);
    const { flows, errorF, loadF } = getFlows();
    let loadingrmod;

    const namespaceComputed = computed(() => store.state.namespace);
    const apiComputed = computed(() => store.state.kestra_api);

		
    onMounted(() => {
      loadF(namespaceComputed.value);  
      loadingrmod = new bootstrap.Modal(document.getElementById("loadingRMod"));
    });

    const setChoice = (chosen_id) => {
      id_workflow.value = chosen_id;
    };

    const closeHandle = () => {
      errorF.value = null;
    };

    const reload = () => {
      loadF(namespaceComputed.value);
    };

    watch(errorF, (newVal) => {
      if (newVal) {
        loadingrmod.show();
      } else {
        loadingrmod.hide();
      }
    });

    return {
      flows,
      errorF,
      setChoice,
      namespaceComputed,
      id_workflow,
      apiComputed,
      closeHandle,
      reload,
    };
  },
};
</script>
