const sortLatest = (arr) => {
  arr.sort(function(a,b){
    return Number( new Date( b.time_added ) ) - Number( new Date( a.time_added ) );
  } )
}
export default sortLatest;