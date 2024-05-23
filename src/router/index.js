import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

import Cliente from '../views/Clientes.vue';
import NewCliente from '../components/clientes/NewCliente.vue'
import EditCliente from '../components/clientes/EditCliente.vue'

import Pago from '../views/Pagos.vue'
import NewPago from '../components/pagos/NewPago.vue'
import EditPago from '../components/pagos/EditPago.vue'

import Viaje from '../views/Viajes.vue'
import NewViaje from '../components/viajes/NewViaje.vue'
import EditViaje from '../components/viajes/EditViaje.vue'

import Promocion from '../views/Promociones.vue'
import NewPromocion from '../components/promociones/NewPromocion.vue'
import EditPromocion from '../components/promociones/EditPromocion.vue'

import Paquete from '../views/Paquetes.vue'
import NewPaquete from '../components/paquetes/NewPaquete.vue'
import EditPaquete from '../components/paquetes/EditPaquete.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/pagos',
    name: 'pagos',
    component: Pago
  },

  {
    path: '/edit-pago/:id',
    name: 'EditPago',
    component: EditPago
  },

  {
    path: '/pagos/new',
    name: 'NewPago',
    component: NewPago
  },

  {
    path: '/clientes',
    name: 'clientes',
    component: Cliente
  },

  {
    path: '/edit-cliente/:id',
    name: 'EditCliente',
    component: EditCliente
  },

  {
    path: '/clientes/new',
    name: 'NewCliente',
    component: NewCliente
  },

  {
    path: '/viajes',
      name: 'viajes',
    component: Viaje
  },

  {
    path: '/edit-viaje/:id',
    name: 'EditViaje',
    component: EditViaje
  },

  {
    path: '/viajes/new',
    name: 'NewViaje',
    component: NewViaje
  },

  {
    path: '/promociones',
    name: 'Promociones',
    component: Promocion
},

{
  path: '/edit-promocion/:id',
  name: 'EditPromocion',
  component: EditPromocion
},

{
  path: '/promociones/new',
  name: 'NewPromocion',
  component: NewPromocion
},
  
  {
    path: '/paquetes',
    name: 'paquetes',
    component: Paquete
  },

  {
    path: '/edit-paquete/:id',
    name: 'EditPaquete',
    component: EditPaquete
  },

  {
    path: '/paquetes/new',
    name: 'NewPaquete',
    component: NewPaquete
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
