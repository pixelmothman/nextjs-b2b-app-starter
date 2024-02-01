'use client'

import * as Popover from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';
import CalendarEventBtn from './calendarEventBtn';
import { updateCalendarEvent } from '@/lib/actions';

export default function CalendarEventPopover( { event }){

    let [readOnlyState, setReadOnlyState] = useState(true);
    let [eventId, setEventId] = useState('');
    let [eventLabel, setEventLabel] = useState('');
    let [eventName, setEventName] = useState('');
    let [eventDescription, setEventDescription] = useState('');
    let [eventStartTime, setEventStartTime] = useState('');
    let [eventStartTimeMin, setEventStartTimeMin] = useState('');
    let [eventStartTimeMax, setEventStartTimeMax] = useState('');
    let [eventEndTime, setEventEndTime] = useState('');
    let [eventEndTimeMax, setEventEndTimeMax] = useState('');

    let startDate = new Date(event.cal_event_start_date);
    let endDate = new Date(event.cal_event_end_date);

    let eventStartDateFormatted = startDate.toISOString().split('.')[0];
    let eventEndDateFormatted = endDate.toISOString().split('.')[0];

    useEffect(() => {
        if(event){
            setEventId(event.cal_event_id);
            setEventLabel(event.cal_event_label);
            setEventName(event.cal_event_name);
            setEventDescription(event.cal_event_description);
        }
    }, [event]);

    useEffect(() => {
        if(eventStartTime && eventStartTime !== ''){
            //the event end time max should be 23:59 of the same day as the event start time
            let theEventEndtimeMax = eventStartTime.split('T')[0] + 'T23:59';
            setEventEndTimeMax(theEventEndtimeMax);
        }
        if(eventEndTime && eventEndTime !== '' && (!eventStartTime && eventStartTime === '') ){
            //the event start time min should be 00:00 of the same day as the event end time
            let theEventStartTimeMin = eventEndTime.split('T')[0] + 'T00:00';
            setEventStartTimeMin(theEventStartTimeMin);
            setEventStartTimeMax(eventEndTime);
        }
    }, [eventStartTime, eventEndTime]);

    const calendarEventLabelIcons = [
        {
            name: 'education',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="fill-neutral-50" width="16" height="16" viewBox="0 0 256 256"><path d="M227.79,52.62l-96-32a11.85,11.85,0,0,0-7.58,0l-96,32A12,12,0,0,0,20,63.37,6.05,6.05,0,0,0,20,64v80a12,12,0,0,0,24,0V80.65l23.71,7.9a67.92,67.92,0,0,0,18.42,85A100.36,100.36,0,0,0,46,209.44a12,12,0,1,0,20.1,13.11C80.37,200.59,103,188,128,188s47.63,12.59,61.95,34.55a12,12,0,1,0,20.1-13.11,100.36,100.36,0,0,0-40.18-35.92,67.92,67.92,0,0,0,18.42-85l39.5-13.17a12,12,0,0,0,0-22.76Zm-99.79-8L186.05,64,128,83.35,70,64ZM172,120A44,44,0,1,1,90.94,96.29l33.27,11.09a11.89,11.89,0,0,0,7.58,0l33.27-11.09A43.85,43.85,0,0,1,172,120Z"></path></svg>,
        },
        {
            name: 'work',
            icon:  <svg xmlns="http://www.w3.org/2000/svg" className="fill-neutral-50" width="16" height="16" viewBox="0 0 256 256"><path d="M232,116H219.22A91.1,91.1,0,0,0,213,92.79l11.08-6.4a12,12,0,1,0-12-20.78L201,72a92.85,92.85,0,0,0-17-17l6.41-11.11a12,12,0,1,0-20.78-12L163.21,43A91.1,91.1,0,0,0,140,36.78V24a12,12,0,0,0-24,0V36.78A91.1,91.1,0,0,0,92.79,43l-6.4-11.08a12,12,0,0,0-20.78,12L72,55A92.85,92.85,0,0,0,55,72L43.93,65.61a12,12,0,0,0-12,20.78L43,92.79A91.1,91.1,0,0,0,36.78,116H24a12,12,0,0,0,0,24H36.78A91.1,91.1,0,0,0,43,163.21l-11.08,6.4a12,12,0,1,0,12,20.78L55,184a92.85,92.85,0,0,0,17,17l-6.41,11.11a12,12,0,1,0,20.78,12L92.79,213A91.1,91.1,0,0,0,116,219.22V232a12,12,0,0,0,24,0V219.22A91.1,91.1,0,0,0,163.21,213l6.4,11.08a12,12,0,0,0,20.78-12L184,201a92.85,92.85,0,0,0,17-17l11.11,6.41a12,12,0,1,0,12-20.78L213,163.21A91.1,91.1,0,0,0,219.22,140H232a12,12,0,0,0,0-24ZM128,60a68.1,68.1,0,0,1,66.92,56h-60l-30-52A67.61,67.61,0,0,1,128,60ZM60,128A67.9,67.9,0,0,1,84.16,76.07l30,51.93-30,51.93A67.9,67.9,0,0,1,60,128Zm68,68a67.61,67.61,0,0,1-23.07-4l30-52h60A68.1,68.1,0,0,1,128,196Z"></path></svg>,
        },
        {
            name: 'personal',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="fill-neutral-50" width="16" height="16" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20ZM79.57,196.57a60,60,0,0,1,96.86,0,83.72,83.72,0,0,1-96.86,0ZM100,120a28,28,0,1,1,28,28A28,28,0,0,1,100,120ZM194,179.94a83.48,83.48,0,0,0-29-23.42,52,52,0,1,0-74,0,83.48,83.48,0,0,0-29,23.42,84,84,0,1,1,131.9,0Z"></path></svg>,
        },
        {
            name: 'chores',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="fill-neutral-50" width="16" height="16" viewBox="0 0 256 256"><path d="M237.24,213.21C216.12,203,204,180.64,204,152V134.73a19.94,19.94,0,0,0-12.62-18.59l-24.86-9.81a4,4,0,0,1-2.26-5.14l21.33-53A32,32,0,0,0,167.17,6,32.13,32.13,0,0,0,126.25,24.2l-.07.18-21,53.09a3.94,3.94,0,0,1-2.14,2.2,3.89,3.89,0,0,1-3,.06L74.6,69.43A19.89,19.89,0,0,0,52.87,74C31.06,96.43,20,122.68,20,152a115.46,115.46,0,0,0,32.29,80.3A12,12,0,0,0,61,236H232a12,12,0,0,0,5.24-22.79ZM68.19,92.73,91.06,102A28,28,0,0,0,127.5,86.31l20.95-53a8.32,8.32,0,0,1,10.33-4.81,8,8,0,0,1,4.61,10.57,1.17,1.17,0,0,0,0,.11L142,92.29a28.05,28.05,0,0,0,15.68,36.33L180,137.45V152c0,1,0,2.07.05,3.1l-122.44-49A101.91,101.91,0,0,1,68.19,92.73ZM116.74,212a83.73,83.73,0,0,1-22.09-39,12,12,0,0,0-23.25,6,110.27,110.27,0,0,0,14.49,33H66.25A91.53,91.53,0,0,1,44,152a84,84,0,0,1,3.41-24.11l136.67,54.66A86.58,86.58,0,0,0,198.66,212Z"></path></svg>,
        }
    ];

    const changereadOnlyState = () => {
        //clean the event start time and end time
        setEventStartTime('');
        setEventEndTime('');
        setEventStartTimeMin('');
        setEventStartTimeMax('');
        setEventEndTimeMax('');
        
        //change the state of the edit state
        setReadOnlyState(!readOnlyState);
    };
    
    
    return(
        <Popover.Root>
            <Popover.Trigger className="flex items-center justify-center w-6 h-6 bg-neutral-800 border border-neutral-800 rounded-md">
                {
                    event.cal_event_label === 'education' ? calendarEventLabelIcons[0].icon :
                    event.cal_event_label === 'work' ? calendarEventLabelIcons[1].icon :
                    event.cal_event_label === 'personal' ? calendarEventLabelIcons[2].icon :
                    event.cal_event_label === 'chores' ? calendarEventLabelIcons[3].icon :
                    null
                }
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content 
                className='w-64 h-fit p-4 bg-neutral-100 border border-neutral-800 rounded-md shadow-sm'
                side="bottom"
                align="center"
                sideOffset={5}
                >
                    <div className='flex flex-col gap-2'>
                        <div className='w-full flex flex-row items-center justify-between gap-2'>
                            <p className='text-sm font-semibold text-neutral-800'>Event details</p>
                            <div onClick={changereadOnlyState} className='flex flex-row gap-1 items-center justify-center cursor-pointer hover:underline hover:underline-offset-1 hover:decoration-neutral-800'>
                                <span className='text-xs font-medium text-neutral-800'>
                                    Edit
                                </span>
                            </div>
                        </div>
                        <form action={updateCalendarEvent} className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-3'>
                                {
                                    readOnlyState === true ? (
                                        <div className='relative w-full h-10 px-2 flex items-center justify-center border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100 hover:fill-neutral-100 focus-visible:border-0 focus:outline-0 focus-visible:ring-2 focus-visible:ring-black'>
                                        {eventLabel.charAt(0).toUpperCase() + event.cal_event_label.slice(1)}
                                        </div>
                                    ) : (
                                        <Popover.Root>
                                            <Popover.Trigger asChild>
                                                <button
                                                className='relative w-full h-10 px-2 flex items-center justify-center border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100 hover:fill-neutral-100 focus-visible:border-0 focus:outline-0 focus-visible:ring-2 focus-visible:ring-black'
                                                aria-label='Add event'
                                                >
                                                    {
                                                        eventLabel === '' ? 'Select label' : eventLabel.charAt(0).toUpperCase() + eventLabel.slice(1)
                                                    }
                                                    <svg className='absolute left-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>
                                                </button>
                                            </Popover.Trigger>
                                            <Popover.Portal>
                                                <Popover.Content 
                                                className='flex flex-col gap-2 w-fit h-fit p-4 bg-neutral-100 border border-neutral-800 rounded-l-md shadow-sm'
                                                side="left"
                                                align="start"
                                                sideOffset={17}
                                                >
                                                    <div 
                                                    aria-label='select-label-btn-2'
                                                    className="relative flex flex-row gap-2 items-center justify-between text-xs font-semibold text-black select-none outline-none rounded-lg cursor-pointer"
                                                    >
                                                        Education
                                                        <button onClick={() => {
                                                            setEventLabel('education');
                                                        }} className={`flex items-center justify-center w-6 h-6 fill-neutral-700 border border-neutral-500 rounded-md focus:bg-neutral-800 focus:fill-white focus:outline-0 ${eventLabel === 'education' ? 'bg-neutral-600 fill-white' : ''}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256"><path d="M227.79,52.62l-96-32a11.85,11.85,0,0,0-7.58,0l-96,32A12,12,0,0,0,20,63.37,6.05,6.05,0,0,0,20,64v80a12,12,0,0,0,24,0V80.65l23.71,7.9a67.92,67.92,0,0,0,18.42,85A100.36,100.36,0,0,0,46,209.44a12,12,0,1,0,20.1,13.11C80.37,200.59,103,188,128,188s47.63,12.59,61.95,34.55a12,12,0,1,0,20.1-13.11,100.36,100.36,0,0,0-40.18-35.92,67.92,67.92,0,0,0,18.42-85l39.5-13.17a12,12,0,0,0,0-22.76Zm-99.79-8L186.05,64,128,83.35,70,64ZM172,120A44,44,0,1,1,90.94,96.29l33.27,11.09a11.89,11.89,0,0,0,7.58,0l33.27-11.09A43.85,43.85,0,0,1,172,120Z"></path></svg>
                                                        </button>
                                                    </div>
                                                    <div 
                                                    aria-label='select-label-btn-1'
                                                    className="relative flex flex-row gap-2 items-center justify-between text-xs font-semibold text-black select-none outline-none rounded-lg cursor-pointer"
                                                    >
                                                        Work
                                                        <button onClick={() => {
                                                            setEventLabel('work');
                                                        }} className={`flex items-center justify-center w-6 h-6 fill-neutral-700 border border-neutral-500 rounded-md focus:bg-neutral-800 focus:fill-white focus:outline-0 ${eventLabel === 'work' ? 'bg-neutral-600 fill-white' : ''}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256"><path d="M232,116H219.22A91.1,91.1,0,0,0,213,92.79l11.08-6.4a12,12,0,1,0-12-20.78L201,72a92.85,92.85,0,0,0-17-17l6.41-11.11a12,12,0,1,0-20.78-12L163.21,43A91.1,91.1,0,0,0,140,36.78V24a12,12,0,0,0-24,0V36.78A91.1,91.1,0,0,0,92.79,43l-6.4-11.08a12,12,0,0,0-20.78,12L72,55A92.85,92.85,0,0,0,55,72L43.93,65.61a12,12,0,0,0-12,20.78L43,92.79A91.1,91.1,0,0,0,36.78,116H24a12,12,0,0,0,0,24H36.78A91.1,91.1,0,0,0,43,163.21l-11.08,6.4a12,12,0,1,0,12,20.78L55,184a92.85,92.85,0,0,0,17,17l-6.41,11.11a12,12,0,1,0,20.78,12L92.79,213A91.1,91.1,0,0,0,116,219.22V232a12,12,0,0,0,24,0V219.22A91.1,91.1,0,0,0,163.21,213l6.4,11.08a12,12,0,0,0,20.78-12L184,201a92.85,92.85,0,0,0,17-17l11.11,6.41a12,12,0,1,0,12-20.78L213,163.21A91.1,91.1,0,0,0,219.22,140H232a12,12,0,0,0,0-24ZM128,60a68.1,68.1,0,0,1,66.92,56h-60l-30-52A67.61,67.61,0,0,1,128,60ZM60,128A67.9,67.9,0,0,1,84.16,76.07l30,51.93-30,51.93A67.9,67.9,0,0,1,60,128Zm68,68a67.61,67.61,0,0,1-23.07-4l30-52h60A68.1,68.1,0,0,1,128,196Z"></path></svg>
                                                        </button>
                                                    </div>
                                                    <div 
                                                    aria-label='select-label-btn-3'
                                                    className="relative flex flex-row gap-2 items-center justify-between text-xs font-semibold text-black select-none outline-none rounded-lg cursor-pointer"
                                                    >
                                                        Personal
                                                        <button onClick={() => {
                                                            setEventLabel('personal');
                                                        }} className={`flex items-center justify-center w-6 h-6 fill-neutral-700 border border-neutral-500 rounded-md focus:bg-neutral-800 focus:fill-white focus:outline-0 ${eventLabel === 'personal' ? 'bg-neutral-600 fill-white' : ''}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20ZM79.57,196.57a60,60,0,0,1,96.86,0,83.72,83.72,0,0,1-96.86,0ZM100,120a28,28,0,1,1,28,28A28,28,0,0,1,100,120ZM194,179.94a83.48,83.48,0,0,0-29-23.42,52,52,0,1,0-74,0,83.48,83.48,0,0,0-29,23.42,84,84,0,1,1,131.9,0Z"></path></svg>
                                                        </button>
                                                    </div>
                                                    <div 
                                                    aria-label='select-label-btn-4'
                                                    className="relative flex flex-row gap-2 items-center justify-between text-xs font-semibold text-black select-none outline-none rounded-lg cursor-pointer"
                                                    >
                                                        Chores
                                                        <button onClick={() => {
                                                            setEventLabel('chores');
                                                        }} className={`flex items-center justify-center w-6 h-6 fill-neutral-700 border border-neutral-500 rounded-md focus:bg-neutral-800 focus:fill-white focus:outline-0 ${eventLabel === 'chores' ? 'bg-neutral-600 fill-white' : ''}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256"><path d="M237.24,213.21C216.12,203,204,180.64,204,152V134.73a19.94,19.94,0,0,0-12.62-18.59l-24.86-9.81a4,4,0,0,1-2.26-5.14l21.33-53A32,32,0,0,0,167.17,6,32.13,32.13,0,0,0,126.25,24.2l-.07.18-21,53.09a3.94,3.94,0,0,1-2.14,2.2,3.89,3.89,0,0,1-3,.06L74.6,69.43A19.89,19.89,0,0,0,52.87,74C31.06,96.43,20,122.68,20,152a115.46,115.46,0,0,0,32.29,80.3A12,12,0,0,0,61,236H232a12,12,0,0,0,5.24-22.79ZM68.19,92.73,91.06,102A28,28,0,0,0,127.5,86.31l20.95-53a8.32,8.32,0,0,1,10.33-4.81,8,8,0,0,1,4.61,10.57,1.17,1.17,0,0,0,0,.11L142,92.29a28.05,28.05,0,0,0,15.68,36.33L180,137.45V152c0,1,0,2.07.05,3.1l-122.44-49A101.91,101.91,0,0,1,68.19,92.73ZM116.74,212a83.73,83.73,0,0,1-22.09-39,12,12,0,0,0-23.25,6,110.27,110.27,0,0,0,14.49,33H66.25A91.53,91.53,0,0,1,44,152a84,84,0,0,1,3.41-24.11l136.67,54.66A86.58,86.58,0,0,0,198.66,212Z"></path></svg>
                                                        </button>
                                                    </div>
                                                </Popover.Content>
                                            </Popover.Portal>
                                        </Popover.Root>
                                    )
                                }
                                <input autoComplete="off" required type='hidden' id='calendar-event-id' name='calendar-event-id' value={eventId} />
                                <input autoComplete="off" required type='hidden' id='calendar-event-label'  name='calendar-event-label' value={eventLabel} />
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='calendar-event-name' className='text-sm font-normal text-neutral-800'>Event name</label>
                                    <input 
                                    required 
                                    readOnly={readOnlyState}
                                    type='text' 
                                    value={readOnlyState === true ? event.cal_event_name : eventName} 
                                    autoComplete='off' 
                                    id='calendar-event-name' 
                                    name='calendar-event-name' 
                                    onChange={(e) => {
                                        setEventName(e.target.value);
                                    }}
                                    className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='calendar-event-description' className='text-sm font-normal text-neutral-800'>Event description</label>
                                    <input 
                                    required 
                                    readOnly={readOnlyState}
                                    type='text' 
                                    value={readOnlyState === true ? event.cal_event_description : eventDescription} 
                                    autoComplete='off' 
                                    id='calendar-event-description' 
                                    name='calendar-event-description' 
                                    onChange={(e) => {
                                        setEventDescription(e.target.value);
                                    }}
                                    className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black' />
                                </div>
                            </div>
                            <div className='w-full h-0.5 border-t-[1px] border-neutral-200' />
                            <div className='flex flex-col gap-3'>
                                <div className='w-full flex flex-row items-center justify-between gap-2'>
                                    <p className='text-sm font-semibold text-neutral-800'>Event time</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='calendar-event-start-date' className='text-sm font-normal text-neutral-800'>Event start time</label>
                                    <input 
                                    required 
                                    readOnly={readOnlyState}
                                    type='datetime-local'
                                    value={readOnlyState === true ? eventStartDateFormatted : eventStartTime}
                                    id='calendar-event-start-date'
                                    name='calendar-event-start-date'
                                    min={eventStartTimeMin}
                                    max={eventStartTimeMax}
                                    onChange={(e) => {
                                        setEventStartTime(e.target.value);
                                    }}
                                    className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-black'
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='calendar-event-end-date' className='text-sm font-normal text-neutral-800'>Event end time</label>
                                    <input 
                                    required 
                                    readOnly={readOnlyState}
                                    type='datetime-local'
                                    value={readOnlyState === true ? eventEndDateFormatted : eventEndTime}
                                    id='calendar-event-end-date'
                                    name='calendar-event-end-date'
                                    min={eventStartTime}
                                    max={eventEndTimeMax}
                                    onChange={(e) => {
                                        setEventEndTime(e.target.value);
                                    }}
                                    className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-black'
                                    />
                                </div>
                            </div>
                            {
                                readOnlyState === false && <CalendarEventBtn btnText="Update" />
                            }
                        </form>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
};
