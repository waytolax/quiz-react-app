import React, {Component} from 'react'
import {connect} from 'react-redux';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import Loader from '../Components/UI/Loader';
import {fetchQuizes} from '../redux/actions/quizActions';

const StyledList = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 100px;
    flex-grow: 1;
    width: 100%;
    background: linear-gradient(90deg, #fd8355 0%, #f0576c 37%, #f79cbd 100%);

    & h1{
        color: #fff;
    }
    & ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    & li{
        margin-bottom: 10px;
    }
    & li a{
        color: #fff;
        text-decoration: none;
    }
    & li a:hover{
        color: #363f54;
    }
`;

class QuizList extends Component {

    renderQuiz() {
        return this.props.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render () {
        return (
            <StyledList>
                <div>
                    <h1>Список тестов</h1>
                    {
                        this.props.loading
                            ? <Loader/>
                            : <ul>
                                {this.renderQuiz()}
                            </ul>
                    }
                </div>

            </StyledList>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quizReducer.quizes,
        loading: state.quizReducer.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(QuizList)
