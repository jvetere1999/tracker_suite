
import React from 'react'
import { ChartComponent, SeriesCollectionDirective, LineSeries,  SeriesDirective, Inject, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { lineCustomSeries, LinePrimaryXAxis, LinePrimaryYAxis } from '../../data/dummy';
import { ChartsHeader } from '../../components';

const Bar = () => {
  return (
    <div className=' m-2 md:m-10 p-2 md:p-10 drop-shadow-2xl dark:text-gray-200 dark:bg-main-dark-bg bg-white rounded-3xl'>
      <ChartsHeader category="Attendance" title="Bar Chart" />
      <ChartComponent>
        <Inject services={[LineSeries, Tooltip, DateTime, Legend, ]}/>
        <SeriesCollectionDirective>
          {lineCustomSeries.map((item, index) => 
            <SeriesDirective key={index} {...item} /> )}
        </SeriesCollectionDirective>
      </ChartComponent>
    
    </div>
  )
}

export default Bar