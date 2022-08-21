import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { Application } from 'express';

export type AppContext = {
    app: Application;
};

export type AppMockContext = {
    app: DeepMockProxy<Application>;
};

export const createAppMockContext = (): AppMockContext => {
    return {
        app: mockDeep<Application>(),
    };
};
