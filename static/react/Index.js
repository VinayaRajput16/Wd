import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot instead of ReactDOM.render
import WebinarPage from './WebinarPage';

const container = document.getElementById('webinar-root'); // Reference the root DOM element
const root = createRoot(container); // Create the root
root.render(<WebinarPage />); // Render the app

