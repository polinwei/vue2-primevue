// @ is an alias to /src
const routes = [ 
  { path: '/Login', name: 'Login', component: () => import('@/views/security/Login.vue'), meta: { allowAnonymous: true } },
]

export default routes