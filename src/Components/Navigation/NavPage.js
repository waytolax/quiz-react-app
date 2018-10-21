import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import Overlay from '../UI/Overlay';

const StyledNav = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  padding: 20px 10px;
  box-sizing: border-box;
  background: #fff;
  transform: translateX(0px);
  transition: transform 0.2s ease-in;
  z-index: 10;

  &.closed{
      transform: translateX(-300px);
  }

  & ul{
      list-style: none;
      margin: 0;
      padding: 0;
  }
  & li{
    margin-bottom: 15px;
  }
  & li a{
      color: #363d54;
      font-size: 30px;
      text-decoration: none;
      padding: 0 20px 10px 20px;
      transition: opacity 0.3s;
      cursor: pointer;
  }
  & li a:hover,
  & li a.active{
      opacity: 0.7;
  }
`;

class NavPage extends Component {

    renderLinks(links) {
        return links.map((link,index) => {
            return (
                <li key={index}>
                    <NavLink
                        onClick={this.props.onLinkSelect}
                        exact={link.exact}
                        to={link.to}>{link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render () {

        const links = [
            {to: '/', label: 'Список тестов', exact: true}
        ];

        if (this.props.isLogged) {
            links.push(
                {to: '/quiz-creator', label: 'Создать тест', exact: false},
                {to: '/logout', label: 'Выйти', exact: false}
            )
        } else {
            links.push({to: '/Auth', label: 'Авторизация', exact: false})
        }

        return (
            <React.Fragment>
                <StyledNav className={this.props.className}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </StyledNav>
                {
                    this.props.className === 'opened'
                        ? <Overlay onClick={this.props.onOverlayClick}/>
                        : null
                }
            </React.Fragment>
        )
    }
}

export default NavPage
