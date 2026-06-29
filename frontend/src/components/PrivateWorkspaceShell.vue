<script setup lang="ts">
import {
  Calculator,
  ClipboardList,
  Library,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Stethoscope,
  Store,
  User,
  Wrench,
} from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import AppPreferences from '@/components/AppPreferences.vue'
import ComplaintSelector from '@/components/ComplaintSelector.vue'
import {
  calculatorCategoryLabels,
  getCalculatorsByCategory,
} from '@/calculators/calculatorRegistry'
import type { CalculatorCategory } from '@/calculators/types'
import {
  fetchUserWorkflows,
  reorderUserWorkflows,
  type UserWorkflowSummary,
} from '@/api/userWorkflows'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{
  activeSection: 'workspace' | 'builder' | 'marketplace' | 'manage' | 'calculators'
  selectedWorkflowId?: string
  selectedCalculatorId?: string
}>()

const { locale, t } = useI18n()
const router = useRouter()
const route = useRoute()
const isSidebarCollapsed = ref(
  typeof window !== 'undefined' ? window.matchMedia('(max-width: 860px)').matches : false,
)
const isAccountMenuOpen = ref(false)
const accountElement = ref<HTMLElement | null>(null)
const userWorkflows = ref<UserWorkflowSummary[]>([])
const calculatorSearchTerm = ref('')
const currentUser = ref<{
  id: number
  name: string
  email: string
} | null>(null)

const workflowLinks = computed(() =>
  userWorkflows.value.map((workflow) => ({
    id: String(workflow.id),
    name: workflow.title,
    to: `/private/complaints/${workflow.id}`,
    icon: workflow.slug,
  })),
)

const calculatorGroups = computed(() => {
  const query = calculatorSearchTerm.value.trim().toLowerCase()
  const groups = getCalculatorsByCategory(locale.value)

  return Object.entries(groups)
    .map(([category, calculators]) => ({
      category,
      label: calculatorCategoryLabels[locale.value][category as CalculatorCategory],
      calculators: calculators.filter((calculator) => {
        if (!query) {
          return true
        }

        return [calculator.title, calculator.description]
          .join(' ')
          .toLowerCase()
          .includes(query)
      }),
    }))
    .filter((group) => group.calculators.length > 0)
})

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

const loadUserWorkflows = async (): Promise<void> => {
  userWorkflows.value = await fetchUserWorkflows().catch(() => [])
}

const reorderWorkflows = async (workflowIds: string[]): Promise<void> => {
  const previousWorkflows = [...userWorkflows.value]
  const workflowById = new Map(userWorkflows.value.map((workflow) => [String(workflow.id), workflow]))
  const nextWorkflows = workflowIds
    .map((workflowId) => workflowById.get(workflowId))
    .filter((workflow): workflow is UserWorkflowSummary => Boolean(workflow))

  if (nextWorkflows.length !== userWorkflows.value.length) {
    return
  }

  userWorkflows.value = nextWorkflows

  try {
    await reorderUserWorkflows(workflowIds.map(Number))
  } catch {
    userWorkflows.value = previousWorkflows
  }
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

const closeSidebarOnMobile = (): void => {
  if (typeof window === 'undefined') {
    return
  }

  if (window.matchMedia('(max-width: 860px)').matches) {
    isSidebarCollapsed.value = true
  }
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
  void loadUserWorkflows()
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleDocumentKeydown)
})

watch(
  () => route.fullPath,
  () => {
    void loadUserWorkflows()
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleDocumentKeydown)
})
</script>

<template>
  <main class="workspace-page" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
    <button
      class="mobile-sidebar-toggle"
      type="button"
      :aria-label="t('sidebar.expand')"
      :title="t('sidebar.expand')"
      @click="isSidebarCollapsed = false"
    >
      <Menu :size="20" aria-hidden="true" />
    </button>

    <button
      v-if="!isSidebarCollapsed"
      class="mobile-sidebar-backdrop"
      type="button"
      :aria-label="t('sidebar.collapse')"
      @click="isSidebarCollapsed = true"
    />

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

      <div class="sidebar-scroll" @click="closeSidebarOnMobile">
        <nav class="app-section-nav" aria-label="Application sections">
          <RouterLink
            class="complaint-option"
            :class="{ selected: activeSection === 'workspace' }"
            to="/private/complaints"
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
          <RouterLink
            class="complaint-option"
            :class="{ selected: activeSection === 'calculators' }"
            to="/private/calculators"
            :title="t('calculators.nav')"
          >
            <Calculator class="nav-icon" :size="18" aria-hidden="true" />
            <span class="nav-label">{{ t('calculators.nav') }}</span>
          </RouterLink>
          <RouterLink
            class="complaint-option"
            :class="{ selected: activeSection === 'marketplace' }"
            to="/private/marketplace"
            :title="t('marketplace.nav')"
          >
            <Store class="nav-icon" :size="18" aria-hidden="true" />
            <span class="nav-label">{{ t('marketplace.nav') }}</span>
          </RouterLink>
          <RouterLink
            class="complaint-option"
            :class="{ selected: activeSection === 'manage' }"
            to="/private/workflows"
            :title="t('manage.nav')"
          >
            <Library class="nav-icon" :size="18" aria-hidden="true" />
            <span class="nav-label">{{ t('manage.nav') }}</span>
          </RouterLink>
        </nav>

        <ComplaintSelector
          v-if="activeSection !== 'calculators'"
          :complaints="workflowLinks"
          :selected-complaint-id="selectedWorkflowId ?? ''"
          :compact="isSidebarCollapsed"
          reorderable
          @reorder="reorderWorkflows"
        />

        <section
          v-else
          class="calculator-sidebar-list"
          :class="{ compact: isSidebarCollapsed }"
          aria-labelledby="calculator-sidebar-title"
        >
          <div class="sidebar-section-heading">
            <p class="eyebrow">{{ t('calculators.eyebrow') }}</p>
            <h2 id="calculator-sidebar-title">{{ t('calculators.title') }}</h2>
          </div>

          <label class="sidebar-search-field">
            <span>{{ t('calculators.searchLabel') }}</span>
            <input
              v-model="calculatorSearchTerm"
              class="text-input"
              type="search"
              :placeholder="t('calculators.searchPlaceholder')"
            />
          </label>

          <details
            v-for="group in calculatorGroups"
            :key="group.category"
            class="sidebar-accordion"
            open
          >
            <summary>{{ group.label }}</summary>
            <RouterLink
              v-for="calculatorItem in group.calculators"
              :key="calculatorItem.id"
              class="complaint-option"
              :class="{ selected: calculatorItem.id === selectedCalculatorId }"
              :to="`/private/calculators/${calculatorItem.id}`"
              :title="calculatorItem.title"
            >
              <Calculator class="nav-icon" :size="18" aria-hidden="true" />
              <span class="nav-label">{{ calculatorItem.title }}</span>
            </RouterLink>
          </details>
        </section>
      </div>

      <div ref="accountElement" class="sidebar-account" :class="{ open: isAccountMenuOpen }">
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
