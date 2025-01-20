import {screen, render, fireEvent, act} from "@testing-library/react"
import TableAdd, {Table} from "./TableAdd";


describe('TableAdd Component', () => {

const addTableMock = jest.fn();

beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

test('renders the "Create new Table" button when form is closed', () => {
    render(<TableAdd />);
    
    const createButton = screen.getByText(/Create new Table.../i);
    expect(createButton).toBeInTheDocument();
});

test('opens the form when "Create new Table" button is clicked', () =>
{
    render(<TableAdd addTable= {addTableMock}/>);
    const btnTA = screen.getByRole('button');
    fireEvent.click(btnTA);
    const titleTxt = screen.getByRole('textbox');
    expect(titleTxt).toBeInTheDocument();
    const colorDivs = screen.getAllByTestId("color-div");
    expect(colorDivs).toHaveLength(5);
    const submitButton = screen.getByRole('button', {name: 'Create Table'});
    expect(submitButton).toBeInTheDocument();
    const cancelButton = screen.getByTestId("cancel-button");
    expect(cancelButton).toBeInTheDocument();

});

test('closes the form when cancel button is clicked',
     () => {
        render(<TableAdd addTable={addTableMock}/>);
        const createBtn = screen.getByText('Create new Table...');
        fireEvent.click(createBtn);
        const cancelBtn = screen.getByTestId('cancel-button');
        fireEvent.click(cancelBtn);
        const createBtnAfterCancel = screen.getByText('Create new Table...');
        expect(createBtnAfterCancel).toBeInTheDocument();
    }
);

    test('Create Table button is disabled when tableTitle is empty', () => {
      // Render the component with the mock function
      render(<TableAdd addTable={addTableMock} />);
  
      // Open the form by clicking the button
      const openFormButton = screen.getByText('Create new Table...');
      fireEvent.click(openFormButton);
  
      // Ensure the form is open and the Create Table button is present
      const createTableButton = screen.getByRole('button', { name: /create table/i });
      expect(createTableButton).toBeInTheDocument();
  
      // Check that the Create Table button is disabled
      expect(createTableButton).toBeDisabled();
    });
  
    test('Create Table button is enabled when tableTitle is not empty', () => {
      // Render the component with the mock function
      render(<TableAdd addTable={addTableMock} />);
  
      // Open the form by clicking the button
      const openFormButton = screen.getByText('Create new Table...');
      fireEvent.click(openFormButton);
  
      // Ensure the form is open and the input field is present
      const titleInput = screen.getByPlaceholderText('Add Table title');
      fireEvent.change(titleInput, { target: { value: 'New Table Title' } });
  
      // Ensure the Create Table button is now enabled
      const createTableButton = screen.getByRole('button', { name: /create table/i });
      expect(createTableButton).not.toBeDisabled();
    });

    test('calls addTable with correct data when form is submitted', () => {
        render(<TableAdd addTable={addTableMock} />);
        
        const createButton = screen.getByText(/Create new Table.../i);
        fireEvent.click(createButton);
        
        const inputField = screen.getByPlaceholderText(/Add Table title/i);
        fireEvent.change(inputField, { target: { value: 'New Table' } });
        
        const colorPicker = screen.getAllByTestId('color-div');
        fireEvent.click(colorPicker[0]);
        const colorAtt = colorPicker[0].getAttribute('color');
        const submitButton = screen.getByText(/Create Table/i);
        fireEvent.click(submitButton);
        
        const expectedTable = new Table('New Table', colorAtt);
        expect(addTableMock).toHaveBeenCalledWith(expectedTable);
      });

  
});