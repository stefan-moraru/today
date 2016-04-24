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
      endOfMonth: moment().endOf('month'),
      selected: null
    };

  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      selected: nextProps.selected
    });

  }

  isSelected(date) {

    let selected = false;

    if (!this.state.selected) {
      selected = false;
    } else {
      selected = date.format('YYYY-MM-DD') === this.state.selected.format('YYYY-MM-DD');
    }

    return selected;

  }

  onClick(column) {

    this.setState({
      selected: column
    });

    return this.props.onClick.call(this, column);

  }

  getTbody() {

    let day = this.state.startOfMonth.day();

    if (day === 0) {
      day = 7;
    }

    let rows, rowInd, ind;
    rows = [ [ ], [ ], [ ], [ ], [ ], [ ] ];
    rowInd = 0;

    for (let i = 1; i < day; i++) {
      rows[0].unshift(null);
    }

    ind = day;

    moment().range(this.state.startOfMonth, this.state.endOfMonth).by('days', item => {

      rows[rowInd][ind] = item;

      if (ind > 6) {
        ind = 0;
        rowInd++;
      }

      ind++;

    });

    let index = 1;

    const rowsRendered = rows.map((columns, ind3) => {

      const columnsRendered = columns.map((column, index2) => {

        let dayRendered = null;

        if (column) {
          dayRendered = index;

          index = index + 1;
        }

        let tdProps = {
          className: '',
          onClick: this.onClick.bind(this, column),
          key: `datepicker-column-${index2}`
        };

        if (column && this.isSelected(column)) {
          tdProps.className += ' today';
        }

        if (column) {
          tdProps.className += ' hover u-c-pointer';
        }

        return (
          <td {...tdProps}>
            <span>{ dayRendered }</span>
          </td>
        );

      });

      return (
        <tr key={`datepicker-row-${ind3}`}>
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
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = months[this.state.startOfMonth.month()];

    return (
      <div className='c-datepicker'>
        <div className='u-hz-ctr u-mt-full u-mb-half'>
          <i className='fa fa-chevron-left u-c-pointer' onClick={this.switchToLastMonth.bind(this)}></i>
          <span className='title'>{ month }</span>
          <i className='fa fa-chevron-right u-c-pointer' onClick={this.switchToNextMonth.bind(this)}></i>
        </div>

        <table className='table table-responsive'>
          <thead>
            <tr>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
              <th>Su</th>
            </tr>
          </thead>
          { tbody }
        </table>

      </div>
    );

  }

}

DatePicker.defaultProps = {
  onClick: () => {
    //
  },
  selected: null
};

export default DatePicker;
