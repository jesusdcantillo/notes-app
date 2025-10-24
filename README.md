# 📝 Gestor de Notas - NestJS

Un API RESTful para gestionar notas, construido con NestJS, Prisma y Supabase.

## ✨ Características

- ✅ Crear, leer, actualizar y eliminar notas
- ✅ Validación de datos integrada
- ✅ Base de datos PostgreSQL con Supabase
- ✅ ORM Prisma para manejo de base de datos
- ✅ TypeScript para tipado estático
- ✅ API RESTful completa

## 🛠️ Tecnologías

- **Framework:** NestJS
- **Base de datos:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Lenguaje:** TypeScript

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- npm o yarn
- Git
- Una cuenta en [Supabase](https://supabase.com/)

## 🚀 Instalación

Sigue estos pasos para configurar el proyecto localmente:

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/gestor-notas.git
cd gestor-notas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (notes-app\.env):

**Obtener la DATABASE_URL de Supabase:**

1. Ve a tu proyecto en [Supabase](https://app.supabase.com/)
2. Conectar > Connection String > Method: **Session Pooler**
3. Copia el contenido
4. Reemplaza `[password]` con tu contraseña de base de datos

**Ejemplpo**: ```postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-1-us-east-2.pooler.supabase com:5432/postgres```

**Tu archivo `.env` debe verse así:**

```DATABASE_URL="postgresql://postgres.[YOUR-PROJECT-REF]:[YOUR-PASSWORD]@aws-1-us-east-2.pooler.supabase com:5432/postgres"```


### 4. Configurar la base de datos

```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar las migraciones
npx prisma migrate --name init
```

### 5. Ejecutar el proyecto

**Modo desarrollo:**

```bash
npm run start:dev
```

**Modo producción:**

```bash
npm run build
npm run start:prod
```

El servidor estará disponible en: **http://localhost:3000**

## 📚 API Endpoints

### Notas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/notes` | Obtener todas las notas |
| GET | `/notes/:id` | Obtener una nota por ID |
| POST | `/notes` | Crear una nueva nota |
| PUT | `/notes/:id` | Actualizar una nota existente |
| DELETE | `/notes/:id` | Eliminar una nota |

### Ejemplos de uso

#### Crear una nota

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi primera nota",
    "description": "Esta es una descripción de ejemplo"
  }'
```

#### Obtener todas las notas

```bash
curl -X GET http://localhost:3000/notes
```

#### Obtener una nota específica

```bash
curl -X GET http://localhost:3000/notes/1
```

#### Actualizar una nota

```bash
curl -X PUT http://localhost:3000/notes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título actualizado",
    "description": "Descripción actualizada"
  }'
```

#### Eliminar una nota

```bash
curl -X DELETE http://localhost:3000/notes/1
```

## 🧪 Pruebas

### Probar con Thunder Client (VS Code)

1. Instala la extensión **Thunder Client** en VS Code
2. Abre Thunder Client desde la barra lateral
3. Crea las siguientes requests:

**GET All Notes**
```
Method: GET
URL: http://localhost:3000/notes
```

**CREATE Note**
```
Method: POST
URL: http://localhost:3000/notes
Body: {
  "title": "Nota de prueba",
  "description": "Descripción de prueba"
}
```

### Probar con Postman

Importa esta colección en Postman:

```json
{
  "info": {
    "name": "Gestor de Notas API",
    "description": "Colección para probar el API del Gestor de Notas"
  },
  "item": [
    {
      "name": "Listar notas",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/notes"
      }
    },
    {
      "name": "Crear nota",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/notes",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Mi nota\",\n  \"description\": \"Mi descripción\"\n}"
        }
      }
    }
  ]
}
```

## 🗄️ Estructura del Proyecto

```
prisma/
├── migrations/
├── schema.prisma
src/
├── notes/
│   ├── dto/
│   │   ├── create-note.dto.ts
│   │   └── update-note.dto.ts
│   ├── notes.controller.ts
│   ├── notes.module.ts
│   └── notes.service.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## 📊 Modelo de Datos

```prisma
model Note {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🐛 Solución de Problemas

### Error de conexión a la base de datos

- Verifica que dotenv esté instalado en `package.json` e importado en `prisma.config.ts` así: `import 'dotenv/config';`
- Verifica que la `DATABASE_URL` en `.env` sea correcta
- Asegúrate de que tu proyecto de Supabase esté activo
- Verifica que la IP esté en la allowlist de Supabase

### Error de migración

```bash
# Resetear la base de datos (cuidado: elimina todos los datos)
npx prisma migrate reset

# O forzar el push del esquema
npx prisma db push --force-reset
```

### Error de tipos TypeScript y/o ESLint

- Resetea el servidor de ESLint: En VSCODE presiona **F1** > Restart ESLint Server
- Formatea el código: En VSCODE presiona **F1** > Format Document o su atajo **`SHIFT` + `ALT` + `F`**

```bash
# Regenerar el cliente de Prisma
npx prisma generate

# Reinstalar dependencias
npm install
```

By: Jesús Cantillo.