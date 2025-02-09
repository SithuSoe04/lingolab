import React from 'react';
import { Card, CardContent, CardHeader, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import axios from 'axios';

interface DefinitionCardProps {
  id: string;
  word: string;
  oldDefinition: string;
  newDefinition: string;
  upvotes: number;
  downvotes: number;
  refreshRequests: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const DefinitionCard: React.FC<DefinitionCardProps> = ({ 
  id, 
  word, 
  oldDefinition, 
  newDefinition,
  refreshRequests
}) => {
  const handleApproveReject = async (approve: boolean) => {
    try {
      const response = await axios.post(`http://localhost:8000/process-definition-request/${id}/${approve}`);
      if (response.data.status === "success") {
        alert(`Request ${id} processed successfully.`);
        refreshRequests(); // Refresh the list of requests
      }
    } catch (error) {
      console.error("Error processing request:", error);
      alert("Failed to process the request.");
    }
  };

  return (
    <StyledCard>
      <CardHeader
        title={
          <Box>
            <Typography variant="h5" color="primary">
              {word}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Current Definition:
          </Typography>
          <Typography variant="body1">
            {oldDefinition}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Proposed Definition:
          </Typography>
          <Typography variant="body1">
            {newDefinition}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="success" 
            sx={{ mr: 2 }}
            onClick={() => handleApproveReject(true)}
          >
            Approve
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => handleApproveReject(false)}
          >
            Reject
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default DefinitionCard;