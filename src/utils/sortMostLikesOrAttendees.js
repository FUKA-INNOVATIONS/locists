const sortMostLikesOrAttendees = (arr) => {
  return arr.sort(function(a,b){
    return Number( ( b.description.likesCount || b.description.attendeesCount ) - Number( a.description.likesCount || a.description.attendeesCount ) );
  } )
}
export default sortMostLikesOrAttendees;