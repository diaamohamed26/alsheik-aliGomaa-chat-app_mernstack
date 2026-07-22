# Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/diaamohamed26/alsheik-aliGomaa-chat-app_mernstack.git
cd your-repository
```

---

## 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the **server** folder:

```env
MONGODB_URI=mongodb+srv://diaamazize:aREoTx7K6rzwP8YE@cluster0.8wsfhg6.mongodb.net/aligomaa_chat?retryWrites=true&w=majority
GROQ_API_KEY=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
JWT_SECRET=your_jwt_secret
PORT=5001
```

Start the backend server:

```bash
npm run dev
```

The backend will run at:

```
http://localhost:5001
```

---

## 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the **client** folder:

```env
VITE_API_URL=http://localhost:5001/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## 4. Open the Application

Open your browser and navigate to:

```
http://localhost:5173
```

The frontend will communicate with the backend at:

```
http://localhost:5001/api
```
