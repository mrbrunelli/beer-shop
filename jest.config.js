/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "@shelf/jest-mongodb",
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
    transform: {
        ".+\\.ts$": "ts-jest",
    },
};
