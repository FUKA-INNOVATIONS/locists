import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const useDevice = () => {
  const [ imageSelected, setImageSelected ] = useState( false )
  const [ type, setType ] = useState( 'image' )
  const [ image, setImage ] = useState(
    'https://place-hold.it/300x200&text=Choose' )
  const [ width, setWidth ] = useState()
  const [ height, setHeight ] = useState()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync( {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    } )
    console.log( 'picked img: ', result )
    if ( !result.cancelled ) {
      setImage( result.uri )
      setImageSelected( true )
      setType( result.type )
      setWidth( result.width )
      setHeight( result.height )
    }
  }

  return {
    image, setImage, width, height, imageSelected, setImageSelected, type, setType, pickImage,
  }

}

export default useDevice