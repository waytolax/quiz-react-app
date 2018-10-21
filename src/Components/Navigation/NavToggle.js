import React from 'react'
import styled from 'styled-components';

const StyledToggle = styled.button`
  position: fixed;
  top: 40px;
  left: 40px;
  z-index: 10;
  background: none;
  border: none;
  visibility: hidden;
  transition: opacity, left 0.2s ease-in;

  &.opened{
      left: 320px;
  }
  &.opened::before,
  &.opened::after,
  &.closed::before,
  &.closed::after{
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background: #fff;
      cursor: pointer;
      visibility: visible;
  }
  &.opened::before{
      transform: rotate(45deg);
  }
  &.opened::after{
      transform: rotate(-45deg);
  }
  &.closed::after{
    top: 7px;
    box-shadow: 0 -12px 0 0 #fff;
  }
  &:hover{
      opacity: 0.7;
  }
`;

const NavToggle = (props) => {
    return (
        <StyledToggle
            onClick={props.onToggle}
            className={props.className}
        />
    )
}

export default NavToggle
