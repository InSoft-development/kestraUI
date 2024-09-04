import { ref } from 'vue';
import axios from 'axios';

const getFlows = () => {
  const flows = ref([]);
  const errorF = ref(null);

  const loadF = async (namespace) => {
		errorF.value = null;
    try {
      let data = await axios.get('/api/v1/flows/' + namespace);
      flows.value = data.data;
    }
    catch (err) {
      errorF.value = err.message;
      console.log(errorF.value);
    }
  };

  return {
    flows,
    errorF,
    loadF
  };
};

export default getFlows;