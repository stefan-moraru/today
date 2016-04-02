import React from 'react';
import { Pie } from 'react-chartjs';

class PieChart extends React.Component {

  constructor(props) {

    super(props);

  }

  render() {

    const chartDefaultOptions = {
      responsive: true
    };

    const data = this.props.data;
    const options = Object.assign({}, this.props.options, chartDefaultOptions)

    const chartProps = {
      data: data,
      options: options
    };

    return (
      <div className='c-chart'>
        <Pie {...chartProps} />
      </div>
    );

  }

}

export {
  PieChart
};
