export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export const scheduleReminder = (routineName, timeString) => {
  if (Notification.permission !== 'granted') {
    return
  }

  const [hours, minutes] = timeString.split(':').map(Number)
  const now = new Date()
  const reminderTime = new Date()
  reminderTime.setHours(hours, minutes, 0, 0)

  if (reminderTime <= now) {
    reminderTime.setDate(reminderTime.getDate() + 1)
  }

  const timeUntilReminder = reminderTime - now

  setTimeout(() => {
    new Notification(`Routine Reminder: ${routineName}`, {
      body: `It's time to do your routine: ${routineName}`,
      icon: '🔔',
      tag: `routine-${routineName}`,
      requireInteraction: true
    })

    scheduleReminder(routineName, timeString)
  }, timeUntilReminder)
}

export const sendNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    return new Notification(title, {
      icon: '✓',
      ...options
    })
  }
}
