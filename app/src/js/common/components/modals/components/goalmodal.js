import React from 'react';
import Modal from 'common/components/modal';

class GoalModal extends Modal {

  constructor(props) {

    super(props);

    this.state = {
      goal: {}
    };

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.goal) {

      this.setState({
        goal: nextProps.goal
      });

    }

  }

  updateGoalField(field, ev) {

    let goal = this.state.goal;

    goal[field] = ev.target.value;

    this.setState({
      goal: goal
    });

  }

  selectDay(day) {

    let goal = this.state.goal;

    goal.days = goal.days || [];

    if (goal.days.indexOf(day) !== -1) {

      goal.days.splice(goal.days.indexOf(day), 1);

    } else {

      goal.days.push(day);

    }

    this.setState({
      goal: goal
    });

  }

  getDays(goal) {

    const days = [ 'L', 'M', 'Mi', 'J', 'V', 'S', 'D' ];

    return days.map((item, index) => {

      let classNames = 'day u-fl u-c-pointer';

      if ((goal.days || []).indexOf(index) !== -1) {

        classNames += ' day--selected';

      }

      return (
        <div className={ classNames } onClick={this.selectDay.bind(this, index)}>
          { item }
        </div>
      );

    });

  }

  getModalBody() {

    const goal = this.state.goal;

    return (
      <div className='create-goal'>
        <form>
          <input type='text' className='form-control' placeholder='Title' value={goal.title} onChange={this.updateGoalField.bind(this, 'title')} />
          <textarea className='form-control' placeholder='Description' value={goal.description} onChange={this.updateGoalField.bind(this, 'description')}></textarea>
          <input type='number' className='form-control' placeholder='Duration' value={goal.duration} onChange={this.updateGoalField.bind(this, 'duration')} />
          <div className='days'>
            { this.getDays(goal) }
          </div>
          <button className='btn btn-success col-xs-12 u-mt-half'>
            Creaza goal
          </button>
        </form>
      </div>
    );

  }

}

GoalModal.defaultProps = {
  title: 'Goal'
};

export default GoalModal;
