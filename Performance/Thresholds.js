import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '4s', target: 10 },
    { duration: '1s', target: 2 },
  ],
  thresholds: {
    http_req_duration: ['p(95) < 110'], // El 95% de las solicitudes deben completarse en menos de 110 ms
    http_req_duration: ['min < 50'],    // El tiempo mínimo de solicitud debe ser menor a 50 ms
    http_req_duration: ['max < 200'],   // El tiempo máximo de solicitud debe ser menor a 200 ms
    http_req_duration: ['med < 100'],   // El tiempo mediano de solicitud debe ser menor a 100 ms
  }
}

export default function () {
  const response = http.get('https://test.k6.io/');
  // check(response, {'La página se cargó correctamente: status 200': (r) => r.status === 200})

  
  sleep(1);
}