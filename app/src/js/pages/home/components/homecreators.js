import React from 'react';
import HomeDescription from './homedescription';

class HomeCreators extends React.Component {

  render() {

    return (
      <div className='c-home-creators'>
        <div className='row'>
          <div className='col-xs-12'>
            <HomeDescription description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.' />
          </div>
        </div>

        <div className='row u-hz-ctr'>
          <div className='col-md-6'>
            <img src='https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAatAAAAJDI5NDdiMTUyLTJjODUtNDg1ZC05YmNmLTcxMWIwZDkzYzgyMg.jpg' />
            <h5>Stefan Moraru</h5>
          </div>
          <div className='col-md-6'>
            <img src='https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAT0AAAAJDcyMWNmMmEzLTBmNzUtNGNmOC1iMjUzLWU1NjI2ZDUxZDUzZg.jpg' />
            <h5>Gabriel Stiufliuc</h5>
          </div>
        </div>
      </div>
    );

  }

}

export default HomeCreators;
