import React from 'react'
import UploadMedia from '../components/UploadMedia'
import PropTypes from 'prop-types'

const CreateEvent = ( { navigation } ) => {
  return (
    <>
      <UploadMedia mediaType={ 'event' } navigation={ navigation } />
    </>
  )
}

CreateEvent.propTypes = {
  navigation: PropTypes.object,
}

export default CreateEvent