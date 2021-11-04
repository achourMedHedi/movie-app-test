import React from "react";
import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import TestComponent from './Test.component'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer()

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('This will test Test compoent', () => {
    it('should display loading while api is loading', () => {
       
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
                return res(ctx.json([]))
            })
        )
        render(<TestComponent />);
        expect(screen.getByText('loading')).toBeInTheDocument()
    })
    it('should expect an error after fetching api', async () => {

        server.use(
            rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
                return res(ctx.status(404))
            })
        )
        render(<TestComponent />);
        await waitFor(() => {
            expect(screen.getByText('error')).toBeInTheDocument()
        })
    })
    it('should expect success after fetching api', async () => {
        server.use(
            rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
                return res(ctx.json([]))
            })
        )
        render(<TestComponent />);
        await waitFor(() => {
            expect(screen.getByText('success')).toBeInTheDocument()
        })
    })
})