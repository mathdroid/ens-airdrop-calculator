import { useState, useEffect } from "react";
import {
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Box,
  Alert,
  AlertIcon,
  Link,
  Text,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  CheckCircleIcon,
  WarningIcon,
} from "@chakra-ui/icons";

import BigNumber from "bignumber.js";

import Head from "next/head";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";

import airdrop from "../data/tokens.json";

const Datacard = ({ row }) => {
  const pastAmount = BigNumber(row.past_tokens).shiftedBy(-18);
  const longestOwnedName = row.longest_owned_name;
  const futureAmount = BigNumber(row.future_tokens).shiftedBy(-18);
  const lastExpiringName = row.last_expiring_name;
  const isMultiplied = row.has_reverse_record;
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      maxW="400px"
      marginTop="2rem"
    >
      <Box p={4} border="solid 1px" borderRadius="md">
        <Text align="left">
          <Text verticalAlign="baseline">
            <CheckCircleIcon color="green.500" mr={2} />
            {row.owner.slice(0, 6)}...{row.owner.slice(-4)}
          </Text>
          <Text mt={2} fontFamily="monospace" fontSize="2xl" fontWeight="bold">
            {pastAmount.plus(futureAmount).toNumber()} ENS
          </Text>
          <Text fontFamily="monospace" fontSize="sm">
            From longest owned name: {pastAmount.toNumber()}
          </Text>
          <Text fontFamily="monospace" fontSize="sm">
            From last expiring name: {futureAmount.toNumber()}
          </Text>
          <Text fontFamily="monospace" fontSize="sm">
            {isMultiplied ? (
              <>
                {/* <Text>
                      Base amount:{" "}
                      {pastAmount.plus(futureAmount).dividedBy(2).toNumber()}{" "}
                      ENS
                    </Text> */}
                <Text>Multiplier x2 included</Text>
              </>
            ) : (
              <Text>No multiplier</Text>
            )}
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

const Invalid = ({ address }) => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      maxW="400px"
      marginTop="2rem"
    >
      <Box p={4} border="solid 1px" borderRadius="md">
        <Text align="left">
          <Text verticalAlign="baseline">
            <WarningIcon color="yellow.500" mr={2} />
            {address.slice(0, 6)}...{address.slice(-4)}
          </Text>
          <Text mt={2} fontFamily="monospace" fontSize="2xl" fontWeight="bold">
            {0} ENS
          </Text>
          <Text fontFamily="monospace" fontSize="sm">
            Address not found in the airdrop data.
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};
export default function Home() {
  const [address, setAddress] = useState("");
  const lowerCased = address.toLowerCase();
  const isValidAddress = address.length === 42 && lowerCased.startsWith("0x");
  const row = airdrop[lowerCased];
  return (
    <>
      <Head>
        <title>ENS Airdrop calculator</title>
        <meta
          name="description"
          content="Unofficial ENS Airdrop calculator by mathdroid.eth"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p={2}>
        <Alert status="info" borderRadius="sm">
          <AlertIcon />
          <Text>
            This is an unofficial airdrop calculator. Not affiliated to ENS.
            Always use official links to claim your tokens.
            <Link isExternal href="https://twitter.com/ensdomains">
              https://twitter.com/ensdomains <ExternalLinkIcon mx="2px" />
            </Link>
          </Text>
        </Alert>
      </Box>
      <Grid placeContent="center" minH="100vh">
        <Text align="center">Paste your wallet address</Text>
        <InputGroup mt="2">
          <Input
            variant="filled"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </InputGroup>
        {isValidAddress ? (
          row ? (
            <Datacard row={row} />
          ) : (
            <Invalid address={address} />
          )
        ) : null}
      </Grid>
      <Box p={8}>
        <Text align="center">
          wagmi,{" "}
          <Link isExternal href="https://twitter.com/mathdroid">
            mathdroid.eth <ExternalLinkIcon />
          </Link>
        </Text>
        <Text align="center">
          Data from:{" "}
          <Link
            href="https://github.com/ensdomains/governance/blob/master/airdrop.json"
            isExternal
          >
            https://github.com/ensdomains/governance/blob/master/airdrop.json{" "}
            <ExternalLinkIcon />
          </Link>
        </Text>
        <Text align="center">
          Website source:{" "}
          <Link
            isExternal
            href="https://github.com/mathdroid/ens-airdrop-calculator"
          >
            https://github.com/mathdroid/ens-airdrop-calculator{" "}
            <ExternalLinkIcon />
          </Link>
        </Text>
      </Box>
    </>
  );
}
