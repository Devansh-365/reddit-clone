import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import RightContent from './RightContent/RightContent'
import SearchInput from './SearchInput'

export const Navbar: React.FC = () => {
    return (
        <Flex bg='white' height='44px' padding='6px 12px'>
            <Flex align='center'>
                <Image src='/images/redditFace.svg' height='38px' />
                <Image src='/images/redditText.svg' height='46px' display={{ base:'none', md:'unset'}} />     
            </Flex>  
            <SearchInput />
            <RightContent />                 
        </Flex>
    )
}