<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class='table-responsive'>
          <table class="table table-hover align-middle border">
            <thead>
              <th scope="col">Executions:</th>
              <th scope="col">Status:</th>
              <th scope="col" @click="sortList('time')">&#8597; Time:</th>
            </thead>
            <tbody class="table-group-divider">
              <tr
                @click="handleClick(execution.id)"
                v-for="execution in executions"
                :key="execution.id"
                :class="{ 'table-secondary': chosen_id === execution.id }"
              >
                <td>{{ execution.id }}</td>
                <td
                  :class="{
                    'table-info': execution.state.current === 'CREATED',
                    'table-primary': execution.state.current === 'RUNNING',
                    'table-secondary': execution.state.current === 'PAUSED',
                    'table-success': execution.state.current === 'SUCCESS',
                    'table-warning': execution.state.current === 'WARNING',
                    'table-danger': execution.state.current === 'FAILED',
                    'table-light': execution.state.current === 'KILLING',
                    'table-dark': execution.state.current === 'KILLED',
                  }"
                >
                  {{ execution.state.current }}
                </td>
                <td
                  v-if="['PASSED', 'FAILED'].includes(execution.state.current)"
                >
                  {{ formatDate(execution.state.endDate) }}
                </td>
                <td v-else>{{ formatDate(execution.state.startDate) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Execution from "./Execution.vue";
import { useStore } from "vuex";

export default {
  props: ["executions"],
  components: {
    Execution,
  },
  setup(props, { emit }) {
    const store = useStore();
    const chosen_id = ref(-1);
    const chosenExecution = ref("");
		let sortedbyASC = true;
		const sortedData = props.executions;

    const handleClick = (id) => {
      chosen_id.value = id;
      emit("choice", chosen_id.value);
      chosenExecution.value = props.executions.find(
        (execution) => execution.id === chosen_id.value
      );
      store.dispatch("setExecution_log", chosen_id.value);
    };

    const formatDate = (dateString) => {
      return dateString.replace("T", " ").slice(0, 16);
    };

		const sortList = (sortBy) => {
      if (sortedbyASC) {
        sortedData.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        sortedbyASC = false;
      } else {
        sortedData.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        sortedbyASC = true;
      }
    };

    console.log(props.executions);

    return {
      handleClick,
      chosenExecution,
      formatDate,
      chosen_id,
			sortList
    };
  },
};
</script>

<style>
th:hover {
  cursor: pointer;
  background: #dedddd;
}
</style>