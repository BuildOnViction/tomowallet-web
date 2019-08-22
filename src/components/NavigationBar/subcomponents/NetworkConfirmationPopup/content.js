/**
 *
 * TomoWallet - Network Update Confirmation Popup - Content
 *
 */
// ===== IMPORTS =====
// Modules
import React from 'react';
// Custom Components
import Image from '../../../Image';
import { WarningImages } from '../../../../styles';
// Constants & Styles
import { MSG } from '../../../../constants';
import imgWarning from '../../../../assets/images/img-warning.png';
// ===================

// ===== MAIN COMPONENT =====
export default ({ formatMessage }) => (
  <div className='text-center'>
    <WarningImages className='mb-5'>
      <Image src={imgWarning} alt={formatMessage(MSG.WARNING_IMAGE_ALT)} />
    </WarningImages>
    <span>
      {formatMessage(MSG.HEADER_NAVBAR_POPUP_NETWORK_CONFIRMATION_CONTENT_TEXT)}
    </span>
  </div>
);
// ==========================
