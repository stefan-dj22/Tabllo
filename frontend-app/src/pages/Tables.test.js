import { render, screen, fireEvent, waitFor, act, findByText} from '@testing-library/react';
import Tables from './Tables';
import * as api from '../api/mock/tables/tables';
import { MemoryRouter } from 'react-router-dom';
import { Table } from '../components/TableAdd/TableAdd';
import {createTableReqMock, getUserTablesMock, getUserMock, getUserMockData, reqTimeoutTime} from "../api/mock/tables/tables";

describe('Test mock functions', () => {

  // Test for getUserMock
  describe('getUserMock', () => {
    it('should return the correct user for a valid order number', () => {
      const userOrderNum = 0;
      const user = getUserMock(userOrderNum);
      expect(user).toBe('user1'); // user1 should be returned for index 0
    });

    it('should throw a RangeError if the order number is out of bounds', () => {
      const userOrderNum = 2; // Out of bounds
      expect(() => getUserMock(userOrderNum)).toThrow(RangeError);
    });
  });
  // Test for getUserTablesMock
  describe('getUserTablesMock', () => {
    it('should return the correct response with status 200 and data for a valid username', async () => {
      const username = 'user1';
      const response = await getUserTablesMock(username);
      const data = await response.json();
      expect(response.status).toBe(200); // Status should be 200
      expect(data).toEqual(getUserMockData(username)); // Data should match mock data for the user
    });

    it('should return the correct response with status 200 and empty array for an invalid username', async () => {
      const username = 'invalidUser';
      const response = await getUserTablesMock(username);
      const data = await response.json();
      expect(response.status).toBe(200);
      expect(data).toEqual([]); // Data should be an empty array for invalid users
    });
  });

    // Test for createTableReqMock
    describe('createTableReqMock', () => {
        it('should successfully add new data and return status 200', async () => {
          const newData = { Name: "New Project", Color: "pink", Lists: [{ Index: 0, NumOfItem: 3 }] };
          const username = 'user1';
          
          jest.spyOn(Math, 'random').mockReturnValue(0.3); // Force success by making the random number greater than 0.2
          const response = await createTableReqMock(newData, username);
          const responseBody = await response.json();
    
          expect(response.status).toBe(200); // Should be status 200 for successful request
          expect(responseBody.status).toBe('ok');
          expect(responseBody.message).toBe('Data successfully added.');
          
          // Check if the data has been added
          const updatedData = getUserMockData(username);
          expect(updatedData).toContainEqual(expect.objectContaining(newData)); // Check if new data is added
        });
    
        it('should fail to add new data and return status 500 if rejected', async () => {
          const newData = { Name: "Failing Project", Color: "black", Lists: [{ Index: 0, NumOfItem: 0 }] };
          const username = 'user2';
          
          // We can't directly control randomness here, so we simulate failure
          jest.spyOn(Math, 'random').mockReturnValue(0.1); // Force failure by making the random number less than 0.2
    
          const response = await createTableReqMock(newData, username);
          const responseBody = await response.json();
    
          expect(response.status).toBe(500); // Should be status 500 for failed request
          expect(responseBody.status).toBe('error');
          expect(responseBody.message).toBe('Failed to add data.');
    
          // Ensure the data was not added to the mock data
          const updatedData = getUserMockData(username);
          expect(updatedData).not.toContainEqual(expect.objectContaining(newData)); // Data should not be added
        });
      });

  

})
describe('Tables Page test Component', () => {
    const testUserStr = getUserMock(1);
    beforeAll(()=>{
        process.env.NODE_ENV = 'test';
    });
    beforeEach(() => {
      // Mock document.cookie
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: "username="+testUserStr+"; path=/; secure",
      });
    });
    it('render Tables page with right content', async () =>
        {
            await act( async () => {
                render(
                <MemoryRouter>
                <Tables />
                </MemoryRouter>);            
        });
            const elm = screen.getByText('My Tables');
            expect(elm).toBeInTheDocument();
        });
    
    it('should load all tables for user given as cookies parameter', async () => {
        
        await act( async () => {
                render(
                <MemoryRouter>
                <Tables />
                </MemoryRouter>);            
        });
        const tableNames = getUserMockData(testUserStr).map((table)=>table.Name);
        await waitFor(() => {
          for(let tableName of tableNames){
            expect(screen.getByText(tableName)).toBeInTheDocument();
          }
        },{timeout: 2*reqTimeoutTime});   
    });

    it('should create new table when new table submited for creation', async () => {
        await act( async () => {
            render(
            <MemoryRouter>
            <Tables />
            </MemoryRouter>);            
        });
        
        const createButton = screen.getByText(/Create new Table.../i);
        fireEvent.click(createButton);
        
        const inputField = screen.getByPlaceholderText(/Add Table title/i);
        const tableName = 'New Table';
        fireEvent.change(inputField, { target: { value: tableName } });
        
        const colorPicker = screen.getAllByTestId('color-div');
        fireEvent.click(colorPicker[0]);
        const submitButton = screen.getByText(/Create Table/i);
        jest.spyOn(Math, 'random').mockReturnValue(0.3); // Force success by making the random number greater than 0.2
        await act( async () => {
          fireEvent.click(submitButton);
        });
        
        // Mock the user data passed as 'table' in newTableReq
        await waitFor(() => {
          const createdTable = screen.getByText(tableName);
          expect(createdTable).toBeInTheDocument();
        },{timeout: 3*reqTimeoutTime});
    
      });
    
    });