import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogList from './BlogList';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const blogs = [
    {
        id: '1',
        titulo: 'Test Blog Title 1',
        descripcion: 'Test Blog Description 1',
        autor: 'Test Author 1',
        fecha: '2022-01-01'
    },
    {
        id: '2',
        titulo: 'Test Blog Title 2',
        descripcion: 'Test Blog Description 2',
        autor: 'Test Author 2',
        fecha: '2022-01-02'
    }
];

test('renders BlogList component and interacts with BlogItem', () => {
    const { container } = render(
        <Router>
            <BlogList blogs={blogs} />
        </Router>
    );

    // Check that the blog list renders both blog items
    expect(screen.getByText('Test Blog Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Title 2')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Description 2')).toBeInTheDocument();

    // Simulate clicking on the first blog item
    fireEvent.click(container.querySelectorAll('.blog-card')[0]);

    // Ensure that navigation happens
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/blogs/1');
});
