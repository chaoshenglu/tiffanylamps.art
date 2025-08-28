import { createRouter, createWebHistory } from 'vue-router'
import CreatePost from '../views/CreatePost.vue'
import PostList from '../views/PostList.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router