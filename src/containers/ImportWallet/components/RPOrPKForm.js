/**
 *
 * Import Wallet Page - Recovery Phrase/Private Key Form
 *
 */
// Modules
import React, { PureComponent } from 'react';
import { get as _get } from 'lodash';
import { Row, Col, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import { RPOrPKFormStyler } from '../style';
import { ButtonStyler } from '../../../styles';

// ===== MAIN COMPONENT =====
class RPOrPKForm extends PureComponent {
  render() {
    const {
      isLocked,
      toggleLock,
      formValues,
      updateInput,
      accessWallet,
    } = this.props;
    return (
      <RPOrPKFormStyler fluid className='p-0'>
        <Row noGutters className='mb-2'>
          <Col>
            <div className='phrase-key-input'>
              <div
                role='presentation'
                onClick={toggleLock}
                className='lock-unlock-icon'
              >
                {isLocked ? (
                  <FontAwesomeIcon icon='lock' />
                ) : (
                  <FontAwesomeIcon icon='unlock' />
                )}
              </div>
              <Input
                type='textarea'
                name='textValue'
                placeholder='Enter your Recovery Phrase or Private Key.'
                value={_get(formValues, 'textValue', '')}
                onChange={e => updateInput('textValue', e.target.value)}
              />
            </div>
          </Col>
        </Row>
        <Row noGutters className='mb-5'>
          <Col>
            <span className='import-by-qrcode'>
              Import Private Key via QR Code
            </span>
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Row noGutters>
              <Col xs={12} sm={12} md={12} lg={{ size: 4, offset: 4 }}>
                <ButtonStyler onClick={accessWallet}>Import</ButtonStyler>
              </Col>
            </Row>
          </Col>
        </Row>
      </RPOrPKFormStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
RPOrPKForm.propTypes = {};
// ======================

export default RPOrPKForm;
