import React from 'react';
import { Link } from 'react-router';
import Jumbotron from 'common/components/jumbotron';
import Container from 'common/components/container';
import Section from 'common/components/section';
import ThreeColumns from 'common/components/threecolumns';
import HomeSocial from 'common/components/social';
import HomeTitle from './components/hometitle';
import HomeDescription from './components/homedescription';
import HomeCreators from './components/homecreators';
import HomeReviews from './components/homereviews';
require('./index.scss');

class Home extends React.Component {

  render() {

    const threeColumnsProps = {
      items: [
        { 'image': 'http://i.imgur.com/BR4UO7O.png', 'description': 'Goals are an important part of our time, so we provide full support for managing them.' },
        { 'image': 'http://i.imgur.com/jSZrqY8.png', 'description': 'All the application is fully responsive. You can manage your time on your phone, tablet or PC.' },
        { 'image': 'http://i.imgur.com/OrKlZWZ.png', 'description': 'We use data to suggest ways in which you can improve your time.' },
        { 'image': 'http://i.imgur.com/xtM5AnM.png', 'description': 'All the research we did is fully documented, so you can see that our ideas will work.' }
      ]
    };

    const reviewsProps = {
      items: [
        { 'image': 'https://scontent.fotp3-2.fna.fbcdn.net/hphotos-xat1/v/t1.0-9/12038565_10206151363535652_4557385123251221862_n.jpg?oh=36a4f4a398b6750846b9bcb2c3dacce6&oe=57B6388D', 'description': 'Good to see products based on well researched ideas.', title: 'Anca Bejinariu' },
        { 'image': 'https://scontent.fotp3-2.fna.fbcdn.net/hphotos-xta1/t31.0-8/s960x960/1404967_532449473499478_1589656545_o.jpg', 'description': 'This application has the potential to replace applications such as Google Calendar.', title: 'Cosmin Chiriac' },
        { 'image': 'https://scontent.fotp3-2.fna.fbcdn.net/hphotos-xtf1/v/t1.0-9/10403422_1186978097995428_4308213827455414242_n.jpg?oh=c46e16815e8493b576995072e71eadc2&oe=57A29583', 'description': 'To me it looks like the best way to manage my time.', title: 'Adina Georgeta' }
      ]
    };

    return (
      <div className='p-home'>
        <Link to='/login'>
          <button className='btn btn-login'>Sign up</button>
        </Link>

        <Jumbotron title='Organize your time' description='Easier then ever' more='Find out more' image='/src/assets/images/background.jpg' />

          <Section>
            <div className='row'>
            <div className='col-md-8 push-md-2'>
              <HomeTitle title='Does time fly by?' />
              <HomeDescription description='Our platform is designed around ideas found by Google, Facebook and many more time management pros, and using it should help you quantify time in a efficient manner.' />
            </div>
            </div>
          </Section>

          <Section>
            <div className='row c-home-semifull'>
              <div className='col-md-3 hidden-sm-down'>
                <img src='http://i.imgur.com/1lJLuod.png' />
              </div>
              <div className='col-md-9'>
                <HomeTitle title='Calendar' extraClassesTitle='display-4' />
                <HomeDescription description='Even better than our competitor products, the calendar shows you events in a very visual manner. Coloured by priority, you can easily tell how to shape your day. You can add, or remove events, you can sync it with Google Calendar, and the best part: it works just as fine on mobile as it does on tablets and desktops.' />

                <h4 className='f-light u-mt-half'>Fresh design</h4>
                <HomeDescription description='Tired of all the calendars that look old and boring? Our is designed with current standards in mind and it will sure be a refreshment for your eyes.' />

                <h4 className='f-light u-mt-half'>History of events</h4>
                <HomeDescription description='Nothing is lost, you can see the full history of your events.' />
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
                <div className='col-xs-12 col-md-6 push-md-3 u-hz-ctr'>
                  <img className='u-w-full' src='http://i.imgur.com/rSDSqRg.png' />
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <HomeTitle title='Opinions about the application' />
            <HomeReviews {...reviewsProps} />
          </Section>

          <Section>
            <div className='c-home-register'>
              <HomeTitle title='Did we convince you?' extraClasses='u-hz-ctr' extraClassesTitle='display-4' />

              <div className='row'>
                <div className='col-xs-12 u-hz-ctr u-mt-full u-mb-full'>
                  <Link to='/login'>
                    <button className='btn btn-success btn-lg'>Register</button>
                  </Link>
                </div>
              </div>
            </div>
          </Section>

          <Section>
            <div className='row'>
              <div className='col-md-4'>
                <HomeTitle title='For more details you can find us on' />
                <HomeSocial />
              </div>

              <div className='col-md-4'>
                <HomeTitle title='Creators' />
                <HomeCreators />
              </div>

              <div className='col-md-4'>
                <HomeTitle title='FIICode' />
                <HomeDescription description='Application created for the FIICode contest.' />
              </div>
            </div>
          </Section>

            <footer>
              <h6>Developed under the MIT lincese. Source code available on <a href="https://github.com/stefan-moraru/today" target="_blank">GitHub</a>.</h6>
            </footer>
      </div>
    );

  }

}

export default Home;
