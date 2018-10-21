import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_ANSWER,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_ON_RETRY
} from '../actions/actionTypes';

const initialState = {
    quizes:[],
    loading: true,
    error: null,
    results: {},
    isFinished: false,
    currentQuestion: 0,
    answerState: null,
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case QUIZ_SET_ANSWER:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case QUIZ_FINISHED:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerState: null,
                currentQuestion: action.current
            }
        case QUIZ_ON_RETRY:
            return {
                ...state,
                results: {},
                isFinished: false,
                currentQuestion: 0,
                answerState: null
            }
        default:
            return state
    }
}
