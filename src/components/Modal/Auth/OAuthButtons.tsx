import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';

const OAuthButtons: React.FC  = () => {

    const [signInWithGoogle, _, googleLoading, error] = useSignInWithGoogle(auth);
    
    return (
        <Flex direction='column' width='100%' mb={4}>
            <Button variant='oauth' mb={2} isLoading={googleLoading} onClick={() => signInWithGoogle()} >
                <Image src='/images/googlelogo.png' height='20px' mr={4} />
                Continue with Google
            </Button>
            <Button variant='oauth' mb={2} >
                <Image src='/images/twitterlogo.png' height='20px' mr={4} />
                Continue with Twitter
            </Button>
            {error && (
            <Text textAlign="center" fontSize="10pt" color="red" mt={2}>
            {error}
            </Text>
        )}
        </Flex>
    )
}
export default OAuthButtons;