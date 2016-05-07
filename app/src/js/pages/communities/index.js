import React from 'react';
import { Link } from 'react-router';
import SecondHeader from 'common/components/secondheader';
import moment from 'moment';
import momentRange from 'moment-range';
import { CommunityModal } from 'common/components/modals';
import Utils from 'common/utils';
import FbUtils from 'common/utils/firebase';
import './index.scss';

const CONST_CREATE_COMMUNITY_MODAL_ID = 'community-page-modal-goal';
const CONST_MODAL_ID = 'community-page-modal-modal-id';

class Communities extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      communities: [],
      profile: {}
    };

  }

  refresh() {

    this.getCommunities();

  }

  componentDidMount() {

    FbUtils.getCurrentUser().then(this.saveProfile.bind(this));
    this.getCommunities();

  }

  saveProfile(profile) {

    this.setState({
      profile: profile
    });

  }

  getCommunities() {

    FbUtils.getCommunities().then(this.saveCommunities.bind(this));

  }

  saveCommunities(communities) {

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
          'target': `#${CONST_MODAL_ID}`,
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

  generateCommunities(communities, user) {

    return (communities || []).map((community, index) => {

      const backgroundColor = {
      };

      const title = community.title;
      const members = community.members || [];
      const memberCount = members.length;
      const categories = community.categories;
      const categoriesRendered = (categories || []).join(', ');
      const description = community.description;
      const percentage = Utils.userCommunityMatchPercentage(user, community);
      const key = `p-communities-community-${index}`;

      const prHidden = percentage === 0 ? 'u-hidden' : '';

      return (
        <div className='community col-xs-12 u-mb-half' style={ backgroundColor } key={ key }>
          <Link to={`community/${community.id}`}>
            <div className='community__content'>
              <h3 className='f-light u-mb-half'>{ community.title }</h3>
              <h6 className='f-light'>
                <i className='fa fa-fw fa-users'></i> { memberCount } { memberCount === 1 ? 'member' : 'members' }
              </h6>
              <h6 className='f-light'>
                <i className='fa fa-fw fa-tags'></i> { categoriesRendered }
              </h6>
              <h6 className='f-light'>
                <i className='fa fa-fw fa-comment'></i> { description }
              </h6>
              <h6 className='f-light'>
                <i className='fa fa-fw fa-percent'></i> You would fit { percentage }%
              </h6>
              <h6 className='f-light pull-right'>
                <i className='fa fa-fw fa-chevron-right'></i>
              </h6>
            </div>
          </Link>

          <progress className={`progress ${prHidden} progress-success`} value={ percentage } max='100'></progress>
        </div>
      );

    });

  }

  render() {

    const secondHeader = this.generateSecondHeader();
    const profile = this.state.profile || {};

    const communities = this.generateCommunities(this.state.communities, profile);

    return (
      <div className='p-communities'>
        { secondHeader }
        <CommunityModal id={CONST_MODAL_ID} refresh={this.refresh.bind(this)} />
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
