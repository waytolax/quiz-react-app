import React from 'react'
import styled from 'styled-components';

const Item = styled.li`
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover{
     background: rgba(255,255,255, .2);
     transition: background .3s ease-in-out;
  }
  &.right{
      background: rgba(161, 240, 69, .7);
  }
  &.wrong{
      background: rgba(240, 87, 108, .7);
  }
`;

const AnswerItem = (props) => {

    const answerState = props.answerState;

    return (
        <Item
            className={answerState}
            onClick={() => props.onAnswer(props.answer.id)}
        >
            {props.answer.text}
        </Item>
    )
}

export default AnswerItem
