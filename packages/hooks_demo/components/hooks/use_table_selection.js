import { useState } from 'react';

export default function useTableSelection(currentSelectedRows) {
  const [selectedRows, setSelectedRows] = useState(currentSelectedRows);

  const onClickRow = (id) => {
    const rowIdIndex = selectedRows.indexOf(id);
    const isSelected = rowIdIndex > -1;
    let newRowState;

    if (isSelected) {
      let copy = selectedRows.slice();
      copy.splice(rowIdIndex, 1);
      newRowState = copy;
    } else {

      if (selectedRows.length >= 2) return;
      newRowState = [...selectedRows, id];
    }

    setSelectedRows(newRowState);
  }

  return [selectedRows, onClickRow];
}