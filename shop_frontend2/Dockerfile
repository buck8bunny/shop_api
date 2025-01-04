# Используем официальную Node.js версию
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем все остальные файлы проекта
COPY . .

# Строим фронтенд
RUN npm run build

# Запускаем приложение на продакшен-сервере
CMD ["npm", "start"]
