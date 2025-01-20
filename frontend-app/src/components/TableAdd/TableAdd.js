import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Actions, Input, SubmitButton, CancelButton } from '../BaseComponents';
import {tableColors} from "../../constants";
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
  background-color: ${props => props.color};
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
export class Table
{
  constructor(Title, Color)
  {
    this.Name=Title;
    this.Color=Color;
    this.Lists = [];
  }
}

const  TableAdd = (props) =>
{
const {addTable} = props;
const [formIsOpen, setFormOpen] = useState(false);
const [tableTitle, setTableTitle] = useState('');
const [tableColor, setTableColor] = useState(tableColors[0]);

const setDefault = () => {
  setFormOpen(false);
  setTableTitle('');
  setTableColor(tableColors[0]);
}
const handleKeyDown = (e) =>{
  if(e.keyCode === 27)
  {
    setFormOpen(false);
  }
};

const getDataForSub = () =>
{
  let table = new Table();
  table.Color = tableColor;
  table.Name = tableTitle;
  table.Lists = [];
  return table;
}
const handleChange = (att, value) =>
{
  if(att === 'title')
  {
    setTableTitle(value);
  }
  else
  {
    setTableColor(value);
  }
}


  return formIsOpen ? (
  <SContainer color={tableColor}>
    <form onSubmit={(e) => { 
      e.preventDefault(); 
      let Table = getDataForSub();
      addTable(Table);
      setDefault();}}>
      <Input
        type="text"
        placeholder="Add Table title"
        value={tableTitle}
        onKeyDown={handleKeyDown}
        onChange={(e) => handleChange("title", e.target.value)}
        spellCheck={false}
        autoFocus
      />
      <SColorPicker>
        {tableColors.map((color, index) => (
          <SColorPickerItem
            key={index}
            color={color}
            data-testid="color-div"
            onClick={() => handleChange("color", color)}
          >
            {tableColor === color && <FontAwesomeIcon icon = {faCheck}/>}
          </SColorPickerItem>
        ))}
      </SColorPicker>
      <Actions>
        <SubmitButton type='submit' disabled={!tableTitle}>
          Create Table
        </SubmitButton>
        <CancelButton data-testid = "cancel-button" onClick={() => setFormOpen(false)}>
          <FontAwesomeIcon icon = {faTimes}/>
        </CancelButton>
      </Actions>
    </form>
  </SContainer>) : (
      <SAddButton onClick = {() => setFormOpen(true)} >
        Create new Table...
      </SAddButton>
    );
}

export default TableAdd;