import React from 'react';
import SecondHeader from 'common/components/secondheader';
import ActivityService from 'common/services/activityservice';
import Utils from 'common/utils';
import { EventModal } from 'common/components/modals';
import { PieChart, BarChart, RadarChart } from 'common/components/chart';
import Activity from './components/activity';
import SpentBarChart from './components/spentbarchart';
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

      return <Activity {...activity} />;

    });

    return (
      <div className='activities'>
        { activitiesRendered }
      </div>
    );

  }

  generateChartRadar() {

    return null;

    const data = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [
        {
          label: "Last week",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "Next week",
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

  generateActivitiesBarChart() {

    let spentListGood = [], spentListBad = [];

      //TODO if (start.isoWeek() === moment().isoWeek()) {
    this.state.activities.forEach(item => {
      if (item.good) {
        spentListGood = spentListGood.concat(item.spent || []);
      } else {
        spentListBad = spentListBad.concat(item.spent || []);
      }
    });

    return <SpentBarChart spentList={spentListGood} spentList2={spentListBad} />;

  }

  render() {

    const secondHeader = this.generateSecondHeader();
    const activities = this.generateActivities(this.state.activities);
    const activitiesChartRadar = this.generateChartRadar();
    const activitiesBarChart = this.generateActivitiesBarChart();

    return (
      <div className='p-activities'>
        <EventModal id={PAGE_ACTIVITIES_MODAL_ID} event={this.state.selectedEvent} />

        { secondHeader }

        <div className='col-xs-12 u-mt-full'>
          { activities }
        </div>

        <div className='col-md-8 push-md-2'>
          <h3 className='f-light u-mb-half'>This weeks' wasted / useful balance</h3>
          { activitiesBarChart }
        </div>
      </div>
    );

  }

}

export default Activities;
