# Zakat Dashboard - Data Import Guide

This guide provides detailed instructions for preparing and importing data into the Zakat Dashboard system.

## Data Format Requirements

The system accepts data in Excel (.xlsx) and CSV formats with specific column requirements.

### Required Columns

These columns must be present in your import file:

| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| region | Text | Geographic area where zakat was collected/distributed | "Gedongtengen" |
| amount | Number | Monetary value of zakat collected (in Rupiah) | 450000000 |
| program | Text | Program category | "Education" |
| beneficiaries | Number | Number of people assisted | 120 |
| date | Date | Date of collection/distribution (YYYY-MM-DD) | "2024-01-15" |

### Optional Columns

These columns provide additional information but are not required:

| Column | Data Type | Description | Example |
|--------|-----------|-------------|---------|
| aidType | Text | Type of aid provided | "Education" |
| distributed | Number | Amount of zakat distributed | 420000000 |
| year | Text | Year of collection/distribution | "2024" |
| regency | Text | Parent region/regency | "Yogyakarta City" |

## Data Preparation Guidelines

### General Guidelines

1. Ensure all required columns are present with correct spelling
2. Remove any blank rows or columns
3. Check for and correct any inconsistencies in region names
4. Verify that numeric fields contain only numbers
5. Format dates consistently as YYYY-MM-DD

### Currency Formatting

- Enter amounts as whole numbers without currency symbols or separators
- For example, use `450000000` instead of `Rp 450,000,000`

### Program Categories

The system recognizes these standard program categories:

- Education
- Health
- Food
- Housing
- Economic
- Religious
- Emergency Relief

Using standardized categories improves analysis capabilities.

### Region Names

Region names must match exactly with the system's recognized regions. The current system recognizes:

**Yogyakarta City Districts:**
- Gedongtengen
- Jetis
- Gondokusuman
- Danurejan
- Kotagede
- Mergangsan
- Kraton
- Gondomanan
- Ngampilan
- Wirobrajan
- Mantrijeron
- Umbulharjo
- Pakualaman
- Tegalrejo

**Sleman Regency:**
- Gamping
- Godean
- Moyudan
- Minggir
- Seyegan
- Mlati
- Depok
- Berbah
- Prambanan

**Bantul Regency:**
- Bantul
- Sewon
- Kasihan
- Pajangan
- Sedayu
- Imogiri

**Kulon Progo Regency:**
- Wates
- Pengasih
- Sentolo
- Nanggulan

**Gunungkidul Regency:**
- Wonosari
- Playen
- Patuk
- Karangmojo

## Sample Data Format

### Excel Format Example

| region | regency | program | aidType | amount | distributed | beneficiaries | date | year |
|--------|---------|---------|---------|--------|-------------|---------------|------|------|
| Gedongtengen | Yogyakarta City | Education | Education | 456000000 | 410400000 | 136 | 2023-05-17 | 2023 |
| Jetis | Yogyakarta City | Health | Health | 623000000 | 579390000 | 280 | 2023-08-24 | 2023 |
| Gondokusuman | Yogyakarta City | Food | Food | 345000000 | 324300000 | 345 | 2023-11-12 | 2023 |

### CSV Format Example

\`\`\`
region,regency,program,aidType,amount,distributed,beneficiaries,date,year
Gedongtengen,Yogyakarta City,Education,Education,456000000,410400000,136,2023-05-17,2023
Jetis,Yogyakarta City,Health,Health,623000000,579390000,280,2023-08-24,2023
Gondokusuman,Yogyakarta City,Food,Food,345000000,324300000,345,2023-11-12,2023
\`\`\`

## Import Process

### Step 1: Prepare Your File

1. Format your data according to the requirements above
2. Save as .xlsx or .csv file
3. Ensure file size is under 10MB for optimal performance

### Step 2: Upload File

1. Log in to the Zakat Dashboard
2. Navigate to the **Upload Data** section from the sidebar
3. Click the upload area or drag and drop your file

### Step 3: Validation

The system will automatically validate your file. Common validation errors include:

- Missing required columns
- Invalid data types (text in numeric fields)
- Date format errors
- Unknown region names
- Negative amounts

If validation fails, you'll see an error message. Fix the issues in your file and upload again.

### Step 4: Data Preview

If validation succeeds, you'll see a preview of the data to be imported. Review for any obvious errors.

### Step 5: Confirm Import

Click **Confirm Import** to proceed with the data import.

### Step 6: Import Complete

Upon successful import, you'll see a confirmation message showing the number of records imported.

## Handling Large Datasets

For very large datasets (1000+ rows):

1. Consider splitting into multiple files for easier processing
2. Import files in chronological order if data spans multiple time periods
3. Allow extra processing time during import
4. Use wired internet connection for stable upload

## Troubleshooting Import Issues

### Common Problems and Solutions

#### "Missing Required Columns"
- Ensure all required columns are present with exact spelling
- Check for hidden spaces in column headers

#### "Invalid Data Type"
- Check for text in numeric fields
- Verify dates are in YYYY-MM-DD format
- Remove any currency symbols or separators from amounts

#### "Unknown Region"
- Verify region names match exactly with supported regions
- Check for spelling variations or typos

#### "Import Timeout"
- Reduce file size by splitting into multiple files
- Close other applications to free up system resources
- Try a different browser

#### "Duplicate Records"
- Check for records with identical region, program, and date
- The system will detect potential duplicates during import

## Best Practices

1. **Consistent Naming**: Use consistent naming conventions for regions and programs
2. **Regular Imports**: Import data regularly rather than in large batches
3. **Backup**: Keep a backup of your original data files
4. **Verify**: After import, verify data on the dashboard matches expectations
5. **Document**: Maintain documentation of your data sources and transformations

## Getting Help

If you encounter persistent issues with data import:

1. Check this guide for solutions to common problems
2. Contact the system administrator
3. Email support at support@your-organization.com with details and sample file
\`\`\`

Let's create a report generation guide:
