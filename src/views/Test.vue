<template>
  <!-- Button trigger modal -->

  <button type="button" @click="load">Launch modal</button>
  <br />
  {{ errorN }}

  <ErrorModal :body="errorN" :title="'Error'"/>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import getNamespaces from "../composables/getNamespaces";
import ErrorModal from "../components/modal/ErrorModal.vue";

export default {
  components: {
    ErrorModal,
  },
  setup() {
    const { namespaces, errorN, loadN } = getNamespaces();
    let mymod;

    onMounted(() => {
      mymod = new bootstrap.Modal(document.getElementById("testPopup"));
    });

    const showTest = () => {
      mymod.show();
    };

    const load = async () => {
      await loadN(); // Дождитесь завершения загрузки данных
      console.log("TEST error getting namespace: ", errorN.value);
    };

		watch(errorN, (newVal) => {
			console.log("ErrorN have changed!", newVal);
			if (newVal){
				mymod.show();
			}
			
		})

    return {
      load,
      errorN,
      showTest,
			mymod
    };
  }
};
</script>