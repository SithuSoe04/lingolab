import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import DefinitionCard from "./DefinitionCard";

// Define the expected structure of a definition request
interface DefinitionRequest {
  id: string;
  word: string;
  oldDefinition: string;
  newDefinition: string;
  upvotes: number;
  downvotes: number;
}

const DefinitionChanges = () => {
  const [definitionRequests, setDefinitionRequests] = useState<DefinitionRequest[]>([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get<{ status: string; data: any[] }>("http://localhost:8000/pending-requests/");
        
        const requests: DefinitionRequest[] = response.data.data.map((req) => ({
          id: req.id,
          word: req.word,
          oldDefinition: req.current_definition, // Ensure this matches your FastAPI response field
          newDefinition: req.proposed_definition,
          upvotes: req.current_upvotes,
          downvotes: req.current_downvotes,
        }));

        setDefinitionRequests(requests);
      } catch (error) {
        console.error("Error fetching definition requests:", error);
      }
    };

    fetchPendingRequests();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: "bold" }}>
        Definition Change Requests
      </Typography>

      {definitionRequests.map((request) => (
        <DefinitionCard
          key={request.id}
          word={request.word}
          oldDefinition={request.oldDefinition}
          newDefinition={request.newDefinition}
          upvotes={request.upvotes}
          downvotes={request.downvotes}
        />
      ))}
    </Container>
  );
};

export default DefinitionChanges;
