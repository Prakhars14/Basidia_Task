import React from 'react'
import { useTable, useSortBy, useBlockLayout, useResizeColumns, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import matchSorter from 'match-sorter';

const CoronaTable = (props) => {

const Styles = styled.div`
padding: 1rem;

.table {
  display: inline-block;
  border-collapse: collapse;
  width: 100%;

  .tr {
    :last-child {
      .td {
        border-bottom: 0;
      }
    }
  }

  .tr:nth-child(even) {background-color: #f2f2f2;}
  .th{
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
    position: relative;
    :first-child {
      border-left: 1px solid #ddd;
    }
    :last-child {
      border-right: 0;
    }

    .resizer {
      display: inline-block;
      background: #ccc;
      width: 2px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(50%);
      z-index: 1;
      ${'' /* prevents from scrolling while dragging on touch devices */}
      touch-action:none;

      &.isResizing {
        background: black;
      }
    }
  }
  .td {
    padding: 12px;
    padding-top:18px;
    padding-bottom:18px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
}
`

const GlobalFilter=({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
})=>{
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      <span class="material-icons mt-1">search</span>{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        style={{
          fontSize: '1.1rem',
          border: '0',
          backgroundColor:'#f2f2f2'
        }}
      />
    </span>
  )
}

const Table=({ columns, data })=>{

  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        console.log(rows,id,filterValue);
        return rows.filter(row => {
          const rowValue = row.values[id]&&row.values[id].props.children
          if(id=='workflowName'){
            return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase()):true
          }
          else{
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true }
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  )
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
      resetResizing,
      // allColumns,
      // getToggleHideAllColumnsProps,
    } = useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes
      },
      useFilters, // useFilters!
      useGlobalFilter, // useGlobalFilter!
      useSortBy,
      useBlockLayout,
      useResizeColumns
    )
  
    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    //for sorting: column.getSortByToggleProps()
    const firstPageRows = rows.slice(0, 20)
  console.log(headerGroups);
    return (
      <>
        <div {...getTableProps()} className="table">
        <div>
              <div {...headerGroups[1].getHeaderGroupProps()} className="tr">
                {headerGroups[1].headers.map(column => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                    {/* <div style={{maxWidth:'130px'}}>{column.canFilter ? column.render('Filter') : null}</div> */}
                  </div>
                ))}
              </div>
            <div className="tr">
              <div className="th"
                colSpan={visibleColumns.length}
                style={{
                  textAlign: 'left',
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </div>
            </div>
          </div>
          <div {...getTableBodyProps()}>
            {firstPageRows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr">
                    {row.cells.map(cell => {
                      return (
                      <div {...cell.getCellProps()} className="td">{cell.render('Cell')}</div>
                      )
                    })}
                  </div>
                )}
            )}
          </div>
        </div>
        <br />
      </>
    )
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Corona Stats Table',
        columns: [
          {
            Header: 'State',
            accessor: 'workflowName',
          },
          {
            Header: 'Confirmed',
            accessor: 'createdBy',
          },
          {
            Header: 'Recovered',
            accessor: 'totalActions',
          },
          {
            Header: 'Deaths',
            accessor: 'totalDays',
          },
          {
            Header: 'Active',
            accessor: 'timesCompleted',
          },
        ],
      },
    ],
    []
  );


    const data1=props.data&&props.data.slice(1).map(datap=>{
        return {workflowName:datap[0], 
                createdBy:datap[1],
                totalActions: datap[2],
                totalDays: datap[3],
                timesCompleted:datap[4],
            }
    })
console.log(props);
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column">
                <Styles><Table columns={columns} data={data1} /></Styles>                
            </div>
        </div>
    )
}

export default CoronaTable
