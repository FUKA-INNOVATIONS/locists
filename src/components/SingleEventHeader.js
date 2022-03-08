import React, { useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { uploadsUrl } from '../../config'
import PostComment from './PostComment'
import Attend from './Attend'
import theme from '../theme'
import Loading from './Loading'
import PropTypes from 'prop-types'
import { Price } from '../utils'

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
              <Text>{ eventDetails.description.location } </Text>
              <Text> </Text>
              <Text>{new Date( eventDetails.description.date ).toLocaleDateString()}</Text>
              <Text>{new Date(eventDetails.description.date).toTimeString()}</Text>
            </View>
            <Attend displayIcon file_id={eventDetails.file_id} single={true} />
            </View>
              <View style={ theme.infoBottom }>
                <Text style={{width: '80%'}}>{ eventDetails.description.description }</Text>
              </View>
          <View style={ {...theme.eventSection, flexDirection: 'row', justifyContent: 'flex-end', right: 12} }>
            <Text style={{ fontSize: 20 }}>{ eventDetails.description.price > 0 ? eventDetails.description.price : 'Free' }</Text>
            <Price width={ 30 } height={ 40 } marginLeft={5} />
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