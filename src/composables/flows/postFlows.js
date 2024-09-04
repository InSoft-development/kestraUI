import { ref } from 'vue';
import axios from 'axios';

const postFlows = () => {
  const response = ref([]);
  const errorPF = ref(null);

  const addF = async (namespace, flowData) => {
		errorPF.value = null;
    try {
      const resp = await axios.post(`/api/v1/flows/${namespace}`, flowData);
			response.value = resp.data;
    }
    catch (err) {
      errorPF.value = err.message;
      console.log(errorPF.value);
    }
  };

  return {
    response,
    errorPF,
    addF
  };
};

export default postFlows;