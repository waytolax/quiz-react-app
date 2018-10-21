import React from 'react'
import styled from 'styled-components';
import Button from '../UI/Button';
import {Link} from 'react-router-dom';

const Wrapper = styled.div `
    width: 600px;
    padding: 20px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    box-sizing: border-box;
    margin: 0 10px;
    & ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    & li{
        position: relative;
        margin-left: 30px;
    }
    & li.wrong::before,
    & li.wrong::after{
        position: absolute;
        top: 11px;
        left: -32px;
        transform: rotate(45deg);
        content: '';
        width: 20px;
        height: 2px;
        background: red;
    }
    & li.wrong::after{
        transform: rotate(-45deg);
    }
    & li.right::after{
        position: absolute;
        top: 4px;
        left: -30px;
        content: '';
        width: 15px;
        height: 7px;
        transform: rotate(-45deg);
        border-left: 3px solid green;
        border-bottom: 3px solid green;
    }
`;

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'right') {
            total++
        }
        return total
    }, 0)

    return (
        <Wrapper>
            <ul>
                {
                    props.quiz.map((question, index) => {
                        const className = props.results[index + 1];

                        return (
                            <li
                                key={index}
                                className={className}
                            >
                                <strong>{question.id + '.'}&nbsp;</strong>
                                {question.question}
                            </li>
                        )
                    })
                }
            </ul>
            <p>Правильно {successCount} из {props.quiz.length}</p>
            <div>
                <Button
                    primary
                    onClick={props.onRetry}
                >Повторить
                </Button>
                <Link to="/">
                    <Button
                        right
                    >Перейти в список тестов
                    </Button>
                </Link>
            </div>
        </Wrapper>
    )
}

export default FinishedQuiz
