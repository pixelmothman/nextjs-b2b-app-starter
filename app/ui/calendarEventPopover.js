'use client'

import * as Popover from '@radix-ui/react-popover';

export default function CalendarEventPopover( { event }){

    let startDate = new Date(event.cal_event_start_date);
    let endDate = new Date(event.cal_event_end_date);

    let eventStartDateFormatted = startDate.toISOString().split('.')[0];
    let eventEndDateFormatted = endDate.toISOString().split('.')[0];
    
    
    return(
        <Popover.Root>
            <Popover.Trigger className="w-4 h-4 bg-neutral-100 border-2 border-neutral-800 rounded-sm"/>
            <Popover.Portal>
                <Popover.Content 
                className='w-64 h-fit p-4 bg-neutral-100 border border-neutral-800 rounded-md shadow-sm'
                side="top"
                align="center"
                sideOffset={5}
                >
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='calendar-event-name' className='text-sm font-normal text-neutral-800'>Event name</label>
                            <input readOnly required type='text' id='calendar-event-name' name='calendar-event-name' value={event.cal_event_name} className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='calendar-event-description' className='text-sm font-normal text-neutral-800'>Event description</label>
                            <input readOnly required type='text' id='calendar-event-description' name='calendar-event-description' value={event.cal_event_description} className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='calendar-event-start-date' className='text-sm font-normal text-neutral-800'>Event start time</label>
                                <input 
                                readOnly
                                required
                                value={eventStartDateFormatted}
                                type='datetime-local' 
                                id='calendar-event-start-date'
                                name='calendar-event-start-date'
                                className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black'
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='calendar-event-end-date' className='text-sm font-normal text-neutral-800'>Event end time</label>
                                <input 
                                readOnly
                                required 
                                value={eventEndDateFormatted}
                                type='datetime-local' 
                                id='calendar-event-end-date'
                                name='calendar-event-end-date'
                                className='w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black'
                                />
                            </div>
                        </div>
                    </div>
                    <Popover.Arrow
                    width={20}
                    height={10}
                    className='fill-neutral-800 shadow-xl shadow-neutral-100'
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
};