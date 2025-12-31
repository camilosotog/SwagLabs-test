# 🏢 Prueba Técnica Real – Versión 2

## Información General

- **Empresa**: NovaMarket
- **Producto**: Plataforma e-commerce B2C
- **Rol**: QA Engineer / QA Técnico
- **Contexto**: Release próximo, alto tráfico esperado

## 🌐 Aplicación de Pruebas

Usaremos una app pública, realista y muy usada en entrevistas técnicas:

**[Sauce Demo](https://www.saucedemo.com/)**

### Credenciales

- **Usuario válido**: `standard_user`
- **Password**: `secret_sauce`

> ⚠️ Nota: Hay usuarios bloqueados y lentos… ¡pista! 😉

## 🧩 Contexto de Negocio

NovaMarket vende productos online. Los flujos críticos son:

- Login
- Listado de productos
- Agregar productos al carrito
- Checkout
- Confirmación de compra

> Un fallo aquí = clientes perdidos + memes en Twitter.

## 🧪 Parte 1 – Automatización E2E (Playwright)

### 🎯 Objetivo

Automatizar el flujo de compra mínimo viable, como lo haría un cliente real.

### 📌 Requerimiento

Automatiza el siguiente escenario:

#### Escenario: Compra exitosa

1. Ingresar a la web
2. Iniciar sesión con `standard_user`
3. Validar que se muestre el listado de productos
4. Agregar 2 productos al carrito
5. Ir al carrito y validar productos agregados
6. Iniciar checkout
7. Completar información (First Name, Last Name, Zip Code)
8. Finalizar compra
9. Validar mensaje de confirmación

### 📦 Entregable

Respóndeme:

- Qué validarías en cada paso (asserts clave)
- Qué selectores priorizarías y por qué
- Qué harías para que el test sea estable
- Qué dejarías fuera del alcance inicial

## 🚀 Parte 2 – Pruebas de Rendimiento (k6)

### 🎯 Objetivo

Validar rendimiento y estabilidad de los endpoints más críticos de un e-commerce.

### 🔗 Endpoints a Probar

#### 1. Listado de Productos
```http
GET /products
```

#### 2. Detalle de Producto
```http
GET /products/{id}
```

#### 3. Creación de Carrito
```http
POST /carts
```

#### 4. Login
```http
POST /auth/login
```

### 🧪 Escenario de Carga (k6)

- **100 usuarios concurrentes**
- **Ramp-up progresivo** (incremental)
- **Duración: 5 minutos**

#### Distribución de Endpoints

| Endpoint | Porcentaje | Usuarios |
|----------|-----------|----------|
| Listado | 50% | 50 |
| Detalle | 20% | 20 |
| Login | 20% | 20 |
| Creación de carrito | 10% | 10 |

### 📊 Métricas Esperadas

| Métrica | Objetivo |
|---------|----------|
| **p95** | < 2.5s |
| **Error rate** | < 1% |
| **Errores 5xx** | 0 |
| **Throughput** | Estable |

### 📦 TU ENTREGABLE (Modo Real)

#### 1️⃣ ¿Qué endpoints probarías primero y por qué?

*Priorización de negocio*

**Respuesta esperada:**
- Orden de criticidad basada en impacto
- Justificación clara por cada endpoint
- Análisis de impacto en usuario y negocio

#### 2️⃣ ¿Qué métricas usarías como stopper para no salir a producción?

**Respuesta esperada:**
- Criterios de bloqueo automático
- Umbrales definidos por endpoint
- Diferencia entre "caution zone" y "green light"

#### 3️⃣ Si el login responde:

```
p95 = 4s
error rate = 3%
```

**👉 ¿Qué haces como QA?**

- ¿Bloqueas release?
- ¿Escalas a infraestructura?
- ¿Aceptas riesgo calculado?

**Respuesta esperada:**
- Análisis de impacto
- Decisión justificada
- Plan de acción

#### 4️⃣ ¿Qué NO probarías con k6 en este escenario y por qué?

**Respuesta esperada:**
- Herramientas alternativas
- Limitaciones de k6
- Cuándo usar cada herramienta

## 🔐 Parte 3 – Pruebas Negativas y de Seguridad

### 🎯 Objetivo

Pensar como atacante y como usuario torpe (el combo ganador).

### 📦 Entregable

Respóndeme:

- 3 pruebas negativas clave
- 2 pruebas de permisos o sesión
- 1 riesgo de seguridad que no probarías ahora y por qué

## ⏱️ Parte 4 – Producción Inminente

### 📌 Escenario

Quedan 90 minutos para liberar.

### 📦 Entregable

Respóndeme:

- Qué pruebas ejecutas sí o sí
- Qué pruebas automatizadas corres
- Qué riesgo aceptas conscientemente

## 🧠 Cómo te Evalúo (Modo Reclutador Honesto)

- ✔ Criterio
- ✔ Prioridad
- ✔ Conocimiento real (no copy-paste)
- ✔ Mentalidad QA moderna
- ✔ Comunicación clara