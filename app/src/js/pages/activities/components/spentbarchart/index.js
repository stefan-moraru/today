import React from 'react';
import { PieChart, BarChart, RadarChart } from 'common/components/chart';
import moment from 'moment';

class SpentBarChart extends React.Component {

  getDataSet(spentList, good = true) {

    let color = 'rgb(231, 76, 60)';

    if (good) {
      color = 'rgb(46, 204, 113)';
    }

    let timePerDay = [0, 0, 0, 0, 0, 0, 0];

    spentList.forEach(spent => {

      timePerDay[moment(spent.date).isoWeekday() - 1] += spent.duration;

    });

    return {
      label: 'Time spent',
      fillColor: color,
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: timePerDay
    };

  }

  render() {

    const spentList1 = this.props.spentList;
    const spentList2 = this.props.spentList2;
    const good = this.props.good;

    let data = {
      labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
      datasets: [
        this.getDataSet(spentList1, true)
      ]
    };

    if (spentList2) {
      data.datasets.push(this.getDataSet(spentList2, false));
    }

    return <BarChart data={data} />;

  }

}

SpentBarChart.defaultProps = {
  spentList: [],
  spentList2: null,
  good: false
};

export default SpentBarChart;
