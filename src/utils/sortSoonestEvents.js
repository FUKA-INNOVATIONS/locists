const sortSoonestEvents = (arr) => {
  return arr.sort(function(a,b){
    return Number( new Date( b.description.date ) ) - Number( new Date( a.description.date ) );
  } )
}
export default sortSoonestEvents;