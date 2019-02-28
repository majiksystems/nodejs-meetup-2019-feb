import React from 'react';

import DistanceTable from './distance_table';
import { useFetch } from './hooks/use_fetch';

export default function BeerTable(props) {

  const {
    url = 'https://cors-anywhere.herokuapp.com/https://api.openbrewerydb.org/breweries?by_state=New%20York',
  } = props;

  const { loading, data } = useFetch(url);

  if(loading) return 'Loading!';

  return (
    <>
      <DistanceTable
        rows={data}
        columns={['Name', 'Type', 'State', 'City', 'Street', 'Lat', 'Long']}
      />
    </>
  );
}