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

  getInputFields(event, fields, cb) {

    const fieldsRendered = fields.map((item, index) => {

      let colClass = item.small ? 'col-md-4' : 'col-md-12';

      colClass = item.medium ? 'col-md-6': colClass;

      return (
        <div className={`form-group ${colClass}`} key={`modal-inputfields-${event.id}-${index}`}>
          <h6>{ item.title }</h6>
          <input type={ item.type } className='form-control' value={event[item.field]} onMouseEnter={cb.bind(this, event, item.field)} />
        </div>
      );

    });

    return (
      <div>
        { fieldsRendered }

        <div className='clearfix'></div>
      </div>
    );

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
