'use client'

import LeftSideBarItem from "./leftSideBarItem";

export default function LeftSideBar() {
    
    const LeftSideBarItems = [
        "Page 1",
        "Page 2",
    ];

    return (
        <div className="w-16 h-full bg-neutral-100 mt-[1px] ring-1 ring-neutral-800">
            <div className="w-full h-full flex flex-col gap-4 items-center pt-4">
                {
                    LeftSideBarItems.map((item, index) => {
                        return <LeftSideBarItem key={index} text={item}/>
                    })
                }
            </div>
        </div>
    )
}