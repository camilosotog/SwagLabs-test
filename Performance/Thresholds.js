import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '4s', target: 10 },
    { duration: '1s', target: 2 },
  ],
  thresholds: {
    http_req_duration: ['p(95) < 110'], // El 95% de las solicitudes deben completarse en menos de 200 ms
  }
}

export default function () {
  const response = http.get('https://test.k6.io/');
  check(response, {'La página se cargó correctamente: status 200': (r) => r.status === 200})

  
  sleep(1);
}