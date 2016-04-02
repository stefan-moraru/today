import React from 'react';
import DatePicker from 'common/components/datepicker';

class CreateEvent extends React.Component {

  render() {

        /* id: 1,
        title: 'Breakdance practice',
        description: 'Buna ziua sunt un dinozaur',
        location: 'Podu Ros',
        date: '2016-04-01',
        time: { h: 8, m: 0 },
        duration: 180,

        category: { id: 0, title: 'sports' },
        attendees: [ */
    return (
      <div>
        <form>
          <div className='input-group'>
            <span className='input-group-addon'></span>
            <input type='text' className='form-control' placeholder='Title' />
          </div>

          <div className='input-group'>
            <span className='input-group-addon'></span>
            <textarea className='form-control' placeholder='Description'></textarea>
          </div>

          <div className='input-group'>
            <span className='input-group-addon'></span>
            <input type='text' className='form-control' placeholder='Location' />
          </div>

          <DatePicker />

          <div className='row'>
            <div className='input-group col-xs-6'>
              <span className='input-group-addon'></span>
              <input type='number' className='form-control' placeholder='H' />
            </div>
            <div className='input-group col-xs-6'>
              <span className='input-group-addon'></span>
              <input type='number' className='form-control' placeholder='M' />
            </div>
          </div>

          <div className='input-group'>
            <span className='input-group-addon'></span>
            <input type='number' className='form-control' placeholder='Duration' />
          </div>

          <div className='input-group'>
            <span className='input-group-addon'></span>
            <input type='number' className='form-control' placeholder='Categories (CSV)' />
          </div>

          <div>
            <input type='checkbox' className='form-control' placeholder='Public' /> Public
          </div>

          <button className='btn btn-success col-xs-12'>
            Creaza eveniment
          </button>
        </form>
      </div>
    );

  }

}

export default CreateEvent;
