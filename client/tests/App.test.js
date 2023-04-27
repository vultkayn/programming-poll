import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import Navbar from '../src/components/Navbar';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


test('Navbar renders correctly', () => {
  render(<Navbar />);
  expect(screen.getByText(''))
})
