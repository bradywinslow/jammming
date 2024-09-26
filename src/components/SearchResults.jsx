import React, { useState } from 'react';
import { addToPlaylist } from '../spotify/httpRequests.js';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
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
                overflow='hidden'
                mx='2rem'
                maxW='90rem'
                minW='17rem'
            >
                <TableContainer
                    bg='#FFFFFF'
                    color='#0F062C'
                    overflowX='auto'
                    overflowY='auto'
                    borderRadius={13}
                    px='3rem'
                    h='23rem'
                >
                    <Table
                        variant='simple'
                        size='sm'
                        layout='fixed'
                        textAlign='center'
                        overflowY='hidden'
                    >
                        <TableCaption placement='top'>
                            <Heading as='h4' size='md' pb={2}>Search Results</Heading>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >
                                    <Heading as='h6' size='xs'>Artwork</Heading>
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
                                <Th>
                                    <Heading as='h6' size='xs'>Add</Heading>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {searchData.map((result) => (
                            <Tr key={result.id}>
                                <Td><img src={`${result.album.images[2].url}`} alt='album artwork' /></Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >{result.name}</Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >{result.artists[0].name}</Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >{result.album.name}</Td>
                                <Td>
                                    <Button onClick={() => addSearchResultToPlaylist(result)}>
                                        <Icon as={FiPlus} />
                                    </Button>
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
                overflow='hidden'
                mx='2rem'
                maxW='90rem'
                minW='17rem'
            >    
                <TableContainer
                    bg='#FFFFFF'
                    color='#0F062C'
                    overflowX='auto'
                    overflowY='auto'
                    borderRadius={13}
                    px='3rem'
                    h='23rem'
                >
                    <Table
                        variant='simple'
                        size='sm'
                        layout='fixed'
                        textAlign='center'
                    >
                        <TableCaption placement='top'>
                            <Heading as='h4' size='md' pb={2}>Playlist</Heading>
                        </TableCaption>
                        <Thead>
                            <Tr>
                                <Th
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >
                                    <Heading as='h6' size='xs'>Artwork</Heading>
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
                                <Th>
                                    <Heading as='h6' size='xs'>Remove</Heading>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {playlistTracks.map((item) => (
                            <Tr key={item.id}>
                                <Td><img src={`${item.album.images[2].url}`} alt='album artwork' /></Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >{item.name}</Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >{item.artists[0].name}</Td>
                                <Td
                                    overflow='hidden'
                                    whiteSpace='nowrap'
                                    textOverflow='ellipsis'
                                >{item.album.name}</Td>
                                <Td>
                                    <Button onClick={() => removeSearchResultFromPlaylist(item)}>
                                        <Icon as={FiMinus} />
                                    </Button>
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
