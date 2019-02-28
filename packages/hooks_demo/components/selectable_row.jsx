import React, { useMemo, useCallback } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const getRowStyle = (selected) => {
  return selected ? { backgroundColor: '#84ffb7'} : {};
}

export default function SelectableRow(props) {
  const {
    id,
    name,
    breweryType,
    state,
    city,
    street,
    latitude,
    longitude,
    onClick,
    selected,
  } = props;

  const rowStyle = useMemo(() => getRowStyle(selected), [selected]);
  const onRowClick = useCallback(() => onClick(id), [id, onClick]);
  return (
    <TableRow 
      style={rowStyle}
      onClick={onRowClick}
    >
      <TableCell
        align="center"
      >
        {name}
      </TableCell>
      <TableCell
        align="center"
      >
        {breweryType}
      </TableCell>
      <TableCell
        align="center"
      >
        {state}
      </TableCell>
      <TableCell
        align="center"
      >
        {city}
      </TableCell>
      <TableCell
        align="center"
      >
        {street}
      </TableCell>
      <TableCell
        align="center"
      >
        {latitude}
      </TableCell>
      <TableCell
        align="center"
      >
        {longitude}
      </TableCell>
    </TableRow>
  )

}