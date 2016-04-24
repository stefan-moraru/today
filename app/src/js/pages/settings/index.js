import React from 'react';
import SecondHeader from 'common/components/secondheader';
import PanelDefault from './components/paneldefault';
import PanelInfo from './components/panelinfo';
import PanelUser from './components/paneluser';
import './index.scss';

class Settings extends React.Component {

  constructor(props) {

    super(props);

    this.panels = {
      'user': {
        icon: 'user',
        content: <PanelUser />
      },
      'info': {
        icon: 'info',
        content: <PanelInfo />
      }
    };

    this.state = {
      panel: this.panels['user'].content
    };

  }

  render() {

    const secondHeaderProps = {
      items: Object.keys(this.panels).map(item => {
        return {
          icon: this.panels[item].icon,
          onClick: () => {
            this.setState({ panel: this.panels[item].content });
          }
        };
      })
    };

    const panel = this.state.panel || <PanelDefault />

    return (
      <div className='p-settings'>
        <SecondHeader {...secondHeaderProps} />

        <div className='col-xs-12'>
          { panel }
        </div>
      </div>
    );

  }

}

export default Settings;
