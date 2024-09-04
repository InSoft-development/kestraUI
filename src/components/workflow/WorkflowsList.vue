<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="table-responsive">
          <table class="table table-hover align-middle border">
            <thead>
              <th scope="col">Список:</th>
            </thead>
            <tbody class="table-group-divider">
              <tr
                v-for="flow in flows"
                :key="flow.id"
                :class="{ 'table-secondary': chosen_id === flow.id }"
                @click="handleClick(flow.id)"
              >
                <td>
                  {{ flow.id }}
                </td>
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
import Workflow from "./Workflow.vue";

export default {
  props: ["flows"],
  components: {
    Workflow,
  },
  setup(props, { emit }) {
    const chosen_id = ref(-1);

    const handleClick = (id) => {
      chosen_id.value = id;
      //console.log(id)
      emit("choice", chosen_id.value);
    };

    return {
      handleClick,
      chosen_id
    };
  },
};
</script>

<style>
</style>