import { Image } from 'react-native';

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
  const cityOptions = [ { label: 'All locations', value: 'all' } ]
  uniqueCities.map(
    city => cityOptions.push( { label: city, value: city } ) )
  setArr( cityOptions )
  // console.log('cityOptions in initCities', cityOptions)
}

// TODO add icon //   icon: () => <Image source={require('./assets/icon.png')} style={styles.iconStyle} />
export const initSearchNames = (arr, setArr) => {
  const names = []
  arr.map( item => names.push( item.description.name || `no-name-${Math.floor(Math.random()*(999-100+1)+100)}` ) )
  const nameOptions = [ { label: 'No search keyword', value: 'no-search' } ]
  names.map(
    city => nameOptions.push( { label: city, value: city } ) )
  setArr( nameOptions )
  console.log('nameOptions in initSearchNames', nameOptions)
}