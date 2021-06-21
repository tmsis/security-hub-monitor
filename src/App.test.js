import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';

test('renders our form', () => {
  render(<App />);

  expect(screen.getByRole("searchbox", { })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /all findings/i})).toBeInTheDocument();
});
