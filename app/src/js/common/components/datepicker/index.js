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
      selected: this.props.selected
    };

  }

  isSelected(date) {

    return date.format('YYYY-MM-DD') === this.state.selected.format('YYYY-MM-DD');

  }

  onClick(column) {

    this.setState({
      selected: column
    });

    return this.props.onClick.bind(this, column);

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

    const rowsRendered = rows.map(columns => {

      const columnsRendered = columns.map(column => {

        let dayRendered = null;

        if (column) {
          dayRendered = index;

          index = index + 1;
        }

        let tdProps = {
          className: '',
          onClick: this.onClick.bind(this, column)
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
        <div className='u-hz-ctr u-mt-full u-mb-half'>
          <i className='fa fa-chevron-left u-c-pointer' onClick={this.switchToLastMonth.bind(this)}></i>
          <span className='title'>{ month }</span>
          <i className='fa fa-chevron-right u-c-pointer' onClick={this.switchToNextMonth.bind(this)}></i>
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

DatePicker.defaultProps = {
  onClick: () => {
    //
  },
  selected: moment()
};

export default DatePicker;
