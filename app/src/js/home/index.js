import React from 'react';
import { Link } from 'react-router';

class Jumbotron extends React.Component {

  render() {

    const content = this.generateContent();

    return (
      <div className='jumbotron'>
        { content }
      </div>
    );

  }

}

class HomeJumbotron extends Jumbotron {

  generateContent() {

    return (
      <div>
        <h1 className='f-bold display-4'>{ this.props.title }</h1>
        <h3 className='f-light'>{ this.props.description }</h3>

        <div className='arrow'>
          <p>Afla mai multe</p>
          <i className='fa fa-chevron-down'></i>
        </div>
      </div>
    );

  }

}

class Title extends React.Component {

  render() {

    const props = {
      className: this.props.extraClasses || ''
    };

    return (
      <div {...props}>
        { this.generateContent() }
      </div>
    );

  }

}

class HomeTitle extends Title {

  generateContent() {

    const props = {
      className: 'row ' + this.props.extraClasses || ''
    };

    return (
      <div {...props}>
        <div className='col-xs-12'>
          <h3>{ this.props.title }</h3>
        </div>
      </div>
    );

  }

}

class Description extends React.Component {

  render() {

    const props = {
      className: this.props.extraClasses || ''
    };

    return (
      <div {...props}>
        { this.generateContent() }
      </div>
    );

  }

}

class HomeDescription extends Description {

  generateContent() {

    const props = {
      className: 'row ' + this.props.extraClasses || ''
    };

    return (
      <div {...props}>
        <div className='col-xs-12'>
          <p>{ this.props.description }</p>
        </div>
      </div>
    );

  }

}

class Container extends React.Component {

  render() {

    return (
      <div className='container'>
        { this.props.children }
      </div>
    );

  }

}

class Section extends React.Component {

  render() {

    return (
      <div className='section'>
        { this.props.children }
      </div>
    );

  }

}

class Home extends React.Component {

  render() {

    return (
      <div className='home'>
        <HomeJumbotron title='Manageriaza-ti timpul' description='Mai usor ca niciodata' />

        <Container>
          <HomeTitle title='Te-ai saturat sa iti pierzi timpul fara sa iti dai seama ?' />
          <HomeDescription description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.' />

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
              <HomeTitle title='Responsive' />
              <HomeDescription description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.' />
            </div>
          </div>

          <div className='c-home-reviews'>
            <HomeTitle title='Vezi ce spune lumea despre noi' />

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
            <HomeTitle title='Demo' extraClasses='u-hz-ctr' />

            <div className='row'>
              <div className='col-xs-12 u-hz-ctr'>
                <img src='http://placehold.it/400x300' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-8'>
              <HomeTitle title='Responsive' />
              <HomeDescription description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.' />
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
              <HomeTitle title='Responsive' />
              <HomeDescription description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.' />
            </div>
          </div>

          <HomeTitle title='Te-am convins ?' extraClasses='u-hz-ctr' />

          <div className='row'>
            <div className='col-xs-12 u-hz-ctr'>
              <button className='btn btn-success btn-lg'>Inregistreaza-te !</button>
            </div>
          </div>

          <div className='c-home-social'>
            <HomeTitle title='Pentru mai multe detalii poti intra pe:' />

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
                <HomeTitle title='Creatori' />
                <HomeDescription description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.' />
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
        </Container>
        <Link to='/logout'>Log out</Link>
        <Link to='/login'>Login</Link>
      </div>
    );

  }

}

export default Home;
