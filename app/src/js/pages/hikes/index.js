import React from 'react';
import SecondHeader from 'common/components/secondheader';
import EventService from 'common/services/eventservice';
import { MapCard } from 'common/components/cards';
import Utils from 'common/utils';
import { EventModal } from 'common/components/modals';
import './index.scss';

const CREATE_HIKE_MODAL_ID = 'page-hikes-modal-create-hike';

class Hikes extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      events: [],
      selectedEvent: {}
    };

  }

  componentDidMount() {

    EventService.getHikes().then(this.saveEvents.bind(this));

  }

  saveEvents(events) {

    this.setState({
      events: events
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
          'target': `#${CREATE_HIKE_MODAL_ID}`
        }
      ]
    };

    return <SecondHeader {...secondHeaderProps} />;

  }

  generateHikes(hikes) {

    return hikes.map((item, index) => {

      const mapProps = {
        locations: item.locations
      };

      const locations = item.locations.map((location, ind2) => {

        return (
          <div className='item' key={`page-hikes-hike-item-${ind2}`}>
            <i className='fa fa-map-marker'></i>
            <span> { location }</span>
          </div>
        );

      });

      const duration = Utils.durationAsSentence(item.duration);

      return (
        <div className='row' key={`page-hikes-hike-${index}`}>
          <div className='col-xs-12 hike'>
            <div className='col-md-6'>
              <MapCard {...mapProps} />
            </div>

            <div className='col-md-6 description'>
              <h2 className='f-light'>Hi</h2>
              <h5>{ item.description }</h5>

              <div className='item'>
                <i className='fa fa-clock-o'></i> { duration }
              </div>

              { locations }

              <button className='btn u-mt-half' data-toggle='modal' data-target={`#${CREATE_HIKE_MODAL_ID}`} onClick={this.selectEvent.bind(this, item)}>
                &nbsp;<i className='fa fa-edit'></i>
              </button>

              <button className='btn btn-success u-mt-half u-ml-half'>
                Particip
              </button>
            </div>
          </div>
        </div>
      );

    });

  }

  render() {

    const secondHeader = this.generateSecondHeader();
    const hikes = this.generateHikes(this.state.events);

    return (
      <div className='p-hikes'>
        <EventModal id={CREATE_HIKE_MODAL_ID} event={this.state.selectedEvent} />

        { secondHeader }

        <div className='col-xs-12'>
          { hikes }
        </div>
      </div>
    );

  }

}

export default Hikes;
