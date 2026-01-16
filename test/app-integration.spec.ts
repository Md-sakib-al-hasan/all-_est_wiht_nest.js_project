import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { AppModule } from '../src/app.module';

describe('AppModule Integration', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        // HERE is the key difference: We import the REAL AppModule.
        // We are NOT mocking AppService. We are testing the real thing.
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        appController = moduleRef.get<AppController>(AppController);
        appService = moduleRef.get<AppService>(AppService);
    });

    describe('dependency injection', () => {
        it('should inject AppService into AppController', () => {
            expect(appController).toBeDefined();
            expect(appService).toBeDefined();

            // Verify that the controller is actually using the service
            expect(appController.getHello()).toBe(appService.getHello());
        });

        it('should return "Hello World!" from the real service', () => {
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
});
