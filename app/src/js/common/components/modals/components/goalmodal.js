import React from 'react';
import Modal from 'common/components/modal';
import FbUtils from 'common/utils/firebase';

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

    const d = day + 1;

    if (goal.days.indexOf(d) !== -1) {

      goal.days.splice(goal.days.indexOf(d), 1);

    } else {

      goal.days.push(d);

    }

    this.setState({
      goal: goal
    });

  }

  getDays(goal) {

    const days = [ 'M', 'T', 'W', 'T', 'F', 'S', 'S' ];

    return days.map((item, index) => {

      let classNames = 'day u-fl u-c-pointer';

      if ((goal.days || []).indexOf(index + 1) !== -1) {

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
      { title: 'Duration', field: 'duration', type: 'number' },
      { title: 'How many days you want to do this?', field: 'minDays', type: 'number' }
    ];

    return this.getInputFields(this.state.goal, fields, this.updateGoalField);

  }

  createGoal() {

    const goal = this.state.goal;

    FbUtils.createGoal(goal)
    .then(() => {
      this.props.refresh();
    });

  }

  deleteGoal(goal, ev) {

    FbUtils.deleteGoal(goal)
    .then(() => {
      this.props.refresh();
    });

  }

  getModalBody() {

    const goal = this.state.goal;
    const fields = this.getFields();

    const deleteButton = this.state.goal.id ? (
      <div className='btn btn-danger col-xs-12 u-mt-half' onClick={this.deleteGoal.bind(this, this.state.goal)} data-dismiss='modal'>
        Delete
      </div>
    ) : null;

    return (
      <div className='create-goal'>
          { fields }
          <div className='days col-xs-12'>
            <h6>Days</h6>
            { this.getDays(goal) }
          </div>

          <div className='col-xs-12 u-mt-half'>
            { deleteButton }

            <button className='btn btn-success col-xs-12 u-mt-half' onClick={this.createGoal.bind(this)} data-dismiss='modal'>
              Save
            </button>
          </div>
      </div>
    );

  }

}

GoalModal.defaultProps = {
  title: 'Goal',
  refresh: () => {
    //
  }
};

export default GoalModal;
