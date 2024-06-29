import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconButton,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://streamflex.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.error && data.error === 'User not found') {
        // Handle user not found scenario
        toast({
          title: 'User not found.',
          description: 'Please check your credentials and try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Handle success
        toast({
          title: 'Login successful!',
          description: 'Welcome back! You have successfully logged in.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        console.log(data); // Handle success or error messages, store token in local storage
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to login. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box position={'relative'} overflow="hidden">
      <Container
        as={SimpleGrid}
        maxW={'6xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 20 }}
        py={{ base: 10, sm: 20, lg: 24 }}
        px={{ base: 5, lg: 10 }}
        alignItems="center"
      >
        <Stack spacing={{ base: 8, md: 14 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            Stream with Us{' '}
            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
              &amp;
            </Text>{' '}
            Login to Your Account
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 6, sm: 8, md: 10 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
          boxShadow="lg"
        >
          <Box as={'form'} onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input
                placeholder="Email Address"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputGroup>
                <Input
                  placeholder="Password"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={handleTogglePassword}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  />
                </InputRightElement>
              </InputGroup>
              <Button
                variant="link"
                color="blue.400"
                fontSize="sm"
                alignSelf="flex-end"
                onClick={() => console.log('Forgot password clicked')}
              >
                Forgot Password?
              </Button>

              <Button
                type="submit"
                fontFamily={'heading'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.500,pink.500)',
                  boxShadow: 'xl',
                }}
                width="full"
              >
                Login
              </Button>

              <Text align="center">
                Don't have an account?{' '}
                <Button as={Link} to="/signup" variant="link" color="blue.400">
                  Sign Up
                </Button>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Box
        position={'absolute'}
        top={-10}
        left={-10}
        right={-10}
        bottom={-10}
        style={{ filter: 'blur(70px)' }}
        zIndex={-1}
        pointerEvents="none"
      >
        <svg
          width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
          height="560px"
          viewBox="0 0 528 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="71" cy="61" r="111" fill="#F56565" />
          <circle cx="244" cy="106" r="139" fill="#ED64A6" />
          <circle cy="291" r="139" fill="#ED64A6" />
          <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
          <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
          <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
          <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </svg>
      </Box>
    </Box>
  );
};

export default Login;
