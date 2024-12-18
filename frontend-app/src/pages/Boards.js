import getUserBoards from "../api/mock/boards/boards";
import {NavLink} from 'react-router-dom'
import styled from "styled-components";
import BoardAdd from "../components/BoardAdd/BoardAdd";

const SWrapper = styled.div`
  height: 100%;
  padding: 1rem 1.5rem;
`;

const STitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const SBoardList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-auto-rows: minmax(9rem, 1fr);
  grid-gap: 1rem;
`;

const SBoardItem = styled.li`
  padding: .6rem;
  background-color: ${props => props.color};
  border-radius: .4rem;
  &:hover {
    box-shadow: inset 0 0 0 10rem rgba(0, 0, 0, .1);
  }
`;
SBoardItem.displayName = 'BoardItem';

const SBoardTitle = styled.h2`
  margin-bottom: .5rem;
  font-size: 1rem;
  color: white;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SBoardScheme = styled.div`
  display: flex;
  height: 6.25rem;
  margin-right: .3rem;
  overflow: hidden;
`;

const SBoardSchemeBar = styled.div`
  display: inline-block;
  flex-shrink: 0;
  width: 1.5rem;
  height: ${props => props.height}px;
  margin-right: .4rem;
  border-radius: .2rem;
  background: rgba(255, 255, 255, 0.25);
`;
SBoardSchemeBar.displayName = 'BoardSchemeBar';


const Boards = () => {
    const boards = getUserBoards("user1"); //TODO: user1 should be getther from login information (cookies maybe)
    //if (!boards) return;
  
    return (
      <SWrapper>
        <STitle>
          My Boards
        </STitle>
        <SBoardList>
          {boards.map((board, index) => (
            <NavLink key={index} to={`/b/${board.Id}`}>
              <SBoardItem color={board.Color}>
                <SBoardTitle>
                  {board.Name}
                </SBoardTitle>
                <SBoardScheme>
                  {board.Lists.map((list, index) => {
                    return (
                      <SBoardSchemeBar key={index} height={Math.min((list.NumOfItem + 1) * 10, 100)} />
                    )
                  })}
                </SBoardScheme>
              </SBoardItem>
            </NavLink>
          ))}
          <BoardAdd/>
        </SBoardList>
      </SWrapper>
    )
  };
 
  export default Boards;