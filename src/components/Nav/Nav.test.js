import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nav from '.';

describe('NAV', () => {
    test('it renders the site name', () => {
        render(<Nav />, {wrapper: MemoryRouter});
        const header = screen.queryByRole('header');
        expect(header).toBeInTheDocument();

    })
})
