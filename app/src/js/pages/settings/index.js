import React from 'react';
import SecondHeader from 'common/components/secondheader';
import PanelDefault from './components/paneldefault';
import PanelInfo from './components/panelinfo';
import PanelSettings from './components/panelsettings';
import PanelUser from './components/paneluser';

class Settings extends React.Component {

  constructor(props) {

    super(props);

    this.panels = {
      'settings': {
        icon: 'cog',
        content: <PanelSettings />
      },
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
      panel: null
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
      <div className='settings'>
        <SecondHeader {...secondHeaderProps} />

        { panel }
      </div>
    );

  }

}

export default Settings;
