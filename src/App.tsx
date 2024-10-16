import {
  Heading,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Container,
  Box,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface People {
  UserName: string;
  FirstName: string;
  LastName: string;
  Gender: string;
  FavoriteFeature: string;
}

function App() {
  const [people, setPeople] = useState<People[] | null>(null);

  useEffect(() => {
    const fetchPeople = async (): Promise<void> => {
      try {
        const response = await fetch("https://services.odata.org/TripPinRESTierService/People");
        const data = await response.json();
        setPeople(data.value);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPeople();
  }, []);

  return (
    <Container maxW="container.lg">
      <Heading as="h1" textAlign="center" my={4}>
        Fech
      </Heading>
      <Text mb={1} fontWeight="bold">
        People
      </Text>
      <Box borderWidth="4px" borderRadius="lg">
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Username</Th>
                <Th>Gender</Th>
                <Th>Favorite Feature</Th>
              </Tr>
            </Thead>
            <Tbody>
              {people ? (
                people.map((person) => (
                  <Tr key={person.UserName}>
                    <Td>{`${person.FirstName} ${person.LastName}`}</Td>
                    <Td>{person.UserName}</Td>
                    <Td>{person.Gender}</Td>
                    <Td>{person.FavoriteFeature}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td>
                    <Skeleton height="20px" width="100%" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" width="100%" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" width="100%" />
                  </Td>
                  <Td>
                    <Skeleton height="20px" width="100%" />
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default App;
