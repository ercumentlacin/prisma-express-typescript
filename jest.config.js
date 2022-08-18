/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require('ts-jest');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    modulePathIgnorePatterns: ['<rootDir>/build/'],

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    moduleNameMapper: {
        ...pathsToModuleNameMapper({ '@/*': ['<rootDir>/src/*'] }),
    },
};
