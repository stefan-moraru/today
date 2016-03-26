import React from 'react';
import Header from 'common/components/header';

class Timeline extends React.Component {

  render() {

    const events = [
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '4', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '8', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '10', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '16', m: '0', s: '0' } },
      { title: 'Hello', description: 'Lorem pisum asimda diasnmda', time: { h: '23', m: '0', s: '0' } }
    ];

    const eventsRendered = events.map((event, index) => {

      const extraClasses = `dot dot-${event.time.h}`;

      const dotProps = {
        'className': extraClasses,
        'data-title': event.title,
        'data-description': event.description,
        'key': 'c-timeline-item-' + index
      };

      return (
        <div {...dotProps}>
          <div className='circle'></div>

          <div className='description'>
            <h4>{ event.title }</h4>
          </div>
        </div>
      );

    });

    return (
      <div className='c-timeline'>
        <progress className='progress progress-info' value='5' max='24'></progress>

        <div className='dots'>
          { eventsRendered }
        </div>
      </div>
    );

  }

}

class Section extends React.Component {

  render() {

    return (
      <div className='section'>
        { this.props.children }
      </div>
    );

  }

}
import { Pie, Bar } from 'react-chartjs';

class BarChart extends React.Component {

  render() {
    var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

    var chartOptions = {
      responsive: true
    };

    return <Bar data={data} options={chartOptions} />

  }
}

class PieChart extends React.Component {

  render() {

    var chartData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
    ];

    var chartOptions = {
      responsive: true
    };

    return <Pie data={chartData} options={chartOptions} />

  }

}

class Today extends React.Component {

  render() {

    return (
      <div className='today col-xs-12'>
        <div className='row'>
          <div className='col-xs-12 u-hz-ctr'>
            <h1 className='display-4'>Astăzi</h1>
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-10 col-md-push-1'>
            <Timeline />
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-10 col-md-push-1'>
            <h5>Ziua de astazi</h5>
            <p>Ai multa treaba astazi, dar ai pauze intre majoritatea evenimentelor.</p>
          </div>
        </div>

        <div className='row u-mt-full'>
          <div className='col-md-10 col-md-push-1 u-mt-half'>
            <div className='card-columns'>
              <div className="card card-block">
                <PieChart />
              </div>
              <div className="card card-block">
                <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAEypkJ8m2C1aDAzG_VhOiKn7sMIE0n5Wk&q=Space+Needle,Seattle+WA"></iframe>
              </div>
              <div className="card card-block">
                <BarChart />
              </div>
              <div className="card card-block">
              </div>
              <div className="card card-block">
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default Today;
