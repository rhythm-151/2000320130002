// src/components/TrainSchedule.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainSchedule = () => {
  const [trainData, setTrainData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('API_ENDPOINT_URL', {
          headers: {
            Authorization: 'YOUR_AUTH_TOKEN',
          },
        });
        setTrainData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching train data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
    </div>
  );
};

export default TrainSchedule;
