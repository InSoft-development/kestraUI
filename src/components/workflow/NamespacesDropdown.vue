<template>
  <Dropdown class="dropdown">
    <!-- trigger element -->
    <template #trigger>
      <button type="button" class="btn btn-secondary">
        {{ chosen_nspace }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </button>
    </template>

    <!-- contents display in dropdown -->
    <div class="dropd">
      <div v-if="errorN">{{ errorN }}</div>
      <div v-else-if="namespaces.length">
        <div class="table-responsive">
          <table class="table table-hover align-middle border">
            <tbody>
              <tr
                v-for="namespace in namespaces"
                :key="namespace"
                @click="clicked(namespace)"
              >
                <td>
                  {{ namespace }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <h3>Loading...</h3>
      </div>
    </div>
  </Dropdown>
</template>

<script>
import Dropdown from "v-dropdown";
import { ref } from "vue";
import getNamespaces from "../../composables/getNamespaces";

export default {
  components: {
    Dropdown,
  },
  setup(props, { emit }) {
    const { namespaces, errorN, loadN } = getNamespaces();
    loadN();

    //console.log(namespaces)
    const chosen_nspace = ref("Choose namespace");

    const clicked = (nspace) => {
      chosen_nspace.value = nspace;
      emit("namespace", chosen_nspace.value);
    };

    return {
      namespaces,
      clicked,
      chosen_nspace,
      errorN,
    };
  },
};
</script>

<style>
.dropdown {
  margin-bottom: 20px;
}
</style>