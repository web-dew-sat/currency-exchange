# Frontend

React + TypeScript + Vite. Команды выполняются из корня репозитория.

```sh
npm run dev:backend
npm run dev --workspace=frontend
```

Backend запускается в отдельном терминале на порту `3000` (`SERVER_PORT` в `backend/.env`). Vite перенаправляет запросы `/api/*` на `http://localhost:3000`, сохраняя путь и параметры. Например, `fetch('/api/currencies')` обращается к backend через dev server.

Алиас `@` указывает на `frontend/src` и настроен в Vite и TypeScript приложения:

```ts
import App from '@/app/App.tsx'
```

```sh
npm run build --workspace=frontend
npm run lint --workspace=frontend
```

Proxy действует при разработке. Для production маршрут `/api` настраивается на сервере или хостинге.
