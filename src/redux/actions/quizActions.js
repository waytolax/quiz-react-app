import axios from 'axios';
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_ANSWER,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_ON_RETRY
} from './actionTypes';

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const res = await axios.get('https://react-quiz-app-da728.firebaseio.com/quiz.json')
            const quizes = []
            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}

export function fetchQuizById(quizId) {
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        try {
            const res = await axios.get(`https://react-quiz-app-da728.firebaseio.com/quiz/${quizId}.json`)
            const quiz = res.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}

export function quizOnAnswer(answerId) {
    return (dispatch, getState) => {
        const state = getState().quizReducer
        if (state.answerState) {
          const key = Object.keys(state.answerState)[0]
          if (state.answerState[key] === 'right') {
            return
          }
        }

        const results = state.results;
        const rightAnswerId = state.quiz[state.currentQuestion].rightAnswerId;
        const questionId = state.quiz[state.currentQuestion].id;

        if (rightAnswerId === answerId) {
            if (!results[questionId]) {
                results[questionId] = 'right';
            }

            dispatch(quizSetAnswer({[answerId]:'right'}, results))

            const timeout = setTimeout(() => {
                if (state.currentQuestion + 1 === state.quiz.length) {
                    dispatch(quizFinished())
                } else {
                    dispatch(quizNextQuestion(state.currentQuestion + 1))
                }
            clearTimeout(timeout)
        }, 500);
        } else {
            results[questionId] = 'wrong';
            dispatch(quizSetAnswer({[answerId]:'wrong'}, results))
        }
    }
}

export function quizOnRetry() {
    return {
        type: QUIZ_ON_RETRY
    }
}

function fetchQuizesStart() {
    return {type: FETCH_QUIZES_START}
}

function fetchQuizesSuccess(quizes) {
    return {type: FETCH_QUIZES_SUCCESS, quizes}
}

function fetchQuizesError(error) {
    return {type: FETCH_QUIZES_ERROR, error}
}

function fetchQuizSuccess(quiz) {
    return {type: FETCH_QUIZ_SUCCESS, quiz}
}

function quizSetAnswer(answerState, results) {
    return {
        type: QUIZ_SET_ANSWER,
        answerState,
        results
    }
}

function quizFinished() {
    return {
        type: QUIZ_FINISHED
    }
}

function quizNextQuestion(current) {
    return {
        type: QUIZ_NEXT_QUESTION,
        current
    }
}
