import { createRouter, createWebHistory } from 'vue-router'
import Config from '../views/Config.vue'
import CreatePost from '../views/CreatePost.vue'
import EditPost from '../views/EditPost.vue'
import PostList from '../views/PostList.vue'

const routes = [
  {
    path: '/',
    redirect: '/config'
  },
  {
    path: '/config',
    name: 'Config',
    component: Config
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/edit/:id',
    name: 'EditPost',
    component: EditPost
  },
  {
    path: '/list',
    name: 'PostList',
    component: PostList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router