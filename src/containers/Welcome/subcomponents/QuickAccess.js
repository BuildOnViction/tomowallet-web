/**
 *
 * TomoWallet - Welcome Page - Quick Access Form (for Electron app only)
 *
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
// Custom Components
import { FormBodyStyler } from '../style';
import {
  ButtonStyler,
  ContainerMin,
  HeadingLarge,
  ButtonLinkStyler,
} from '../../../styles';
// Utilities & Constants
import { withIntl } from '../../../components/IntlProvider';
import { changeInputWithSubmit, detectSubmit } from '../../../utils';
import { MSG } from '../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class QuickAccessSection extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      foundInput: false,
    };
  }

  componentDidMount() {
    document.getElementById('passwordInput').focus();
  }

  componentDidUpdate() {
    const { foundInput } = this.state;

    if (
      !foundInput &&
      document.body.contains(document.getElementById('passwordInput'))
    ) {
      document.getElementById('passwordInput').focus();
      this.setState({ foundInput: true });
    }
  }

  render() {
    const {
      changePasswordInput,
      errors,
      formValues,
      intl: { formatMessage },
      redirectToFreshLogin,
      validatePassword,
    } = this.props;

    return (
      <ContainerMin>
        <Card>
          <CardHeader>
            <HeadingLarge>
              {formatMessage(MSG.WELCOME_FORM_PASSWORD_TITLE)}
            </HeadingLarge>
            <CardText>
              <FormattedMessage
                {...MSG.WELCOME_FORM_PASSWORD_DESCRIPTION}
                values={{
                  alternative: (
                    <ButtonLinkStyler btnBlue onClick={redirectToFreshLogin}>
                      {formatMessage(
                        MSG.WELCOME_FORM_PASSWORD_DESCRIPTION_ALTERNATIVE_LOGIN,
                      )}
                    </ButtonLinkStyler>
                  ),
                }}
              />
            </CardText>
          </CardHeader>
          <FormBodyStyler>
            <FormGroup>
              <Label for='passwordInput'>
                {formatMessage(MSG.WELCOME_FORM_PASSWORD_INPUT_PASSWORD_LABEL)}
              </Label>
              <Input
                id='passwordInput'
                type='password'
                name='password'
                value={formValues.password}
                placeholder={formatMessage(
                  MSG.WELCOME_FORM_PASSWORD_INPUT_PASSWORD_PLACEHOLDER,
                )}
                onChange={changeInputWithSubmit(changePasswordInput)}
                onKeyDown={detectSubmit(validatePassword)}
                invalid={_get(errors, 'password', []).length > 0}
              />
              <FormFeedback>
                {_get(errors, 'password', []).map((err, errIdx) => (
                  <div key={`error_${errIdx + 1}`}>{`* ${err}`}</div>
                ))}
              </FormFeedback>
            </FormGroup>
          </FormBodyStyler>
          <CardFooter>
            <Row>
              <Col>
                <ButtonStyler btnYellow onClick={validatePassword}>
                  {formatMessage(MSG.WELCOME_FORM_PASSWORD_BUTTON_LOGIN)}
                </ButtonStyler>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </ContainerMin>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
QuickAccessSection.propTypes = {
  /** Action to update password input's value */
  changePasswordInput: PropTypes.func,
  /** Form's error messages */
  errors: PropTypes.object,
  /** Form's input values */
  formValues: PropTypes.object,
  /** React Intl's instance object */
  intl: PropTypes.object,
  /** Action to change to fresh login form */
  redirectToFreshLogin: PropTypes.func,
  /** Action to validate typed-in password */
  validatePassword: PropTypes.func,
};

QuickAccessSection.defaultProps = {
  changePasswordInput: () => {},
  errors: {},
  formValues: {},
  intl: {},
  redirectToFreshLogin: () => {},
  validatePassword: () => {},
};
// ======================

export default withIntl(QuickAccessSection);
