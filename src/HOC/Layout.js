import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components'
import NavToggle from '../Components/Navigation/NavToggle';
import NavPage from '../Components/Navigation/NavPage';

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`
const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

class Layout extends Component {

    state = {
        menu: "closed"
    }

    onToggleHandler = () => {
        if (this.state.menu === "closed") {
            this.setState({
                menu: "opened"
            });
        } else {
            this.setState({
                menu: "closed"
            });
        }
    }

  render() {
    return (
      <Wrapper>

          <NavPage
              onLinkSelect={this.onToggleHandler}
              onOverlayClick={this.onToggleHandler}
              className={this.state.menu}
              isLogged={this.props.isLogged}
          />
          <NavToggle
              onToggle={this.onToggleHandler}
              className={this.state.menu}
          />
          <Main>
              { this.props.children }
          </Main>

      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
    return {
        isLogged: !!state.authReducer.token
    }
}

export default connect(mapStateToProps)(Layout);
