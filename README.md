# Taller: Conectar MongoDB con Node y probar en Postman

API REST que demuestra los 3 roles del taller:

- **Node (Express)** → crea los _endpoints_ (las URLs de la API).
- **MongoDB (Mongoose)** → almacena los datos.
- **Postman** → cliente para interactuar con los endpoints.

## Arquitectura (cómo se conecta todo)

```
Postman  ──HTTP──>  Node/Express  ──Mongoose──>  MongoDB
(cliente)          (endpoints/API)              (almacenamiento)
```

## Estructura del proyecto

```
mongo/
├── config/db.js                  -> conexión Node <-> MongoDB
├── models/Estudiante.js          -> esquema/estructura de los datos
├── controllers/estudianteController.js -> lógica de cada endpoint (CRUD)
├── routes/estudianteRoutes.js    -> define las URLs
├── server.js                     -> arranca el servidor Express
├── .env                          -> configuración (URI de Mongo y puerto)
└── postman_collection.json       -> colección lista para importar en Postman
```

## 1. Instalar y arrancar

```bash
npm install
npm run dev      # se reinicia solo al guardar cambios (o usa: npm start)
```

Si todo va bien verás:

```
🚀 Servidor corriendo en http://localhost:3000
✅ Conectado a MongoDB correctamente
```

> La base se llama `taller` (definida en `.env`). Aparecerá en Compass
> automáticamente cuando crees el primer estudiante.

## 2. Endpoints disponibles

| Método | URL                          | Acción              |
| ------ | ---------------------------- | ------------------- |
| GET    | `/`                          | Verifica que vive   |
| POST   | `/api/estudiantes`           | Crear estudiante    |
| GET    | `/api/estudiantes`           | Listar todos        |
| GET    | `/api/estudiantes/:id`       | Obtener uno por ID  |
| PUT    | `/api/estudiantes/:id`       | Actualizar por ID   |
| DELETE | `/api/estudiantes/:id`       | Eliminar por ID     |

## 3. Probar en Postman (paso a paso)

### Opción A — Importar la colección (rápido)

1. Abre Postman → botón **Import** (arriba a la izquierda).
2. Arrastra el archivo `postman_collection.json`.
3. Te aparecen las 5 peticiones listas para usar.

### Opción B — Crear las peticiones a mano (para explicar en el taller)

**Crear (POST):**

1. Nueva request → método **POST**.
2. URL: `http://localhost:3000/api/estudiantes`
3. Pestaña **Body** → selecciona **raw** → tipo **JSON**.
4. Pega esto y dale **Send**:

```json
{
  "nombre": "Ana Perez",
  "correo": "ana@uni.edu",
  "edad": 20,
  "carrera": "Sistemas"
}
```

5. Copia el `_id` que devuelve la respuesta (lo necesitas para GET/PUT/DELETE).

**Listar (GET):** método GET a `http://localhost:3000/api/estudiantes`

**Obtener uno (GET):** `http://localhost:3000/api/estudiantes/EL_ID`

**Actualizar (PUT):** `http://localhost:3000/api/estudiantes/EL_ID` con Body raw JSON:

```json
{ "edad": 21, "carrera": "Software" }
```

**Eliminar (DELETE):** `http://localhost:3000/api/estudiantes/EL_ID`

## 4. Verificar en MongoDB Compass

Después de crear estudiantes, refresca Compass: verás la base **taller** con la
colección **estudiantes** y los documentos que insertaste desde Postman.

## Puntos clave para explicar en el taller

- `express.json()` permite que Node lea el JSON que envía Postman en el _body_.
- Mongoose conecta con la URI `mongodb://localhost:27017/taller`, la misma que usa Compass.
- El **modelo** (`Estudiante`) valida los datos antes de guardarlos (campos obligatorios, correo único, etc.).
- Cada endpoint responde con códigos HTTP: `201` creado, `200` ok, `404` no encontrado, `400` error de datos.