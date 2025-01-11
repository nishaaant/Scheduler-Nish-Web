import React from 'react';
import { useContext } from 'react';
import { AppContext } from './ContextProvider';

function ExtractedNodeDetails() {
  const { nodes } = useContext(AppContext);

  // Skip the first three nodes and extract label and title
  const extractedDetails = nodes
    .slice(3) // Skip the first three nodes
    .map((node) => ({
      label: node.data?.label || null,
      title: node.data?.title || null,
    }))
    .filter((detail) => detail.label || detail.title); // Filter out nodes with null values



  extractedDetails.map((detail, index) => (
    <li key={index}>
      <strong>Label:</strong> {detail.label || 'N/A'} <br />
      <strong>Title:</strong> {detail.title || 'N/A'}
    </li>
  ))
  

  
}

export default ExtractedNodeDetails;
