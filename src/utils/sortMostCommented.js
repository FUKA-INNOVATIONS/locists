const sortMostCommented = (arr) => {
  return arr.sort(function(a,b){
    return Number( ( b.description.commentsCount ) - Number( a.description.commentsCount ) );
  } )
}
export default sortMostCommented;