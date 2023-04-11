import * as React from 'react';
import { GridComponent, ColumnsDirective, Group, Toolbar, ColumnDirective, Page, Inject, ContextMenu, Resize, Sort, Filter, ExcelExport, PdfExport, Edit } from '@syncfusion/ej2-react-grids';
import { ordersData } from '../data/dummy';
import { Header } from '../components';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';


function FindEvents() {
      let gridInstance;
      const filterType = [
        { text: 'Event', value: 'Event' },
        { text: 'Club', value: 'Club' },
        { text: 'Class', value: 'Class' },
    ];
      const filterSettings = { type: 'Menu' };
      const fields = { text: 'text', value: 'value' };
      const format = { type: 'datetime', format: 'M/d/y hh:mm a' };
      function onChange(sel) {
        gridInstance.filterSettings.type = sel.itemData.value;
        gridInstance.clearFiltering();

      const toolbarOptions = ['Search'];
    


      }
  return (
    <div className=' m-2 md:m-10 p-2 md:p-10 drop-shadow-2xl dark:text-gray-200 dark:bg-main-dark-bg bg-white rounded-3xl'>
      <Header category="Page" title="Find Events" />
        <div style={{ padding: '14px' }}>
          <DropDownListComponent id="ddlelement" dataSource={filterType} fields={fields} change={onChange.bind(this)} index={0} popupHeight="150px" width="200px"/>
        </div>
            <div className='control-section row drop-shadow-2xl'>
                <GridComponent dataSource={ordersData} allowSorting={true} allowPaging={true} ref={grid=>gridInstance=grid} pageSettings={{ pageSize: 15, pageCount: 5 }} allowFiltering={true}  filterSettings={filterSettings} allowGrouping={true}>
                    <ColumnsDirective>
                        <ColumnDirective field='EventID' headerText='Event ID' width='120' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='EventName' headerText='Event Name' width='150'></ColumnDirective>
                        <ColumnDirective field='Date' headerText='Date' width='130' format='yMd' textAlign='Right'/>
                        <ColumnDirective field='StartTime' headerText='Start Time' width='120' textAlign='Right'/>
                        <ColumnDirective field='EndTime' headerText='End Time' width='130' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='Location' headerText='Location' width='150'></ColumnDirective>
                        <ColumnDirective field='Creator' headerText='Creator' width='150'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Resize, Page, Group, Toolbar, Sort, ContextMenu, Filter, ExcelExport, Edit, PdfExport]}/>
                </GridComponent>
            </div>
    </div>);
}

export default FindEvents
