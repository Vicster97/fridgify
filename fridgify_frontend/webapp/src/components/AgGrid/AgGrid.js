import { AgGridReact } from 'ag-grid-react';

import { constructColumnDefs } from '../../utils/addSpecialColumnDefsToColumns';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { removeSpecialCharacters } from '../../utils/displayValueFormatters';
import { incentivePlans } from '../../constants/sipThresholdAndPercentage';

const AgGridTable = (props) => {
    const { data, columns, specialColumnDefs, editable } = props

    function autoFitColumn(params) {
        params.api.sizeColumnsToFit();
    }

    function checkWhichPlan(columnName, incentivePlans) {
        var chosenPlan = null
    
        incentivePlans.forEach((plan) =>	{
            console.log(columnName.includes(plan) );
            
            if (columnName.includes(plan)) {
                chosenPlan = plan
            };
            
        })
        return chosenPlan
    };
    function onSelectionChanged() {
        const selectedRows = gridOptions.api.getSelectedRows();
        // SlateFunctions.setState(
        //       "selection", selectedRows
        //   )
      }

    // edits
    var edits = []
    function onCellValueChanged(event, incentivePlans, data) {

        // get column name and incentive plan of edit
        const columnName = event.colDef.field;				
        const chosenPlan = checkWhichPlan(columnName, incentivePlans)

        // make a copy of data object and copy of value that needs to be reformatted
        var copyOfData = [...data]
        var valueInCopyOfData = copyOfData.filter(row => row[chosenPlan + "_pk"] === event.data[chosenPlan + "_pk"])[0][columnName]

        // formatt and reassign
        copyOfData.filter(row => row[chosenPlan + "_pk"] === event.data[chosenPlan + "_pk"])[0][columnName] = removeSpecialCharacters(valueInCopyOfData)

        // update data object with formatted value 
        data = copyOfData
        gridOptions.api.setRowData(data);
            
        edits.push(
            {
                pk: event.data[chosenPlan + "_pk"],
                plan: chosenPlan,
                rep: event.data.sales_rep,
                column: columnName,
                value: removeSpecialCharacters(event.value)
            }
        )
        
    // SlateFunctions.setState(
    //         "edits", edits
    //     )
    }

    const columnDefs = constructColumnDefs(columns, specialColumnDefs)
    //console.log("columns defs", columnDefs)

    // specify the data
    var gridOptions = {
        rowData: data,
        columnDefs: columnDefs,
        pagination: true,
	    onFirstDataRendered: autoFitColumn,
        suppressCopyRowsToClipboard:true,	
    }

    if (editable) {
        gridOptions = {
            rowData: data,
            columnDefs: columnDefs,
            pagination: true,
            onFirstDataRendered: autoFitColumn,
            suppressCopyRowsToClipboard:true,	
            onCellValueChanged: function (event) { 
                onCellValueChanged(event, incentivePlans, data)
            },
            onSelectionChanged: onSelectionChanged,
        }
    }

    return <div id="myGrid" className="ag-theme-alpine" style={{ height: '400px', width: '100%'}}>
        <AgGridReact gridDiv={document.querySelector('#myGrid')} gridOptions={gridOptions}/>
        </div>
};

export default AgGridTable;