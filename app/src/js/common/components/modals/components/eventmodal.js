import React from 'react';
import Modal from 'common/components/modal';
import DatePicker from 'common/components/datepicker';
import FbUtils from 'common/utils/firebase';
import moment from 'moment';

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

    let value = ev.target.value;

    if (field === 'timeH' || field === 'timeM' || field === 'duration' || field === 'priority') {
      value = parseInt(value);
    }

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
      { title: 'Priority', field: 'priority', type: 'number' }
    ];

    return this.getInputFields(this.state.event, fields, this.updateEventField);

  }

  createEvent(ev) {

    ev.preventDefault();

    const event = this.state.event;

    FbUtils.createEvent(event)
    .then(() => {
      this.props.refresh();
    });

  }

  saveDate(date) {

    this.updateEventField(this.state.event, 'date', { target: { value: date.format('YYYY-MM-DD') } } );

  }

  deleteEvent(event, ev) {

    FbUtils.deleteEvent(event)
    .then(() => {
      this.props.refresh();
    });

  }

  getModalBody() {

    const event = this.state.event;
    const fields = this.getFields();

    const deleteButton = this.state.event.id ? (
      <div className='btn btn-danger col-xs-12 u-mt-half' onClick={this.deleteEvent.bind(this, this.state.event)} data-dismiss='modal'>
        Delete
      </div>
    ) : null;

    return (
      <div className='create-event u-mt-half'>
        <form>
          <div className='col-md-6'>
            { fields }
          </div>

          <div className='col-md-6'>
            <div className='col-xs-12 u-ctr-flex u-ctr-flex-h'>
              <DatePicker onClick={this.saveDate.bind(this)} selected={moment(event.date)} />
            </div>
          </div>

          <div className='col-xs-12'>
            { deleteButton }

            <button className='btn btn-success col-xs-12 u-mt-half' onClick={this.createEvent.bind(this)} data-dismiss='modal'>
              Save
            </button>
          </div>
        </form>
      </div>
    );

  }

}

EventModal.defaultProps = {
  title: 'Eveniment',
  refresh: () => {
    //
  }
};

export default EventModal;
