module.exports = {
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$':
            '<rootDir>/__mocks__/fileMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
    globals: {
        CONTEXT: 'jest',
    },
    transformIgnorePatterns: [],
}
