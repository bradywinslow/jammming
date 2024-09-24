import React from 'react';
import { Center, Flex, Heading, Icon } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';
import { FaHeadphones } from "react-icons/fa6";

export default function Header() {
    return (
        <Flex justify='center'>
            <Center gap={4} mt='6' mb='50'>
                <Icon as={FaHeadphones} boxSize='3rem' color='#B28CE3'/>
                <Heading as='h1' size='2xl'><NavLink to='/'>Jammming</NavLink></Heading>
                <Icon as={FaHeadphones} boxSize='3rem' color='#B28CE3' />
            </Center>
        </Flex>
    )
}
