import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import React from 'react';

type CreateCommunityProps = {
  isOpen: boolean;
  handleClose: () => void;
  userId?: string;
};

const CreateCommunity:React.FC<CreateCommunityProps> = ({isOpen,handleClose,}) => {
    
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button variant='ghost'>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}
export default CreateCommunity;