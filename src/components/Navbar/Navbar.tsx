import { Flex, Image } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/clientApp'
import Directory from './Directory/Directory'
import RightContent from './RightContent/RightContent'
import SearchInput from './SearchInput'

export const Navbar: React.FC = () => {

    const [user, loading, error] = useAuthState(auth);

    return (
        <Flex bg='white' height='44px' padding='6px 12px'
        justify={{md: "space-between"}}>
            <Link href="/">
            <Flex align='center'
            width={{base: "40px", md: "auto"}}
            mr={{base: 0, md: 2}}
            cursor="pointer">
                <Image src='/images/redditFace.svg' height='38px' />           
                <Image src='/images/redditText.svg' height='46px' display={{ base:'none', md:'unset'}} />    
            </Flex>  
            </Link>
            {user && <Directory />}
            <SearchInput user={user} />
            <RightContent user={user} />                 
        </Flex>
    )
}
