import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Verifier } from '@pact-foundation/pact';
import { AppModule } from '../../src/app.module';
import * as path from 'path';

describe('Pact Provider Verification', () => {
    let app: INestApplication;
    let url: string;

    beforeAll(async () => {
        // 1. Start the REAL NestJS application
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.listen(0); // Listen on a random available port
        url = await app.getUrl();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should validate the expectations of ExampleConsumer', async () => {
        // 2. Verify that our Real API satisfies the Contract file
        await new Verifier({
            provider: 'ExampleProvider',
            providerBaseUrl: url, // Pointing to our running NestJS app
            pactUrls: [
                path.resolve(__dirname, '../../pacts/ExampleConsumer-ExampleProvider.json'),
            ],
            stateHandlers: {
                'Has a home route': async () => {
                    // Setup state if needed (e.g., insert data into DB)
                    return Promise.resolve();
                },
            },
        }).verifyProvider();
    });
});
