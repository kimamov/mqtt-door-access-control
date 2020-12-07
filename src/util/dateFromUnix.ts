export default function dateFromUnix(unixTimeStamp: number){
    return new Date(unixTimeStamp*1000)
}