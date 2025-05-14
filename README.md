# Zakat Distribution System

A comprehensive dashboard for visualizing and analyzing zakat collection and distribution data across the Special Region of Yogyakarta Province.

## Overview

The Zakat Distribution System is a web-based application designed to provide stakeholders with in-depth insights into the effectiveness of zakat programs and facilitate data-driven decision making. The system visualizes collection and distribution data through interactive maps, charts, and detailed reports.

## Features

### Interactive Map Visualization
- Hierarchical map display showing districts and sub-districts in Yogyakarta
- Color-coded regions based on zakat collection/distribution amounts
- Detailed information display on region selection

### Comprehensive Analytics
- Key metrics dashboard (total zakat collected, programs run, people assisted)
- Program distribution analysis
- Trend analysis over time
- Regional comparison

### Data Management
- Excel/CSV file upload for data import
- Data validation and processing
- Detailed data table with search and filtering
- Export functionality (Excel, PDF)

### Reporting
- Customizable report generation
- Multiple report types (collection, distribution, beneficiary analysis)
- Scheduled reporting

## Technology Stack

- **Frontend**: React.js with Next.js App Router
- **UI Components**: shadcn/ui
- **Data Visualization**: Recharts and D3.js
- **Database**: PostgreSQL (Neon)
- **File Processing**: XLSX library
- **Deployment**: Vercel

## Installation

### Prerequisites
- Node.js 18.0.0 or higher
- PostgreSQL 14.0 or higher (or Neon database)
- Git

### Setup

1. **Clone the repository:**

   ```shell
   git clone https://github.com/rivanalamsyah/dashboard-distribution-map.git
   cd dashboard-distribution-map
   ```

2. **Install dependencies:**

   ```shell
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with the following variables:

   ```plaintext
   DATABASE_URL=your_neon_database_connection_string
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database:**

   ```shell
   npm run db:setup
   ```

5. **Start the development server:**

   ```shell
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000) **in your browser.**

## Database Schema

The system uses the following database structure:

### Regions

Stores information about geographic regions (districts and sub-districts).

- `id`: Primary key
- `name`: Region name
- `regency`: Parent regency/district
- `parent_id`: Reference to parent region (for hierarchical structure)
- `region_type`: Type of region (district, sub-district)
- `path`: SVG path data for map rendering
- `label_x`, `label_y`: Coordinates for region label placement
- `is_active`: Boolean indicating if region is active

### Programs

Stores zakat program categories.

- `id`: Primary key
- `name`: Program name
- `description`: Program description

### Aid Types

Stores types of aid provided.

- `id`: Primary key
- `name`: Aid type name
- `description`: Aid type description

### Zakat Data

Stores the actual zakat collection and distribution data.

- `id`: Primary key
- `region_id`: Foreign key to regions
- `program_id`: Foreign key to programs
- `aid_type_id`: Foreign key to aid types
- `amount`: Amount collected
- `distributed`: Amount distributed
- `beneficiaries`: Number of beneficiaries
- `collection_date`: Date of collection
- `year`: Year of collection
- `created_at`, `updated_at`: Timestamps

### Users

Stores user account information for authentication.

- `id`: Primary key
- `name`: User's name
- `email`: User's email (unique)
- `password_hash`: Hashed password
- `role`: User role (admin, manager, analyst, viewer)
- `created_at`, `updated_at`: Timestamps

## Usage Guide

### Importing Data

1. Navigate to the "Upload Data" section.
2. Click the upload area or drag and drop your Excel/CSV file.
3. The system will validate and process the data.
4. Upon successful import, the dashboard will update with the new data.

### Using the Interactive Map

1. Select a district from the dropdown menu.
2. The map will display sub-districts within the selected district.
3. Click on a sub-district to view detailed information.
4. Use the filters above the map to refine the data by year and aid type.

### Generating Reports

1. Navigate to the "Reports" section.
2. Select the report type.
3. Choose the date range and other filters.
4. Click "Generate Report".
5. View the report or download in Excel or PDF format.

## API Endpoints

The system provides the following API endpoints:

- `GET /api/regions`: Get all regions
- `GET /api/regions/:id`: Get a specific region
- `GET /api/regions/:id/subregions`: Get sub-regions of a specific region
- `GET /api/programs`: Get all programs
- `GET /api/zakat`: Get zakat data with optional filters
- `POST /api/zakat/upload`: Upload zakat data
- `GET /api/reports/:type`: Generate a specific report

## Contributing

We welcome contributions to the Zakat Distribution System! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Special thanks to the Zakat Collection and Distribution Board of Yogyakarta.
- Map data provided by the Yogyakarta Geographic Information System.
- Icons from Lucide React.
