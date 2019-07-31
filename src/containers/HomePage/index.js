// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col } from 'reactstrap';
// Custom Components
import WelcomeForm from './components/WelcomeForm';
// Utilities, Constants & Styles
import { injectReducer } from '../../utils';
import { updateFormState } from './actions';
import reducer from './reducer';
import { selectForm } from './selectors';
import { DOMAIN_KEY } from './constants';

// ===== MAIN COMPONENT =====
class Login extends PureComponent {
  render() {
    return (
      <Container fluid className='px-0'>
        <Row noGutters>
          <Col>
            <WelcomeForm />
          </Col>
        </Row>
      </Container>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
Login.propTypes = {
  form: PropTypes.object,
  onUpdateFormState: PropTypes.func,
};
// ======================

// ===== INJECTIONS =====
const mapStateToProps = () =>
  createStructuredSelector({
    form: selectForm,
  });

const mapDispatchToProps = dispatch => ({
  onUpdateFormState: newState => dispatch(updateFormState(newState)),
});

const withReducer = injectReducer({ key: DOMAIN_KEY, reducer });
// ======================

export default compose(withReducer)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
