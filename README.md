# AgroByte - A Global Agri-Social Platform with Marketplace & Learning

AgroByte is a comprehensive platform that connects farmers, buyers, agricultural experts, teachers, and general users worldwide. It combines social networking, marketplace functionality, educational resources, and AI-powered tools to create a complete ecosystem for the agricultural community.

## 🌟 Features

- **Social Platform**: Connect with the global agricultural community, share knowledge, post updates, and interact with experts.
- **Marketplace**: Buy and sell agricultural products, tools, and services with secure payment processing.
- **Learning Platform**: Access courses and educational resources on farming techniques, soil management, and more.
- **AI Tools**: Identify crop diseases, predict yields, and get personalized recommendations for your farm.
- **Real-time Messaging**: Communicate directly with other users, experts, and buyers.
- **Multilingual Support**: Available in multiple languages with language toggle support.
- **Dark/Light Mode**: Full theme support with easy toggle between dark and light modes.
- **Weather Integration**: Get location-based weather forecasts and agricultural recommendations.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Authentication, Database, Real-time subscriptions)
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui with full customization
- **Styling**: Tailwind CSS with custom configurations
- **Internationalization**: Built-in language support
- **Deployment**: Vercel (frontend), Supabase (backend)

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Git
- Supabase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/AgroByte.git
   cd AgroByte
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Fill in your Supabase credentials and other environment variables
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📦 Project Structure

```
AgroByte/
├── app/                    # Next.js app directory
│   ├── (auth)/             # Authentication routes
│   │   ├── login/          # Login page
│   │   ├── signup/         # Signup page
│   │   └── verify/         # Email verification
│   ├── (dashboard)/        # Dashboard routes
│   ├── marketplace/        # Marketplace routes
│   └── ai-tools/          # AI tools routes
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── landing/          # Landing page components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── auth-provider.tsx # Authentication context
│   ├── theme-provider.tsx # Theme context
│   └── language-provider.tsx # Language context
├── lib/                  # Utilities and libraries
│   ├── supabase.ts      # Supabase client configuration
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
├── public/             # Static assets and downloads
└── components.json     # shadcn/ui configuration
```

## 🔒 Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=your_app_url
```

## 👥 User Roles

- **General User**: Browse content, buy products, access learning resources
- **Farmer**: Sell products, access specialized AI tools
- **Buyer**: Purchase agricultural products
- **Expert**: Provide advice and service
- **Teacher**: Create and sell educational content
- **Weather Expert**: Provide weather insights
- **Admin**: Manage users, moderate content, view analytics

## 🌐 Available Applications

- **Desktop Application**: Download from `/downloads/agrobyte-desktop.exe`
- **Mobile Application**: Download from `/downloads/agrobyte-mobile.apk`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)
- [TypeScript](https://www.typescriptlang.org/)
