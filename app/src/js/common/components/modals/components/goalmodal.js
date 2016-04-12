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
        <div className={ classNames } onClick={this.selectDay.bind(this, index)} key={`modal-goal-days-day-${index}`}>
          { item }
        </div>
      );

    });

  }

  updateGoalField(goal, field, ev) {

    goal[field] = ev.target.value;

    this.setState({
      goal: goal
    });

  }


  getFields() {

    const fields = [
      { title: 'Title', field: 'title', type: 'text' },
      { title: 'Description', field: 'description', type: 'text' },
      { title: 'Duration', field: 'duration', type: 'number' }
    ];

    return this.getInputFields(this.state.goal, fields, this.updateGoalField);

  }

  getModalBody() {

    const goal = this.state.goal;
    const fields = this.getFields();

    return (
      <div className='create-goal'>
        <form>
          { fields }
          <div className='days col-xs-12'>
            <h6>Days</h6>
            { this.getDays(goal) }
          </div>

          <div className='col-xs-12 u-mt-half'>
            <button className='btn btn-success col-xs-12 u-mt-half'>
              Save
            </button>
          </div>
        </form>
      </div>
    );

  }

}

GoalModal.defaultProps = {
  title: 'Goal'
};

export default GoalModal;
