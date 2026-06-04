# Routine Tracker

A modern web application for tracking daily routines, setting reminders, and managing tasks built with Vue.js.

## Features

- ✅ Create and manage daily routines
- ✅ Add tasks and subtasks
- ✅ Set reminders with browser notifications
- ✅ Track routine completion
- ✅ Persistent storage (localStorage)
- ✅ Responsive design

## Tech Stack

- **Frontend**: Vue.js 3
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage
- **Notifications**: Browser Notification API

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mel3ol/routine-tracker.git
cd routine-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

1. **Create a Routine**: Click "New Routine" and enter routine details
2. **Add Tasks**: Add specific tasks to your routine
3. **Set Reminders**: Choose when you want to be reminded
4. **Track Progress**: Mark tasks as complete
5. **View History**: See your routine completion history

## Project Structure

```
routine-tracker/
├── src/
│   ├── components/
│   │   ├── RoutineForm.vue
│   │   ├── RoutineCard.vue
│   │   ├── TaskList.vue
│   │   └── ReminderSettings.vue
│   ├── stores/
│   │   └── routineStore.js
│   ├── utils/
│   │   └── notifications.js
│   ├── App.vue
│   └── main.js
├── public/
├── package.json
├── vite.config.js
└── index.html
```

## License

MIT
