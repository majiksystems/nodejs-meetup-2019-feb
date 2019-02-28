import React, { useMemo } from 'react';
import {
  getDistance
} from '../helpers/table_helpers';

const CONTAINER_STYLES = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 300,
  width: '100%',
  fontSize: 56,
};

export default function DistanceDisplay(props) {

  const {
    lat1,
    long1,
    lat2,
    long2
  } = props;

  const distance = useMemo(() => getDistance(lat1, long1, lat2, long2), [lat1, long1, lat2, long2]);

  return (
    <div style={CONTAINER_STYLES}>
      { distance ? `${distance} KM` : null}
    </div>
  );
}