import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import PageContent from '../../../components/Layout/PageContent';


const submitPostPage:React.FC = () => {
    
    return (

        <PageContent>
            <>
                <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                <Text fontWeight={600}>Create a post</Text>
                </Box>
            </>
            <></>
        </PageContent>
    )
}
export default submitPostPage;