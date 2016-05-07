import React from 'react';
import Modal from 'common/components/modal';
import DatePicker from 'common/components/datepicker';
import FbUtils from 'common/utils/firebase';
import moment from 'moment';

class CommunityModal extends Modal {

  constructor(props) {

    super(props);

    this.state = {
      community: {}
    };

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.event) {

      this.setState({
        community: nextProps.community
      });

    }

  }

  updateCommunityField(community, field, ev) {

    let value = ev.target.value;

    if (field === 'categories' && value) {

      value = value.toString();

      value = value.split(',');

    }

    community[field] = value;

    this.setState({
      community: community
    });

  }

  getModalLarge() {

    return 'modal-lg';

  }

  getFields() {

    const fields = [
      { title: 'Title', field: 'title', type: 'text' },
      { title: 'Description', field: 'description', type: 'text' },
      { title: 'Categories', field: 'categories', type: 'text' },
      { title: 'Background image', field: 'image', type: 'text' }
    ];

    return this.getInputFields(this.state.community, fields, this.updateCommunityField);

  }

  createCommunity(ev) {

    const refresh = this.props.refresh.bind(this);

    ev.preventDefault();

    let community = this.state.community;

    FbUtils.ref
    .child('communities')
    .once('value', function(snapshot) {

      let data = snapshot.val();

      if (data) {

        data = data || [];

        community.id = Object.keys(data).length;

        data[Object.keys(data).length] = community;

      }

      FbUtils.ref
      .child('communities')
      .update(data);

      refresh();

    });

  }

  getModalBody() {

    const community = this.state.community;
    const fields = this.getFields();

    return (
      <div className='create-event u-mt-half'>
        <form>
          <div className='col-md-6'>
            { fields }
          </div>

          <div className='col-xs-12'>
            <button className='btn btn-success col-xs-12 u-mt-half' onClick={this.createCommunity.bind(this)} data-dismiss='modal'>
              Save
            </button>
          </div>
        </form>
      </div>
    );

  }

}

CommunityModal.defaultProps = {
  title: 'Eveniment',
  refresh: () => {
    //
  }
};

export default CommunityModal;
