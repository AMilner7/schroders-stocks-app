import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

jest.mock('react-hot-toast', () => {
    const actual = jest.requireActual('react-hot-toast');
    Object.assign(actual, { toast: jest.fn() });
    return actual;
});
