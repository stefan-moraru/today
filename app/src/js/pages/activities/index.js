import React from 'react';
import SecondHeader from 'common/components/secondheader';
import ActivityService from 'common/services/activityservice';
import Utils from 'common/utils';
import { EventModal } from 'common/components/modals';
import { PieChart, BarChart, RadarChart } from 'common/components/chart';
import './index.scss';

const PAGE_ACTIVITIES_MODAL_ID = 'page-activities-modal';

class Activities extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      activities: []
    };

  }

  componentDidMount() {

    ActivityService.getActivities().then(this.saveActivities.bind(this));

  }

  saveActivities(activities) {

    this.setState({
      activities: activities
    });

  }

  selectEvent(event) {

    this.setState({
      selectedEvent: event
    });

  }

  generateSecondHeader() {

    const secondHeaderProps = {
      items: [
        {
          'icon': 'plus',
          'toggle': 'modal',
          'target': `#${PAGE_ACTIVITIES_MODAL_ID}`
        }
      ]
    };

    return <SecondHeader {...secondHeaderProps} />;

  }

  generateActivities(activities) {

    const activitiesRendered = activities.map((activity, index) => {

      const props = {
        key: `p-activities-activity-${index}`,
        className: 'activity col-xs-12'
      };

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
        }
      ]
    };

      return (
        <div {...props}>
          <div className='col-xs-12'>
            <h2 className='f-light'>{ activity.title }</h2>
          </div>

          <div className='col-md-6'>
            <BarChart data={data} />
          </div>
          <div className='col-md-6'>
          </div>
        </div>
      );

    });

    return (
      <div className='activities'>
        { activitiesRendered }
      </div>
    );

    return null;

  }

  generateChartRadar() {
    var data = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 96, 27, 100]
          }
      ]
  };
      return <RadarChart data={data} />;
  }

  render() {

    const secondHeader = this.generateSecondHeader();
    const activities = this.generateActivities(this.state.activities);
    const activitiesChartRadar = this.generateChartRadar();

    return (
      <div className='p-activities'>
        <EventModal id={PAGE_ACTIVITIES_MODAL_ID} event={this.state.selectedEvent} />

        { secondHeader }

        <div className='col-xs-12'>
          { activities }
        </div>

        <div className='col-xs-12'>
          { activitiesChartRadar }
        </div>
      </div>
    );

  }

}

export default Activities;
