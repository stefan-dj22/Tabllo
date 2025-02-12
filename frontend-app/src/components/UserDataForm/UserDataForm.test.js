import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserDataForm from './UserDataForm';

describe('UserDataForm Component', () => {
    const mockSubmitFunction = jest.fn();

    test('renders login form correctly', () => {
        render(<UserDataForm formType="login" submitFunction={mockSubmitFunction} />);
        
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Log in')).toBeInTheDocument();
        expect(screen.getByText('Register here')).toBeInTheDocument();
    });

    test('renders registration form correctly', () => {
        render(<UserDataForm formType="register" submitFunction={mockSubmitFunction} />);
        
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Repeat password')).toBeInTheDocument();
        expect(screen.getByText('Sign up')).toBeInTheDocument();
        expect(screen.getByText('Log in here')).toBeInTheDocument();
    });

    test('shows error message when fields are empty', () => {
        render(<UserDataForm formType="login" submitFunction={mockSubmitFunction} />);
        
        fireEvent.click(screen.getByText('Log in'));
        
        expect(screen.getByText('Please fill all fields')).toBeInTheDocument();
    });

    test('calls submitFunction with correct data', () => {
        render(<UserDataForm formType="login" submitFunction={mockSubmitFunction} />);
        
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Log in'));
        
        expect(mockSubmitFunction).toHaveBeenCalledWith('testuser', 'password', '');
    });

    test('shows error message for invalid username', () => {
        render(<UserDataForm formType="register" submitFunction={mockSubmitFunction} />);
        
        fireEvent.change(screen.getByLabelText('Username', { selector: 'input' }), { target: { value: 'invalid username' } });
        expect(screen.getByText('Invalid username')).toBeInTheDocument();
    });

    test('shows error message when passwords do not match', () => {
        render(<UserDataForm formType="register" submitFunction={mockSubmitFunction} />);
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password1' } });
        fireEvent.change(screen.getByLabelText('Repeat password'), { target: { value: 'password2' } });
        fireEvent.click(screen.getByText('Sign up'));
        
        expect(screen.getByText("Typed password don't match")).toBeInTheDocument();
    });
});