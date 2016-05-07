import React from 'react';
import SecondHeader from 'common/components/secondheader';
import moment from 'moment';
import momentRange from 'moment-range';
import { GoalModal } from 'common/components/modals';
import Utils from 'common/utils';
import FbUtils from 'common/utils/firebase';
import './index.scss';

const CONST_CREATE_COMMUNITY_MODAL_ID = 'community-page-modal-goal';

class Communities extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      communities: []
    };

    console.log(this.props);

  }

  refresh() {

    this.getCommunities();

  }

  componentDidMount() {

    this.getCommunities();

  }

  getCommunities() {

    FbUtils.getCommunities().then(this.saveCommunities.bind(this));

  }

  saveCommunities(communities) {

    console.log('save comm');
    console.log(communities);

    this.setState({
      communities: communities
    });

  }

  generateSecondHeader() {

    const secondHeaderProps = {
      items: [
        {
          'icon': 'plus',
          'toggle': 'modal',
          'target': `#${CONST_CREATE_COMMUNITY_MODAL_ID}`,
          'onClick': () => {
            this.setState({
              selectedGoal: {}
            });
          }
        }
      ]
    };

    return <SecondHeader {...secondHeaderProps} />;

  }

  generateCommunities(communities) {

    return (communities || []).map((community, index) => {

      const backgroundColor = {
        backgroundColor: 'pink'
      };

      return (
        <div className='community col-xs-12 u-mb-half' style={ backgroundColor }>
          <h3 className='f-light'>Sportivi extremi</h3>
          <h6 className='f-light'>
            <i className='fa fa-fw fa-users'></i> 5 membri
          </h6>
          <h6 className='f-light'>
            <i className='fa fa-fw fa-tags'></i> Sport, Extrem, Parapanta, Fun
          </h6>
          <h6 className='f-light'>
            <i className='fa fa-fw fa-comment'></i> Cea mai faina comunitate de sport din ROmani
          </h6>
        </div>
      );

    });

  }

  render() {

    const secondHeader = this.generateSecondHeader();
    const communities = this.generateCommunities(this.state.communities);

    return (
      <div className='p-communities'>
        { secondHeader }
        <div className='row u-mb-full u-hz-ctr u-mt-half'>
          <div className='col-xs-12'>
            <h1 className='display-4 f-light'>Communities</h1>
          </div>
        </div>

        <div className='col-md-8 push-md-2'>
          { communities }
        </div>
      </div>
    );

  }

}

export default Communities;
