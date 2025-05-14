# Zakat Dashboard - Setup Guide

This guide covers the initial configuration and setup of the Zakat Collection and Distribution Dashboard system.

## System Requirements

### Hardware Requirements
- **CPU**: 2+ cores recommended
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 20GB minimum for application and data

### Software Requirements
- **Node.js**: v18.0.0 or higher
- **Database**: PostgreSQL 14.0 or higher
- **Operating System**: Windows 10/11, macOS 12+, or Ubuntu 20.04+
- **Browser**: Chrome 90+, Firefox 90+, Edge 90+, Safari 15+

## Installation

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-organization/zakat-dashboard.git
cd zakat-dashboard
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

\`\`\`
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/zakat_db

# Authentication (if using)
AUTH_SECRET=your-secret-key-at-least-32-characters
NEXTAUTH_URL=http://localhost:3000

# Optional: Analytics
ANALYTICS_ID=your-analytics-id
\`\`\`

### 4. Database Setup

Create the database and run migrations:

\`\`\`bash
# Create database
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
\`\`\`

### 5. Start the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at `http://localhost:3000`.

### 6. Build for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

## Configuration Options

### Map Configuration

The interactive map can be configured in `lib/region-data.ts`. You can modify:

- Region boundaries
- Region labels
- Default colors
- Tooltip content

Example:
\`\`\`typescript
export const regionData = {
  Gedongtengen: {
    path: "M100,200 L200,200 L200,300 L100,300 Z",
    labelX: 150,
    labelY: 250,
    donations: 2.63,
  },
  // Add more regions...
};
\`\`\`

### Chart Customization

Charts can be customized in `components/charts-section.tsx`. You can modify:

- Chart types
- Colors
- Legends
- Data aggregation methods

### User Permissions

If using authentication, user roles and permissions can be configured in `lib/auth.ts`:

\`\`\`typescript
const roles = {
  admin: ['read', 'write', 'delete', 'manage-users'],
  manager: ['read', 'write'],
  viewer: ['read'],
};
\`\`\`

## Deployment

### Vercel Deployment

The easiest deployment option is using Vercel:

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Docker Deployment

A Dockerfile is included for containerized deployment:

\`\`\`bash
# Build the Docker image
docker build -t zakat-dashboard .

# Run the container
docker run -p 3000:3000 --env-file .env zakat-dashboard
\`\`\`

## Troubleshooting

### Database Connection Issues

If you encounter database connection problems:

1. Verify DATABASE_URL in your `.env` file
2. Ensure PostgreSQL is running
3. Check firewall settings
4. Verify database user permissions

### Build Errors

For build errors:

1. Clear the `.next` directory: `rm -rf .next`
2. Delete `node_modules`: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`
4. Rebuild: `npm run build`

## Getting Help

If you need additional assistance:

- GitHub Issues: [github.com/your-organization/zakat-dashboard/issues](https://github.com/your-organization/zakat-dashboard/issues)
- Email Support: support@your-organization.com
\`\`\`

Now, let's create a user guide:
