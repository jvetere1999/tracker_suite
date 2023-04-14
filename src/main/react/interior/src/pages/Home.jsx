import React from 'react'


import { ScheduleComponent, ViewDirective, ViewsDirective, Day, 
  Week, Month, Agenda, Inject,Resize, DragAndDrop, WorkWeek } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'



import { Header, Footer } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '../components';
import { scheduleData, earningData } from '../data/dummy';
//import { ListViewComponent, ListView, Inject, Virtualization } from '@syncfusion/ej2-react-lists';



const Home = () => {
  const { currentColor } = useStateContext();
  return (
    <div>
      <div>
    <div className='m-2 md:m-10 p-2 md:p-10 drop-shadow-2xl dark:text-gray-200 dark:bg-main-dark-bg bg-white rounded-3xl'>
      <Header category="Home" title="Event Pro" />
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-bold dark:text-gray-200 text-2xl'>Welcome back!</p>
          <p className='dark:text-gray-200 text-lg'>Check out today's featured events.</p>
        </div>
      </div>
      
        <div className='flex m-2 pl-0 flex-wrap justify-start gap-3 items-stretch'>
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white
               dark:text-gray-200
               dark:bg-secondary-dark-bg
               md:w-56 p-4 pt-4 rounded-2xl drop-shadow-lg min-h-max min-w-max">
                <button type="button"
                  style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                  className="text-2xl opacity-.09 rounded-full p-3 hover:drop-shadow-xl">
                  {item.icon}
                </button>
                <p className='mt-3'>
                  <span className='text-lg font-semibold'>
                    {item.amount}
                  </span>
                </p>
                <p>
                  <span className={`text-sm ml-1`}>
                    Location:  {item.percentage}
                  </span>
                </p>
                <p>
                  <span className={`text-sm ml-1`}>
                    Starts at:  {item.title}
                  </span>
                </p>
                <div className="flex justify-end">
                  <Button 
                  color="white"
                  bgColor={currentColor}
                  text="Attend"
                  borderRadius="10px"
                  drop-shadow="md"
                  />
                </div>
            </div>
          ))}
        </div>
      
      
        <div className="mt-20 ">
          <p className='font-bold dark:text-gray-200 text-2xl'>Recent Events</p>
        </div>
        
        <div className="m-2 md:m-2 mt-12 p-2 md:p-2 drop-shadow-2xl">
          
          <ScheduleComponent className='drop-shadow-md' hieght="250px" width="100%" eventSettings={{dataSource: scheduleData }} >
          <Inject services={[ Day, Week, Month, Agenda, Resize, WorkWeek]} />
          </ScheduleComponent>
        </div>
      </div>
      </div>
      </div>  
      
    
  )
}

export default Home
