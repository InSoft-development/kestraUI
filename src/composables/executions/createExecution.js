import { ref } from 'vue';
import axios from 'axios';

const createExecution = () => {
	const responseE = ref([]);
	const errorPE = ref(null);

	const createE = async (namespace, flowId, formData) => {
		errorPE.value = null;
		try {
			const resp = await axios.post(`/api/v1/executions/${namespace}/${flowId}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			responseE.value = resp.data;
		}
		catch (err) {
			errorPE.value = err.message;
			console.log(errorPE.value);
		}
	};

	return {
		responseE,
		errorPE,
		createE
	};
};

export default createExecution;