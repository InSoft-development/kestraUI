<template>
  <div class="container">
    <div class="row">
      <label for="api" class="form-label">Kestra API: </label>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <input
          type="text"
          @input="updateKapi"
          v-model="kestra_api"
          class="form-control"
          id="api"
        />
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <button class="btn btn-secondary full-width-button" @click="apply()">
          apply
        </button>
      </div>
    </div>
    <br />
    <div class="row justify-content-md-center">
			<div class="col-3">
				<label for="dropdown" class="form-label">Namespace: </label>
      <div class="dropdown-center" id="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle full-width-button"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ chosen_nspace }}
        </button>
        <ul class="dropdown-menu full-width-button">
          <li
            v-for="namespace in namespaces"
            :key="namespace"
            @click="clicked(namespace)"
            class="dropdown-item"
          >
            {{ namespace }}
          </li>
        </ul>
      </div>
			</div>
      
    </div>

    <br />
    <p>Some other params...</p>

    <loadingRModal
      :body="errorN"
      :title="'Error loading namespaces'"
      @close="closeHandle"
      @reload="reload"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import ErrorModal from "../components/modal/ErrorModal.vue";
import getNamespaces from "../composables/getNamespaces";
import loadingRModal from "../components/modal/LoadingRModal.vue";
import axios from "axios";

export default {
  components: {
    ErrorModal,
    loadingRModal,
  },
  setup() {
    const store = useStore();
    const kestraApiComputed = computed(() => store.state.kestra_api);
    const namespaceComputed = computed(() => store.state.namespace);
    let kestra_api = ref("http://localhost:8080");
    let loadingrmod;
    const myData = ref("");
    const { namespaces, errorN, loadN } = getNamespaces();
    loadN();
    const chosen_nspace =
      ref(JSON.parse(localStorage.getItem("namespace"))) || namespaceComputed;
    console.log("namespaces: ", namespaces); //

    const clicked = (nspace) => {
      chosen_nspace.value = nspace;
      localStorage.setItem("namespace", JSON.stringify(nspace));
      store.dispatch("setNamespace", nspace);
    };

    const updateKapi = () => {
      store.dispatch("setKestra_api", kestra_api);
    };

    onMounted(() => {
      loadingrmod = new bootstrap.Modal(document.getElementById("loadingRMod"));
      loadData();
    });

    const closeHandle = () => {
      errorN.value = null;
    };

    const reload = () => {
      loadN();
    };

    watch(errorN, (newVal) => {
      if (newVal) {
        loadingrmod.show();
      } else {
        loadingrmod.hide();
      }
    });

    let data = ref(null);

    const apply = () => {
      console.log(kestra_api.value);
      localStorage.setItem("kestra_api", JSON.stringify(kestra_api.value));
      request(kestra_api.value);
    };

    const request = async (kestrapi) => {
      try {
        let data = await axios.get("http://localhost:5172/change", {
          params: { kestra_api: kestrapi },
        });
      } catch (err) {
        console.log("errorF.value");
      }
    };

    const loadData = () => {
      const storedData = localStorage.getItem("kestra_api");
      if (storedData) {
        myData.value = JSON.parse(storedData);
        console.log("From local storage: ", myData.value);
        kestra_api.value = myData.value;
      }
    };

    return {
      kestra_api,
      updateKapi,
      kestraApiComputed,
      namespaces,
      clicked,
      chosen_nspace,
      errorN,
      closeHandle,
      reload,
      apply,
    };
  },
};
</script>

<style>
</style>