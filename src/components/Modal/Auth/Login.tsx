import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtoms';
import { auth, firestore } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/error';

const Login:React.FC = () => {

    const [
        signInWithEmailAndPassword,
        userCred,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const setAuthModalState = useSetRecoilState(authModalState)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        signInWithEmailAndPassword(loginForm.email,loginForm.password)
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore,"users",user.uid)
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
    }

    useEffect(() => {
        if(userCred) {
            createUserDocument(userCred.user)
        }
    }, [userCred])
    
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
            <Text textAlign='center' color='red' fontSize='10pt'>
                {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button type='submit' width='100%' height='36px' mt={2} mb={2} >
                Log In
            </Button>
            <Flex justifyContent="center" mb={2}>
                <Text fontSize="9pt" mr={1}>
                    Forgot your password?
                </Text>
                <Text
                fontSize="9pt"
                color="blue.500"
                cursor="pointer"
                onClick={() => setAuthModalState((prev) => ({
                    ...prev,
                    view: "resetPassword",
                }))}>
                    Reset
                </Text>
            </Flex>
            <Flex fontSize='9pt' justifyContent='center' >
                <Text mr={2}>New Here</Text>   
                <Text color='blue.500'
                fontWeight={700}
                cursor='pointer'
                onClick={() => setAuthModalState((prev) => ({
                    ...prev,
                    view: "signup",
                }))} >SIGN UP</Text>          
            </Flex>
        </form>
    )
}
export default Login;