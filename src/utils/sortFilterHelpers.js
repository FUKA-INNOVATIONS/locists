export const sortLatest = (arr) => {
  return arr.sort(function(a,b){
    return Number( new Date( b.time_added ) ) - Number( new Date( a.time_added ) );
  } )
}

export const sortMostAttendees = (arr) => {
  return arr.sort(function(a,b){
    return Number( (  b.description.attendeesCount ) - Number(  a.description.attendeesCount ) );
  } )
}

export const sortMostCommented = (arr) => {
  return arr.sort(function(a,b){
    return Number( ( b.description.commentsCount ) - Number( a.description.commentsCount ) );
  } )
}

export const sortMostLikes = (arr) => {
  return arr.sort(function(a,b){
    return Number( ( b.description.likesCount ) - Number( a.description.likesCount ) );
  } )
}

export const sortSoonestEvents = (arr) => {
  return arr.sort(function(a,b){
    return Number( new Date( a.description.date ) ) - Number( new Date( b.description.date ) );
  } )
}


export const initCities = (arr, setArr) => {
  const cities = []
  arr.map( item => cities.push( item.description.location ) )
  const uniqueCities = [ ...new Set( cities ) ]
  const cityOptions = [ { label: 'All locations', value: 'none' } ]
  uniqueCities.map(
    city => cityOptions.push( { label: city, value: city } ) )
  setArr( cityOptions )
  console.log('cityOptions in initCities', cityOptions)
}