<template>
	<nav>
		<router-link :to="{ name: 'Workflows'}" class="btn btn-outline-secondary">
			Workflows
		</router-link>
		<router-link :to="{ name: 'Executions'}" class="btn btn-outline-secondary">
			Executions 
		</router-link>
		<router-link :to="{ name: 'Logs'}" class="btn btn-outline-secondary">
			Logs
		</router-link>
		<router-link :to="{ name: 'Config'}" class="btn btn-outline-secondary">
			Config
		</router-link>
	</nav>
	
  <router-view/>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
