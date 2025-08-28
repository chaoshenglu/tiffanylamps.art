import { createRouter, createWebHistory } from 'vue-router'
import CreatePost from '../views/CreatePost.vue'
import PostList from '../views/PostList.vue'
import SaveLamp from '../views/SaveLamp.vue'
import LampList from '../views/LampList.vue'

const routes = [
  {
    path: '/',
    redirect: '/posts'
  },
  {
    path: '/create',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/create/:id',
    name: 'EditPost',
    component: CreatePost
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/list',
    redirect: '/posts'
  },
  {
    path: '/lamps',
    name: 'LampList',
    component: LampList
  },
  {
    path: '/lamp/create',
    name: 'CreateLamp',
    component: SaveLamp
  },
  {
    path: '/lamp/edit/:model',
    name: 'EditLamp',
    component: SaveLamp
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router