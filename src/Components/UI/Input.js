import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 15px;

    & label{
        margin-bottom: 3px;
        padding: 0;
        display: block;
        font-weight: bold;
    }
    &.invalid label{
        color: #f01f30;
    }
    & input{
        display: block;
        box-sizing: border-box;
        border: 1px solid #bebebe;
        padding: 7px;
        margin: 0 0 5px;
        width: 100%;
        outline: none;
        transition: all 0.3s ease-in-out;
    }
    & span{
        font-size: 12px;
        font-weight: bold;
        color: #f01f30;
    }
`;



function isInvalid({valid, changed, shouldValidate}) {
    return !valid && shouldValidate && changed
}

const Input = (props) => {

    const uniqId = `${props.type || 'text'}-${(Math.random() * 1000).toFixed(0)}`;

    if (isInvalid(props)){
        var className = 'invalid';
    }

    return (
        <Wrapper className={className}>
            <label htmlFor={uniqId}>{props.label}</label>
            <input
                type={props.type || 'text'}
                id={uniqId}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                    ? <span>{props.errorMsg || 'Введите верное значение'}</span>
                    : null
            }
        </Wrapper>
    )
}

export default Input
