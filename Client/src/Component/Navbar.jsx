'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const NavLink = ({ children, href }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={href}>
      {children}
    </Box>
  )
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const isAdmin = true; // Replace this with actual admin check logic
  
  return (
    <>
      <Box bg={useColorModeValue('black', 'black')} px={10} py={4} color={"silver"}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <video width="90" height="80" autoPlay loop muted playsInline>
              <source src="/streams.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/browse">Browse</NavLink>
              <NavLink href="/my-list">My List</NavLink>
              <NavLink href="/live-events">Live Events</NavLink>
              <NavLink href="/chat">Chat</NavLink>

              {isAdmin && (
                <>
                  <NavLink t="/manage-content">Manage Content</NavLink>
                  <NavLink href="/manage-users">Manage Users</NavLink>
                  <NavLink href="/subtitles">Subtitles</NavLink>
                  <NavLink href="/recommendations">Recommendations</NavLink>
                  <NavLink href="/comments">Comments</NavLink>
                  <NavLink href="/ratings">Ratings</NavLink>
                </>
              )}
              
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu >
                <MenuButton
                color={"black"}
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                    
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'} bg='black'>
                  <br />
                  <Center bg='black'>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text color='silver'>Username</Text>
                  </Center>
                  <br />
                  <MenuDivider />
                
                  <MenuItem bg='black'><NavLink href="/signup">Sign Up</NavLink></MenuItem>
                  <MenuItem bg='black'><NavLink href="/login">Login</NavLink></MenuItem>
                  <MenuItem bg='black'><NavLink href="/">Logout</NavLink></MenuItem>
                 
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
