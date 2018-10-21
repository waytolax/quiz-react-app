import React from 'react'
import styled from 'styled-components'
import AnswersItem from './AnswersItem';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const AnswersList = (props) => {
    return (
        <List>
            {
                props.answers.map((answer, index) => {
                return(
                    <AnswersItem
                        answerState={props.answerState ? props.answerState[answer.id] : null}
                        onAnswer={props.onAnswer}
                        key={index}
                        answer={answer}
                    />
                )
            })
            }
        </List>
    )
}

export default AnswersList
