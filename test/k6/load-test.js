import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Custom metrics to track specific success/fail counts
const MyFailRate = new Counter('my_fail_rate');
const MySuccessRate = new Counter('my_success_rate');

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '10s', target: 5 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
    },
};

export default function () {
    const res = http.get('http://localhost:3000/');

    const isSuccess = check(res, {
        'status is 200': (r) => r.status === 200,
        'body is correct': (r) => r.body === 'Hello World!',
    });

    if (isSuccess) {
        MySuccessRate.add(1);
        console.log(`Request Success: Status ${res.status}`);
    } else {
        MyFailRate.add(1);
        console.log(`Request Failed: Status ${res.status}`);
    }

    sleep(1);
}