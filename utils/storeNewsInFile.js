import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

// Define the directory path for storing the data files
const DATA_DIRECTORY = `${FileSystem.documentDirectory}data/`;

const createDataDirectory = async () => {
  try {
    const directoryInfo = await FileSystem.getInfoAsync(DATA_DIRECTORY);
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(DATA_DIRECTORY);
      console.log('Data directory created.');
    }
  } catch (error) {
    console.log('Error creating data directory:', error);
  }
};

// Function to store data
export const updateSwapNewsCacheData = async (data) => {
  createDataDirectory();
  fileName = 'swapNews.json'
  const filePath = DATA_DIRECTORY + fileName;

  try {
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
    console.log('Data stored successfully!');
  } catch (error) {
    console.log('Error storing data:', error);
  }
};

// Function to retrieve data
export const getSwapNewsCacheData = async () => {
  createDataDirectory();
  fileName = 'swapNews.json'
  const filePath = DATA_DIRECTORY + fileName;

  try {
    const fileExists = await FileSystem.getInfoAsync(filePath);
    if (fileExists.exists) {
      const fileContent = await FileSystem.readAsStringAsync(filePath);
      const data = JSON.parse(fileContent);
      // console.log('Retrieved data:', data);
      return data;
    } else {
      console.log('Data file does not exist.');
      return null;
    }
  } catch (error) {
    console.log('Error retrieving data:', error);
    return null;
  }
};
