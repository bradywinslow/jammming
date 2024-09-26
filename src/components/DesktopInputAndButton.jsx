import React from 'react';
import { Button, Input, Flex } from '@chakra-ui/react';

export default function DesktopInputAndButton({ playlistTitle, handlePlaylistTitleChange, handleKeyDown, handleSavePlaylistToSpotify }) {
    return (
            <Flex gap='10' align='center' mb='5rem'>
                <Input 
                    mt={7}
                    type='text'
                    id='playlistInput'
                    value={playlistTitle}
                    onChange={handlePlaylistTitleChange}
                    onKeyDown={handleKeyDown}
                    required
                    placeholder='Playlist name'
                    autoComplete='off'
                    size='md'
                    bg='#FFFFFF'
                    color='#0F062C'
                    variant='outline'
                    focusBorderColor='#D9D9D9'
                    w='15rem'
                ></Input>
                <Button
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
                    onClick={handleSavePlaylistToSpotify}
                >
                    Save Playlist
                </Button>
            </Flex>
    )
}
