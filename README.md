# Travel Agency Web Application

## 1. Project Title and Description
A modern, full-stack web application for a travel agency that enables users to browse, book, and manage travel packages. The application provides a seamless experience for both customers and administrators, featuring package management, hotel bookings, airline reservations, and user reviews.

## 2. Objectives
- Provide an intuitive platform for users to explore and book travel packages
- Streamline the travel booking process with an integrated system
- Enable administrators to manage packages, hotels, airlines, and user reservations
- Implement a secure authentication system with email verification
- Create a responsive and user-friendly interface for all devices
- Facilitate user reviews and feedback for travel packages

## 3. Tools and Technologies Used
### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Shadcn UI Components
- Radix UI
- React Query
- React Hook Form
- Zod (Schema validation)

### Backend & Database
- Supabase (Backend as a Service)
- Node.js
- Nodemailer (Email services)

### Development Tools
- ESLint
- TypeScript
- PostCSS
- Tailwind CSS
- SWC (Fast compiler)

## 4. System Architecture
The application follows a modern client-server architecture with the following components:

### Frontend Architecture
- Component-based structure using React
- Context-based state management
- Protected routing system
- Responsive UI components
- Form validation and handling

### Backend Architecture
- Supabase for backend services
- Authentication and authorization
- Database management
- Email service integration

## 5. Functionality
### User Features
- Browse travel packages
- View package details
- Make reservations
- User authentication and registration
- Email verification
- Profile management
- Review submission
- View destinations

### Admin Features
- Package management (CRUD operations)
- Hotel management
- Airline management
- User management
- Reservation management
- Review moderation
- Dashboard analytics

## 6. Code Structure
```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/         # Custom React hooks
├── integrations/  # Third-party integrations
├── lib/          # Utility functions and configurations
├── pages/        # Page components
│   ├── admin/    # Admin dashboard pages
│   ├── auth/     # Authentication pages
│   ├── dashboard/# User dashboard pages
│   └── packages/ # Package-related pages
├── services/     # API and service functions
└── data/         # Static data and constants
```

## 7. Database Design
The application uses Supabase as its backend service, with the following main entities:
- Users
- Packages
- Hotels
- Airlines
- Reservations
- Reviews
- Destinations

## 8. Usage Guide
### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## 9. Testing & Results
The application includes:
- Form validation testing
- Authentication flow testing
- Protected route testing
- API integration testing
- UI component testing

## 10. Limitations and Improvements
### Current Limitations
- Limited offline functionality
- Basic search capabilities
- Single language support

### Future Improvements
- Implement advanced search and filtering
- Add multi-language support
- Enhance offline capabilities
- Implement real-time notifications
- Add payment gateway integration
- Implement advanced analytics
- Add social media integration
- Enhance mobile responsiveness

## 11. Conclusion
The Travel Agency Web Application provides a comprehensive solution for managing travel bookings and packages. It offers a modern, user-friendly interface with robust backend services. The application is built with scalability in mind and can be extended with additional features as needed.

## 12. Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 13. License
This project is licensed under the [MIT License](./LICENSE). 
