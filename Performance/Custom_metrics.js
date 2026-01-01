import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '2s', target: 2 },
  ]
}

const waitTime = new Trend('wait_time');
const blocked = new Trend('blocked');
const conected = new Trend('connected');
const sent = new Trend('sent');
const receiving = new Trend('receiving');

export default function () {
  const response = http.get('https://test.k6.io/');
  check(response, {'La página se cargó correctamente: status 200': (r) => r.status === 200})
  waitTime.add(response.timings.waiting);
  blocked.add(response.timings.blocked);
  conected.add(response.timings.connecting);
  sent.add(response.timings.sending);
  receiving.add(response.timings.receiving);

  console.log('Blocked time recorded: ' + String(response.timings.blocked) + ' ms');
  console.log('Connected time recorded: ' + String(response.timings.connecting) + ' ms');
  console.log('Wait time recorded: ' + String(response.timings.waiting) + ' ms');
  
  sleep(1);
}