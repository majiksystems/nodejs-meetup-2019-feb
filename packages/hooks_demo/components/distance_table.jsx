import React, { useMemo, useState } from 'react';

import DistanceDisplay from './distance_display';
import SelectableRow from './selectable_row';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

import useTableSelection from './hooks/use_table_selection';

import {
  getColumns,
  getRows,
  getCoords
} from '../helpers/table_helpers';

export default function SelectableTable(props) {

  const {
    columns,
    rows,
  } = props

  const [selectedRows, onClickRow] = useTableSelection([]);
  const columnCells = useMemo(() => getColumns(columns), [columns]);
  const rowCells = useMemo(() => getRows(rows,selectedRows, onClickRow), [rows, selectedRows, onClickRow]);
  const coords = useMemo(() => getCoords(rows, selectedRows), [rows,selectedRows]);

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {columnCells}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowCells}
          </TableBody>
        </Table>
      </Paper>

      <DistanceDisplay
        {...coords}
      />
    </>
  )
}