/**
 *
 * TomoWallet - File Upload Input
 *
 * This component allows user to choose or drag/drop a file to upload
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom Components
import { FileUploadInputStyler } from './style';
// Utilities & Constants
import { getMessage } from '../IntlProvider';
import { MSG } from '../../constants';
// ===================

// ===== MAIN COMPONENT =====
class FileUploadInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      fileName: '',
    };

    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleResetInput = this.handleResetInput.bind(this);
  }

  handleChangeFile(e) {
    const { onError, onLoaded } = this.props;
    const file = _get(e, 'dataTransfer.files.0') || _get(e, 'target.files.0');

    if (file) {
      const fileReader = new FileReader();

      fileReader.readAsText(file);
      fileReader.onloadend = () => {
        try {
          onLoaded(fileReader.result);
          this.setState({
            active: false,
            fileName: file.name,
          });
        } catch (error) {
          onError(error.message);
        }
      };
    }
  }

  handleDragEnter() {
    this.setState({ active: true });
  }

  handleDragLeave() {
    this.setState({ active: false });
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    e.preventDefault();
    this.setState({ active: false });
    this.handleChangeFile(e);
  }

  handleResetInput(e) {
    e.target.value = '';
  }

  render() {
    const { active, fileName } = this.state;

    return (
      <FileUploadInputStyler active={active}>
        <label
          className='upload-area align-center text-center'
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop}
        >
          {fileName ? (
            <Fragment>
              <FontAwesomeIcon icon={['far', 'file-alt']} />
              <div className='file-name'>{fileName}</div>
            </Fragment>
          ) : (
            <Fragment>
              <FontAwesomeIcon icon="cloud-upload-alt" />
              <div className='upload-text'>
                <span>{getMessage(MSG.INPUT_FILE_UPLOAD_PLACEHOLDER)}</span>
              </div>
            </Fragment>
          )}
          <input
            type='file'
            name='file'
            onClick={this.handleResetInput}
            onChange={this.handleChangeFile}
          />
        </label>
      </FileUploadInputStyler>
    );
  }
}
// ==========================

// ===== PROP TYPES =====
FileUploadInput.propTypes = {
  /** Action to handle exception */
  onError: PropTypes.func,
  /** Action to handle file content after uploaded */
  onLoaded: PropTypes.func,
};

FileUploadInput.defaultProps = {
  onError: () => {},
  onLoaded: () => {},
};
// ======================

export default FileUploadInput;
