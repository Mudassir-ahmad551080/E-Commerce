import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  cloud: {
    // Project: Testing
    projectID: 5092807,
    // Test runs with the same name groups test runs together.
    name: 'Test1'
  }
};

export default function() {
  http.get('https://localhost:4000/api/user/register');
  sleep(1);
}