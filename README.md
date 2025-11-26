## Prompt : I want you to generate a complete, production-ready authentication system with the following specifications:

# Tech Stack
- Frontend: React (Functional components, Hooks, Fetch), Tailwind CSS for styling
- Backend: ASP.NET Core Web API
- Database: SQL Server
- ORM: ADO.NET
- Authentication: JWT-based authentication + Refresh tokens
- Password Hashing: Strong hashing
- Two-Factor Authentication: OTP via email
- Login Identifier: Email as Username
- Validation: FluentValidation for backend model validation



## Now only give the code for frontend page (React)

# Login Page -
- Email
- Password
- OTP sent via email
- Submit to backend using Fetch
- Save JWT + refresh token in HttpOnly cookie or secure storage

# Register Page
- First Name
- Last Name
- DOB
- Gender
- Address
- Country
- Email
- Password + confirm password input
- Submit form to backend
- Post registration email verification with email OTP

# Dashboard Page (Protected)
Shows logged-in user's basic info

# Implement route protection (React Router v6) 
Auto-refresh token on expiry


## Packages Installes
npm install react-router-dom
npm install yup
npm install formik
npm install jwt-decode
npm install react-icons
npm install lucide-react
npm install react-icons/fi
npm install framer-motion
npm install react-toas

# Code Checked
1. Public Folder
2. src/components/navbar.jsx
3. src/components/footer.jsx
4. src/components/avater-card.jsx
5. src/components/InputField.jsx
