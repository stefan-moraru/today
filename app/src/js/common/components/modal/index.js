import React from 'react';
require('./index.scss');

class Modal extends React.Component {

  getModalHeader(title) {

    let header = null;

    if (title) {

      header = (
        <div className='modal-header'>
          <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
          <h4 className='modal-title'>{ title }</h4>
        </div>
      );

    }

    return header;

  }

  getModalBody() {

    return null;

  }

  render() {

    const body = this.getModalBody();
    const header = this.getModalHeader(this.props.title);

    return (
      <div className='modal fade' id={ this.props.id }>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            { header }
            <div className='modal-body'>
              { body }
              <div className='clearfix'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
