import React from 'react';
import Card from 'common/components/card';
import { PieChart } from 'common/components/chart';

class ChartCard extends Card {

  getType() {

    return `chart`;

  }

  getTitle() {

    return this.props.title;

  }

  getDescription() {

    return this.props.description;

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

    let rendered = chart;

    if (data.length < 1) {
      rendered = <h6 className='u-hz-ctr u-mt-half u-mb-half'>No data for chart</h6>;
    }

    return rendered;

  }

}

export default ChartCard;
