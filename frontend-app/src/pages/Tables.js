import {createTableReqMock, getUserTablesMock, getUserMock} from "../api/mock/tables/tables";
import {NavLink} from 'react-router-dom'
import styled from "styled-components";
import TableAdd from "../components/TableAdd/TableAdd";
import { useState, useEffect } from "react";

const SWrapper = styled.div`
  height: 100%;
  padding: 1rem 1.5rem;
`;

const STitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const STableList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: minmax(9rem, 1fr);
  grid-gap: 1rem;
`;

const STableItem = styled.li`
  padding: .6rem;
  background-color: ${props => props.color};
  border-radius: .4rem;
  &:hover {
    box-shadow: inset 0 0 0 10rem rgba(0, 0, 0, .1);
  }
`;
STableItem.displayName = 'TableItem';

const STableTitle = styled.h2`
  margin-bottom: .5rem;
  font-size: 1rem;
  color: white;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const STableScheme = styled.div`
  display: flex;
  height: 6.25rem;
  margin-right: .3rem;
  overflow: hidden;
`;

const STableSchemeBar = styled.div`
  display: inline-block;
  flex-shrink: 0;
  width: 1.5rem;
  height: ${props => props.height}px;
  margin-right: .4rem;
  border-radius: .2rem;
  background: rgba(255, 255, 255, 0.25);
`;
STableSchemeBar.displayName = 'TableSchemeBar';

const getUsernameFromCookies = (cookies) => {
  const cookiesWords = cookies.split('; ');
  const usernameCookie = cookiesWords.find(cookie => cookie.startsWith('username='));

  if (!usernameCookie) {
    throw Error("No username found in the cookies");
  }
    return usernameCookie.split('=')[1];  // Extract the username from the cookie
    
}
const Tables = () => {
    
  let [tables, setTables] = useState([]);
  let getUserTables, createTableReq;
  switch(process.env.NODE_ENV)
  {
    case 'development':
      {
        const devUserStr = getUserMock(0);
        document.cookie = "username="+devUserStr+"; path=/; secure";
      }
    case 'test':
      {
        getUserTables = getUserTablesMock;
        createTableReq = createTableReqMock;
      }
      default: {}
  }
  const username = getUsernameFromCookies(document.cookie);
  const loadTables = () => 
  {
    getUserTables(username)
    .then((response) => 
      {
        console.log("\n[TEST LOG] response: "+ response.statusText);
        return response.json();
      })
    .then((data) => {
      console.log("\n[TEST LOG] response data: "+ data);
      setTables(data)
    } ); 
  }
  const newTableReq = (table) =>{
    console.log('Send Table: '+JSON.stringify(table)+' to server...');
    
    createTableReq(table,username)
    .then((response)=>{
      if (response.ok)
      {
        console.log
        (`Send succesfully.
          Status: ${response.status}
          Message: ${response.statusText}`
        );
        loadTables();
      }
      else
      {
        console.log
        (`Error:
          Status: ${response.status}
          Message: ${response.statusText}`);
      }
    })
    .catch((err)=>console.log("Error:" + err));
  }
  
  
  useEffect((()=>{
    loadTables();
  }),[]); 
    return (
      <SWrapper>
        <STitle>
          My Tables
        </STitle>
        <STableList>
          {tables.map((Table, index) => (
            <NavLink key={index} to={`/b/${Table.Id}`}>
              <STableItem color={Table.Color}>
                <STableTitle>
                  {Table.Name}
                </STableTitle>
                <STableScheme>
                  {Table.Lists.map((list, index) => {
                    return (
                      <STableSchemeBar key={index} height={Math.min((list.NumOfItem + 1) * 10, 100)} />
                    )
                  })}
                </STableScheme>
              </STableItem>
            </NavLink>
          ))}
          <TableAdd addTable = {newTableReq}/>
        </STableList>
      </SWrapper>
    )
  };
 
  export default Tables;