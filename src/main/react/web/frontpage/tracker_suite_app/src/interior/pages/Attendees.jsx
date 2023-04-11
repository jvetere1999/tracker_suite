import * as React from 'react';
import { GridComponent, ColumnsDirective, Search, Group, ColumnDirective, Page, Inject, ContextMenu, Resize, Sort, Filter, ExcelExport, PdfExport, Edit} from '@syncfusion/ej2-react-grids';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';


function Attendees() {
    let gridInstance;
    const filterType = [
        { text: 'Attendee', value: 'Attendee' },
        { text: 'Oragnizer', value: 'Organizer' },
        { text: 'Both', value: 'Both' },
    ];
    const filterSettings = { type: 'Menu' };
    const fields = { text: 'text', value: 'value' };
    const format = { type: 'datetime', format: 'M/d/y hh:mm a' };
    function onChange(sel) {
        gridInstance.filterSettings.type = sel.itemData.value;
        gridInstance.clearFiltering();
    }


    return (<div className=' m-2 md:m-10 p-2 md:p-10 drop-shadow-2xl dark:text-gray-200 dark:bg-main-dark-bg bg-white rounded-3xl'>
      <Header category="Page" title="Attendees" />
        <div style={{ padding: '14px' }}>
          <DropDownListComponent id="ddlelement" dataSource={filterType} fields={fields} change={onChange.bind(this)} index={0} popupHeight="150px" width="200px"/>
        </div>
            <div className='control-section row drop-shadow-2xl'>
                <GridComponent dataSource={employeesData} allowSorting={true} allowPaging={true} ref={grid=>gridInstance=grid} pageSettings={{ pageSize: 15, pageCount: 5 }} allowFiltering={true}  filterSettings={filterSettings} allowGrouping={true}>
                    <ColumnsDirective>
                        <ColumnDirective field='UserID' headerText='User Id' width='120' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='Name' headerText='Name' width='150'></ColumnDirective>
                        <ColumnDirective field='Phone' headerText='Phone' width='150' textAlign='Right'/>
                        <ColumnDirective field='Email' headerText='Email' width='120' textAlign='Right'/>
                        <ColumnDirective field='DateJoined' headerText='Date Joined' width='120' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='UserName' headerText='UserName' width='150'></ColumnDirective>
                        <ColumnDirective field='TypeID' headerText='TypeId' width='120'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Resize, Page, Group, Sort, ContextMenu, Filter, ExcelExport, Edit, PdfExport]}/>
                </GridComponent>
            </div>
        </div>);
}
export default Attendees;
