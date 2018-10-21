import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 15px;

    & label{
        display: block;
        margin: 0 0 3px 0;
        padding: 0;
        font-weight: bold;
    }
    & select{
        display: block;
        box-sizing: border-box;
        border: 1px solid #bebebe;
        margin: 0 0 5px;
        height: 30px;
        width: 100%;
        outline: none;
        transition: all 0.3s ease-in-out;
    }
`;

const Select = (props) => {
    const uniqId = `${props.label}-${(Math.random() * 1000).toFixed(0)}`;

    return (
        <Wrapper>
            <label
                htmlFor={uniqId}
            > {props.label}
            </label>
            <select
                id={uniqId}
                value={props.value}
                onChange={props.onChange}
            >
                {
                    props.options.map((option, index) => {
                        return (
                            <option
                                value={option.value}
                                key={index}
                            >{option.text}
                            </option>
                        )
                    })
                }
            </select>
        </Wrapper>
    )
}

export default Select
