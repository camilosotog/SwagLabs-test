import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '4s', target: 10 },
    { duration: '1s', target: 2 },
  ],
  thresholds: {
    /*http_req_duration: ['p(95) < 110'], // El 95% de las solicitudes deben completarse en menos de 110 ms
    http_req_duration: ['min < 50'],    // El tiempo mínimo de solicitud debe ser menor a 50 ms
    http_req_duration: ['max < 200'],   // El tiempo máximo de solicitud debe ser menor a 200 ms
    http_req_duration: ['med < 100'],   // El tiempo mediano de solicitud debe ser menor a 100 ms*/
    http_req_duration: ['p(90) < 100', 'p(95) < 130', 'p(99) < 150', 'min < 50', 'med < 100', 'max < 200'], // Múltiples percentiles para el tiempo de solicitud
    http_req_failed: ['rate < 0.01'], // Menos del 1% de las solicitudes deben fallar
    http_req_waiting: ['p(95) < 80'], // El 95% del tiempo de espera debe ser menor a 80 ms
    http_req_sending: ['p(95) < 30'], // El 95% del tiempo de envío debe ser menor a 30 ms
    http_req_receiving: ['p(95) < 50'], // El 95% del tiempo de recepción debe ser menor a 50 ms
    iterations: ['count > 100'], // Debe haber más de 100 iteraciones en total
  }
}

export default function () {
  const response = http.get('https://test.k6.io/');
  // check(response, {'La página se cargó correctamente: status 200': (r) => r.status === 200})

  
  sleep(1);
}