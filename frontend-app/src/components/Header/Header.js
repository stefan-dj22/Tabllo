import { NavLink, redirect } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import logo from '../../images/logo.svg';

const SWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  align-items: center;
  padding: 0 1.5rem;
  background-color: ${props => props.color};
  box-shadow: inset 0px 0px 0px 40px rgba(0, 0, 0, .3);
  transition: background-color .2s ease-in;
`;

const SNav = styled.nav``;

const SNavList = styled.ul`
  display: flex;
`;
SNavList.displayName = 'NavList';

const SNavItem = styled.li`
  display: flex;
  align-items: center;
  margin-right: .5rem
  padding: .2rem .5rem
  color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all .2s ease-in;
  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const SNavIcon = styled.i`
  margin-right: .3rem;
  font-size: 1rem;
`;

const SNavTitle = styled.h3`
  font-size: 1rem;
  line-height: 1.5;
`;

const SLogo = styled.img`
  width: 10rem;
  margin: 0 auto;
`;
const SActions = styled.div``;

const HeaderNavigationList = [
    {
      title: 'Tables',
      path: '/',
      faIcon: 'columns',
    },
  ];
    
const Header = (props) => 
{
    const {bgColor} = props; 
    let navigation = HeaderNavigationList;
    const currentPath = window.location.pathname;
    return (
        <SWrapper color = {bgColor}>
            <SNav>
                {navigation.map((item,index) => {
                    if(currentPath === item.path) return;
                    return(
                        <SNavList key = {index}>
                          <NavLink to={item.path}>
                            <SNavItem>
                                <SNavIcon>
                                    <FontAwesomeIcon icon={item.faIcon}/>
                                </SNavIcon>
                                <SNavTitle>
                                  {item.title}
                                </SNavTitle>
                            </SNavItem>
                          </NavLink>
                        </SNavList>
                    );
                })}
            </SNav>
            <SLogo src={logo}/>
            <SActions/>
        </SWrapper>
    )
};
  
export default Header;