import { ref } from 'vue';
import axios from 'axios';

const getExecutions = () => {
  const executions = ref([]);
  const errorE = ref(null);

  const loadE = async () => {
		errorE.value = null;
    try {
      let data = await axios.get('/api/v1/executions/search', {
				params: {
						size: 100,
						page: 1,
						sort: 'state.startDate:desc'
				}});
      executions.value = data.data;
    }
    catch (err) {
      errorE.value = err.message;
      console.log(errorE.value);
    }
  };

  return {
    executions,
    errorE,
    loadE
  };
};

export default getExecutions;