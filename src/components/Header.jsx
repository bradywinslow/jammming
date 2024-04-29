import React from 'react';
import { Center, Flex, Heading, Icon } from '@chakra-ui/react'
import { VscMusic } from "react-icons/vsc";

export default function Header() {
    return (
        <Flex justify='center' bg='#0F062C' color='#D9D9D9'>
            <Center gap={4}>
                <Icon as={VscMusic} boxSize='3rem' color='#B28CE3'/>
                <Heading as='h1' size='2xl' m={6}>Jammming</Heading>
                <Icon as={VscMusic} boxSize='3rem' color='#B28CE3' />
            </Center>
        </Flex>
    )
}
