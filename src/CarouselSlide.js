import React from 'react';
import { Carousel } from 'react-bootstrap';
import cardio from './assets/cardio.jpg';
import diet from './assets/diet.jpg';
import yoga from './assets/yoga.jpg';
import zumba from './assets/zumba.jpg';

const CarouselSlide = () => {
  return (
    <div style={{ marginTop: 'auto' }} className='col-md-12'>
      <Carousel>
        <Carousel.Item>
          <img
            style={{ width: '2000px', height: '600px' }}
            src={cardio}
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: '2000px', height: '600px' }}
            src={yoga}
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ width: '2000px', height: '600px' }}
            src={diet}
            alt='Fourth slide'
          />

          <Carousel.Caption>
            <h3>Fourth slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselSlide;
