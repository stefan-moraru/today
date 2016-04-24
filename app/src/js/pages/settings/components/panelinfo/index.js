import React from 'react';

class PanelInfo extends React.Component {

  render() {

    return (
      <div className='panel'>
        <div className='section u-mb-full'>
          <h1>About Today</h1>
          <h5 className='f-light'>Today was created with the idea of helping all the people that struggle with time management. The project is open source and usage is free.</h5>
        </div>

        <div className='section col-md-6 u-mb-full u-p-0'>
          <h3>General</h3>
          <h5 className='f-light'>This app serves as a centered hub of information around time management. We provide you with the right tools for sppliting the current day into sub-tasks and for micromanagement of all your goals.</h5>
        </div>

        <div className='clearfix'></div>

        <div className='section col-md-6 u-p-0 u-mb-full'>
          <h3>Today</h3>
          <h5 className='f-light'>The today page is a center that contains multiple information about this day. You can see how it is structured, what people you will meet and what route you will take. Each day, you will see a resume that will provide you with all the details you need to jump-start your day. We base that on quite a lot of research (see <a href='http://www.businessinsider.com/mark-zuckerberg-same-t-shirt-2014-11' target='_blank'>this</a> and <a href='https://medium.com/@googleforwork/one-googler-s-take-on-managing-your-time-b441537ae037' target='_blank'>this</a>).</h5>
        </div>

        <div className='clearfix'></div>

        <div className='section col-md-6 u-p-0 u-mb-full'>
          <h3>Calendar</h3>
          <h5 className='f-light'>The calendar is a fully responsive web one. It will show you all your events, and colour them based on their priority. You can add events, or delete them.</h5>
        </div>

        <div className='clearfix'></div>

        <div className='section col-md-6 u-p-0 u-mb-full'>
          <h3>Goals</h3>
          <h5 className='f-light'>Based on don't break the chain.

            Read more about it
          <a href='https://www.writersstore.com/dont-break-the-chain-jerry-seinfeld/' target='_blank'> here </a>
          or
          <a href='http://lifehacker.com/5886128/how-seinfelds-productivity-secret-fixed-my-procrastination-problem' target='_blank'> here</a>.
            It is a method that implies having goals broken up in many small pieces, which you can achieve daily. Motivation will be achieved by visually seeing your progress.
          </h5>
        </div>

        <div className='clearfix'></div>

        <div className='section col-md-6 u-p-0 u-mb-full'>
          <h3>Activities</h3>
          <h5 className='f-light'>Seeing how much time you waste or spend in a good way is the perfect way to see if your way of managing time is on the right tracks.</h5>
        </div>

        <div className='clearfix'></div>

        <div className='section col-md-6 u-p-0 u-mb-full'>
          <h3>Help</h3>
          <h5 className='f-light'>You can get help by clicking on the question mark icon.</h5>
        </div>
      </div>
    );

  }

}

export default PanelInfo;
