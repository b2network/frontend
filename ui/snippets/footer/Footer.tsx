import { Box, Grid, Flex, Text, Stack, Link, VStack, Skeleton } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import appConfig from 'configs/app/config';
import discussionsIcon from 'icons/discussions.svg';
import editIcon from 'icons/edit.svg';
import discordIcon from 'icons/social/discord.svg';
import gitIcon from 'icons/social/git.svg';
import twitterIcon from 'icons/social/tweet.svg';
import type { ResourceError } from 'lib/api/resources';
import useFetch from 'lib/hooks/useFetch';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import ColorModeToggler from '../header/ColorModeToggler';
import FooterLinkItem from './FooterLinkItem';

const API_VERSION_URL = `https://github.com/blockscout/blockscout/tree/${ appConfig.blockScoutVersion }`;
// const FRONT_VERSION_URL = `https://github.com/blockscout/frontend/tree/${ appConfig.frontendVersion }`;

const BLOCSKOUT_LINKS = [
  {
    icon: editIcon,
    iconSize: '16px',
    text: 'Submit an issue',
    // template???
    url: 'https://github.com/blockscout/blockscout/issues/new',
  },
  {
    icon: gitIcon,
    iconSize: '18px',
    text: 'Contribute',
    url: 'https://github.com/blockscout/blockscout',
  },
  {
    icon: twitterIcon,
    iconSize: '18px',
    text: 'Twitter',
    url: 'https://www.twitter.com/blockscoutcom',
  },
  {
    icon: discordIcon,
    iconSize: '18px',
    text: 'Discord',
    url: 'https://discord.gg/blockscout',
  },
  {
    icon: discussionsIcon,
    iconSize: '20px',
    text: 'Discussions',
    url: 'https://github.com/orgs/blockscout/discussions',
  },
];

type CustomLink = {
  text: string;
  url: string;
}

type CustomLinksGroup = {
  title: string;
  links: Array<CustomLink>;
}

const Footer = () => {
  const fetch = useFetch();

  const { isLoading, data } = useQuery<unknown, ResourceError<unknown>, Array<CustomLinksGroup>>(
    [ 'footer-links' ],
    async() => fetch(appConfig.footerLinks || ''),
    {
      enabled: Boolean(appConfig.footerLinks),
      staleTime: Infinity,
    });

  return (
    <Stack direction={{ base: 'column', lg: 'row' }} p={{ base: 4, lg: 9 }} gap={{ base: 6, lg: 12 }} borderTop="1px solid" borderColor="divider">
      <Box flexGrow="1" mb={{ base: 2, lg: 0 }}>
        <Flex>
          <ColorModeToggler/>
          <NetworkAddToWallet ml={ 8 }/>
        </Flex>
        <Box mt={{ base: 6, lg: 10 }}>
          <Link fontSize="xs" href="https://www.blockscout.com">blockscout.com</Link>
        </Box>
        <Text mt={ 3 } mr={{ base: 0, lg: '114px' }} maxW={{ base: 'unset', lg: '470px' }} fontSize="xs">
            Blockscout is a tool for inspecting and analyzing EVM based blockchains. Blockchain explorer for Ethereum Networks.
        </Text>
        { appConfig.blockScoutVersion && (
          <Text fontSize="xs" mt={ 8 }>
            Backend: <Link href={ API_VERSION_URL } target="_blank">{ appConfig.blockScoutVersion }</Link>
          </Text>
        ) }
        { appConfig.frontendVersion && (
          <Text fontSize="xs" mt={ 8 }>
            { /* Frontend: <Link href={ FRONT_VERSION_URL } target="_blank">{ appConfig.frontendVersion }</Link> */ }
            Frontend: { appConfig.frontendVersion }
          </Text>
        ) }
      </Box>
      <Box minW={{ base: 'auto', lg: appConfig.footerLinks ? '160px' : 'auto' }}>
        { appConfig.footerLinks && <Text fontWeight={ 500 } mb={ 3 }>Blockscout</Text> }
        <Grid
          gap={ 2 }
          gridTemplateColumns={{ base: '160px', lg: appConfig.footerLinks ? '160px' : 'repeat(3, 160px)' }}
          gridTemplateRows={{ base: 'auto', lg: appConfig.footerLinks ? 'auto' : 'repeat(2, auto)' }}
          gridAutoFlow={{ base: 'row', lg: appConfig.footerLinks ? 'row' : 'column' }}
          mt={{ base: 0, lg: appConfig.footerLinks ? 0 : '100px' }}
        >
          { BLOCSKOUT_LINKS.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
        </Grid>
      </Box>
      { appConfig.footerLinks && isLoading && (
        Array.from(Array(3)).map((i, index) => (
          <Box minW={{ base: 'auto', lg: '160px' }} key={ index }>
            <Skeleton w="120px" h="20px" mb={ 6 }/>
            <VStack spacing={ 4 } alignItems="start" mb={ 2 }>
              { Array.from(Array(5)).map((i, index) => <Skeleton w="160px" h="14px" key={ index }/>) }
            </VStack>
          </Box>
        ))
      ) }
      { appConfig.footerLinks && data && (
        data.slice(0, 3).map(linkGroup => (
          <Box minW={{ base: 'auto', lg: '160px' }} key={ linkGroup.title }>
            <Text fontWeight={ 500 } mb={ 3 }>{ linkGroup.title }</Text>
            <VStack spacing={ 2 } alignItems="start">
              { linkGroup.links.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
            </VStack>
          </Box>
        ))
      ) }
    </Stack>
  );
};

export default Footer;