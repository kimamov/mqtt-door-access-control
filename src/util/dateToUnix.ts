const dateToUnix=(date: Date | string)=>new Date(date).getTime() / 1000;

export default dateToUnix