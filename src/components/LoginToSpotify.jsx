import React, { useState, useEffect } from 'react';
import { FaSpotify } from "react-icons/fa";
import { handlePkceLogin, exchangeAuthCodeForToken } from '../spotify/pkceAuthorization.js';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    Button,
    useDisclosure,
    Flex,
    Icon
  } from '@chakra-ui/react'

export default function LoginToSpotify() {    
    const { isOpen } = useDisclosure({ defaultIsOpen: true });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const handleLogin = async () => {
            // Redirect user back to the specified redirect_uri after login
            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');

            // Exchange authorization code for an access token
            if (code) {
                await exchangeAuthCodeForToken(code);
                window.history.replaceState({}, document.title, '/');
            };

            let accessToken = localStorage.getItem('access_token');
            let refreshToken = localStorage.getItem('refresh_token');
            
            if (accessToken && refreshToken) {
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
            }
            setIsAuthenticating(false);
        }

        handleLogin();
    }, []);

    if (isAuthenticating) {
        return null;
    }

    return (
        <>
            {!isLoggedIn && <Modal blockScrollOnMount={true} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent color='#0F062C' width='90%'>
                    <Flex flexDirection='column' alignItems='center' m={4}>
                        <ModalHeader align='center'>Jammming - A Spotify Playlist Builder</ModalHeader>
                        <ModalBody>
                            <Text align='center' mb='1rem'>
                                Welcome to Jammming, a music application that allows you to search for songs, artists, or albums and build and save playlists to your Spotify account. Login to begin.
                            </Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                justify='center'
                                bg='#1DB954'
                                color='#191414'
                                _hover={{
                                    bg: '#1CB050'
                                }}
                                _active={{
                                    bg: '#15843C'
                                }}
                                mr={3}
                                size='lg'
                                onClick={handlePkceLogin}
                            >
                                Login to Spotify <Icon as={FaSpotify} ml={1} boxSize='1.25rem'/>
                            </Button>
                        </ModalFooter>
                    </Flex>
                </ModalContent>
            </Modal>}
        </>
    )
};
