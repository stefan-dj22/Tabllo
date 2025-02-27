import styled from "styled-components";
const SAddButton = styled.button`
  font-size: 1rem; 
  color: #172b4d;
  font-weight: 600;
  background-color: #dadde3;
  border-radius: .4rem
  transition: background-color .2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: #c8cace;
  }
`;
SAddButton.displayName = 'AddButton';


function BoardAdd()
{

    return(
        <SAddButton >
        Create new board...
      </SAddButton>
    );
}

export default BoardAdd;