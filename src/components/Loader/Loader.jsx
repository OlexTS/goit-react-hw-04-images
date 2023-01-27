import React from 'react';

import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => (
  <ThreeCircles
    height="100"
    width="100"
    color="#4fa94d"
    wrapperStyle={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}
    wrapperClass=""
    visible={true}
    ariaLabel="three-circles-rotating"
    outerCircleColor=""
    innerCircleColor=""
    middleCircleColor=""
  />
);

export default Loader;
