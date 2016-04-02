import React from 'react';
import moment from 'moment';
import momentRange from 'moment-range';
import Utils from 'common/utils';
require('./index.scss');

class DatePicker extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      startOfMonth: moment().startOf('month'),
      endOfMonth: moment().endOf('month')
    };

  }

  getTbody() {

    const day = moment().startOf('month').day();
    let rows, rowInd, ind;

    rows = [ [ ], [ ], [ ], [ ], [ ], [ ] ];
    rowInd = 0;
    ind = day - 1;

    for (let i = 1; i < day; i++) {
      rows[0].unshift(null);
    }

    moment().range(this.state.startOfMonth, this.state.endOfMonth).by('days', item => {

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
          className: 'u-c-pointer',
          onClick: this.props.onClick.bind(this, column)
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

  switchToLastMonth() {

    this.setState({
      startOfMonth: moment(this.state.startOfMonth).subtract(1, 'months').startOf('month'),
      endOfMonth: moment(this.state.endOfMonth).subtract(1, 'months').endOf('month')
    });

  }

  switchToNextMonth() {

    this.setState({
      startOfMonth: moment(this.state.startOfMonth).add(1, 'months').startOf('month'),
      endOfMonth: moment(this.state.endOfMonth).add(1, 'months').endOf('month')
    });

  }

  render() {

    const tbody = this.getTbody();
    const months = [
      'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
    ];

    const month = months[this.state.startOfMonth.month()];

    return (
      <div className='c-datepicker'>
        <div className='u-hz-ctr'>
          <h6 className='title'>
            <i className='fa fa-chevron-left' onClick={this.switchToLastMonth.bind(this)}></i>
            <span className='title--text'>{ month }</span>
            <i className='fa fa-chevron-right' onClick={this.switchToNextMonth.bind(this)}></i>
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
