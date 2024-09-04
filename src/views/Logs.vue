<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div v-if="execution_logComputed.toString() === '1'">
          <h4>No execution is chosen!</h4>
        </div>
        <div v-else class="table-responsive">
          <table class="table table-hover align-middle border">
            <thead>
              <th scope="col">Execution: {{ execution_logComputed }}</th>
            </thead>
            <div v-if="errorL">
              <td>{{ errorL }}</td>
            </div>
            <tbody class="table-group-divider" v-if="logs.length > 0">
              <tr v-for="log in logs" :key="log.timestamp">
                <td>{{ log.message }} - {{ log.flowId }}</td>
              </tr>
            </tbody>
            <div v-else>Loading...</div>
          </table>
        </div>
      </div>
    </div>
  </div>
  <loadingRModal
    :body="errorL"
    :title="'Error loading log'"
    @close="closeHandle"
    @reload="reload"
  />
</template>

<script>
import getLogs from "../composables/logs/getLogs";
import { useStore } from "vuex";
import { onMounted, computed, watch } from "vue";
import loadingRModal from "../components/modal/LoadingRModal.vue";

export default {
  components: {
    loadingRModal,
  },
  setup() {
    const store = useStore();
    const execution_logComputed = computed(() => store.state.execution_log);
    const { logs, errorL, loadL } = getLogs();
    let loadingrmod;

    loadL();
    onMounted(() => {
      console.log("id: ", execution_logComputed.value);
      loadL(execution_logComputed.value);
      loadingrmod = new bootstrap.Modal(document.getElementById("loadingRMod"));
    });

    watch(errorL, (newVal) => {
      if (newVal) {
        loadingrmod.show();
      } else {
        loadingrmod.hide();
      }
    });

    const closeHandle = () => {
      errorL.value = null;
    };

    const reload = () => {
      loadL(execution_logComputed.value);
    };

    console.log(logs);
    return {
      errorL,
      logs,
      execution_logComputed,
      closeHandle,
      reload,
    };
  },
};
</script>

<style>
</style>