import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import LandingView from '@/views/public/LandingView.vue'
import LoginView from '@/views/public/LoginView.vue'
import RegisterView from '@/views/public/RegisterView.vue'
import ComplaintView from '@/views/private/ComplaintView.vue'
import WorkflowMarketplaceView from '@/views/private/WorkflowMarketplaceView.vue'
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
      path: '/auth/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/auth/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/private',
      redirect: '/private/complaints',
    },
    {
      path: '/private/complaints/:moduleId?',
      name: 'complaint',
      component: ComplaintView,
    },
    {
      path: '/private/builder',
      name: 'workflow-builder',
      component: WorkflowBuilderView,
    },
    {
      path: '/private/builder/:moduleId',
      name: 'workflow-builder-edit',
      component: WorkflowBuilderView,
    },
    {
      path: '/private/marketplace',
      name: 'workflow-marketplace',
      component: WorkflowMarketplaceView,
    },
  ],
})

const isAuthenticated = async (): Promise<boolean> => {
  const response = await fetch('/api/auth/me', {
    credentials: 'include',
  }).catch(() => null)

  return response?.ok === true
}

const requiresAuthentication = (to: RouteLocationNormalized): boolean => {
  return to.path.startsWith('/private')
}

router.beforeEach(async (to: RouteLocationNormalized) => {
  if (!requiresAuthentication(to)) {
    return true
  }

  if (await isAuthenticated()) {
    return true
  }

  return {
    name: 'login',
    query: {
      redirect: to.fullPath,
    },
  }
})

export default router
