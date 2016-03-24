import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {

  render() {

    return (
      <div className='home'>
        <div className='jumbotron'>
          <h1 className='f-bold'>Manageriaza-ti timpul</h1>
          <p className='lead'>Mai usor ca niciodata</p>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h3>Te-ai saturat sa iti pierzi timpul fara sa iti dai seama ?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.</p>
            </div>
          </div>

          <div className='row c-three-columns'>
            <div className='col-md-4'>
              <img src='http://placehold.it/200x200' />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec</p>
            </div>
            <div className='col-md-4'>
              <img src='http://placehold.it/200x200' />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec</p>
            </div>
            <div className='col-md-4'>
              <img src='http://placehold.it/200x200' />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec</p>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <img src='http://placehold.it/300x400' />
            </div>
            <div className='col-md-8'>
              <h2>Responsive</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.</p>
            </div>
          </div>

          <div className='c-home-reviews'>
            <div className='row'>
              <div className='col-xs-12'>
                <h3>Vezi ce spune lumea despre noi</h3>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <img src='http://placehold.it/100x100' />
                <h5>User</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <img src='http://placehold.it/100x100' />
                <h5>User</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <img src='http://placehold.it/100x100' />
                <h5>User</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>

          <div className='c-home-video'>
            <div className='row'>
              <div className='col-xs-12 u-hz-ctr'>
                <h3>Demo</h3>
              </div>
            </div>

            <div className='row'>
              <div className='col-xs-12 u-hz-ctr'>
                <img src='http://placehold.it/400x300' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-8'>
              <h2>Responsive</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.</p>
            </div>
            <div className='col-md-4'>
              <img src='http://placehold.it/300x400' />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4'>
              <img src='http://placehold.it/300x400' />
            </div>
            <div className='col-md-8'>
              <h2>Responsive</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.</p>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-12 u-hz-ctr'>
              <h2>Te-am convins ?</h2>
            </div>
          </div>

          <div className='row'>
            <div className='col-xs-12 u-hz-ctr'>
              <button className='btn btn-success btn-lg'>Inregistreaza-te !</button>
            </div>
          </div>

          <div className='c-home-social'>
            <div className='row'>
              <div className='col-xs-12'>
                <h4>Pentru mai multe detalii poti intra pe:</h4>
              </div>
            </div>

            <div className='row'>
              <div className='col-xs-12'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
              </div>
            </div>
          </div>

          <div className='c-home-creators'>
            <div className='row'>
              <div className='col-xs-12'>
                <h4>Creatori</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <img src='http://placehold.it/300x400' />
                <p>Lorem ipsum</p>
              </div>
              <div className='col-md-6'>
                <img src='http://placehold.it/300x400' />
                <p>Lorem ipsum</p>
              </div>
            </div>
          </div>
        </div>
        <Link to='/logout'>Log out</Link>
        <Link to='/login'>Login</Link>
      </div>
    );

  }

}

export default Home;
