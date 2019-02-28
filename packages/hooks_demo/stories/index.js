import React from 'react';
import { storiesOf } from '@storybook/react';

import DistanceTableContainer from '../components/distance_table_container';
import Counter from '../components/counter';

storiesOf('Distance Table', module)
  .add('basic table', () => (
    <DistanceTableContainer/>
  ))

storiesOf('Counter', module)
  .add('basic counter', () => (
    <Counter/>
  ))