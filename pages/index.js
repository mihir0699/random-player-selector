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
  Heading,
  Input,
  Box,
  ModalHeader,
  FormControl,
  ModalFooter,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [playerCount, setPlayerCount] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState(null);
  const handlePlayerCountSubmit = (e) => {
    e.preventDefault();
    if (playerCount > 0) {
      const randomPlayer = Math.floor(Math.random() * playerCount) + 1;
      setSelectedPlayer(randomPlayer);
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <Head>
        <title>Online Toss 🎲</title>
      </Head>
      <Container style={{ padding: "2rem", textAlign: "center" }}>
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
            <form onSubmit={handlePlayerCountSubmit}>
              <FormControl>
                <FormLabel>Enter number of players</FormLabel>
                <Input
                  placeholder="Effective number of players"
                  size="lg"
                  type="number"
                  onChange={(e) => setPlayerCount(e.target.value)}
                />
                <Button
                  style={{ marginTop: "1rem" }}
                  colorScheme="teal"
                  type="submit"
                  width="100%"
                  size="lg"
                >
                  Submit
                </Button>
              </FormControl>
            </form>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Result</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Player {selectedPlayer} it is 🎉</ModalBody>

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
