# Zakat Dashboard - Administrator Guide

This guide is intended for system administrators responsible for managing and maintaining the Zakat Dashboard system.

## Administrator Responsibilities

As an administrator, you are responsible for:

1. System configuration and maintenance
2. User account management
3. Data management and integrity
4. Security and access control
5. Backup and recovery
6. Performance monitoring

## System Configuration

### Environment Variables

Critical configuration is managed through environment variables:

\`\`\`
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/zakat_db

# Authentication
AUTH_SECRET=your-secret-key-at-least-32-characters
NEXTAUTH_URL=http://localhost:3000

# Email (for notifications)
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com

# Logging
LOG_LEVEL=info
\`\`\`

### Database Management

#### Backup Procedures

Run regular database backups:

\`\`\`bash
# Export database to file
pg_dump -U username -d zakat_db > backup_$(date +%Y%m%d).sql

# Automated daily backup (add to cron)
0 1 * * * pg_dump -U username -d zakat_db > /path/to/backups/backup_$(date +%Y%m%d).sql
\`\`\`

#### Restore Procedure

To restore from backup:

\`\`\`bash
psql -U username -d zakat_db < backup_file.sql
\`\`\`

#### Database Maintenance

Perform regular maintenance:

\`\`\`bash
# Connect to database
psql -U username -d zakat_db

# Analyze tables
ANALYZE;

# Vacuum database
VACUUM FULL;
\`\`\`

## User Management

### User Roles

The system has the following roles:

- **Administrator**: Full system access
- **Manager**: Can view all data, import/export, and generate reports
- **Analyst**: Can view data and generate reports
- **Viewer**: Read-only access to dashboard

### Creating User Accounts

1. Navigate to **Admin > User Management**
2. Click **Add User**
3. Enter email, name, and role
4. System will send invitation email

### Permissions Management

Customize permissions for specific users:

1. Navigate to **Admin > User Management**
2. Select a user
3. Go to **Permissions** tab
4. Adjust specific permissions
5. Save changes

## Data Management

### Data Validation Rules

The system validates imported data against these rules:

- All required fields must be present
- Amounts must be positive numbers
- Dates must be in valid format (YYYY-MM-DD)
- Programs must match predefined categories
- Regions must exist in the system

### Adding New Regions

To add new regions to the map:

1. Edit `lib/region-data.ts`
2. Add the new region with path coordinates, labels, and default values
3. Rebuild and deploy the application

### Data Cleanup Tools

For data issues:

1. Navigate to **Admin > Data Management**
2. Use **Find Duplicates** to identify potential duplicate records
3. Use **Fix Inconsistencies** to standardize naming and categorization
4. Use **Bulk Edit** to make changes to multiple records

## Security

### Authentication

The system uses NextAuth.js for authentication. Configure providers in `pages/api/auth/[...nextauth].js`.

### Access Control

Access is controlled by:

1. **Role-based permissions**: Defined in the database
2. **API route protection**: Middleware checks for authentication and permissions
3. **Client-side protection**: UI elements are conditionally rendered based on permissions

### Security Best Practices

- Rotate `AUTH_SECRET` periodically
- Use strong passwords for database access
- Enable HTTPS in production
- Implement rate limiting for API routes
- Regularly update dependencies

## Monitoring and Maintenance

### Performance Monitoring

Monitor system performance:

1. Server-side logs are available in `/logs` directory
2. Database query performance can be monitored in PostgreSQL logs
3. Client-side errors are logged to the server

### Common Maintenance Tasks

#### Clearing Cache

\`\`\`bash
# Clear server cache
npm run clear-cache

# Clear browser cache
# Instruct users to press Ctrl+F5 or clear browser cache
\`\`\`

#### Updating Dependencies

\`\`\`bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update with potential breaking changes
npm install package@latest
\`\`\`

## Troubleshooting

### Database Connection Issues

If database connection fails:

1. Verify PostgreSQL is running: `systemctl status postgresql`
2. Check connection parameters in `.env`
3. Verify network connectivity: `ping database-host`
4. Check database logs: `/var/log/postgresql/postgresql-14-main.log`

### Authentication Problems

For authentication issues:

1. Verify `AUTH_SECRET` and `NEXTAUTH_URL` are set correctly
2. Check NextAuth logs
3. Verify email configuration for password resets

### Performance Issues

If the dashboard is slow:

1. Check database query performance
2. Verify server resource utilization
3. Consider adding indexes to frequently queried fields
4. Implement pagination for large datasets

## Deployment Updates

### Update Procedure

To deploy updates:

1. Pull latest changes: `git pull origin main`
2. Install dependencies: `npm install`
3. Run migrations: `npx prisma migrate deploy`
4. Build application: `npm run build`
5. Restart service: `systemctl restart zakat-dashboard`

### Rollback Procedure

If issues occur after update:

1. Revert to previous version: `git checkout v1.x.x`
2. Install dependencies: `npm install`
3. Rollback migrations: `npx prisma migrate resolve --rolled-back "migration_name"`
4. Build application: `npm run build`
5. Restart service: `systemctl restart zakat-dashboard`
\`\`\`

Let's create a data import guide:
