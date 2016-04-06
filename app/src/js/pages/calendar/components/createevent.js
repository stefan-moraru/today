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
      <div className='create-event'>
        <form>
          <input type='text' className='form-control' placeholder='Title' />
          <textarea className='form-control' placeholder='Description'></textarea>
          <input type='text' className='form-control' placeholder='Location' />

          <DatePicker />

          <div className='row'>
            <div className='col-xs-4'>
              <input type='number' className='form-control' placeholder='H' />
            </div>
            <div className='col-xs-4'>
              <input type='number' className='form-control' placeholder='M' />
            </div>
            <div className='col-xs-4'>
              <input type='number' className='form-control' placeholder='D' />
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
