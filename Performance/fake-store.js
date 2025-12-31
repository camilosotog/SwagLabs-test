import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '5s',
}

export default function () {

  const response = http.get('https://fakestoreapi.com/products');
  const products = response.json();

  // console.log('Status:', response.status);
  // console.log('Productos obtenidos:', products.length);
  // console.log('Primer producto:', JSON.stringify(products[0], null, 2));

}