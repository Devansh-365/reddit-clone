import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Divider, Text, Input, Stack, Checkbox, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityProps = {
  isOpen: boolean;
  handleClose: () => void;
  userId?: string;
};

const CreateCommunity:React.FC<CreateCommunityProps> = ({isOpen,handleClose,}) => {

  const [communityName, setCommunityName] = useState('')
  const [charsRemaining, setCharsRemaining] = useState(22)
  const [communityType, setCommunityType] = useState("public")

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    if(event?.target.value.length > 21) return

    setCommunityName(event.target.value)
    setCharsRemaining(21-event.target.value.length)
  }

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name },
    } = event;
    if (name === communityType) return;
    setCommunityType(name);
  }

    return (
        <Modal  isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
        width={{ base: "sm", md: "xl" }}>
          <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={15}
          padding={3}>Create a Community</ModalHeader>
          <Box pr={3} pl={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px"
          >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                color="gray.400"
                position="relative"
                top="28px"
                left="10px"
                width="20px"
              >
                r/
              </Text>
              <Input
              position="relative"
              name="name" 
              value={communityName}
              onChange={handleChange} 
              size="sm"
              pl="22px"
            type={""} />
            <Text
            fontSize="9pt"
            color={charsRemaining === 0 ? "red" : "gray.500"}
            pt={2}
            >
              {charsRemaining} Characters remaining
            </Text>
            <Box mt={4} mb={4}>
              <Text fontWeight={600}
              fontSize={15}>
                Community Type
              </Text>
              <Stack spacing={2} pt={1}>
                <Checkbox
                colorScheme="blue"
                name="public"
                isChecked={communityType === "public"}
                onChange={onCommunityTypeChange}
                >
                  <Flex alignItems="center">
                    <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                    <Text fontSize="10pt" mr={1}>
                      Public
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Anyone can view, post, and comment to this community
                    </Text>
                  </Flex>
                  </Checkbox>
                <Checkbox
                colorScheme="blue"
                name="restricted"
                isChecked={communityType === "restricted"}
                onChange={onCommunityTypeChange}>
                  <Flex alignItems="center">
                    <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                    <Text fontSize="10pt" mr={1}>
                      Restricted
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Anyone can view this community, but only approved users can
                      post
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                colorScheme="blue"
                name="private"
                isChecked={communityType === "private"}
                onChange={onCommunityTypeChange}>
                  <Flex alignItems="center">
                    <Icon as={HiLockClosed} color="gray.500" mr={2} />
                    <Text fontSize="10pt" mr={1}>
                      Private
                    </Text>
                    <Text fontSize="8pt" color="gray.500" pt={1}>
                      Only approved users can view and submit to this community
                    </Text>
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
          <Button variant="outline" height="30px" mr={2} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="solid"
            height="30px"
            
          >
            Create Community
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    )
}
export default CreateCommunity;