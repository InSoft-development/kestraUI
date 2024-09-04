<template>
	<div v-if="flow">
 		{{ flow.id }} - {{ flow.namespace }}
		<!--<button @click="test">click</button>-->
	</div>
</template>

<script>
import postFlows from "../../composables/flows/postFlows";

export default {
	props: ['flow'],
	setup(props) {
		//console.log(props.flow) 

		/*
		const test = () => {       
			console.log(props.flow.id)   
			props.flow.id = 'new.testik'
			const { response, errorPF, addF } = postFlows()
			addF(props.flow.namespace, props.flow)
		}
		return {
			test
		}
		*/
	}
}
</script>

<style>

</style>