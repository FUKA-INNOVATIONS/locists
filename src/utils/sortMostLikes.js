const sortMostLikes = (arr) => {
  return arr.sort(function(a,b){
    return Number( ( b.description.likesCount ) - Number( a.description.likesCount ) );
  } )
}
export default sortMostLikes;