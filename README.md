# GDG On Campus ISSAT Sousse - Recruitment Platform

A comprehensive recruitment management platform for Google Developer Groups on Campus ISSAT Sousse, built with Next.js, TypeScript, PostgreSQL, and Sequelize ORM.

## 🚀 Features

- **Role-based Access Control**: Supports multiple roles including GDG Lead, Technical Lead, Committee Leads, and Core Team members
- **Dynamic Form Builder**: Create and customize recruitment forms for each cycle
- **Application Management**: Review and manage anonymous applications with duplicate prevention
- **Interview Scheduling**: Coordinate interviews with participants from different committees
- **Modern UI**: Built with shadcn/ui components with Google Developer Groups theming

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: NextAuth.js
- **UI Library**: shadcn/ui components
- **Containerization**: Docker Compose for database

## 🛠️ Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- npm or yarn

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd join-gdg
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your configuration values.

4. **Start the database**
   ```bash
   docker-compose up -d
   ```

5. **Test database connection**
   ```bash
   npm run db:test
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Management

### Available Scripts

- `npm run db:test` - Test database connection and sync
- `npm run db:migrate` - Run database migrations
- `npm run db:migrate:undo` - Undo last migration
- `npm run db:seed` - Run database seeders
- `npm run db:seed:undo` - Undo all seeders
- `npm run db:create` - Create database
- `npm run db:drop` - Drop database

### Database Services

The Docker Compose setup includes:

- **PostgreSQL Database**: Available on `localhost:5432`
  - Database: `gdg_recruitment`
  - Username: `gdg_admin`
  - Password: `gdg_secure_password_2025`

- **pgAdmin**: Available on `http://localhost:8080`
  - Email: `admin@gdg.com`
  - Password: `admin123`

## 👥 User Roles

1. **GDG Lead** - Super admin with full platform access
2. **Technical Lead** - Admin-level access for technical operations
3. **Marketing Committee Lead** - Manage marketing-related activities
4. **Team Management Committee Lead** - Handle team operations
5. **Events & External Relationships Committee Lead** - Manage events and partnerships
6. **Core Team** - Base role with limited permissions

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | - |
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |
| `MAX_FILE_SIZE` | Maximum file upload size | `10485760` (10MB) |
| `MAX_APPLICATIONS_PER_IP` | Applications per IP limit | `1` |
| `APPLICATION_DEADLINE` | Deadline for applications | - |

## 🧪 Development

### Project Structure

```
├── app/                    # Next.js app directory
├── lib/                    # Utility libraries
│   └── database.ts        # Database configuration
├── models/                 # Sequelize models
├── migrations/            # Database migrations
├── seeders/               # Database seeders
├── scripts/               # Utility scripts
├── config/                # Configuration files
├── docker-compose.yml     # Docker services
└── package.json           # Dependencies and scripts
```

### Adding New Models

1. Create model files in the `models/` directory
2. Import and register models in `models/index.ts`
3. Create migrations using Sequelize CLI
4. Run migrations to update database schema

### Database Migrations

```bash
# Create a new migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo
```

## 🚀 Deployment

1. **Production Environment Setup**
   - Set `NODE_ENV=production`
   - Configure production database URL
   - Set secure `NEXTAUTH_SECRET`

2. **Database Migration**
   ```bash
   npm run db:migrate
   ```

3. **Build and Start**
   ```bash
   npm run build
   npm run start
   ```
