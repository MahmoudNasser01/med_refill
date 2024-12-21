import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

const Medications = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get('/medications/');
        setMedications(response.data);
      } catch (error) {
        alert('Failed to load medications!');
      }
    };
    fetchMedications();
  }, []);

  const handleRefill = async (id) => {
    try {
      await axios.post('/refill-request/', { medication: id });
      alert('Refill request submitted!');
    } catch (error) {
      alert('Failed to submit refill request!');
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="div" gutterBottom>
        Medications
      </Typography>
      <List>
        {medications.map((medication) => (
          <ListItem key={medication.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText primary={medication.name} />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRefill(medication.id)}
            >
              Request Refill
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Medications;