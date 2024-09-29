import React, { useState } from 'react';
import { addToPlaylist } from '../spotify/httpRequests.js';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Heading,
    Button,
    Icon,
    Box,
    useToast,
    useMediaQuery
  } from '@chakra-ui/react';
import DesktopInputAndButton from './DesktopInputAndButton.jsx';
import MobileInputAndButton from './MobileInputAndButton.jsx';

export default function SearchResults({ searchData, addSearchResultToPlaylist, playlistTracks, removeSearchResultFromPlaylist }) {
    const [playlistTitle, setPlaylistTitle] = useState('');
    const [isMobile] = useMediaQuery("(max-width: 48em)");
    
    const toast = useToast();
    
    const handlePlaylistTitleChange = (e) => {
        setPlaylistTitle(e.target.value);
        return;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSavePlaylistToSpotify();
        }
    };

    const handleSavePlaylistToSpotify = () => {
        if (!playlistTitle && (playlistTracks.length === 0)) {
            toast({
                title: 'Error',
                description: 'Please add songs to playlist and give playlist a name before saving.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });

              return;
        };
        
        if (playlistTracks.length === 0) {
            toast({
                title: 'Error',
                description: 'Please add songs to playlist before saving.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });

              return;
        };
        
        if (!playlistTitle) {
            toast({
                title: 'Error',
                description: 'Please give playlist a name before saving.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });

              return;
        };

        // Add to playlist
        const tracksInfo = addToPlaylist(playlistTitle, playlistTracks);
        if (tracksInfo) {
            toast({
                title: 'Success',
                description: `The playlist '${playlistTitle}' saved to your Spotify account!`,
                status: 'success',
                duration: 5000,
                isClosable: true,
              });

              setPlaylistTitle('');

              return;
        };
    };

    return (
        <>
            <Box
                borderRadius={13}
                mx='2rem'
                h="full"
                spacing={0}
                w="full"
            >
                <Heading
                    as='h4'
                    size='md'
                    pt={3}
                    h='3rem'
                    textAlign='center'
                    bg='#FFFFFF'
                    color='#0F062C'
                    borderTopRadius={13} 
                >Search Results</Heading>

                <TableContainer
                    bg='#FFFFFF'
                    color='#0F062C'
                    overflowY='scroll'
                    borderBottomRadius={13}
                    h='23rem'
                    display='block'
                    flexGrow={1}
                    borderWidth={1}
                    p={0}
                    w="full"
                >
                    <Table
                        variant='simple'
                        size='sm'
                        textAlign='center'
                        overflowY='auto'
                        overflowX='auto'
                        layout='fixed'
                        h="full"
                        minW="53.125rem"
                        w="full"
                    >
                        <Thead>
                            <Tr>
                                <Th overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    w='6rem'
                                >
                                    <Flex justify='center'>
                                        <Heading as='h6' size='xs'>Artwork</Heading>
                                    </Flex>
                                </Th>
                                <Th
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >
                                    <Heading as='h6' size='xs'>Song</Heading>
                                </Th>
                                <Th
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >
                                    <Heading as='h6' size='xs'>Artist</Heading>
                                </Th>
                                <Th
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >
                                    <Heading as='h6' size='xs'>Album</Heading>
                                </Th>
                                <Th w='6rem'>
                                    <Flex justify='center'>
                                        <Heading as='h6' size='xs'>Add</Heading>
                                    </Flex>
                                </Th>
                            </Tr>
                        </Thead>
                        
                        <Tbody>
                        {searchData.map((result) => (
                            <Tr key={result.id}>
                                <Flex justify='center'>
                                    <Td><img src={`${result.album.images[2].url}`} alt='album artwork' /></Td>
                                </Flex>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    title={result.name}
                                >{result.name}</Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    title={result.artists[0].name}
                                >{result.artists[0].name}</Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    title={result.album.name}
                                >{result.album.name}</Td>
                                <Td>
                                    <Flex justify='center'>
                                        <Button onClick={() => addSearchResultToPlaylist(result)}>
                                            <Icon as={FiPlus} />
                                        </Button>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
                
                <Box bg='#0F062C' h='8'></Box>

                <Box
                borderRadius={13}
                mx='2rem'
                h="full"
                spacing={0}
                w="full"
            >
                <Heading
                    as='h4'
                    size='md'
                    pt={3}
                    h='3rem'
                    textAlign='center'
                    bg='#FFFFFF'
                    color='#0F062C'
                    borderTopRadius={13}    
                >Playlist</Heading>

                <TableContainer
                    bg='#FFFFFF'
                    color='#0F062C'
                    overflowY='scroll'
                    borderBottomRadius={13}
                    h='23rem'
                    display='block'
                    flexGrow={1}
                    borderWidth={1}
                    p={0}
                    w="full"
                >
                    <Table
                        variant='simple'
                        size='sm'
                        textAlign='center'
                        overflowY='auto'
                        overflowX='auto'
                        layout='fixed'
                        h="full"
                        minW="53.125rem"
                        w="full"
                    >
                        <Thead>
                            <Tr>
                                <Th
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    w='6rem'
                                >
                                    <Flex justify='center'>
                                        <Heading as='h6' size='xs'>Artwork</Heading>
                                    </Flex>
                                </Th>
                                <Th
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >
                                    <Heading as='h6' size='xs'>Song</Heading>
                                </Th>
                                <Th
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >
                                    <Heading as='h6' size='xs'>Artist</Heading>
                                </Th>
                                <Th
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >
                                    <Heading as='h6' size='xs'>Album</Heading>
                                </Th>
                                <Th w='6rem'>
                                    <Flex justify='center'>
                                        <Heading as='h6' size='xs'>Remove</Heading>
                                    </Flex>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {playlistTracks.map((item) => (
                            <Tr key={item.id}>
                                <Flex justify='center'>
                                    <Td><img src={`${item.album.images[2].url}`} alt='album artwork' /></Td>
                                </Flex> 
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    title={item.name}
                                >{item.name}</Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    title={item.artists[0].name}
                                >{item.artists[0].name}</Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                    title={item.album.name}
                                >{item.album.name}</Td>
                                <Td>
                                    <Flex justify='center'>
                                        <Button onClick={() => removeSearchResultFromPlaylist(item)}>
                                            <Icon as={FiMinus}/>
                                        </Button>
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Conditionally render MobileInputAndButton or DesktopInputAndButton */}
            {isMobile ? <MobileInputAndButton playlistTitle={playlistTitle} handlePlaylistTitleChange={handlePlaylistTitleChange} handleKeyDown={handleKeyDown} handleSavePlaylistToSpotify={handleSavePlaylistToSpotify}/> : <DesktopInputAndButton playlistTitle={playlistTitle} handlePlaylistTitleChange={handlePlaylistTitleChange} handleKeyDown={handleKeyDown} handleSavePlaylistToSpotify={handleSavePlaylistToSpotify}/>}
        </>
    );
}
