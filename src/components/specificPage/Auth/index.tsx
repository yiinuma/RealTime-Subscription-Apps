import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import {
  Anchor,
  NumberInput,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
  Box,
  Center,
} from '@mantine/core'
import { supabase } from 'utils/supabase'
import { useForm, yupResolver } from '@mantine/form'

import { Form } from 'types'
import useStore from 'store'

const scheme = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No email provided.'),
  password: Yup.string()
    .required('No password provided.')
    .min(6, 'Password should be min 6 chars')
    .matches(/[a-z]+/, 'One lowercase char missing')
    .matches(/[A-Z]+/, 'One uppercase char missing'),
  // .matches(/[@$!%*#?&]+/, 'One special char missing'),
  age: Yup.number().min(15, 'Only over 15 for new account'),
})

export const Auth = () => {
  const setSession = useStore((state) => state.setSession)
  const setOpened = useStore((state) => state.setOpened)
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const form = useForm<Form>({
    schema: yupResolver(scheme),
    initialValues: {
      email: '',
      password: '',
      age: 15,
    },
  })

  useEffect(() => {
    // アクティブなセッションがある場合そのセッションデータが返ってくる
    setSession(supabase.auth.session())

    // 認証イベントが発生するたびに通知を受け取ります。
    supabase.auth.onAuthStateChange((_event, session) => {
      // _event: SIGNED_IN, SIGNED_OUT
      // session: セッション情報
      setSession(session)
    })
  }, [setSession])

  const handleSubmit = async () => {
    if (isLogin) {
      const { error } = await supabase.auth.signIn({
        email: form.values.email,
        password: form.values.password,
      })
      if (error) {
        setError(error.message)
        return
      }
      form.reset()
      setOpened(false)
    } else {
      const { error } = await supabase.auth.signUp({
        email: form.values.email,
        password: form.values.password,
      })
      if (error) {
        setError(error.message)
        return
      }
      form.reset()
      setOpened(false)
    }
  }

  return (
    <Box>
      {error && (
        <Alert
          mt='md'
          icon={<AiOutlineExclamationCircle className='text-pink-500' />}
          title='Authorization Error'
          color='red'
          radius='md'
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt='md'
          id='email'
          label='Email'
          placeholder='exsample@gmail.com'
          {...form.getInputProps('email')}
        />
        <PasswordInput
          mt='md'
          id='password'
          placeholder='password'
          label='Password'
          description='Must include one upper & lower char'
          {...form.getInputProps('password')}
        />
        {!isLogin && (
          <NumberInput
            mt='md'
            id='age'
            label='Age'
            placeholder='Your age'
            {...form.getInputProps('age')}
          />
        )}
        <Group mt='lg' position='apart'>
          <Anchor
            component='button'
            type='button'
            color='gray'
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
            size='sm'
          >
            {isLogin ? 'Have an account? Login' : "Don't have an account? Register"}
          </Anchor>
          <Button type='submit'>{isLogin ? 'Login' : 'Register'}</Button>
        </Group>
      </form>
    </Box>
  )
}
