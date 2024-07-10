# Secure Document Sharing Portal

## Overview

Welcome to the Secure Document Sharing Portal. This project is designed to provide a highly secure environment for uploading, sharing, and managing documents with end-to-end encryption. The portal ensures that all documents are encrypted on the client side before being uploaded to the server, where they are securely stored and managed.
## G-Drive 🎥 Demo Video : 
https://drive.google.com/file/d/1pKrnmRxuWLPBKV7M082IlUBu14NH_oq1/view?usp=sharing 
## Features

- **End-to-End Encryption**: All documents are encrypted before being sent to the server.
- **Secure Upload and Download**: Users can securely upload and download their documents.
- **Document Sharing**: Users can share documents with other users while maintaining control over access.
- **Activity Logs**: Detailed logs of user activities for better auditing and tracking.

## Screenshots
![Thumbnail](https://github.com/RohanM-12/EncryptShare/assets/98544765/79ebde47-1958-4f06-84f0-934f069c797d)

![Screenshot 2024-07-10 152743](https://github.com/RohanM-12/EncrpytShare-vercel/assets/98544765/ef0cda12-bce3-467a-baaa-ce45b952dd38)

![Screenshot 2024-07-10 152657](https://github.com/RohanM-12/EncrpytShare-vercel/assets/98544765/3c904041-5af0-4fcf-8170-0e302ba70320)

![Screenshot 2024-07-10 152845](https://github.com/RohanM-12/EncrpytShare-vercel/assets/98544765/5130de99-de10-4bfc-8954-e42839345b67)
![Screenshot 2024-07-10 153009](https://github.com/RohanM-12/EncrpytShare-vercel/assets/98544765/a80cdb32-5d4f-4641-83d4-1890f05f783e)
![Screenshot 2024-07-10 153032](https://github.com/RohanM-12/EncrpytShare-vercel/assets/98544765/387e4cf4-ac06-48f0-8810-953bec0a9c61)

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- prism and postgres database 

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/secure-document-sharing-portal.git
   cd secure-document-sharing-portal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```
   COSMOSDB_ENDPOINT=your-cosmosdb-endpoint
   COSMOSDB_KEY=your-cosmosdb-key
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

## Usage

### Uploading a Document

1. Navigate to the upload page.
2. Select the document you want to upload.
3. Set the access start and end dates using the provided date pickers.
4. Click the "Upload" button.

### Sharing a Document

1. Navigate to the document you want to share.
2. Click the "Share" button.
3. Enter the user ID of the person you want to share the document with.
4. Set the access period if needed.
5. Click "Share".

### Viewing Activity Logs

1. Navigate to the Activity Logs page.
2. View the list of user actions including uploads, downloads, and shares.


## Implementation Details

### Backend

The backend is built using Node.js and integrates with postgres DB to store documents, user metadata, and activity logs. The key functionalities include:
- **Encryption**: Documents are encrypted using AES before being sent to the server.
- **Access Control**: checks access periods and user permissions before granting access to documents.

### Frontend

The frontend is built using React and provides a user-friendly interface for interacting with the portal. Key components include:
- **Upload Form**: Allows users to upload documents and set access periods.
- **Share Drawer**: Enables users to share documents with other users.
- **Activity Log Viewer**: Displays user activity logs for monitoring and auditing.
