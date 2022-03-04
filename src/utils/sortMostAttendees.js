const sortMostAttendees = (arr) => {
  return arr.sort(function(a,b){
    return Number( (  b.description.attendeesCount ) - Number(  a.description.attendeesCount ) );
  } )
}
export default sortMostAttendees;