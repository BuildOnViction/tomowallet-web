/**
 *
 * TomoWallet - File Upload Input
 *
 * This component allows user to choose or drag/drop a file to upload
 */
// ===== IMPORTS =====
// Modules
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
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
  }

  handleChangeFile(e) {
    const { onError, onLoaded } = this.props;
    const file = _get(e, 'dataTransfer.files.0') || _get(e, 'target.files.0');

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

  render() {
    const { active, fileName } = this.state;

    return (
      <FileUploadInputStyler
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        active={active}
      >
        <div className='upload-button'>
          <span>{getMessage(MSG.INPUT_FILE_UPLOAD_BUTTON_LABEL)}</span>
        </div>
        <div className='upload-input text-truncate'>
          <span className={fileName && 'loaded'}>
            {fileName || getMessage(MSG.INPUT_FILE_UPLOAD_PLACEHOLDER)}
          </span>
        </div>
        <input type='file' name='file' onChange={this.handleChangeFile} />
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
