
export default async function CalendarTable({
    searchParams
}){

    //this calendar will be inside a Suspense component
    //as a server side rendered component, it will be rendered with all the relevant data of selected time period
    //the default month will be the current month if nothing is read from the url
    let date;
    let day;
    //if the url has a day, change the day format from YYYY-MM-DD to DD
    if(searchParams.day){
        day = searchParams.day.split("-")[2];
    }
   
    if(searchParams === undefined || searchParams === null || !searchParams.year || !searchParams.month || !searchParams.day){
        date = new Date();
    } else {
        date = new Date(searchParams.year, searchParams.month - 1, day);
    };

  
    //names of days
    const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    //names of months
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let firstDayOfTheMonthNumber = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    let lasttDayOfTheMonthNumber = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    // Adjust the day numbers to start from Monday
    firstDayOfTheMonthNumber = firstDayOfTheMonthNumber === 0 ? 7 : firstDayOfTheMonthNumber;
    lasttDayOfTheMonthNumber = lasttDayOfTheMonthNumber === 0 ? 7 : lasttDayOfTheMonthNumber;

    const numberOfDaysInTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const arrayOfDays = [];
    const totalSlots = 7 * 6;
    const daysBeforeMonthStarts = firstDayOfTheMonthNumber - 1;
    const daysAfterMonthEnds = totalSlots - (daysBeforeMonthStarts + numberOfDaysInTheMonth) % totalSlots;

    // Days before the first day of the month
    for (let i = 0; i < daysBeforeMonthStarts; i++) {
        arrayOfDays.push({
            day: '',
            month: '',
            year: '',
            name: ''
        });
    };
    
    // Days in the current month
    for (let i = 1; i <= numberOfDaysInTheMonth; i++) {
        arrayOfDays.push({
            day: i,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            name: days[new Date(date.getFullYear(), date.getMonth(), i).getDay()]
        });
    };
    
    // Days after the last day of the month
    for (let i = 0; i < daysAfterMonthEnds; i++) {
        arrayOfDays.push({
            day: '',
            month: '',
            year: '',
            name: ''
        });
    };

    return (
        <div className="w-full h-full grid grid-cols-7 grid-rows-6 gap-4">
            {
                arrayOfDays.map((day, index) => {
                    return (
                        <div key={index} className={`w-full h-full flex flex-col p-2 rounded-md ${
                            day.day === "" ? "outline outline-1 outline-neutral-300 shadow-sm" : 
                            day.year === Number(searchParams.day.split("-")[0]) && 
                            day.month === Number(searchParams.day.split("-")[1]) && 
                            day.day === Number(searchParams.day.split("-")[2]) ? 
                            "outline outline-2 outline-neutral-800 shadow-md shadow-neutral-400" : 
                            "outline outline-1 outline-neutral-800 shadow-sm"
                        }`}>
                            <span className="text-sm font-bold text-neutral-800">
                                {day.name.slice(0,3)} {day.day}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
};