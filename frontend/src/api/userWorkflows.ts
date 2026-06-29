import type { ClinicalWorkflow } from '@/data/workflow'
import type { ModuleAnswers } from '@/data/workflow'

export type UserWorkflowSummary = {
  id: number
  title: string
  description?: string
  slug: string
  language: string
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export type PublishedWorkflow = {
  id: number
  publicId: string
  title: string
  description?: string
  slug: string
  language: string
  isAuthorPublic: boolean
  authorName?: string
  installCount: number
  createdAt: string
  updatedAt: string
}

export type UserWorkflowDetail = UserWorkflowSummary & {
  publishedWorkflow?: PublishedWorkflow | null
  definition: ClinicalWorkflow
}

export type ManagedUserWorkflow = UserWorkflowSummary & {
  isInstalledFromMarketplace: boolean
  publishedWorkflow?: PublishedWorkflow | null
}

export type UserWorkflowPreset = {
  id: number
  userWorkflowId: number
  title: string
  description?: string
  answers: ModuleAnswers
  displayOrder: number
  createdAt: string
  updatedAt: string
}

type SaveUserWorkflowInput = {
  title: string
  description?: string
  slug: string
  language: string
  definition: ClinicalWorkflow
}

type SaveUserWorkflowPresetInput = {
  title: string
  description?: string
  answers: ModuleAnswers
}

export const fetchUserWorkflows = async (): Promise<UserWorkflowSummary[]> => {
  const response = await fetch('/api/user-workflows', {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not load workflows. Status: ${response.status}.`)
  }

  return response.json()
}

export const fetchUserWorkflow = async (id: number): Promise<UserWorkflowDetail> => {
  const response = await fetch(`/api/user-workflows/${id}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not load workflow. Status: ${response.status}.`)
  }

  return response.json()
}

export const fetchManagedUserWorkflows = async (): Promise<ManagedUserWorkflow[]> => {
  const response = await fetch('/api/user-workflows/manage', {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not load managed workflows. Status: ${response.status}.`)
  }

  return response.json()
}

export const saveUserWorkflow = async (
  workflow: SaveUserWorkflowInput,
  workflowId?: number | null,
): Promise<UserWorkflowSummary> => {
  const response = await fetch(
    workflowId ? `/api/user-workflows/${workflowId}` : '/api/user-workflows',
    {
      method: workflowId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(workflow),
    },
  )

  if (!response.ok) {
    throw new Error(`Could not save workflow. Status: ${response.status}.`)
  }

  return response.json()
}

export const publishUserWorkflow = async (
  workflowId: number,
  isAuthorPublic: boolean,
): Promise<PublishedWorkflow> => {
  const response = await fetch(`/api/user-workflows/${workflowId}/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      isAuthorPublic,
    }),
  })

  if (!response.ok) {
    throw new Error(`Could not publish workflow. Status: ${response.status}.`)
  }

  return response.json()
}

export const updatePublishedWorkflow = async (
  workflowId: number,
): Promise<PublishedWorkflow> => {
  const response = await fetch(`/api/user-workflows/${workflowId}/published`, {
    method: 'PUT',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not update published workflow. Status: ${response.status}.`)
  }

  return response.json()
}

export const unpublishUserWorkflow = async (workflowId: number): Promise<void> => {
  const response = await fetch(`/api/user-workflows/${workflowId}/published`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not unpublish workflow. Status: ${response.status}.`)
  }
}

export const deleteUserWorkflow = async (workflowId: number): Promise<void> => {
  const response = await fetch(`/api/user-workflows/${workflowId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not delete workflow. Status: ${response.status}.`)
  }
}

export const reorderUserWorkflows = async (workflowIds: number[]): Promise<void> => {
  const response = await fetch('/api/user-workflows/order', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      workflowIds,
    }),
  })

  if (!response.ok) {
    throw new Error(`Could not reorder workflows. Status: ${response.status}.`)
  }
}

export const fetchUserWorkflowPresets = async (
  workflowId: number,
): Promise<UserWorkflowPreset[]> => {
  const response = await fetch(`/api/user-workflows/${workflowId}/presets`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not load workflow presets. Status: ${response.status}.`)
  }

  return response.json()
}

export const saveUserWorkflowPreset = async (
  workflowId: number,
  preset: SaveUserWorkflowPresetInput,
  presetId?: number | null,
): Promise<UserWorkflowPreset> => {
  const response = await fetch(
    presetId
      ? `/api/user-workflows/${workflowId}/presets/${presetId}`
      : `/api/user-workflows/${workflowId}/presets`,
    {
      method: presetId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(preset),
    },
  )

  if (!response.ok) {
    throw new Error(`Could not save workflow preset. Status: ${response.status}.`)
  }

  return response.json()
}

export const deleteUserWorkflowPreset = async (
  workflowId: number,
  presetId: number,
): Promise<void> => {
  const response = await fetch(`/api/user-workflows/${workflowId}/presets/${presetId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not delete workflow preset. Status: ${response.status}.`)
  }
}

export const reorderUserWorkflowPresets = async (
  workflowId: number,
  presetIds: number[],
): Promise<void> => {
  const response = await fetch(`/api/user-workflows/${workflowId}/presets/order`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      presetIds,
    }),
  })

  if (!response.ok) {
    throw new Error(`Could not reorder workflow presets. Status: ${response.status}.`)
  }
}

export const fetchMarketplaceWorkflows = async (): Promise<PublishedWorkflow[]> => {
  const response = await fetch('/api/marketplace/workflows', {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not load marketplace workflows. Status: ${response.status}.`)
  }

  return response.json()
}

export const installMarketplaceWorkflow = async (
  publicId: string,
): Promise<UserWorkflowSummary> => {
  const response = await fetch(`/api/marketplace/workflows/${publicId}/install`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(`Could not install workflow. Status: ${response.status}.`)
  }

  return response.json()
}
