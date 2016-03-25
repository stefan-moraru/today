import React from 'react';
import Header from 'common/components/header';

class Timeline extends React.Component {

  componentDidMount() {

    const dots = document.querySelectorAll('.dot');

    for (let i = 0; i < dots.length; i++) {
      let dot = dots[i];

      dot.onmouseenter = (ev) => {
        const left = parseFloat(window.getComputedStyle(dot).left) - parseFloat(parseFloat(window.getComputedStyle(document.getElementById('c-timeline-description-title')).width) / 2);

        document.getElementById('c-timeline-description').children[0].innerHTML = dot.dataset.title;
        document.getElementById('c-timeline-description').children[1].innerHTML = dot.dataset.description;
        document.getElementById('c-timeline-description').style.visibility = `visible`;
        document.getElementById('c-timeline-description').style.visibility = `visible`;
        document.getElementById('c-timeline-description').style.left = `${left}px`;
      };

      dot.onmouseleave = (ev) => {
        document.getElementById('c-timeline-description').style.visibility = `hidden`;
      };
    }
  }

  render() {

    const events = [
      { title: 'Hello', time: { h: '8', m: '0', s: '0' } },
      { title: 'Hi', time: { h: '10', m: '0', s: '0' } },
      { time: { h: '16', m: '0', s: '0' } },
      { time: { h: '20', m: '0', s: '0' } }
    ];

    const eventsRendered = events.map(event => {

      const extraClasses = `dot dot-${event.time.h} bg-info`;

      const dotProps = {
        'className': extraClasses,
        'data-title': event.title,
        'data-description': event.description
      };

      return (
        <div {...dotProps}></div>
      );

    });

    return (
      <div className='c-timeline'>
        <div className='description' id='c-timeline-description'>
          <h4 id='c-timeline-description-title'>Team lunch</h4>
          <p>With Dev team @ Palas</p>
          <div className='line'></div>
        </div>

        <progress className='progress progress-info' value='5' max='24'></progress>

        <div className='dots'>
          { eventsRendered }
        </div>
      </div>
    );

  }

}

class Section extends React.Component {

  render() {

    return (
      <div className='section'>
        { this.props.children }
      </div>
    );

  }

}

class Today extends React.Component {

  render() {

    return (
      <div className='today'>
        <Section>
          <div className='row'>
            <div className='col-xs-12 u-hz-ctr'>
              <h1 className='display-4'>Astăzi</h1>
            </div>
          </div>
        </Section>

        <div className='row'>
          <div className='col-md-10 col-md-push-1'>
            <Timeline />
          </div>
        </div>
      </div>
    );

  }

}

export default Today;
