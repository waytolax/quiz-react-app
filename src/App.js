import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './HOC/Layout';
import Quiz from './Containers/Quiz';
import QuizList from './Containers/QuizList';
import Auth from './Containers/Auth';
import QuizCreator from './Containers/QuizCreator';
import Logout from './Components/Logout';
import {autoLogin} from './redux/actions/authActions';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`

class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

  render() {
    return (
        <Layout>
            <GlobalStyle />
            {
                this.props.isLogged
                    ?
                        <Switch>
                            <Route path="/quiz-creator" component={QuizCreator} />
                            <Route path="/quiz/:id" component={Quiz} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/" exact component={QuizList} />
                            <Redirect to={'/'} />
                        </Switch>
                    :
                    <Switch>
                        <Route path="/auth" component={Auth} />
                        <Route path="/quiz/:id" component={Quiz} />
                        <Route path="/" exact component={QuizList} />
                        <Redirect to={'/'} />
                    </Switch>
            }
        </Layout>
    );
  }
}

function mapStateToProps(state) {
    return {
        isLogged: !!state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
