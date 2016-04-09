import React from 'react';

class PanelInfo extends React.Component {

  render() {

    return (
      <div className='panel'>
        <div className='section u-mb-full'>
          <h1>About Today</h1>
          <h5>Today was created with the idea of helping.</h5>
        </div>

        <div className='section u-mb-full'>
          <h3>General</h3>
          <h5>This app serves as a centered hub of information around time management.</h5>
        </div>

        <div className='section u-mb-full'>
          <h3>Today</h3>
          <h5>Today is a center.</h5>
        </div>

        <div className='section u-mb-full'>
          <h3>Calendar</h3>
          <h5>..</h5>
        </div>

        <div className='section u-mb-full'>
          <h3>Goals</h3>
          <h5>Based on don't break the chain.

            Read more about it
          <a href='https://www.writersstore.com/dont-break-the-chain-jerry-seinfeld/' target='_blank'> here </a>
          or
          <a href='http://lifehacker.com/5886128/how-seinfelds-productivity-secret-fixed-my-procrastination-problem' target='_blank'> here</a>.
          </h5>
        </div>

        <div className='section u-mb-full'>
          <h3>Help</h3>
          <h5>You can get help by clicking on <i className='fa fa-question-square'></i>.</h5>
        </div>
      </div>
    );

  }

}

export default PanelInfo;
