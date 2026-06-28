<script setup lang="ts">
import { Activity, Brain, ClipboardList, Droplets, HeartPulse, Thermometer } from '@lucide/vue'
import type { Component } from 'vue'

import { useI18n } from '@/composables/useI18n'

type ComplaintOption = {
  id: string
  name: string
  to: string
  icon?: string
}

defineProps<{
  complaints: ComplaintOption[]
  selectedComplaintId: string
  compact?: boolean
  reorderable?: boolean
}>()

const emit = defineEmits<{
  reorder: [complaintIds: string[]]
}>()

const { t } = useI18n()

const workflowIcons: Record<string, Component> = {
  'chest-pain': HeartPulse,
  uti: Droplets,
  gastroenterocolitis: Activity,
  migraine: Brain,
  'sindrome-gripal': Thermometer,
}

const getWorkflowIcon = (complaint: ComplaintOption): Component => {
  return workflowIcons[complaint.icon ?? complaint.id] ?? ClipboardList
}

const reorderComplaint = (
  complaints: ComplaintOption[],
  draggedId: string,
  targetId: string,
): void => {
  if (draggedId === targetId) {
    return
  }

  const nextComplaints = [...complaints]
  const draggedIndex = nextComplaints.findIndex((complaint) => complaint.id === draggedId)
  const targetIndex = nextComplaints.findIndex((complaint) => complaint.id === targetId)

  if (draggedIndex < 0 || targetIndex < 0) {
    return
  }

  const [draggedComplaint] = nextComplaints.splice(draggedIndex, 1)

  if (!draggedComplaint) {
    return
  }

  nextComplaints.splice(targetIndex, 0, draggedComplaint)
  emit('reorder', nextComplaints.map((complaint) => complaint.id))
}
</script>

<template>
  <section
    class="complaint-selector"
    :class="{ compact }"
    aria-labelledby="complaint-selector-title"
  >
    <div class="sidebar-section-heading">
      <p class="eyebrow">{{ t('selector.eyebrow') }}</p>
      <h2 id="complaint-selector-title">{{ t('selector.title') }}</h2>
    </div>

    <div class="complaint-options" role="list">
      <RouterLink
        v-for="complaint in complaints"
        :key="complaint.id"
        class="complaint-option"
        :class="{ selected: complaint.id === selectedComplaintId, reorderable }"
        :to="complaint.to"
        :title="complaint.name"
        :draggable="reorderable"
        @dragstart="$event.dataTransfer?.setData('text/plain', complaint.id)"
        @dragover.prevent
        @drop.prevent="
          reorderable &&
            reorderComplaint(complaints, $event.dataTransfer?.getData('text/plain') ?? '', complaint.id)
        "
      >
        <component
          :is="getWorkflowIcon(complaint)"
          class="nav-icon"
          :size="18"
          aria-hidden="true"
        />
        <span class="nav-label">{{ complaint.name }}</span>
      </RouterLink>
    </div>
  </section>
</template>
