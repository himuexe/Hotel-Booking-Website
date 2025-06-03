import { render, screen } from '@testing-library/react';
import Toast from '../Toast';

describe('Toast Component', () => {
  test('renders success toast correctly', () => {
    const mockOnClose = jest.fn();
    
    render(
      <Toast 
        message="Test success message" 
        type="SUCCESS" 
        onClose={mockOnClose} 
      />
    );

    expect(screen.getByText('Test success message')).toBeInTheDocument();
  });

  test('renders error toast correctly', () => {
    const mockOnClose = jest.fn();
    
    render(
      <Toast 
        message="Test error message" 
        type="ERROR" 
        onClose={mockOnClose} 
      />
    );

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });
}); 