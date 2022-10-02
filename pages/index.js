import Head from "next/head";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  Container,
  Text,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TabPanels,
  SlideFade,
  useToast,
  Heading,
  Input,
  Stack,
  Box,
  ModalHeader,
  FormControl,
  ModalFooter,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

import Confetti from "react-confetti";

export default function Home() {
  const toast = useToast();
  const [playerCount, setPlayerCount] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tabOpened, setTabOpened] = React.useState(0);
  const [playersConfirmed, setPlayersConfirmed] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const [playersArray, setPlayersArray] = React.useState([]);
  const handlePlayerCountSubmit = (e) => {
    e.preventDefault();
    if (playerCount > 0) {
      const randomPlayer = Math.floor(Math.random() * playerCount) + 1;
      setSelectedPlayer(randomPlayer);
      if (tabOpened === 0) {
        setIsModalOpen(true);
      } else {
        let allPlayersHaveNames = false;
        allPlayersHaveNames = playersArray.every(
          (player) => player && player.length
        );
        if (!allPlayersHaveNames) {
          toast({
            title: `Please enter the names for all players`,
            status: "error",
            isClosable: true,
          });
          return;
        } else {
          const randomPlayer = Math.floor(Math.random() * playerCount) + 1;
          setSelectedPlayer(playersArray[randomPlayer - 1]);
          setIsModalOpen(true);
        }
      }
    }
  };
  const handlePlayersConfirm = (e) => {
    e.preventDefault();
    setPlayersConfirmed(true);
    // Create an array of playerCount players empty names
    const players = new Array(playerCount);

    for (let i = 0; i < playerCount; i++) {
      players[i] = "";
    }
    setPlayersArray(players);
  };

  return (
    <div>
      <Head>
        <title>Online Toss 🎲</title>
      </Head>
      <Container
        style={{ padding: "2rem", textAlign: "center" }}
        background="gray.50"
      >
        <main>
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
          >
            Random Player Selector
          </Text>

          <Box style={{ marginTop: "4rem" }}>
            <Tabs
              variant="soft-rounded"
              onChange={(index) => {
                setTabOpened(index);
                setPlayerCount(0);
                setPlayersArray([]);
                setPlayersConfirmed(false);
              }}
            >
              <TabList justifyContent={"center"}>
                <Tab>Number Selector</Tab>
                <Tab>Player Selector</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <form onSubmit={handlePlayerCountSubmit}>
                    <FormControl>
                      <FormLabel>Enter number of players</FormLabel>
                      <Input
                        placeholder="Effective number of players"
                        size="lg"
                        value={playerCount === 0 ? "" : playerCount}
                        type="number"
                        onChange={(e) => setPlayerCount(e.target.value)}
                      />
                      <Button
                        style={{ marginTop: "1rem" }}
                        colorScheme="blue"
                        type="submit"
                        width="100%"
                        size="lg"
                      >
                        Submit
                      </Button>
                    </FormControl>
                  </form>
                </TabPanel>
                <TabPanel>
                  <form onSubmit={handlePlayersConfirm}>
                    <FormControl>
                      <FormLabel>Enter number of players</FormLabel>
                      <Input
                        type="number"
                        placeholder="Effective number of players"
                        size="lg"
                        disabled={playerCount > 0 && playersConfirmed}
                        value={playerCount === 0 ? "" : playerCount}
                        onChange={(e) => setPlayerCount(e.target.value)}
                      />
                      <Button
                        style={{ marginTop: "1rem" }}
                        colorScheme="blue"
                        type="submit"
                        disabled={playerCount > 0 && playersConfirmed}
                        width="100%"
                        size="lg"
                      >
                        {playersConfirmed
                          ? `${playerCount} Players Confirmed`
                          : "Confirm Players"}
                      </Button>
                    </FormControl>
                  </form>
                  <Stack spacing={4} style={{ marginTop: "2rem" }}>
                    {playersArray.map((player, index) => (
                      <SlideFade in={true} offsetY="20px" key={index}>
                        <Input
                          key={index}
                          type="text"
                          onChange={(e) => {
                            const newPlayersArray = [...playersArray];
                            newPlayersArray[index] = e.target.value;
                            setPlayersArray(newPlayersArray);
                          }}
                          placeholder={`Enter player #${index + 1} name`}
                          size="md"
                        />
                      </SlideFade>
                    ))}
                    {playersConfirmed && (
                      <>
                        <Button
                          colorScheme="blue"
                          onClick={handlePlayerCountSubmit}
                        >
                          Choose Random Player
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setPlayersArray([]);
                            setPlayersConfirmed(false);
                          }}
                        >
                          Reset
                        </Button>
                      </>
                    )}
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Result</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {!tabOpened
                    ? `Player ${selectedPlayer} it is 🎉`
                    : `${selectedPlayer} it is 🎉`}{" "}
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
              <Confetti />
            </Modal>
          </Box>
          {/* <Heading as="h1" size="2xl" noOfLines={1}>
            OR
          </Heading> */}
        </main>
      </Container>
    </div>
  );
}
