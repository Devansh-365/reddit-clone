import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { BiPoll } from "react-icons/bi";
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';


type NewPostFormProps = {
    
};
const formTabs = [
      {
        title: "Post",
        icon: IoDocumentText,
      },
      {
        title: "Images & Video",
        icon: IoImageOutline,
      },
      {
        title: "Link",
        icon: BsLink45Deg,
      },
      {
        title: "Poll",
        icon: BiPoll,
      },
      {
        title: "Talk",
        icon: BsMic,
      },
]

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments
}

const NewPostForm:React.FC<NewPostFormProps> = () => {

    const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: "",
    })
    const [loading, setLoading] = useState(false)

    const handleCreatePost = async () => {}
    const onSelectImage = () => {}
    const onTextChange = ({
        target: {name, value},
    }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2} >
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem
                    key={textInputs.title} 
                    item={item} selected = {item.title === selectedTab} setSelected={setSelectedTab} />
                ))}

            </Flex>
            <Flex p={4}>
                {selectedTab === "Post" && (
                    <TextInputs
                    textInputs={textInputs}
                    handleCreatePost={handleCreatePost}
                    onChange={onTextChange}
                    loading={loading} />
                )}
                {selectedTab === "Images & Video" && (
                    <ImageUpload
                     />
                )}
            </Flex>

        </Flex>
    )
}
export default NewPostForm;