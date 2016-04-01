import React from 'react';
import Card from './card';
import { PieChart } from 'common/components/chart';

class ChartCard extends Card {

  getType() {

    return `chart`;

  }

  getTitle() {

    return this.props.title;

  }

  getChart(type = 'pie', data = [], options = {}) {

    const chartProps = {
      type: type,
      data: data,
      options: options
    };

    let chart;

    if (type === 'pie') {
      chart = <PieChart {...chartProps} />;
    }

    return chart;

  }

  getContent() {

    const type = this.props.type;
    const data = this.props.data;
    const options = this.props.options;

    const chart = this.getChart(type, data, options);

    return chart;

  }

}

export default ChartCard;
