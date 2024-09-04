import { ref } from 'vue';
import axios from 'axios';

const getFlow = () => {
  const flow = ref([]);
  const errorFlow = ref(null);

  const loadFlow = async (namespace, id) => {
		errorFlow.value = null;
    try {
      let data = await axios.get('/api/v1/flows/' + namespace + '/' + id);
      flow.value = data.data;
    }
    catch (err) {
      errorFlow.value = err.message;
      console.log(errorFlow.value);
    }
  };

  return {
    flow,
    errorFlow,
    loadFlow
  };
};

export default getFlow;