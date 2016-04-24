import React from 'react';
import moment from 'moment';
import Card from 'common/components/card';
import GoalsService from 'common/services/goalsservice';
import FbUtils from 'common/utils/firebase';

class GoalsCard extends Card {

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

    FbUtils.getGoalsForCurrentUser().then(this.saveGoals.bind(this));

  }

  saveGoals(goals) {

    this.setState({
      goals: goals
    });

  }

  getType() {

    return 'goals';

  }

  getTitle() {

    return this.props.title;

  }

  getIntroContent() {

    return 'A list of goals you want to achieve. You can complete them by going to the Goals page';

  }

  getContent() {

    const goals = this.state.goals.map(item => {

      item.dome = false;

      if ((item.doneOn || []).indexOf(moment().format('YYYY-MM-DD')) !== -1) {
        item.done = true;
      }

      return item;

    });

    const goalsRendered = goals.sort((a, b) => a.done > b.done).map((item, index) => {

      const goalProps = {
        className: 'goal ' + (item.done ? 'goal--done' : 'goal--not-done')
      };

      let icon = <i className='fa fa-times'></i>;

      if (item.done === true) {
        icon = <i className='fa fa-check'></i>;
      }

      return (
        <div className='goal-container' key={'c-card-goals-goal-item-' + index}>
          <div {...goalProps}>
            <h6 className='title'>{ item.title }</h6>

            <div className='pull-right icon'>
              { icon }
            </div>

            <div className='clearfix'></div>
          </div>
        </div>
      );

    });

    return (
      <div>
        { goalsRendered }
      </div>
    );

  }

}

export default GoalsCard;
