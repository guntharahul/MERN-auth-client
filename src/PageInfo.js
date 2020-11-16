import React from 'react';
import cardio from './assets/cardio.jpg';
import diet from './assets/diet.jpg';
import yoga from './assets/yoga.jpg';
import zumba from './assets/zumba.jpg';
import CarouselSlide from './CarouselSlide';

const PageInfo = () => {
  return (
    <div className='col-9'>
      <CarouselSlide></CarouselSlide>
      <div className='row' style={{ marginTop: '5px', marginLeft: '1em' }}>
        <div class='card' style={{ width: '20rem', height: '10rem' }}>
          <img
            src={yoga}
            style={{ height: '10rem' }}
            alt='Card image cap'
          ></img>
          <div class='card-body'>
            <h5 class='card-text'>Yoga</h5>
          </div>
        </div>
        <div class='card' style={{ width: '20rem', height: '10rem' }}>
          <img
            src={cardio}
            alt='Card image cap'
            style={{ height: '10rem' }}
          ></img>

          <div class='card-body'>
            <h5 class='card-title'>Cardio</h5>
            <p class='card-text'></p>
          </div>
        </div>
        <div class='card' style={{ width: '20rem', height: '10rem' }}>
          <img
            src={zumba}
            alt='Card image cap'
            style={{ height: '10rem' }}
          ></img>

          <div class='card-body'>
            <h5 class='card-title'>Zumba</h5>
            <p class='card-text'></p>
          </div>
        </div>
        <div class='card' style={{ width: '20rem', height: '10rem' }}>
          <img
            src={diet}
            alt='Card image cap'
            style={{ height: '10rem' }}
          ></img>

          <div class='card-body'>
            <h5 class='card-title'>Diet Plan</h5>
            <p class='card-text'></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageInfo;
