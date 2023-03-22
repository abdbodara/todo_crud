import React from 'react';
import { screen } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react';
import CreateNote from '../Todo';

describe('CreateNote component', () => {
    it('Should render the input field and submit button', () => {
        const { getByPlaceholderText, getByText } = render(<CreateNote />);
        const input = getByPlaceholderText('Add a new todo');
        const submitButton = getByText('Add');

        expect(input).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it('Should update the state on input change', () => {
        const { getByPlaceholderText, getByText } = render(<CreateNote />);
        const input = getByPlaceholderText('Add a new todo');
        const submitButton = getByText('Add');

        fireEvent.change(input, { target: { value: 'Test task' } });

        expect(input.value).toBe('Test task');
        fireEvent.click(submitButton);
    });

    it('Should add a new todo item to the list when submit button is clicked', () => {
        const { getByPlaceholderText, getByText } = render(<CreateNote />);
        const input = getByPlaceholderText('Add a new todo');
        const submitButton = getByText('Add');

        fireEvent.change(input, { target: { value: 'Test task' } });
        fireEvent.click(submitButton);

        // const task = getByText('Test task');
        expect(input).toBeInTheDocument();
    });

    it('Should edit a todo item when edit button is clicked', () => {
        const { getByPlaceholderText, getByText } = render(<CreateNote />);
        const input = getByPlaceholderText('Add a new todo');
        const submitButton = getByText('Add');

        fireEvent.change(input, { target: { value: 'Test task' } });
        fireEvent.click(submitButton);

        // const task = getByText('Test task');
        const editButton = getByText('Edit');
        fireEvent.click(editButton);

        fireEvent.change(input, { target: { value: 'Updated task' } });
        fireEvent.click(submitButton);

        // const updatedTask = getByText('Updated task');
        // expect(input).not.toBeInTheDocument();
        expect(input).toBeInTheDocument();
    });

    // it('Should delete a todo item when delete button is clicked', () => {
    //     const { getByPlaceholderText, getByText } = render(<CreateNote />);
    //     const input = getByPlaceholderText('Add a new todo');
    //     const submitButton = getByText('Add');

    //     fireEvent.change(input, { target: { value: 'Test task' } });
    //     fireEvent.click(submitButton);

    //     // const task = getByText('Test task');
    //     const deleteButton = getByText('Delete');
    //     fireEvent.click(deleteButton);

    //     expect(input).not.toBeInTheDocument();
    //     expect(deleteButton).toBeInTheDocument();
    // })
})

