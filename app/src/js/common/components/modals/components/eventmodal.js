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

  getFields() {

    const fields = [
      { title: 'Title', field: 'title', type: 'text' },
      { title: 'Description', field: 'description', type: 'text' },
      { title: 'Location', field: 'location', type: 'text', medium: true },
      { title: 'Category', field: 'category', type: 'text', medium: true },
      { title: 'Hours', field: 'hours', type: 'number', small: true },
      { title: 'Minutes', field: 'minutes', type: 'number', small: true },
      { title: 'Duration', field: 'duration', type: 'number', small: true },
      { title: 'Public', field: 'public', type: 'checkbox' },
      { title: 'Indoor', field: 'locationType', type: 'checkbox' },
      { title: 'Outdoor', field: 'locationType', type: 'checkbox' }
    ];

    return this.getInputFields(this.state.event, fields, this.updateEventField);

  }

  getModalBody() {

    const event = this.state.event;
    const fields = this.getFields();

    return (
      <div className='create-event'>
        <form>
          { fields }

          <div className='col-xs-12 col-md-8 col-md-push-2'>
            <DatePicker />
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
