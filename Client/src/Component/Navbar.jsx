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
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const NavLink = ({ children, to, onClick }) => {
  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      to={to}
      onClick={onClick}
    >
      {children}
    </Box>
  )
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose
  } = useDisclosure()

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
            <Stack direction={'row'} spacing={7} display={{ base: 'none', md: 'flex' }}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/browse">Browse</NavLink>
              <NavLink to="/my-list">My List</NavLink>
              <NavLink to="/live-events">Live Events</NavLink>
              <NavLink to="/chat">Chat</NavLink>

              {isAdmin && (
                <>
                  <NavLink to="/manage-content">Manage Content</NavLink>
                  <NavLink to="/manage-users">Manage Users</NavLink>
                  <NavLink to="/subtitles">Subtitles</NavLink>
                  <NavLink to="/recommendations">Recommendations</NavLink>
                  <NavLink to="/comments">Comments</NavLink>
                  <NavLink to="/ratings">Ratings</NavLink>
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
                  <MenuItem bg='black'><NavLink to="/signup">Sign Up</NavLink></MenuItem>
                  <MenuItem bg='black'><NavLink to="/login">Login</NavLink></MenuItem>
                  <MenuItem bg='black'><NavLink to="/">Logout</NavLink></MenuItem>
                </MenuList>
              </Menu>
            </Stack>

            <IconButton
            color={"silver"}
              size={'md'}
              icon={isDrawerOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isDrawerOpen ? onDrawerClose : onDrawerOpen}
            />
          </Flex>
        </Flex>

        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={onDrawerClose}
        >
          <DrawerOverlay />
          <DrawerContent bg={useColorModeValue('black', 'black')}>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px" color="silver">Menu</DrawerHeader>

            <DrawerBody color={"silver"}>
              <Stack as="nav" spacing={4}>
                <NavLink to="/" onClick={onDrawerClose}>Home</NavLink>
                <NavLink to="/browse" onClick={onDrawerClose}>Browse</NavLink>
                <NavLink to="/my-list" onClick={onDrawerClose}>My List</NavLink>
                <NavLink to="/live-events" onClick={onDrawerClose}>Live Events</NavLink>
                <NavLink to="/chat" onClick={onDrawerClose}>Chat</NavLink>

                {isAdmin && (
                  <>
                    <NavLink to="/manage-content" onClick={onDrawerClose}>Manage Content</NavLink>
                    <NavLink to="/manage-users" onClick={onDrawerClose}>Manage Users</NavLink>
                    <NavLink to="/subtitles" onClick={onDrawerClose}>Subtitles</NavLink>
                    <NavLink to="/recommendations" onClick={onDrawerClose}>Recommendations</NavLink>
                    <NavLink to="/comments" onClick={onDrawerClose}>Comments</NavLink>
                    <NavLink to="/ratings" onClick={onDrawerClose}>Ratings</NavLink>
                  </>
                )}

                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>

                <NavLink to="/signup" onClick={onDrawerClose}>Sign Up</NavLink>
                <NavLink to="/login" onClick={onDrawerClose}>Login</NavLink>
                <NavLink to="/" onClick={onDrawerClose}>Logout</NavLink>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  )
}
