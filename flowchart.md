graph TD
    A[User Registration] --> B[Login]
    B --> C[Generate & Validate API Key]
    C --> D[API Key Limit Check]
    D --> E[Address Management]
    E --> F[CRUD Operations on Address]
    F --> G[Geospatial Search \((Nearby)\)]
    G --> H[Waitlist Notification Email]
    H --> I[Email Sent to User]

    E --> J[Create Address]
    E --> K[Update Address]
    E --> L[Delete Address]
    E --> M[Search Address]
    
    D --> N[Track API Usage]
    N --> O[API Key Usage Log]
