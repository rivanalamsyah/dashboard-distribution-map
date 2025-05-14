"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import * as XLSX from "xlsx"

interface FileUploadProps {
  onUpload: (data: any) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus("idle")
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    try {
      // Read the file
      const data = await readExcelFile(file)

      // Validate the data
      validateData(data)

      // Process the data
      onUpload(data)

      setUploadStatus("success")
      toast({
        title: "Upload successful",
        description: `Processed ${data.length} records from ${file.name}`,
      })
    } catch (error) {
      setUploadStatus("error")
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const readExcelFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const data = e.target?.result
          const workbook = XLSX.read(data, { type: "binary" })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const json = XLSX.utils.sheet_to_json(worksheet)
          resolve(json as any[])
        } catch (error) {
          reject(new Error("Failed to parse file. Please ensure it's a valid Excel or CSV file."))
        }
      }

      reader.onerror = () => {
        reject(new Error("Failed to read file"))
      }

      reader.readAsBinaryString(file)
    })
  }

  const validateData = (data: any[]) => {
    if (data.length === 0) {
      throw new Error("The file contains no data")
    }

    // Check required fields
    const requiredFields = ["region", "amount", "program", "beneficiaries", "date"]
    const firstRow = data[0]

    const missingFields = requiredFields.filter((field) => !(field in firstRow))
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Data</CardTitle>
        <CardDescription>Upload Excel (.xlsx) or CSV files with zakat data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-accent/50 border-border"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">Excel or CSV files only</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {file && (
          <div className="mt-4 text-sm">
            <p className="font-medium">Selected file:</p>
            <p className="text-muted-foreground">{file.name}</p>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="flex items-center gap-2 mt-4 text-sm text-green-500">
            <Check className="w-4 h-4" />
            <span>Upload successful</span>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="flex items-center gap-2 mt-4 text-sm text-red-500">
            <AlertCircle className="w-4 h-4" />
            <span>Upload failed</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || isUploading} className="w-full">
          {isUploading ? "Processing..." : "Upload and Process"}
        </Button>
      </CardFooter>
    </Card>
  )
}
