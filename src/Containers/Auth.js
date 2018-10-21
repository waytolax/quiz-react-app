import React, {Component} from 'react'
import {connect} from 'react-redux';
import styled from 'styled-components';
import {auth} from '../redux/actions/authActions';
import Button from '../Components/UI/Button';
import Input from '../Components/UI/Input';

const StyledAuth = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 100px;
    flex-grow: 1;
    width: 100%;
    background: linear-gradient(270deg, #cef2fa 0%, #59bfef 100%);

    & > div{
        width: 100%;
        max-width: 600px;
        padding: 0 20px;
    }
    & h1{
        color: #fff;
        text-align: center;
    }
    & form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #eee;
        box-shadow: 2px 2px 2px rgba(0,0,0, .5);
        padding: 15px;
        border-radius: 5px;
    }
    & button{
        margin-right: 0;
        margin-bottom: 10px;
    }
`;

function validateEmail(email) {
    var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormValid: false,
        formInputs: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMsg: 'Введите корректный email',
                valid: false,
                changed: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMsg: 'Введите корректный пароль, минимум 6 символов',
                valid: false,
                changed: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formInputs.email.value,
            this.state.formInputs.password.value,
            true
        )
    }

    regHandler = () => {
        this.props.auth(
            this.state.formInputs.email.value,
            this.state.formInputs.password.value,
            false
        )
    }

    validateInput(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, inputName) => {
        const formInputs = this.state.formInputs;
        const input = this.state.formInputs[inputName];

        input.value = event.target.value;
        input.changed = true;
        input.valid = this.validateInput(input.value, input.validation);

        formInputs[inputName] = input;

        let isFormValid = true;
        Object.keys(formInputs).forEach(name => {
          isFormValid = formInputs[name].valid && isFormValid
        })
        this.setState({formInputs, isFormValid});
    }

    renderInputs (){
        return Object.keys(this.state.formInputs).map((inputName, index) => {
            const input = this.state.formInputs[inputName];
            return (
                <Input
                    key={inputName + index}
                    value={input.value}
                    type={input.type}
                    label={input.label}
                    errorMsg={input.errorMsg}
                    valid={input.valid}
                    changed={input.changed}
                    shouldValidate={!!input.validation}
                    onChange={(event) => {this.onChangeHandler(event, inputName)}}
                />
            )
        })
    }

    render () {
        return (
            <StyledAuth>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler}>

                        { this.renderInputs() }

                        <Button
                            onClick={this.loginHandler}
                            right
                            disabled={!this.state.isFormValid}
                        >Войти
                        </Button>
                        <Button
                            onClick={this.regHandler}
                            primary
                            disabled={!this.state.isFormValid}
                        >Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </StyledAuth>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)
