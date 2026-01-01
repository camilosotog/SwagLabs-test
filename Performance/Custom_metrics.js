import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '8s', target: 10 },
    { duration: '2s', target: 2 },
  ]
}

const waitTime = new Trend('wait_time');

export default function () {
  const response = http.get('https://test.k6.io/');
  check(response, {'La página se cargó correctamente: status 200': (r) => r.status === 200})
  waitTime.add(response.timings.waiting);
  console.log('Wait time recorded: ' + String(response.timings.waiting) + ' ms');
  
  sleep(1);
}