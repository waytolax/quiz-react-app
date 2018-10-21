import {
    CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION
} from './actionTypes';
import axios from 'axios';

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        const state = getState().createQuizReducer
        await axios.post('https://react-quiz-app-da728.firebaseio.com/quiz.json', state.quiz)
        dispatch(resetQuizCreation())
    }
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}
