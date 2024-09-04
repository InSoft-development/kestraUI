<template>
	<div v-if="execution">
		<h2> {{ execution.flowId }} - {{ execution.namespace }} - {{ execution.state.endDate }} - <div :class="{ green: execution.state.current === 'SUCCESS' }">{{ execution.state.current }} </div>
			</h2>  <!-- flow, time, status -->
	</div>
</template>

<script>
export default {
	props: ['execution'],
	setup(props) {
		console.log(props.execution) 
	}
}
</script>

<style>

</style>