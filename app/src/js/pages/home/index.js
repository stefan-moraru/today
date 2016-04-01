import React from 'react';
import { Link } from 'react-router';
import Jumbotron from 'common/components/jumbotron';
import HomeSocial from './components/social';
import HomeJumbotron from './components/jumbotron';
import HomeTitle from './components/title';
import HomeDescription from './components/description';
import Container from 'common/components/container';
import Section from 'common/components/section';
import ThreeColumns from 'common/components/threecolumns';
import HomeCreators from './components/creators';
import HomeReviews from './components/reviews';
require('./index.scss');

class Home extends React.Component {

  render() {

    const threeColumnsProps = {
      items: [
        { 'image': 'http://placehold.it/200x200', 'description': 'Lorem ipsum asoindasio oni asdnioasn oiasndioasndoas asiondaiosdnasiod' },
        { 'image': 'http://placehold.it/200x200', 'description': 'Lorem ipsum asoindasio oni asdnioasn oiasndioasndoas asiondaiosdnasiod' },
        { 'image': 'http://placehold.it/200x200', 'description': 'Lorem ipsum asoindasio oni asdnioasn oiasndioasndoas asiondaiosdnasiod' },
        { 'image': 'http://placehold.it/200x200', 'description': 'Lorem ipsum asoindasio oni asdnioasn oiasndioasndoas asiondaiosdnasiod' }
      ]
    };

    const reviewsProps = {
      items: [
        { 'image': 'http://placehold.it/200x200', 'description': 'Lorem ipsum asoindasio oni asdnioasn oiasndioasndoas asiondaiosdnasiod', title: 'User 1' },
        { 'image': 'http://placehold.it/200x200', 'description': 'Lorem ipsum asoindasio oni asdnioasn oiasndioasndoas asiondaiosdnasiod', title: 'User 1' },
        { 'image': 'http://placehold.it/200x200', 'description': 'Lorem ipsum asoindasio oni asdnioasn oiasndioasndoas asiondaiosdnasiod', title: 'User 1' }
      ]
    };

    return (
      <div className='home'>
        <HomeJumbotron title='Organizează-ţi timpul' description='Mai uşor ca niciodată' />

          <Section>
            <div className='row'>
            <div className='col-md-8 col-md-push-2'>
              <HomeTitle title='Trece timpul prea repede ?' />
              <HomeDescription description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.' />
            </div>
            </div>
          </Section>

          <Section>
            <div className='row c-home-semifull'>
              <div className='col-md-3 hidden-sm-down'>
                <img src='/src/assets/images/responsive.png' />
              </div>
              <div className='col-md-9'>
                <HomeTitle title='Responsive' extraClassesTitle='display-4' />
                <HomeDescription description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.' />
              </div>
            </div>
          </Section>

          <Section>
            <ThreeColumns {...threeColumnsProps} />
          </Section>

          <Section>
            <div className='c-home-video'>
              <HomeTitle title='Demo' extraClasses='u-hz-ctr u-mb-half' extraClassesTitle='display-4' />

              <div className='row'>
                <div className='col-xs-12 u-hz-ctr'>
                  <img src='http://placehold.it/600x400' />
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <HomeTitle title='Vezi ce spune lumea despre noi' />
            <HomeReviews {...reviewsProps} />
          </Section>

          <Section>
            <div className='c-home-register'>
              <HomeTitle title='Te-am convins ?' extraClasses='u-hz-ctr' extraClassesTitle='display-4' />

              <div className='row'>
                <div className='col-xs-12 u-hz-ctr u-mt-full u-mb-full'>
                  <Link to='/login'>
                    <button className='btn btn-success btn-lg'>Inregistreaza-te !</button>
                  </Link>
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <div className='row'>
              <div className='col-md-4'>
                <HomeTitle title='Pentru mai multe detalii ne gasesti pe' />
                <HomeSocial />
              </div>

              <div className='col-md-4'>
                <HomeTitle title='Creatori' />
                <HomeCreators />
              </div>

              <div className='col-md-4'>
                <HomeTitle title='FIICode' />
                <HomeDescription description='Aplicatie realizata pentru concursul FIICode. FIICode dorește ca participanții să valorifice abilitățile (și să dezvolte competențe), prin intermediul competiției: gândirea algoritmică și analitică, modelarea și implementarea, dezvoltarea de noi tehnologii, creativitatea, adaptabilitatea, precum  și capacitatea de a susține în public a unei lucrări proprii.' />
              </div>
            </div>
          </Section>
      </div>
    );

  }

}

export default Home;
