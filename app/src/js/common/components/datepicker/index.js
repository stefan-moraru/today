import React from 'react';
import moment from 'moment';
import momentRange from 'moment-range';
import Utils from 'common/utils';
require('./index.scss');

class DatePicker extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

    };

  }

  getTbody() {

    //const month = moment().

    let rows = [
      [ ],
      [ ],
      [ ],
      [ ],
      [ ],
      [ ]
    ];

    const day = moment().startOf('month').day(); //pad left

    for (let i = 1; i < day; i++) {
      rows[0].unshift(null);
    }

    let ind = day - 1;
    let rowInd = 0;

    moment().range(moment().startOf('month'), moment().endOf('month')).by('days', item => {

      rows[rowInd][ind] = item;

      ind++;

      if (ind > 6) {
        ind = 0;
        rowInd++;
      }

    });

    let index = 1;

    const rowsRendered = rows.map(columns => {

      const columnsRendered = columns.map(column => {

        let dayRendered = null;

        if (column) {
          dayRendered = index;

          index = index + 1;
        }

        let tdProps = {
          className: 'u-c-pointer'
        };

        if (column && Utils.isToday(column.format('YYYY-MM-DD'))) {
          tdProps.className += ' today';
        }

        return (
          <td {...tdProps}>
            <span>{ dayRendered }</span>
          </td>
        );

      });

      return (
        <tr>
          { columnsRendered }
        </tr>
      );

    });

    return (
      <tbody>
        { rowsRendered }
      </tbody>
    );

  }

  render() {

    const tbody = this.getTbody();

    return (
      <div className='c-datepicker'>
        <div className='u-hz-ctr'>
          <h6 className='title'>
            <i className='fa fa-chevron-left'></i>
            <span className='title--text'>Februarie 2016</span>
            <i className='fa fa-chevron-right'></i>
          </h6>
        </div>

        <table className='table table-responsive'>
          <thead>
            <tr>
              <th>L</th>
              <th>M</th>
              <th>M</th>
              <th>J</th>
              <th>V</th>
              <th>S</th>
              <th>D</th>
            </tr>
          </thead>
          { tbody }
        </table>

      </div>
    );

  }

}

export default DatePicker;
