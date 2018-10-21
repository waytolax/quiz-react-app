import React from 'react'
import styled from 'styled-components';

const StyledToggle = styled.button`
  position: fixed;
  top: 40px;
  left: 40px;
  z-index: 10;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
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
      left: 1px;
      width: 20px;
      height: 2px;
      background: #fff;
      cursor: pointer;
  }
  &.opened::before{
      transform: rotate(45deg);
  }
  &.opened::after{
      transform: rotate(-45deg);
  }
  &.closed::after{
    top: 16px;
    box-shadow: 0 -12px 0 0 #fff;
  }
  &:hover{
      opacity: 0.7;
  }
  &::-moz-focus-inner {
  border: 0;
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
