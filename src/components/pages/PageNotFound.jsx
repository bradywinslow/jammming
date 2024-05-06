import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header.jsx';
import { Button } from '@chakra-ui/react';

export default function PageNotFound() {
    const navigate = useNavigate();

    function navigateToHomePage() {
        navigate('/');
    }
    
    return (
        <Flex flexDirection='column' justify='center' align='center'>
            <Header />
            <Flex
                bg='#FFFFFF'
                color='#0F062C'
                m='auto'
                p='3rem'
                borderRadius={13}
                flexDirection='column'
                justify='center'
                align='center'
            >
                <Text fontSize='lg'>Uh-Oh! Can't build a playlist here.</Text>
                <Button
                    onClick={navigateToHomePage}
                    mt={7}
                    bg='#1DB954'
                    color='#191414'
                    _hover={{
                        bg: '#1CB050'
                    }}
                    _active={{
                        bg: '#15843C'
                    }}
                    size='lg'
                    w='10rem'
                >
                    Home Page
                </Button>
            </Flex>
        </Flex>
    )
}
