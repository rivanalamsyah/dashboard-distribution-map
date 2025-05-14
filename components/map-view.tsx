"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FeatureCollection, Feature, Geometry } from "geojson"

interface MapViewProps {
  data: {
    region: string
    amount: number
    program: string
    beneficiaries: number
  }[]
  selectedRegion: string | null
  setSelectedRegion: (region: string | null) => void
}

export function MapView({ data, selectedRegion, setSelectedRegion }: MapViewProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    svg.selectAll("*").remove()

    d3.json("/id-yo-yogyakarta.min.geojson").then((geojsonData) => {
      const geoData = geojsonData as FeatureCollection<Geometry, { name: string }>
      const projection = d3.geoMercator().fitSize([width, height], geoData)
      const pathGenerator = d3.geoPath().projection(projection)

      // Define a color scale by amount
      const amountColorScale = d3.scaleLinear<string>()
        .domain([0, Math.max(...data.map(d => d.amount))])
        .range(["#d1d5db", "#ef4444"]);

      // Map kecamatan to region data (zakat)
      const regionDataMap = (region: string) => {
        return data.find((d) => d.region.trim().toLowerCase() === region.trim().toLowerCase())
      }

      // Draw each kecamatan
      svg
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator as any)
        .attr("fill", (d: Feature<Geometry, { name: string }>) => {
          const regionName = d.properties?.name
          const regionData = regionDataMap(regionName || "")
          return regionData ? amountColorScale(regionData.amount) : "#94a3b8"
        })
        .attr("stroke", (d: Feature<Geometry, { name: string }>) =>
          d.properties?.name === selectedRegion ? "#fff" : "#1f2937"
        )
        .attr("stroke-width", (d: Feature<Geometry, { name: string }>) =>
          d.properties?.name === selectedRegion ? 2.5 : 1
        )
        .attr("cursor", "pointer")
        .on("click", (_event, d: Feature<Geometry, { name: string }>) => {
          const regionName = d.properties?.name
          if (regionName) {
            setSelectedRegion(regionName === selectedRegion ? null : regionName)
          }
        })

      // Add region labels
      svg
        .selectAll("text")
        .data(geoData.features)
        .enter()
        .append("text")
        .attr("transform", (d: Feature<Geometry, { name: string }>) => {
          const centroid = pathGenerator.centroid(d)
          return `translate(${centroid[0]}, ${centroid[1]})`
        })
        .attr("text-anchor", "middle")
        .attr("fill", "#f1f5f9")
        .attr("font-size", "10px")
        .attr("pointer-events", "none")
        .text((d: Feature<Geometry, { name: string }>) => d.properties?.name || "")
    }).catch((err) => {
      console.error("Failed to load GeoJSON:", err)
    })
  }, [data, selectedRegion, setSelectedRegion])

  return (
    <Card className="h-[725px] bg-gray-900 text-white">
      <CardHeader className="pb-25">
        <CardTitle className="text-white">Distribusi Zakat per Kecamatan</CardTitle>
      </CardHeader>
      <CardContent className="h-[450px] relative">
        <svg ref={svgRef} width="100%" height="100%" />
        {selectedRegion && (
          <div className="absolute top-4 right-4 bg-gray-800 border border-gray-600 text-white shadow-lg p-4 rounded-xl w-64">
            {(() => {
              const selected = data.find((d) => d.region === selectedRegion)
              if (!selected) return <div>Data tidak ditemukan</div>
              return (
                <>
                  <div className="text-lg font-bold mb-2">{selected.region}</div>
                  <div className="text-sm">Program: <span className="font-medium">{selected.program}</span></div>
                  <div className="text-sm">Jumlah: <span className="font-medium">Rp{selected.amount.toLocaleString()}</span></div>
                  <div className="text-sm">Penerima: <span className="font-medium">{selected.beneficiaries}</span></div>
                </>
              )
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
