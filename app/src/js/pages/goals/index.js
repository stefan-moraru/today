import React from 'react';
import SecondHeader from 'common/components/secondheader';
import moment from 'moment';
import momentRange from 'moment-range';
import { GoalModal } from 'common/components/modals';
import Utils from 'common/utils';
import GoalsService from 'common/services/goalsservice';
import UserService from 'common/services/userservice';
require('./index.scss');

const CONST_CREATE_GOAL_MODAL_ID = 'goals-page-modal-goal';

class Goals extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      goals: [],
      selectedGoal: {},
      user: {}
    };

  }

  componentDidMount() {

    this.getGoals();
    UserService.profile().then(this.saveUser.bind(this));

  }

  saveUser(user) {

    this.setState({
      user: user
    });

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

  countDoneDays(startDate, endDate, goal) {

    let count = 0;

    moment().range(startDate, endDate)
    .by('days', item => {
      const date = moment(item).format('YYYY-MM-DD');
      const day = moment(item).isoWeekday();
      const done = goal.doneOn.indexOf(date) !== -1;

      if (done) {
        count++;
      }
    });

    return count;

  }

  getCells(startDate, endDate, goal) {

    let cellsRendered = [];

    moment().range(startDate, endDate)
    .by('days', item => {
      const date = moment(item).format('YYYY-MM-DD');
      const day = moment(item).isoWeekday();
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
      '',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    let sen = '';

    if (days.length === 7) {
      sen = 'Daily';
    } else {
      sen = days.map((day, index) => {
        return dayNames[day] + (index !== days.length - 1 ? ', ' : '');
      });
    }

    return sen;

  }

  goalSuccess(goal) {
    //TODO
  }

  goalFail(goal) {
    //TODO
  }

  generateChains() {

    const profile = {
      createdAt: this.state.user.createdAt
    };

    const startDate = moment(profile.createdAt);
    const endDate = moment(new Date()).add('10', 'days');

    const goalsRendered = this.state.goals
    .map((item, index) => {

      const cellsRendered = this.getCells(startDate, endDate, item);

      let duration = null;
      let minDays = null;

      if (item.duration) {
        duration = (
          <h6 className='f-light'>
            <i className='fa fa-clock-o'></i>
            { Utils.durationAsSentence(item.duration) }
          </h6>
        );
      }

      if (item.minDays) {
        let count = this.countDoneDays(startDate, endDate, item);
        const done = count >= item.minDays;

        if (done) {
          count = item.minDays;
        }

        minDays = (
          <h6 className='f-light'>
            <i className={`fa fa-${done ? 'check' : 'times'}`}></i>
            { count } out of { item.minDays } days
          </h6>
        );
      }

      const twitterLink = `https://twitter.com/intent/tweet?text=I just acomplished '${item.title}' today.`;

      const twitterButtonProps = {
        className: 'btn btn-success u-ml-quarter',
        onClick: this.goalSuccess.bind(this, item),
        disabled: !this.state.user.twitterData,
        'data-intro': index === 0 ? 'To share this on twitter, go to the Settings page and enable twitter' : null
      };

      return (
        <div className='col-xs-12' key={`page-goals-chains-chain-${index}`}>
          <div className='col-md-12 u-mb-full-2 chain'>
            <h2 className='f-light u-mb-half'>{ item.title }</h2>
            <h6 className='f-light u-mb-quarter'>
              <i className='fa fa-check-square-o'></i>
              { item.description }
            </h6>

            <h6 className='f-light u-mb-quarter'>
              <i className='fa fa-calendar'></i>
              { this.daysAsSentence(item.days) }
            </h6>

            { minDays }
            { duration }

            <div className='row'>
              <div className='cells col-md-8 push-md-2 col-xs-10 push-xs-1'>
                { cellsRendered }
              </div>
            </div>

            <div className='row u-mt-half'>
              <div className='col-xs-12'>
                <button className='btn' onClick={this.selectGoal.bind(this, item)} data-toggle='modal' data-target={`#${CONST_CREATE_GOAL_MODAL_ID}`}>
                  <i className='fa fa-edit'></i>
                </button>

                <button className='btn btn-success u-ml-quarter' onClick={this.goalSuccess.bind(this, item)}>
                  <i className='fa fa-check'></i>
                </button>

                <a href={this.state.user.twitterData ? twitterLink : '#'}>
                  <button {...twitterButtonProps}>
                    <i className='fa fa-check'></i>
                    <i className='fa fa-twitter u-ml-quarter'></i>
                  </button>
                </a>

                <button className='btn btn-danger u-ml-quarter' onClick={this.goalFail.bind(this, item)}>
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

    let secondHeader = null;
    let chains = null;
    let rendered = null;

    if (this.state.user.email) {
      secondHeader = this.generateSecondHeader();
      chains = this.generateChains();

      rendered = (
        <div className='p-goals'>
          <GoalModal id={CONST_CREATE_GOAL_MODAL_ID} goal={this.state.selectedGoal} />
          { secondHeader }

          <div className='col-xs-12'>
            <div className='row u-mt-full chains'>
              <div className='col-md-10 push-md-1'>
                { chains }
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      rendered = (
        <div className='full-loader u-ctr-flex u-ctr-flex-vh u-mt-full'>
          <img src='http://i.imgur.com/2CIo4so.gif' />
        </div>
      );
    }

    return rendered;


  }

}

export default Goals;
