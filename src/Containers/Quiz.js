import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ActiveQuiz from '../Components/Quiz/ActiveQuiz';
import FinishedQuiz from '../Components/Quiz/FinishedQuiz';
import Loader from '../Components/UI/Loader';
import {fetchQuizById, quizOnAnswer, quizOnRetry} from '../redux/actions/quizActions';

const StyledQuiz = styled.div `
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-grow: 1;
  width: 100%;
  background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
`
const Title = styled.h1 `
  color: #fff;
  margin-left: 20px;
`

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.props.quizOnRetry()
    }

    render() {
        return (
            <StyledQuiz>
                <section>
                    <Title>Ответьте на все вопросы</Title>

                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            : this.props.isFinished
                                ? <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.quizOnRetry}
                                  />
                                : <ActiveQuiz
                                    onAnswer={this.props.quizOnAnswer}
                                    question={this.props.quiz[this.props.currentQuestion].question}
                                    answers={this.props.quiz[this.props.currentQuestion].answers}
                                    quizLength={this.props.quiz.length}
                                    questionNum={this.props.currentQuestion + 1}
                                    answerState={this.props.answerState}
                                  />
                    }
                </section>
            </StyledQuiz>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.quizReducer.quiz,
        loading: state.quizReducer.loading,
        results: state.quizReducer.results,
        isFinished: state.quizReducer.isFinished,
        currentQuestion: state.quizReducer.currentQuestion,
        answerState: state.quizReducer.answerState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizOnAnswer: (answerId) => dispatch(quizOnAnswer(answerId)),
        quizOnRetry: () => dispatch(quizOnRetry())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz)
