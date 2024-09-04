<template>
  <div v-if="amountInputs > 0">
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="row gy-2 gx-3">
          <div
            v-for="input in flow.inputs"
            :key="input.id"
            class="col-lg-4 col-md-6 col-sm-12"
          >
            <div>
              <label class="form-label">{{ input.id }}</label>
              <input
                type="text"
                class="form-control"
                v-model="inputData[input.id]"
                :required="input.required"
                :max="input.max"
                :min="input.min"
              />
            </div>
          </div>
        </div>
        <div class="submit">
          <button class="btn btn-secondary">Запустить</button>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    <button class="btn btn-secondary my-3" @click="execute">Запустить</button>
  </div>
  <ErrorModal title="Error" :body="errorPE" />
  <loadingRModal
    title="Error loading flow"
    :body="errorFlow"
    @close="closeHandle"
    @reload="reload"
  />
</template>

<script>
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import getFlow from "../../../composables/flows/getFlow";
import createExecution from "../../../composables/executions/createExecution";
import ErrorModal from "../../modal/ErrorModal.vue";
import loadingRModal from "../../modal/LoadingRModal.vue";

export default {
  props: ["idflow", "namespace"],
  components: {
    ErrorModal,
    loadingRModal,
  },
  setup(props) {
    const { flow, errorFlow, loadFlow } = getFlow();
    const { responseE, errorPE, createE } = createExecution();
    5;
    const formData = ref(new FormData());
    const amountInputs = ref();
    const inputData = ref({});
    let errormod;
    let loadrmod;

    onMounted(() => {
      errormod = new bootstrap.Modal(document.getElementById("testPopup"));
      loadrmod = new bootstrap.Modal(document.getElementById("loadingRMod"));
    });

    watch(errorPE, (newVal) => {
      if (newVal) {
        errormod.show();
      } else {
        errormod.hide();
      }
    });

    watch(errorFlow, (newVal) => {
      if (newVal) {
        loadrmod.show();
      } else {
        loadrmod.hide();
      }
    });

    const updateInputs = computed(() => {
			if (props.idflow != -1){
      loadFlow(props.namespace, props.idflow);
			}
    });

    const inputControl = () => {
      updateInputs.value;
      formData.value = new FormData();
      inputData.value = {};
      for (let key in flow.value.inputs) {
        let value = flow.value.inputs[key];
        if (value.defaults) {
          formData.value.append(flow.value.inputs[key].id, value.defaults);

          inputData.value[flow.value.inputs[key].id] = value.defaults;
        } else {
          formData.value.append(flow.value.inputs[key].id, "");

          inputData.value[flow.value.inputs[key].id] = "";
        }
      }
      //console.log("input data", inputData.value);
      //console.log(formData.value);
      amountInputs.value = 0;
      for (const entry of formData.value.entries()) {
        amountInputs.value++;
      }
      //console.log(amountInputs.value);
      //console.log(flow.value)
    };

    watchEffect(() => {
      inputControl();
    });

    const updateFormData = (event, id) => {
      formData.value[id] = event.target.value;
      //console.log(formData.value);
    };

    const handleSubmit = () => {
      const valid = validateFormData();
      if (valid) {
        console.log("Form data is valid:", formData);
        // Добавьте здесь логику для сохранения или отправки данных
      } else {
        console.log("Form data is invalid");
        // Добавьте здесь логику для обработки невалидных данных
      }
      formData.value = new FormData();
      for (const [key, value] of Object.entries(inputData.value)) {
        formData.value.append(key, value);
      }

      console.log("Formdata:", formData.value);

      if (props.namespace && props.idflow) {
        createE(props.namespace, props.idflow, formData.value);
        console.log(
          "answer execute: ",
          responseE.value,
          "\nerror execute: ",
          errorPE.value
        );
      }
    };

    const execute = () => {
      if (props.namespace && props.idflow) {
        createE(props.namespace, props.idflow, formData.value);
        console.log(
          "answer execute: ",
          responseE.value,
          "\nerror execute: ",
          errorPE.value
        );
      }
    };

    const validateFormData = () => {
      /*
      for (const input of flow.inputs) {
        const value = formData[input.id];
        if (input.required && !value) {
          return false;
        }
        if (input.min && value < input.min) {
          return false;
        }
        if (input.max && value > input.max) {
          return false;
        }
      }*/
      return true;
    };

		const closeHandle = () => {
      errorFlow.value = null;
    };

    const reload = () => {
      loadFlow(props.namespace, props.idflow);
    };

    return {
      flow,
      updateFormData,
      handleSubmit,
      validateFormData,
      formData,
      amountInputs,
      inputData,
      execute,
      errorPE,
      errorFlow,
			closeHandle,
      reload,
    };
  },
};
</script>

<style>
</style>