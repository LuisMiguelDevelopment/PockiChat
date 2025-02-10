# Prueba Técnica para Fullstack Developer (Node.js)

## 📌 Descripción

Este proyecto consiste en el desarrollo de una aplicación web de chat interactivo con una IA. La aplicación permite a los usuarios enviar mensajes y recibir respuestas generadas por un modelo de lenguaje.

## 🚀 Tecnologías Utilizadas

### **Backend:**

- Node.js
- Express.js
- MySQL
- Axios
- cors
- mysql2
- swagger-jsdoc
- swagger-ui-express
- dotenv

### **Frontend:**

- React
- Vite
- Chakra UI
- Axios
- react-icons

### **Otros:**

- Railway (Despliegue Backend)
- Vercel (Despliegue Frontend)


### **PROYECTO DESPLEGADO**

- https://pocki-chat.vercel.app/

### **DOCUMENTACION CON SWAGGER**

- https://pockichat-production.up.railway.app/api-docs/

---

## 📂 Estructura del Proyecto

```
📦 Proyecto
├── 📁 backend
│   ├── 📁 src
│   │   ├── 📁 config
│   │   ├── 📁 controllers
│   │   ├── 📁 routes
│   │   ├── 📁 db
│   │   ├── 📁 interface
│   │   ├── 📁 middleware
│   │   ├── 📁 routes
│   │   ├── 📁 services
│   │   ├── 📁 types
│   │   ├── app.ts
│   │   ├── index.ts
│   ├── package.json
│   ├── .gitignore
│   ├── tsconfig.json
│   ├── README.md
│
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 api
│   │   ├── 📁 components
│   │   ├── 📁 context
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── README.md
│
├── README.md
```

---

## 📦 Instalación y Configuración

### **Requisitos Previos:**

- Node.js v18+
- MySQL(archivo backend/src/db/db.sql)
- Git

### **Backend**

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/LuisMiguelDevelopment/PockiChat.git
   cd backend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno `.env`:
   ```env
   PORT =3000
   FRONTEND_URL = http://localhost:5173
   BACKEND_URL = http://localhost:3000
   DB_USER = root
   DB_PASSWORD = 1234
   DB_HOST = localhost
   DB_DATABASE = POCKICHAT
   DB_PORT = 3306
   ```
4. Crear la base de datos .
5. Iniciar el servidor:
   ```bash
   npm run dev && npm run tsc
   ```

### **Frontend**

1. Ir a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno `.env.local`:
   ```env
   VITE_BACKEND_URL="http://localhost:3000"
   ```
4. Iniciar la aplicación:
   ```bash
   npm run dev
   ```

---

## 📡 Endpoints del API

**RUTA API**
`http://localhost:3000/api/messages`

### **Obtener historial de mensajes**

- **URL:** `GET /messages`
- **Descripción:** Obtiene todos los mensajes registrados en la base de datos.
- **Ejemplo de Respuesta:**
  ```json
  [
    {
      "sender": "bot",
      "content": "¡Hola! Soy Pocki, tu asistente virtual. ¿En qué puedo ayudarte hoy?"
    },
    {
      "sender": "user",
      "content": "Dime un pais"
    },
    {
      "sender": "bot",
      "content": "¡Hola, Pocki! Estoy aquí para ayudarte. Si quieres, puedo hablarte sobre un país en particular. ¿Tienes alguno en mente?"
    }
  ]
  ```

### **Enviar mensaje y obtener respuesta de IA**

- **URL:** `POST /messages`
- **Body:**
  ```json
  { "input": "Hola, ¿cómo estás?" }
  ```
- **Ejemplo de Respuesta:**
  ```json
  {
    "user_message": "Dime otro",
    "bot_response": "¡Claro! Hablemos de otro país europeo. ¿Te gustaría saber sobre la cultura de Grecia, Alemania, o quizás de los Países Bajos? ¡Dime cuál te interesa y exploramos juntos!"
  }
  ```


  ### **Elimina la conversacion previa y genera una nueva**

- **URL:** `POST /reset-chat`
- **Ejemplo de Respuesta:**
  ```json
    status(200)
  ```

---

## 📌 Despliegue

- **Backend:** [Railway Link](https://railway.com/)
- **Frontend:** [Vercel Link](https://vercel.com/)

---

## 🫡 Novedades

Como frontend, utilicé el empaquetador Vite con React.js. Le di acceso a la IA para recuperar la información previa de la conversación y así no perder el flujo del chat. Sin embargo, al recargar para un chat nuevo (Boton parte superior del Chat-bot), esa información se perderá y será necesario generar una nueva.

## 📞 Contacto

Si tienes dudas, puedes escribirme a mi correo: [luismidev09@gmail.com](mailto:luismidev09@gmail.com).
