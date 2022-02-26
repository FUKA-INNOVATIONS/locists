import {View, Text, TextInput, Button, Alert, Pressable, TouchableOpacity} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'

import theme from '../theme'
import useUser from '../hooks/useUser'
import { yupResolver } from '@hookform/resolvers/yup'

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

const Login = ({ navigation }) => {
  const { login } = useUser()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur',
  })
  const onSubmit = async (data) => {
    const loginResponse = await login(data)
    if (loginResponse.token) {
      console.log('login succeeded')  // User login succeeded
      navigation.navigate('Home')     // Redirect to home screen
    } else {  // User login failed
      console.log('login failed')
      Alert.alert('Login failed', 'Please check your credentials and try again')
    }
  }

  return (
    <View style={theme.login}>

      <View style={theme.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={theme.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
            />
          )}
          name="username"
        />
        {errors.username && <Text style={theme.inputErrorText}>{errors.username.message}</Text>}
      </View>

      <View style={theme.inputContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={theme.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
            />
          )}
          name="password"
        />
        {errors.password && <Text style={theme.inputErrorText}>{errors.password.message}</Text>}
      </View>
      <TouchableOpacity style={theme.loginButton} onPress={handleSubmit(onSubmit)}>
        <Text style={theme.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login
