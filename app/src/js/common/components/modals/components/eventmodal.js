import React from 'react';
import Modal from 'common/components/modal';
import DatePicker from 'common/components/datepicker';

class EventModal extends Modal {

  constructor(props) {

    super(props);

    this.state = {
      event: {
        time: {}
      }
    };

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.event) {

      this.setState({
        event: nextProps.event
      });

    }

  }

  updateEventField(event, field, ev) {

    const value = ev.target.value;

    if (field === 'timeH') {
      event.time = event.time || {};
      event.time.h = value;
    } else if (field === 'timeM') {
      event.time = event.time || {};
      event.time.m = value;
    } else {
      event[field] = value;
    }

    this.setState({
      event: event
    });

  }

  getModalLarge() {

    return 'modal-lg';

  }

  getFields() {

    const fields = [
      { title: 'Title', field: 'title', type: 'text' },
      { title: 'Description', field: 'description', type: 'text' },
      { title: 'Location', field: 'location', type: 'text' },
      { title: 'Category', field: 'category', type: 'text' },
      { title: 'Hour start', field: 'timeH', type: 'number', small: true },
      { title: 'Minute', field: 'timeM', type: 'number', small: true },
      { title: 'Duration', field: 'duration', type: 'number', small: true },
      { title: 'Public', field: 'public', type: 'checkbox' },
      { title: 'Indoor', field: 'locationType', type: 'radio' },
      { title: 'Outdoor', field: 'locationType', type: 'radio' }
    ];

    return this.getInputFields(this.state.event, fields, this.updateEventField);

  }

  getModalBody() {

    const event = this.state.event;
    const fields = this.getFields();

    return (
      <div className='create-event'>
        <form>
          <div className='col-md-6'>
            { fields }
          </div>

          <div className='col-md-6'>
            <div className='col-xs-12 u-ctr-flex u-ctr-flex-h'>
              <DatePicker />
            </div>
          </div>

          <div className='col-xs-12'>
            <button className='btn btn-success col-xs-12 u-mt-half'>
              Save
            </button>
          </div>
        </form>
      </div>
    );

  }

}

EventModal.defaultProps = {
  title: 'Eveniment'
};

export default EventModal;
