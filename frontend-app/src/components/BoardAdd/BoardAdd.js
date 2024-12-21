import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actions, Input, SubmitButton, CancelButton } from '../BaseComponents';
import {boardColors} from "../../constants";
import { useState } from "react";
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

const SContainer = styled.div`
  height: 100%;
  padding: 1rem .6rem;
  background-color: #dadde3;
  border-radius: .4rem
`;

const SColorPicker = styled.div`
  display: flex;
  padding: .25rem 0;
  margin-bottom: .5rem;
`;
SColorPicker.displayName = 'ColorPicker';

const SColorPickerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  font-size: .7rem;
  color: #fff;
  background-color: ${props => props.color};
  border-radius: .4rem;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: .5rem;
  }
  &:hover {
    box-shadow: inset 0 0 0 10rem rgba(0, 0, 0, .1)
  }
`;
class Board
{
  construtor(Title, Color)
  {
    this.Title=Title;
    this.Color=Color;
  }
}

const  BoardAdd = (props) =>
{
const {addBoard} = props;
const [formIsOpen, setFormOpen] = useState(false);
const [boardTitle, setBoardTitle] = useState('');
const [boardColor, setBoardColor] = useState('');

let board = new Board();

const handleKeyDown = (e) =>{
  if(e.keyCode === 27)
  {
    setFormOpen(false);
  }
};

const handleChange = (att, value) =>
{
  if(att === 'title')
  {
    board.Title = value;
    setBoardTitle(value);
  }
  else
  {
    board.Color = value;
    setBoardColor(value);
  }
}
if(formIsOpen)
  return (
  <SContainer color={boardColor}>
    <form onSubmit={addBoard(Board)}>
      <Input
        type="text"
        placeholder="Add board title"
        value={boardTitle}
        onKeyDown={handleKeyDown}
        onChange={(e) => handleChange("title", e.target.value)}
        spellCheck={false}
        autoFocus
      />
      <SColorPicker>
        {boardColors.map((color, index) => (
          <SColorPickerItem
            key={index}
            color={color}
            onClick={() => handleChange("color", color)}
          >
            {boardColor === color && <FontAwesomeIcon icon="check" />}
          </SColorPickerItem>
        ))}
      </SColorPicker>
      <Actions>
        <SubmitButton type='submit' disabled={!boardTitle}>
          Create board
        </SubmitButton>
        <CancelButton onClick={() => setFormOpen(false)}>
          <FontAwesomeIcon icon="times" />
        </CancelButton>
      </Actions>
    </form>
  </SContainer>);
else
  return(
        <SAddButton onClick = {setFormOpen(true)} >
        Create new board...
      </SAddButton>
    );
}

export default BoardAdd;