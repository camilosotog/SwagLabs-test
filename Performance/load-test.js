import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Métricas personalizadas
const errorRate = new Rate('errors');
const loginDuration = new Trend('login_duration');
const inventoryDuration = new Trend('inventory_duration');

// Configuración de la prueba de carga
export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Rampa de subida a 10 usuarios
    { duration: '1m', target: 10 },   // Mantener 10 usuarios por 1 minuto
    { duration: '30s', target: 20 },  // Rampa a 20 usuarios
    { duration: '1m', target: 20 },   // Mantener 20 usuarios por 1 minuto
    { duration: '30s', target: 0 },   // Rampa de bajada a 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% de las peticiones deben completarse en menos de 2s
    errors: ['rate<0.1'],              // Menos del 10% de errores
    login_duration: ['p(95)<1500'],    // Login debe completarse en menos de 1.5s
    inventory_duration: ['p(95)<1000'], // Inventario debe cargar en menos de 1s
  },
};

const BASE_URL = 'https://www.saucedemo.com';

// Usuarios de prueba disponibles en SauceDemo
const TEST_USERS = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' },
];

export default function () {
  // Seleccionar usuario aleatorio
  const user = TEST_USERS[Math.floor(Math.random() * TEST_USERS.length)];

  // 1. Cargar página de login
  let loginPageResponse = http.get(`${BASE_URL}/`);
  check(loginPageResponse, {
    'Página de login cargada correctamente': (r) => r.status === 200,
    'Página contiene formulario de login': (r) => r.body.includes('login-button'),
  });

  sleep(1);

  // 2. Realizar login
  let loginStart = Date.now();
  let loginResponse = http.post(
    `${BASE_URL}/`,
    {
      'user-name': user.username,
      'password': user.password,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  loginDuration.add(Date.now() - loginStart);

  let loginSuccess = check(loginResponse, {
    'Login exitoso': (r) => r.status === 200,
  });
  errorRate.add(!loginSuccess);

  sleep(1);

  // 3. Cargar página de inventario/productos
  let inventoryStart = Date.now();
  let inventoryResponse = http.get(`${BASE_URL}/inventory.html`);
  inventoryDuration.add(Date.now() - inventoryStart);

  let inventorySuccess = check(inventoryResponse, {
    'Inventario cargado correctamente': (r) => r.status === 200,
    'Inventario contiene productos': (r) => r.body.includes('inventory_item'),
  });
  errorRate.add(!inventorySuccess);

  sleep(2);

  // 4. Ver detalle de un producto
  let productResponse = http.get(`${BASE_URL}/inventory-item.html?id=4`);
  check(productResponse, {
    'Detalle de producto cargado': (r) => r.status === 200,
  });

  sleep(1);

  // 5. Agregar producto al carrito
  let cartResponse = http.get(`${BASE_URL}/cart.html`);
  check(cartResponse, {
    'Carrito cargado correctamente': (r) => r.status === 200,
  });

  sleep(1);
}

// Función de configuración inicial (opcional)
export function setup() {
  console.log('Iniciando prueba de carga para SwagLabs (SauceDemo)');
  console.log(`URL Base: ${BASE_URL}`);
  return { startTime: Date.now() };
}

// Función de limpieza final (opcional)
export function teardown(data) {
  const duration = (Date.now() - data.startTime) / 1000;
  console.log(`Prueba de carga completada en ${duration} segundos`);
}
