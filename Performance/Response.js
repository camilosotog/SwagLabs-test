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
  console.log('Tipos de respuesta');
  // console.log('Información del body ' + String(response.body));
  console.log('Response url: ' + String(response.request.url));
  console.log('Response metodo: ' + String(response.request.method));
  console.log('Response status: ' + String(response.status));
  console.log('Response status_text: ' + String(response.status_text));
  
  // Response http (Clase 21)
  console.log('Response Http Blocked ' + String(response.timings.blocked));
  console.log('Response Http Conectividad ' + String(response.timings.connecting));
  console.log('Response Http sending ' + String(response.timings.sending));
  console.log('Response Http wait ' + String(response.timings.waiting));
  console.log('Response Http receiving ' + String(response.timings.receiving));

  sleep(1);
}