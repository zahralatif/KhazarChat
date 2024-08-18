# KhazarChat 



### Folder Structure

```
KhazarChat/
│
├── client/                                   # Frontend (React)
│   ├── node_modules/                         # Dependencies installed via npm/yarn
│   ├── public/                               # Static assets like images and favicon
│   │   ├── favicon.ico
│   │   └── ...
│   ├── src/
│   │   ├── components/                       # Reusable components
│   │   |   ├── newPropmt/                    # New Prompt Component
│   │   |   |   ├── newPropmt.css         
│   │   |   |   └── NewPropmt.jsx
│   │   |   ├── sidebar/                      # Sidebar Component
│   │   |   |   ├── sidebar.css         
│   │   |   |   └── Sidebar.jsx         
│   │   ├── layouts/                          # Layout components
│   │   |   ├── dashboardLayout/              # Dashboard Layout
│   │   |   |   ├── dashboardLayout.css         
│   │   |   |   └── DashboardLayout.jsx
│   │   |   ├── rootLayout/                   # Root Layout
│   │   |   |   ├── rootLayout.css         
│   │   |   |   └── RootLayout.jsx         
│   │   ├── lib/                              # Library files or custom utilities
│   │   |   └── gemini.js/ 
│   │   ├── routes/                           # Pages corresponding to different routes
│   │   |   ├── chatPage/                     # Chat Page
│   │   |   |   ├── chatPage.css         
│   │   |   |   └── ChatPage.jsx                   
│   │   |   ├── dashboardPage/                # Dashboard Page
│   │   |   |   ├── dashboardPage.css         
│   │   |   |   └── DashboardPage.jsx                   
│   │   |   ├── homePage/                     # Home Page
│   │   |   |   ├── homePage.css         
│   │   |   |   └── HomePage.jsx                   
│   │   |   ├── signInPage/                   # Sign-In Page
│   │   |   |   ├── signInPage.css         
│   │   |   |   └── SignInPage.jsx                   
│   │   |   ├── signUpPage/                   # Sign-Up Page
│   │   |   |   ├── signUpPage.css         
│   │   |   |   └── SignUpPage.jsx                   
│   │   ├── styles/                           # Global styles
│   │   |   └── index.css                   
│   │   ├── App.jsx                           # Main app component
│   │   └── main.jsx                          # Entry point for React application
│   ├── .env                                  # Environment variables
│   ├── .eslintrc.cjs                         # ESLint configuration
│   ├── .gitignore                            # Files and directories to ignore in Git
│   ├── index.html                            # Main HTML file
│   ├── package-lock.json                     # Lock file for dependencies
│   ├── package.json                          # Frontend dependencies and scripts
│   └── vite.config.js                        # Vite configuration
│
├── server/                                   # Backend (Node.js/Express with TypeScript)
│   ├── node_modules/                         # Dependencies installed via npm/yarn
│   ├── src/
│   │   ├── config/                           # Configuration files (e.g., database setup)
│   │   |   ├── index.ts         
│   │   |   └── mongo.config.ts         
│   │   ├── controller/                       # Controllers handling route logic
│   │   |   └── crud.controller.ts                                   
│   │   ├── enums/                            # Enums used throughout the backend
│   │   |   ├── req.enum.ts         
│   │   |   ├── role.enum.ts                      
│   │   |   └── sort.enum.ts                                               
│   │   ├── helpers/                          # Helper functions (e.g., error handling)
│   │   |   └── errorHandler.ts                                                             
│   │   ├── router/                           # Express routers for handling different routes
│   │   |   ├── chat.router.ts         
│   │   |   ├── index.ts               
│   │   |   └── userchats.router.ts                                                       
│   │   ├── schema/                           # Database schemas/models
│   │   |   ├── chat.schema.ts            
│   │   |   └── userChats.schema.ts                                                           
│   │   └── index.ts                          # Entry point for the backend                            
│   ├── .env                                  # Environment variables for backend
│   ├── .gitignore                            # Files and directories to ignore in Git
│   ├── package-lock.json                     # Lock file for dependencies
│   ├── package.json                          # Backend dependencies and scripts
│   └── tsconfig.json                         # TypeScript configuration
│
├── README.md                                 # Project documentation
└── .gitignore                                # Global .gitignore file
```
