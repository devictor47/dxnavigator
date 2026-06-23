<script setup lang="ts">
import {
  ClipboardList,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Stethoscope,
  User,
  Wrench,
} from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import AppPreferences from '@/components/AppPreferences.vue'
import ComplaintSelector from '@/components/ComplaintSelector.vue'
import { useI18n } from '@/composables/useI18n'
import { clinicalModules } from '@/data/modules'

const props = defineProps<{
  activeSection: 'workspace' | 'builder'
  selectedWorkflowId?: string
}>()

const { t } = useI18n()
const router = useRouter()
const isSidebarCollapsed = ref(false)
const isAccountMenuOpen = ref(false)
const accountElement = ref<HTMLElement | null>(null)
const currentUser = ref<{
  id: number
  name: string
  email: string
} | null>(null)

const workflowLinks = computed(() =>
  clinicalModules.map((module) => ({
    id: module.id,
    name: module.title,
    to: `/private/complaints/${module.id}`,
    icon: module.id,
  })),
)

const displayedUserName = computed(() => currentUser.value?.name || t('auth.account'))

const loadCurrentUser = async (): Promise<void> => {
  const response = await fetch('/api/auth/me', {
    credentials: 'include',
  })

  if (!response.ok) {
    currentUser.value = null
    return
  }

  currentUser.value = await response.json()
}

const logout = async (): Promise<void> => {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  }).catch(() => undefined)

  currentUser.value = null
  closeAccountMenu()
  await router.push('/auth/login')
}

const closeAccountMenu = (): void => {
  isAccountMenuOpen.value = false
}

const toggleAccountMenu = (): void => {
  isAccountMenuOpen.value = !isAccountMenuOpen.value
}

const handleDocumentClick = (event: MouseEvent): void => {
  if (!accountElement.value?.contains(event.target as Node)) {
    closeAccountMenu()
  }
}

const handleDocumentKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    closeAccountMenu()
  }
}

onMounted(() => {
  void loadCurrentUser()
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleDocumentKeydown)
})
</script>

<template>
  <main class="workspace-page" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <aside class="workspace-sidebar">
      <div class="sidebar-top">
        <RouterLink class="brand sidebar-brand" to="/" title="DxNavigator">
          <Stethoscope class="nav-icon" :size="22" aria-hidden="true" />
          <span class="brand-label">DxNavigator</span>
        </RouterLink>

        <button
          class="sidebar-collapse-button"
          type="button"
          :aria-label="isSidebarCollapsed ? t('sidebar.expand') : t('sidebar.collapse')"
          :title="isSidebarCollapsed ? t('sidebar.expand') : t('sidebar.collapse')"
          @click="isSidebarCollapsed = !isSidebarCollapsed"
        >
          <PanelLeftOpen v-if="isSidebarCollapsed" :size="18" aria-hidden="true" />
          <PanelLeftClose v-else :size="18" aria-hidden="true" />
        </button>
      </div>

      <div class="sidebar-scroll">
        <nav class="app-section-nav" aria-label="Application sections">
          <RouterLink
            class="complaint-option"
            :class="{ selected: activeSection === 'workspace' }"
            to="/private/complaints/chest-pain"
            :title="t('builder.nav.workspace')"
          >
            <ClipboardList class="nav-icon" :size="18" aria-hidden="true" />
            <span class="nav-label">{{ t('builder.nav.workspace') }}</span>
          </RouterLink>
          <RouterLink
            class="complaint-option"
            :class="{ selected: activeSection === 'builder' }"
            to="/private/builder"
            :title="t('builder.nav.builder')"
          >
            <Wrench class="nav-icon" :size="18" aria-hidden="true" />
            <span class="nav-label">{{ t('builder.nav.builder') }}</span>
          </RouterLink>
        </nav>

        <ComplaintSelector
          :complaints="workflowLinks"
          :selected-complaint-id="selectedWorkflowId ?? ''"
          :compact="isSidebarCollapsed"
        />
      </div>

      <div
        ref="accountElement"
        class="sidebar-account"
        :class="{ open: isAccountMenuOpen }"
      >
        <button
          class="user-summary"
          type="button"
          :title="displayedUserName"
          :aria-expanded="isAccountMenuOpen"
          @click="toggleAccountMenu"
        >
          <User class="nav-icon" :size="18" aria-hidden="true" />
          <div class="user-copy">
            <strong>{{ displayedUserName }}</strong>
          </div>
        </button>

        <div class="account-menu">
          <AppPreferences />
          <button class="account-menu-action" type="button" @click="logout">
            <LogOut :size="18" aria-hidden="true" />
            <span>{{ t('auth.logout') }}</span>
          </button>
        </div>
      </div>
    </aside>

    <slot />
  </main>
</template>
