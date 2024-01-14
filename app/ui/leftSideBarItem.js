'use client'

import * as Tooltip from '@radix-ui/react-tooltip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeftSideBarItem( props ){

    const pathname = usePathname();

    const arrayOfIcons = [
        {
            name: "Page 1",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M216,36H40A20,20,0,0,0,20,56V200a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,24V92H44V60ZM44,116H92v80H44Zm72,80V116h96v80Z"></path></svg>,
            link: `/dash`
        },
        {
            name: "Page 2",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><path d="M224,196h-4V40a12,12,0,0,0-12-12H152a12,12,0,0,0-12,12V76H96A12,12,0,0,0,84,88v36H48a12,12,0,0,0-12,12v60H32a12,12,0,0,0,0,24H224a12,12,0,0,0,0-24ZM164,52h32V196H164Zm-56,48h32v96H108ZM60,148H84v48H60Z"></path></svg>,
            link: `/dash/example-one`
        },
    ];

    //select the icon to display
    let indexOfIcon = arrayOfIcons.findIndex(icon => icon.name === props.text);

    return(
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Link href={arrayOfIcons[indexOfIcon].link} className={`flex items-center justify-center w-8 h-8 fill-neutral-700 border border-neutral-500 rounded-md ${
                        pathname === arrayOfIcons[indexOfIcon].link ? "bg-neutral-800 fill-neutral-100" : "bg-neutral-100 fill-neutral-700"
                    }`}>
                        {arrayOfIcons[indexOfIcon].icon}
                    </Link>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                    className="p-2 bg-neutral-700 text-sm text-white rounded-md shadow-lg"
                    side='right'
                    sideOffset={5}
                    >
                        {arrayOfIcons[indexOfIcon].name}
                        <Tooltip.Arrow className='fill-neutral-800'/>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
};