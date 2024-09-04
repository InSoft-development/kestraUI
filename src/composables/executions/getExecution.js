import { ref } from 'vue'

const getExecution = (id) => {
	const execute = ref(null)
	const errorEx = ref(null)

	const loadEx = async () => {
		errorEx.value = null;
		try {
			let data = await fetch('http://localhost:3000/executions/' + id)
			if (!data.ok) {
				throw Error('that post does not exist')
			}
			execute.value = await data.json()
		}
		catch (err) {
			errorEx.value = err.message
			console.log(errorEx.value)
		}
	}

	return {
		execute, errorEx, loadEx
	}
}

export default getExecution