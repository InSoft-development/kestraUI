import { ref } from 'vue';
import axios from 'axios';

const getLogs = () => {
  const logs = ref([]);
  const errorL = ref(null);

  const loadL = async (id) => {
    try {
      let data = await axios.get('/api/v1/logs/' + id);
      logs.value = data.data;
    }
    catch (err) {
      errorL.value = err.message;
      console.log(errorL.value);
    }
  };

  return {
    logs,
    errorL,
    loadL
  };
};

export default getLogs;