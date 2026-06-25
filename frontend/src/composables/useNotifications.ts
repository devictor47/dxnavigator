import { readonly, ref } from 'vue'

export type Notification = {
  id: number
  type: NotificationType
  title: string
  message: string
}

export type NotificationType = 'message' | 'warn' | 'error'

type NotifyInput = {
  type?: NotificationType
  title: string
  message: string
  durationMs?: number
}

const notifications = ref<Notification[]>([])
let nextNotificationId = 1

export const useNotifications = () => {
  const dismiss = (id: number): void => {
    notifications.value = notifications.value.filter((notification) => notification.id !== id)
  }

  const notify = ({ type = 'message', title, message, durationMs = 4200 }: NotifyInput): number => {
    const id = nextNotificationId
    nextNotificationId += 1

    notifications.value.unshift({
      id,
      type,
      title,
      message,
    })

    window.setTimeout(() => {
      dismiss(id)
    }, durationMs)

    return id
  }

  return {
    notifications: readonly(notifications),
    notify,
    dismiss,
  }
}
