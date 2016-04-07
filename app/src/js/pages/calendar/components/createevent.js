import React from 'react';
import DatePicker from 'common/components/datepicker';

class CreateEvent extends React.Component {

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

  updateEventField(fields, ev) {

    let event = this.state.event;

    const field1 = fields.split('.')[0];

    if (field1) {
      event[field1] = ev.target.value;
    }

    this.setState({
      event: event
    });

  }

  render() {

    const event = this.state.event;

    return (
      <div className='create-event'>
        <h5>Creaza un eveniment</h5>

        <form>
          <input type='text' className='form-control' placeholder='Title' value={event.title} onChange={this.updateEventField.bind(this, 'title')} />
          <textarea className='form-control' placeholder='Description' value={event.description} onChange={this.updateEventField.bind(this, 'description')}></textarea>
          <input type='text' className='form-control' placeholder='Location' value={event.location} onChange={this.updateEventField.bind(this, 'location')} />

          <DatePicker />

          <div className='row'>
            <div className='col-xs-4'>
              <input type='number' className='form-control' placeholder='H' min='0' max='24' value={(event.time || {}).h} onChange={this.updateEventField.bind(this, 'time.h')} />
            </div>
            <div className='col-xs-4'>
              <input type='number' className='form-control' placeholder='M' min='0' max='60' step='30' value={(event.time || {}).m} onChange={this.updateEventField.bind(this, 'time.m')} />
            </div>
            <div className='col-xs-4'>
              <input type='number' className='form-control' placeholder='D' value={event.duration} onChange={this.updateEventField.bind(this, 'duration')} />
            </div>
          </div>

          <input type='number' className='form-control' placeholder='Categories (CSV)' />

          <button className='btn btn-success col-xs-12 u-mt-half'>
            Creaza eveniment
          </button>
        </form>
      </div>
    );

  }

}

export default CreateEvent;
