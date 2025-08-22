import { createRouter, createWebHistory } from 'vue-router'
import Config from '../views/Config.vue'
import CreatePost from '../views/CreatePost.vue'
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