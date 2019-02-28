import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import SelectableRow from '../components/selectable_row';

export const getColumns = cols => {
  if (!cols) return [];

  return cols.map(col => <TableCell key={col} align="center">{col}</TableCell>);
}

export const getRows = (rows, selectedRows, onClickRow) => {
  if (!rows) return [];

  return rows.map(row => (
    <SelectableRow
      key={row.id}
      id={row.id}
      name={row.name}
      breweryType={row.brewery_type}
      state={row.state}
      city={row.city}
      street={row.street}
      latitude={row.latitude}
      longitude={row.longitude}
      onClick={onClickRow}
      selected={selectedRows.indexOf(row.id) > -1}
    />
  ))
};

export const getCoords = (data, selectedIds) => {
  if (!data || selectedIds.length !== 2) return {};

  const selectedPoints = data.filter(point => selectedIds.indexOf(point.id) > -1);

  const coords = selectedPoints.reduce((pointHash, point, index) => {
    pointHash[`lat${index + 1}`] = Number(point.latitude);
    pointHash[`long${index + 1}`] = Number(point.longitude);

    return pointHash;
  }, {});

  return coords;
}

// from https://www.geodatasource.com/developers/javascript
export const getDistance = (lat1, lon1, lat2, lon2, unit='K') => {

  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return false;
  }

  if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	} else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
    
    return Math.round(dist * 10) / 10;
	}
}