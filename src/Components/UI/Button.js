import React from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: ${props => props.primary ? '#fff' : '#000'};
  margin-right: 15px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  background: ${(props) => {
      return props.primary ? '#2884f6' :
             props.right ? 'rgba(161, 240, 69, .7)' :
             props.wrong ? 'rgba(240, 87, 108, .7)' : 'none'
  }};

  &:focus{
      outline: none;
  }
  &:active{
      box-shadow: inset 2px 2px 1px rgba(0,0,0, .3);
  }
  &:disabled{
      background: #ccc;
      color: #000;
      cursor: not-allowed;
  }
`;

const Button = (props) => {
    return (
        <StyledButton
            primary={props.primary}
            right={props.right}
            wrong={props.wrong}
            disabled={props.disabled}
            onClick={props.onClick}
        >{props.children}
        </StyledButton>
    )
}

export default Button
