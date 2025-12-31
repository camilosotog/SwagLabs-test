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

Validar si el sistema soporta carga en login y navegación.

### 📌 Requerimiento

Diseña una prueba de carga para:

- Login
- Listado de productos

### 🧪 Condiciones

- 100 usuarios concurrentes
- Ramp-up gradual
- Duración total: 5 minutos

### 📦 Entregable

Explícame:

- Qué requests atacarías
- Qué métricas observarías (p95, errores, throughput, etc.)
- Criterios de aceptación
- Qué decisión tomarías si:
  - p95 > 3s
  - error rate > 2%

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