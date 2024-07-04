// src/pages/BlogPage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import BlogPage from './BlogPage';
import '@testing-library/jest-dom/extend-expect';

// Mock del componente BlogList
jest.mock('../components/blog/BlogList', () => (props) => {
  const { blogs = [], loading, error } = props;
  return (
    <>
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      <div data-testid="blog-list">
        {Array.isArray(blogs) && blogs.map((blog) => (
          <div key={blog.id}>{blog.title}</div>
        ))}
      </div>
    </>
  );
});

// Reducer ficticio para la tienda de Redux
const reducer = (state = { blogs: { blogs: [], loading: false, error: null } }, action) => state;
const store = configureStore({
  reducer: { blogs: reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

describe('BlogPage', () => {
  beforeEach(() => {
    localStorage.setItem('userId', 'testUserId'); // Mocking localStorage
  });

  test('renders the page title', () => {
    render(
      <Provider store={store}>
        <BlogPage />
      </Provider>
    );

    expect(screen.getByText('Mis Blogs')).toBeInTheDocument();
  });

  test('renders BlogList with blogs', () => {
    const initialState = {
      blogs: {
        blogs: [
          { id: 1, title: 'Test Blog 1' },
          { id: 2, title: 'Test Blog 2' },
        ],
        loading: false,
        error: null,
      },
    };
    const storeWithBlogs = configureStore({
      reducer: { blogs: reducer },
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    });

    render(
      <Provider store={storeWithBlogs}>
        <BlogPage />
      </Provider>
    );

    expect(screen.getByText('Test Blog 1')).toBeInTheDocument();
    expect(screen.getByText('Test Blog 2')).toBeInTheDocument();
  });

  test('shows loading message', () => {
    const initialState = {
      blogs: {
        blogs: [],
        loading: true,
        error: null,
      },
    };
    const storeLoading = configureStore({
      reducer: { blogs: reducer },
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    });

    render(
      <Provider store={storeLoading}>
        <BlogPage />
      </Provider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('shows error message', () => {
    const initialState = {
      blogs: {
        blogs: [],
        loading: false,
        error: 'Error fetching blogs',
      },
    };
    const storeWithError = configureStore({
      reducer: { blogs: reducer },
      preloadedState: initialState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
    });

    render(
      <Provider store={storeWithError}>
        <BlogPage />
      </Provider>
    );

    expect(screen.getByTestId('error')).toBeInTheDocument();
  });
});
