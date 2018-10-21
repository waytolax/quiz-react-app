import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {authLogout} from '../redux/actions/authActions';

class Logout extends Component {

    componentDidMount() {
        this.props.authLogout()
    }

    render() {
        return <Redirect to={'/'}/>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
