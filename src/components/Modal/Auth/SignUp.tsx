import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtoms';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase/clientApp';
import {FIREBASE_ERRORS} from '../../../firebase/error';

const SignUp:React.FC = () => {

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        userError,
      ] = useCreateUserWithEmailAndPassword(auth);
    
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errror, setError] = useState('')

    const setAuthModalState = useSetRecoilState(authModalState)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(errror) setError('')
        if(signupForm.password !== signupForm.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        createUserWithEmailAndPassword(signupForm.email, signupForm.password)
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    
    return (
        <form onSubmit={onSubmit}>
            <Input
            required
            name='email'
            placeholder='email'
            type='email'
            mb={2}
            onChange={onChange}
            fontSize='10pt'
            _placeholder={{color: 'gray.500'}}
            _hover={{
                bg:'white',
                border: '1px solid',
                borderColor: 'blue.500',
            }}
            _focus={{
                outline: 'none',
                bg:'white',
                border: '1px solid',
                borderColor: 'blue.500',
            }}
            bg='gray.50' />
            <Input
            required
            name='password'
            placeholder='password'
            type='password'
            mb={2}
            onChange={onChange}
            fontSize='10pt'
            _placeholder={{color: 'gray.500'}}
            _hover={{
                bg:'white',
                border: '1px solid',
                borderColor: 'blue.500',
            }}
            _focus={{
                outline: 'none',
                bg:'white',
                border: '1px solid',
                borderColor: 'blue.500',
            }}
            bg='gray.50' />
            <Input
            required
            name='confirmPassword'
            placeholder='confirm password'
            type='password'
            mb={2}
            onChange={onChange}
            fontSize='10pt'
            _placeholder={{color: 'gray.500'}}
            _hover={{
                bg:'white',
                border: '1px solid',
                borderColor: 'blue.500',
            }}
            _focus={{
                outline: 'none',
                bg:'white',
                border: '1px solid',
                borderColor: 'blue.500',
            }}
            bg='gray.50' /> 
            { (errror || userError) && (
                <Text textAlign='center' color='red' fontSize='10pt'>
                {errror || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
                </Text>
            )}
            <Button type='submit' width='100%' height='36px' mt={2} mb={2} isLoading={loading}>
                Sign Up
            </Button>
            <Flex fontSize='9pt' justifyContent='center' >
                <Text mr={2}>Already a redditer</Text>   
                <Text color='blue.500'
                fontWeight={700}
                cursor='pointer'
                onClick={() => setAuthModalState((prev) => ({
                    ...prev,
                    view: "login",
                }))} >LOG IN</Text>          
            </Flex>
        </form>
    )
}
export default SignUp;