import React from 'react';
import Brand from '../../components/Brand';
import { ServiceContextConsumer } from '../../contexts/ServiceContext';

const BrandContainer = () => (
  <ServiceContextConsumer>
    {({ brandName }) => <Brand brandName={brandName} />}
  </ServiceContextConsumer>
);

export default BrandContainer;
