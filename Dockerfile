# Options 3: fomeda-web (Final year project repository)
# Authored by Cheong Jin Xuan
# Github link: https://github.com/MoneyCheongJx/forked-fyp-fomeda-web.git

FROM node:18-alpine
LABEL authors="Cheong Jin Xuan"
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]