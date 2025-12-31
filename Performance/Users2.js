import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '50s', target: 20 },
    { duration: '35s', target: 10 },
    { duration: '20s', target: 5 },
    { duration: '10s', target: 0 },
  ]
}

export default function () {
  http.get('https://test.k6.io/');
  sleep(1);
}