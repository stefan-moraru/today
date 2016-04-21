import React from 'react';
import { Pie, Bar, Radar } from 'react-chartjs';

class PieChart extends React.Component {

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

class BarChart extends React.Component {

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
        <Bar {...chartProps} />
      </div>
    );

  }

}

class RadarChart extends React.Component {

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
        <Radar redraw {...chartProps} />
      </div>
    );

  }

}

export {
  PieChart,
  BarChart,
  RadarChart
};
