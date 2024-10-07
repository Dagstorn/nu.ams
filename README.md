# NU AMS setup and run

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Git**:
  [Download Git](https://git-scm.com/downloads)

- **Docker**:
  [Download Docker](https://www.docker.com/products/docker-desktop/)

- **Node.js**: Download and install from [https://nodejs.org](https://nodejs.org). This includes `npm`, the Node.js package manager.

- **Java Development Kit (JDK)**<br>
  Spring Boot requires the Java Development Kit (JDK) to run. Spring Boot 3.x typically requires JDK 17 or higher. You can download the JDK from here:
  [Download JDK](https://www.oracle.com/java/technologies/downloads/#java17?er=221886)

- **IDE: IntelliJ IDEA** (Recommended for Spring Boot development):<br>Download from: [IntelliJ IDEA](https://www.jetbrains.com/idea/download/?section=mac#community-edition)

- **VSCode**<br>Download from: [VScode](https://code.visualstudio.com/)

## Running Backend and Database

Follow these steps to run the React app in development mode.

1. Clone the Repository

   ```bash
   git clone https://github.com/Dagstorn/nu.ams.git
   cd nu.ams
   ```

2. Start the Database Using Docker Compose

   ```bash
   docker-compose -f db_docker.yml up --build -d
   ```

3. Run the project in IntelliJ IDEA

## Running Frontend

1. Ensure that you are in `nu.ams/frontend`

2. Install Dependencies

   ```bash
   npm install
   ```

3. Start the Development Server

   ```bash
   npm run dev
   ```
