import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import VoteButtons from '../VoteButtons/VoteButtons';

interface DefinitionCardProps {
  word: string;
  oldDefinition: string;
  newDefinition: string;
  upvotes: number;
  downvotes: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const DefinitionCard: React.FC<DefinitionCardProps> = ({ 
  word, 
  oldDefinition, 
  newDefinition
}) => {
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
          <VoteButtons />
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default DefinitionCard;