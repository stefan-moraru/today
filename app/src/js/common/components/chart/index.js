import React from 'react';
import { Pie } from 'react-chartjs';

class PieChart extends React.Component {

  constructor(props) {

    super(props);

    this.chart = null;

  }

  componentWillReceiveProps(props) {

    const chartDefaultOptions = {
      responsive: true
    };

    const data = props.data;
    const options = Object.assign({}, props.options, chartDefaultOptions)

    const chartProps = {
      data: data,
      options: options
    };

    this.chart = <Pie {...chartProps} />;

  }

  render() {

    return (
      <div className='c-chart'>
        { this.chart }
      </div>
    );

  }

}

export {
  PieChart
};
