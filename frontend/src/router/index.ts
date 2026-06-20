import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/public/LandingView.vue'
import ComplaintView from '@/views/private/ComplaintView.vue'
import WorkflowBuilderView from '@/views/private/WorkflowBuilderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/private',
      redirect: '/private/complaints/chest-pain',
    },
    {
      path: '/private/complaints/:moduleId',
      name: 'complaint',
      component: ComplaintView,
    },
    {
      path: '/private/builder',
      name: 'workflow-builder',
      component: WorkflowBuilderView,
    },
  ],
})

export default router
