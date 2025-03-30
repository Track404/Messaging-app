# **The Hive** 🐝  
*A real-time messaging app for 1-on-1 and group conversations.*  

## **Table of Contents**  
- [Features](#features)  
- [Demo](#demo)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Technologies](#technologies)  
- [Contributing](#contributing)  
- [License](#license)  

## **Features**  
✅ Send messages in **1-on-1** and **group chats**  
✅ Create new **conversations** with users  
✅ Create and manage **groups**  
✅ Update **user information** (e.g., profile details)  
✅ Secure REST API for communication  
✅ Responsive design with TailwindCSS  

## **Demo**  
🔗 **Live Demo:** [The Hive](https://thehive404.netlify.app)  
🔗 **Backend Repo:** [The Hive](https://github.com/Track404/Messaging-app-backend)  
📸 **Screenshots:**  
![The Hive Chat Interface](screenshot.png)  

## **Installation**  
Clone the repository and install dependencies:  

```sh
git clone https://github.com/yourusername/the-hive.git  
cd the-hive  
npm install  
npm start  
```

### **Backend Setup**  
1. Create a `.env` file in the root directory and configure the following:  
   ```env
   DATABASE_URL=your_postgresql_database_url  
   JWT_SECRET=your_jwt_secret  
   ```

2. Run database migrations (if applicable):  

```sh
npm run migrate
```

3. Start the backend server:  

```sh
npm run server
```

## **Usage**  
1. Sign up or log in.  
2. Start a **new conversation** with a user or create a **group chat**.  
3. Send and receive **messages** in real time.  
4. Edit your **user profile** (e.g., name, avatar).  

## **Technologies**  
🛠 **Frontend:** React, TailwindCSS  
🚀 **Backend:** Node.js, Express.js  
🛢 **Database:** PostgreSQL  
🔐 **Authentication:** JWT  
📡 **API Type:** REST API  

## **Contributing**  
Contributions are welcome! Feel free to open an issue or submit a pull request.  

## **License**  
📜 MIT License - See the [LICENSE](LICENSE) file for details.  
