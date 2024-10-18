import app from './config/app.js'; // Import the app from app.js

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

