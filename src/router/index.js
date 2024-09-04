import { createRouter, createWebHistory } from 'vue-router'
import Config from '../views/Config.vue'
import Workflows from '../views/Workflows.vue'
import Executions from '../views/Executions.vue'
import Logs from '../views/Logs.vue'
import Test from '../views/Test.vue'

const routes = [
  {
    path: '/',
    name: 'Config',
    component: Config
  },
	{
    path: '/executions',
		name: 'Executions',
		component: Executions,
		props: true
  },
	{
    path: '/logs',
		name: 'Logs',
		component: Logs,
		props: true
  },
	{
    path: '/workflows',
		name: 'Workflows',
		component: Workflows,
		props: true
  },
	{
    path: '/test',
		name: 'Test',
		component: Test,
		props: true
  }  // add error 404 page
]


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
