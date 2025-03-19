
const today = new Date();

function todaysDatemonth() {
    //Oct 27, 2023
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const tdate = currentDate.toLocaleDateString('en-US', options);
    return tdate;
}

// exporting variables and function
export { todaysDatemonth };