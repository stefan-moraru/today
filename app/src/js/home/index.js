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

class HomeSocial extends React.Component {

  render() {

    const networks = [
      { title: 'Facebook', icon: 'fa fa-facebook', href: '#' },
      { title: 'Instagram', icon: 'fa fa-instagram', href: '#' }
    ];

    const networksRendered = networks.map((item, key) => (
      <a href={ item.href } target='_new' key={`HomeSocial-item-${key}`}>
        <div className='circle'>
          <i className={ item.icon }></i>
        </div>
      </a>
    ));

    return (
      <div className='c-home-social'>
        <div className='row'>
          <div className='col-xs-12'>
           { networksRendered }
          </div>
        </div>
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

    const titleProps = {
      className: this.props.extraClassesTitle
    };

    return (
      <div {...props}>
        <div className='col-xs-12'>
          <h3 {...titleProps}>{ this.props.title }</h3>
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

class ThreeColumns extends React.Component {

  render() {

    const items = this.props.items;
    let renderedItems = [];

    if (items) {

      renderedItems = items.splice(0, 4).map((item, index) => (
        <div className='col-md-3' key={`item-${index}`}>
          <img src={ item.image } />
          <p>{ item.description }</p>
        </div>
      ));

    }

    return (
      <div className='row c-three-columns'>
        { renderedItems }
      </div>
    );

  }

}

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

class HomeReviews extends React.Component {

  render() {

    const items = this.props.items;
    let renderedItems = [];

    if (items) {

      renderedItems = items.map((item, index) => (
        <div className='row' key={`HomeReviews-item-${index}`}>
          <div className='col-xs-12'>
            <div className='u-fl u-hz-ctr'>
              <img src={ item.image } />
            </div>

            <div className='u-fl'>
              <h5>{ item.title }</h5>
              <p>{ item.description }</p>
            </div>
          </div>
        </div>
      ));

    }

    return (
      <div className='c-home-reviews'>
        { renderedItems }
      </div>
    );

  }

}

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
              <HomeTitle title='Trece timpul prea repede ?' extraClassesTitle='display-6' />
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
                <HomeDescription description='Aplicatie realizata pentru concursul FIICode' />
              </div>
            </div>
          </Section>
      </div>
    );

  }

}

export default Home;
