
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

    //calculates the first and last day of the month, both name and number
    const firstDayOfTheMonthNumber = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lasttDayOfTheMonthNumber = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const firstDayOfTheMonthString = new Date(date.getFullYear(), date.getMonth(), 1).toDateString().slice(0, 3);
    const lasttDayOfTheMonthString = new Date(date.getFullYear(), date.getMonth() + 1, 0).toDateString().slice(0, 3);

    //function that calculates the number of days in the current month
    const numberOfDaysInTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const arrayOfDays = [];

    // Calculate the total number of items (days) to display in the calendar view
    const totalSlots = 7 * 5; // 5 weeks, 7 days each, to accommodate the maximum possible month display
    const daysBeforeMonthStarts = firstDayOfTheMonthNumber - 1;
    const daysAfterMonthEnds = totalSlots - (daysBeforeMonthStarts + numberOfDaysInTheMonth);

    // Days before the first day of the month
    for (let i = 0; i < daysBeforeMonthStarts; i++) {
        arrayOfDays.push({
            day: '',
            month: '',
            year: '',
            name: ''
        });
    }
    
    // Days in the current month
    for (let i = 1; i <= numberOfDaysInTheMonth; i++) {
        arrayOfDays.push({
            day: i,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            name: days[new Date(date.getFullYear(), date.getMonth(), i).getDay()]
        });
    }
    
    // Days after the last day of the month
    for (let i = 0; i < daysAfterMonthEnds; i++) {
        arrayOfDays.push({
            day: '',
            month: '',
            year: '',
            name: ''
        });
    }

    return (
        <div className="w-full h-full grid grid-cols-7 gap-4">
            {
                arrayOfDays.map((day, index) => {
                    return (
                        <div key={index} className={`w-full h-full flex flex-col p-2 rounded-md ${
                            day.year === date.getFullYear() && day.month === date.getMonth() + 1 && day.day === date.getDate() ? "outline outline-2 outline-neutral-800 shadow-md" : "outline outline-1 outline-neutral-800 shadow-sm"
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