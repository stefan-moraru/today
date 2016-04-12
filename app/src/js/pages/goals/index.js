import React from 'react';
import SecondHeader from 'common/components/secondheader';
import moment from 'moment';
import momentRange from 'moment-range';
import { GoalModal } from 'common/components/modals';
import Utils from 'common/utils';
import GoalsService from 'common/services/goalsservice';
require('./index.scss');

const CONST_CREATE_GOAL_MODAL_ID = 'goals-page-modal-goal';

class Goals extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      goals: [],
      selectedGoal: {}
    };

  }

  componentDidMount() {

    this.getGoals();

  }

  selectGoal(goal) {

    this.setState({
      selectedGoal: goal
    });

  }

  getGoals() {

    GoalsService.getGoals().then(this.saveGoals.bind(this));

  }

  saveGoals(goals) {

    this.setState({
      goals: goals
    });

  }

  generateSecondHeader() {

    const secondHeaderProps = {
      items: [
        {
          'icon': 'plus',
          'toggle': 'modal',
          'target': `#${CONST_CREATE_GOAL_MODAL_ID}`
        }
      ]
    };

    return <SecondHeader {...secondHeaderProps} />;

  }

  getCells(startDate, endDate, goal) {

    let cellsRendered = [];

    moment().range(startDate, endDate)
    .by('days', item => {
      const date = moment(item).format('YYYY-MM-DD');
      const day = moment(item).day();
      const done = goal.doneOn.indexOf(date) !== -1;

      if (goal.days.indexOf(day) !== -1) {

        const cellProps = {
          className: 'cell ' + (done ? 'done' : ''),
          key: `page-goals-cells-cell-${date}`
        };

        cellsRendered.push((
          <div {...cellProps}>
          </div>
        ));

      }
    });

    return cellsRendered;

  }

  daysAsSentence(days) {

    const dayNames = [
      'Luni',
      'Marti',
      'Miercuri',
      'Joi',
      'Vineri',
      'Sambata',
      'Duminica'
    ];

    let sen = '';

    if (days.length === 7) {
      sen = 'Zilnic';
    } else {
      sen = days.map((day, index) => {
        return dayNames[day] + (index !== days.length - 1 ? ', ' : '');
      });
    }

    return sen;

  }

  generateChains() {

    const profile = {
      createdAt: new Date('2016-01-01')
    };

    const startDate = moment(profile.createdAt);
    const endDate = moment(new Date());

    const goalsRendered = this.state.goals
    .map((item, index) => {

      const cellsRendered = this.getCells(startDate, endDate, item);

      let duration = null;

      if (item.duration) {
        duration = (
          <h6 className='f-light'>
            <i className='fa fa-clock-o'></i>
            { Utils.durationAsSentence(item.duration) }
          </h6>
        );
      }

      return (
        <div className='col-xs-12' key={`page-goals-chains-chain-${index}`}>
          <div className='col-md-6 u-mb-full-2 chain'>
            <h2 className='f-light'>{ item.title }</h2>
            <h6 className='f-light'>
              <i className='fa fa-check-square-o'></i>
              { item.description }
            </h6>

            <h6 className='f-light'>
              <i className='fa fa-calendar'></i>
              { this.daysAsSentence(item.days) }
            </h6>

            { duration }

            <div className='row'>
              <div className='cells col-xs-12'>
                { cellsRendered }
              </div>
            </div>

            <div className='row u-mt-half'>
              <div className='col-xs-12'>
                <button className='btn' onClick={this.selectGoal.bind(this, item)} data-toggle='modal' data-target={`#${CONST_CREATE_GOAL_MODAL_ID}`}>
                  <i className='fa fa-edit'></i>
                </button>

                <button className='btn btn-success u-ml-quarter'>
                  <i className='fa fa-check'></i>
                </button>

                <button className='btn btn-danger u-ml-quarter'>
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    });

    return goalsRendered;

  }

  render() {

    const secondHeader = this.generateSecondHeader();
    const chains = this.generateChains();

    return (
      <div className='p-goals'>
        <GoalModal id={CONST_CREATE_GOAL_MODAL_ID} goal={this.state.selectedGoal} />
        { secondHeader }

        <div className='col-xs-12'>
          <div className='row u-mt-full chains'>
            <div className='col-md-10 col-md-push-1'>
              { chains }
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default Goals;
