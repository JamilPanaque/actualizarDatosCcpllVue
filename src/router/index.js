import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import ListarCollegiados from '../views/collegiates/ListarCollegiados.vue'
import HomeCollegiate from '../views/collegiates/HomeCollegiate.vue'
import ActualizarCollegiates1 from '../views/collegiates/ActualizarCollegiates1.vue'
import ActualizarCollegiates2 from '../views/collegiates/ActualizarCollegiates2.vue'
import ActualizarCollegiates3 from '../views/collegiates/AgradecimientoCollegiate.vue'


const routes = [
  {
    path: '/',
    name: 'registrar',
    component: HomeCollegiate
  },
  
  {
    path: '/listarColegiados',
    name: '/listarColegiados',
    component: ListarCollegiados
  },

  {
    path: '/actualizarCollegiates1/:documento',
    name: 'actualizarCollegiates1',
    component: ActualizarCollegiates1,
    props: true // Permite pasar los parámetros como props a la vista
  },

  {
    path: '/actualizarCollegiates2/:documento',
    name: 'actualizarCollegiates2',
    component: ActualizarCollegiates2,
    props: true // Permite pasar los parámetros como props a la vista
  },

  {
    path: '/actualizarCollegiates3',
    name: 'actualizarCollegiates3',
    component: ActualizarCollegiates3,
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
