'use client'

import * as Popover from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';
import CalendarAddEventBtn from './calendarAddEventBtn';
import { uploadCalendarEvent } from '@/lib/actions';

export default function CalendarAddEventPopover(){
    
    let [eventStartTime, setEventStartTime] = useState('');
    let [eventStartTimeMin, setEventStartTimeMin] = useState('');
    let [eventStartTimeMax, setEventStartTimeMax] = useState('');
    let [eventEndTime, setEventEndTime] = useState('');
    let [eventEndTimeMax, setEventEndTimeMax] = useState('');

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

    return (
        <Popover.Root
        onOpenChange={(open) => {
            if(!open){
                setEventStartTime('');
                setEventEndTime('');
                setEventStartTimeMin('');
                setEventStartTimeMax('');
                setEventEndTimeMax('');
            }
        }}
        >
            <Popover.Trigger asChild>
                <button
                className='w-fit h-8 px-2 flex flex-row gap-2 items-center border border-neutral-800 rounded-md shadow-sm text-sm font-bold text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100 hover:fill-neutral-100'
                aria-label='Add event'
                >
                    Add event
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"></path></svg>
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content 
                className='w-64 h-fit p-4 bg-neutral-100 border border-neutral-800 rounded-md shadow-sm'
                side="bottom"
                align="center"
                sideOffset={5}
                >
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-bold text-neutral-800'>Add event</p>
                        <form action={uploadCalendarEvent} className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='calendar-event-name' className='text-sm font-normal text-neutral-800'>Event name</label>
                                <input required type='text' autoComplete='off' id='calendar-event-name' name='calendar-event-name' className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='calendar-event-description' className='text-sm font-normal text-neutral-800'>Event description</label>
                                <input required type='text' autoComplete='off' id='calendar-event-description' name='calendar-event-description' className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black' />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='calendar-event-start-date' className='text-sm font-normal text-neutral-800'>Event start time</label>
                                    <input 
                                    required 
                                    type='datetime-local' 
                                    id='calendar-event-start-date'
                                    name='calendar-event-start-date'
                                    min={eventStartTimeMin}
                                    max={eventStartTimeMax}
                                    className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black'
                                    onChange={(e) => {
                                        setEventStartTime(e.target.value);
                                    }}
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='calendar-event-end-date' className='text-sm font-normal text-neutral-800'>Event end time</label>
                                    <input 
                                    required 
                                    type='datetime-local' 
                                    id='calendar-event-end-date'
                                    name='calendar-event-end-date'
                                    min={eventStartTime}
                                    max={eventEndTimeMax}
                                    onChange={(e) => {
                                       if(!eventStartTime || eventStartTime === ''){
                                           setEventEndTime(e.target.value);
                                       }
                                    }}
                                    className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black'
                                    />
                                </div>
                            </div>
                            <CalendarAddEventBtn/>
                        </form>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
};