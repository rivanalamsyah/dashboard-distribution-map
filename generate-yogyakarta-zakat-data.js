// Generate a comprehensive dataset for Yogyakarta Special Region
const fs = require('fs');

// Define regions in Yogyakarta Special Region
const regions = {
  // Yogyakarta City Districts
  "Gedongtengen": "Yogyakarta City",
  "Jetis": "Yogyakarta City",
  "Gondokusuman": "Yogyakarta City",
  "Danurejan": "Yogyakarta City",
  "Kotagede": "Yogyakarta City",
  "Mergangsan": "Yogyakarta City",
  "Kraton": "Yogyakarta City",
  "Gondomanan": "Yogyakarta City",
  "Ngampilan": "Yogyakarta City",
  "Wirobrajan": "Yogyakarta City",
  "Mantrijeron": "Yogyakarta City",
  "Umbulharjo": "Yogyakarta City",
  "Pakualaman": "Yogyakarta City",
  "Tegalrejo": "Yogyakarta City",
  
  // Sleman Regency
  "Gamping": "Sleman",
  "Godean": "Sleman",
  "Moyudan": "Sleman",
  "Minggir": "Sleman",
  "Seyegan": "Sleman",
  "Mlati": "Sleman",
  "Depok": "Sleman",
  "Berbah": "Sleman",
  "Prambanan": "Sleman",
  
  // Bantul Regency
  "Bantul": "Bantul",
  "Sewon": "Bantul",
  "Kasihan": "Bantul",
  "Pajangan": "Bantul",
  "Sedayu": "Bantul",
  "Imogiri": "Bantul",
  
  // Kulon Progo Regency
  "Wates": "Kulon Progo",
  "Pengasih": "Kulon Progo",
  "Sentolo": "Kulon Progo",
  "Nanggulan": "Kulon Progo",
  
  // Gunungkidul Regency
  "Wonosari": "Gunungkidul",
  "Playen": "Gunungkidul",
  "Patuk": "Gunungkidul",
  "Karangmojo": "Gunungkidul"
};

const programs = ["Education", "Health", "Food", "Housing", "Economic", "Religious", "Emergency Relief"];
const aidTypes = ["Education", "Health", "Food", "Housing", "Economic", "Religious", "Disaster"];

// Generate random date between two dates
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate random number between min and max
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate random amount (in millions, then convert to actual value)
function randomAmount() {
  // Between 100 million and 800 million
  return randomNumber(100, 800) * 1000000;
}

// Generate dataset
function generateData(rowCount) {
  const data = [];
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2024, 4, 1);
  
  const regionNames = Object.keys(regions);
  
  for (let i = 0; i < rowCount; i++) {
    const region = regionNames[i % regionNames.length]; // Cycle through all regions
    const program = programs[randomNumber(0, programs.length - 1)];
    const aidType = program === "Emergency Relief" ? "Disaster" : 
                   (program === "Religious" ? "Religious" : program);
    
    const amount = randomAmount();
    const distributionRate = randomNumber(85, 98) / 100; // 85% to 98% distribution rate
    const distributed = Math.floor(amount * distributionRate);
    
    const date = randomDate(startDate, endDate);
    const year = date.getFullYear().toString();
    
    // Calculate beneficiaries based on program type and amount
    let beneficiariesPerMillion;
    switch(program) {
      case "Education": beneficiariesPerMillion = randomNumber(20, 40); break;
      case "Health": beneficiariesPerMillion = randomNumber(30, 60); break;
      case "Food": beneficiariesPerMillion = randomNumber(80, 120); break;
      case "Housing": beneficiariesPerMillion = randomNumber(5, 15); break;
      case "Economic": beneficiariesPerMillion = randomNumber(10, 30); break;
      case "Religious": beneficiariesPerMillion = randomNumber(50, 100); break;
      case "Emergency Relief": beneficiariesPerMillion = randomNumber(100, 200); break;
      default: beneficiariesPerMillion = randomNumber(20, 50);
    }
    
    const beneficiaries = Math.floor((amount / 1000000) * beneficiariesPerMillion);
    
    data.push({
      region,
      regency: regions[region],
      program,
      aidType,
      amount,
      distributed,
      beneficiaries,
      date: formatDate(date),
      year
    });
  }
  
  return data;
}

// Generate 50 rows of data
const zakatData = generateData(50);

// Display the data
console.log("Yogyakarta Special Region Zakat Data (50 Rows):");
console.log(JSON.stringify(zakatData, null, 2));

// Create a CSV version
let csv = "region,regency,program,aidType,amount,distributed,beneficiaries,date,year\n";
zakatData.forEach(row => {
  csv += `${row.region},${row.regency},${row.program},${row.aidType},${row.amount},${row.distributed},${row.beneficiaries},${row.date},${row.year}\n`;
});

console.log("\nCSV Format (first few lines):");
console.log(csv.split("\n").slice(0, 6).join("\n"));