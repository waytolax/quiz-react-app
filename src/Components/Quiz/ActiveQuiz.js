import React from 'react'
import styled from 'styled-components'
import AnswersList from './AsnwersList';

const Wrapper = styled.div`
  width: 600px;
  padding: 20px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  margin: 0 10px;
  box-sizing: border-box;
`;
const Question = styled.p`
  display: flex;
  justify-content: space-between;
`;

const ActiveQuiz = (props) => {
    return (
    <Wrapper>
        <Question>
            <span><strong>{props.questionNum + '.'}&nbsp;</strong>{props.question}</span>
            <small>{props.questionNum} из {props.quizLength}</small>
        </Question>
        <AnswersList
            answerState={props.answerState}
            onAnswer={props.onAnswer}
            answers={props.answers}
        />
    </Wrapper>
    )
}

export default ActiveQuiz
