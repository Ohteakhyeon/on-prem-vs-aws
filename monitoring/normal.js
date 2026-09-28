import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '10m',

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

const BASE_URL = __ENV.BASE_URL;

export default function () {
  const home = http.get(`${BASE_URL}/`);

  check(home, {
    'home status 200': (r) => r.status === 200,
  });

  const movies = http.get(`${BASE_URL}/api/movies`);

  check(movies, {
    'movies status 200': (r) => r.status === 200,
  });

  const seats = http.get(`${BASE_URL}/api/movies/1/seats`);

  check(seats, {
    'seats status 200': (r) => r.status === 200,
  });

  sleep(1);
}