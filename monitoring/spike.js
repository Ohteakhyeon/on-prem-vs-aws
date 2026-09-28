import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 20 },   // 평상시 부하
    { duration: '30s', target: 1000 }, // 순간 급증
    { duration: '3m', target: 1000 },  // 높은 부하 유지
    { duration: '30s', target: 20 },  // 급감
    { duration: '2m', target: 20 },   // 회복 확인
    { duration: '30s', target: 0 },   // 종료
  ],

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
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