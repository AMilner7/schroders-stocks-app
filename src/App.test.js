import { render, screen } from '@testing-library/react';
import App from './App';
import { React } from 'react';
import { noGraphDefaultMessage } from './config/displayConfig';

test('renders learn react link', () => {
    render(<App />);
    const noGraphText = screen.getByText(noGraphDefaultMessage);
    expect(noGraphText).toBeInTheDocument();
});
