import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '8s', target: 10 },
    { duration: '2s', target: 2 },
  ]
}

export default function () {
  const response = http.get('https://test.k6.io/');
  check(response, {'La página se cargó correctamente: status 200': (r) => r.status === 200})
  check(response, {'Validando texto en la página: status OK': (r) => r.body.includes("QuickPizza")})
  check(response, {'Tamaño de la página es < 11300': (r) => r.body.length <= 11300})

  sleep(1);
}