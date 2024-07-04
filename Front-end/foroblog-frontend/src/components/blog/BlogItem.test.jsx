import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogItem from './BlogItem';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const blog = {
    id: '1',
    titulo: 'Test Blog Title',
    descripcion: 'Test Blog Description',
    autor: 'Test Author',
    fecha: '2022-01-01'
};

test('renders BlogItem component and handles navigation', () => {
    const { container } = render(
        <Router>
            <BlogItem blog={blog} />
        </Router>
    );

    // Check that the blog item renders correctly
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Description')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Publicado el 1/1/2022')).toBeInTheDocument();

    // Simulate clicking on the blog item
    fireEvent.click(container.querySelector('.blog-card'));

    // Ensure that navigation happens
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/blogs/1');
});
