import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import * as path from 'path';
import axios from 'axios';

// 1. Create a Pact instance (The Contract Definer)
const provider = new PactV3({
    consumer: 'ExampleConsumer',
    provider: 'ExampleProvider',
    dir: path.resolve(__dirname, '../../pacts'), // Where to save the contract
});

describe('Pact Consumer Test', () => {
    it('should receive "Hello World!" when calling GET /', async () => {
        // 2. Define the expected interaction
        provider.addInteraction({
            states: [{ description: 'Has a home route' }],
            uponReceiving: 'A request for the home page',
            withRequest: {
                method: 'GET',
                path: '/',
            },
            willRespondWith: {
                status: 200,
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                },
                body: 'Hello World!',
            },
        });

        // 3. Execute the test against the Pact Mock Server
        await provider.executeTest(async (mockServer) => {
            // We make a request to the MOCK server, not the real API yet
            const response = await axios.get(mockServer.url);

            expect(response.status).toBe(200);
            expect(response.data).toBe('Hello World!');
        });
    });
});
