# 🎉 VOTE WAVE INDIA 🚀💻

🗳️ Welcome to our **voting web app!** Powered by Node.js, Express.js, MongoDB, and Mongoose, we've created a dynamic platform for all your voting needs. 🚀 Create, participate, and view real-time updates on polls, surveys, and elections with ease. 💻 Your voice matters, and we're here to make sure it's heard securely and conveniently. Let's vote together! 🎉

**[Live](https://votewaveindia-webapplication.onrender.com/)**

## Endpoints

### UserRoutes
- **Add a User/Signup :**
  - Endpoint: `POST /user`
  - Description: Adds a user to the system with details such as name, role, etc.

- **Add a User/Login :**
  - Endpoint: `POST /user`
  - Description: Adds a user to the system with details such as name, role, etc.

- **Get All User:**
  - Endpoint: `GET /user`
  - Description: Retrieves a list of all user in the system.

- **Get User Profiles:**
  - Endpoint: `GET /user/:profiles`
  - Description: Retrieves a list of user based on their work type (e.g., chef, waiter, manager).

- **Update User using Password :**
  - Endpoint: `PUT /user/:password`
  - Description: Updates the details of a specific person identified by their ID.

### CandidateRoutes
- **Add a Candidate:**
  - Endpoint: `POST /candidate`
  - Description: Adds a candidate to the system with details such as name, etc. post route to add a candidate 

- **Get All Menu Items:**
  - Endpoint: `GET /candidate`
  - Description: Retrieves a list of all candidate in the system.

- **Update a Menu Item:**
  - Endpoint: `PUT /candidate/:candidateId`
  - Description: Updates the details of a specific candidate identified by its ID.

- **Delete a Menu Item:**
  - Endpoint: `DELETE /candidate/:candidateId`
  - Description: Deletes a candidate from the system based on its ID.
 
- **let's Voting**
  - Endpoint: `POST /candidate/vote/:candidateId`
  - Description: add a candidate vote from the system based on its ID.
 
- **Vote Count**
  - Endpoint: `GET /candidate/vote/count`
  - Description: get a candidate vote count from the system.

## Data Models

### User
The `User` data model represents information about users in the Villages.

- **Fields:**
  - `name`: String (User's name)
  - `age`: Number (User's age)
  - `email`: Enum (User's email)
  - `mobile`: String (User's mobile number)
  - `address`: String (User's address)
  - `aadharCardNumber`: Number (User's aadharcard number, unique)
  - `password`: String (User's password)

- **Example:**
  ```json
  {
    "name": "Akash",
    "age": 15,
    "email": "akash@gmail.com",
    "mobile": "9323453434",
    "address": "chikhala",
    "aadharCardNumber": 122312231223,
    "password": "1234"
  }


### Candidate
The `MenuItem` data model represents information about menu items available in the hotel.

- **Fields:**
  - `name`: String (Candidate's name)
  - `party`: String (Candidate's party ex: BJP, NCP)
  - `age`: Number (Candidate's age)
  - `votes`: Array (Candidate's votes)
  - `votesCount`: Number (Candidate's vote count)

- **Example:**
  ```json
  {
    "name": "Narendra ModiJi",
    "party": "BHP",
    "age": 72,
  }


## Usage

1. **Install Dependencies:**
   ```bash
   npm install
