import React, { useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { uploadsUrl } from '../../config'
import PostComment from './PostComment'
import Attend from './Attend'
import theme from '../theme'
import Loading from './Loading'
import PropTypes from 'prop-types'

const SingleEventHeader = ( { eventDetails } ) => {
  const [ isWriteComment, setIsWriteComment ] = useState( false )

  if ( !eventDetails ) return <Loading />
  const smallScreen = Dimensions.get( 'screen' ).width <= 390

  return (
      <View>
        <Image source={ { uri: smallScreen ? uploadsUrl + eventDetails.thumbnails.w640 : uploadsUrl + eventDetails.filename } }
               style={ { width: '100%', height: 250 } }/>
        <View style={ theme.singleEventInfo }>
          <View style={ theme.infoTop}>
            <View>
              <Text style={ theme.mediaTitle }>{ eventDetails.description.name }</Text>
              <Text>{new Date( eventDetails.description.date ).toDateString()} in { eventDetails.description.location } </Text>
            </View>
            <Attend displayIcon file_id={eventDetails.file_id} single={true} />
            </View>
              <View style={ theme.infoBottom }>
                <Text style={{width: '80%'}}>{ eventDetails.description.description }</Text>
              </View>

        </View>
        <View style={ { alignItems: 'center' } }>
          {isWriteComment && <PostComment file_id={eventDetails.file_id} display={setIsWriteComment} type={'event'}/>}
        </View>

      </View>
  )
}

SingleEventHeader.propTypes = {
  eventDetails: PropTypes.object,
}

export default SingleEventHeader