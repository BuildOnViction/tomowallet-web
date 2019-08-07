/**
 *
 * TomoWallet - Wallet Creation Page - Mnemonic Verification
 *
 * This component defines a form with shuffled words to verify
 * whether user has remembered/noted down the recovery phrase
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
} from 'reactstrap';
// Utilities
import { withIntl } from '../../../../components/IntlProvider';
import { MSG } from '../../../../constants';
// ===================

// ===== MAIN COMPONENT =====
class Verification extends PureComponent {
  render() {
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <Container fluid className='px-0'>
        <Row noGutters>
          <Col
            xs={12}
            sm={12}
            md={{ size: 10, offset: 1 }}
            lg={{ size: 6, offset: 3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{formatMessage(MSG.VERIFICATION_TITLE)}</CardTitle>
              </CardHeader>
              <CardBody />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
// ==========================

export default compose(withIntl)(Verification);
