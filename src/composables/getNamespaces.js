import { ref } from 'vue';
import axios from 'axios';

const getNamespaces = () => {
  const namespaces = ref([]);
  const errorN = ref(null);

  const loadN = async () => {
		errorN.value = null;
    try {
      let data = await axios.get('/api/v1/flows/distinct-namespaces');
      namespaces.value = data.data;
    }
    catch (err) {
      errorN.value = err.message;
      console.log(errorN.value);
    }
  };

  return {
    namespaces,
    errorN,
    loadN
  };
};

export default getNamespaces;