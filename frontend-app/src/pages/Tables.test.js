import {render,screen} from '@testing-library/react';
import Tables from './Tables';


test('render Tables page with right content', () =>
{
    render(<Tables/>);
    const elm = screen.getByText('My Tables');
    expect(elm).toBeInTheDocument();
});