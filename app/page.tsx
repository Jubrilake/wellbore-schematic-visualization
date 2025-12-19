"use client"

import WellboreSchematic from "@/components/wellbore-schematic"

export default function Home() {
  const wellboreData = {
    casing: [
      { size: 30, top: 0, bottom: 350 },
      { size: 20, top: 0, bottom: 2500 },
      { size: 13.375, top: 0, bottom: 5500 },
      { size: 9.625, top: 0, bottom: 8360 },
    ],
    formations: [
      { name: "Sandstone", depth: 1200 },
      { name: "Shale", depth: 4100 },
      { name: "Limestone", depth: 7000 },
    ],
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Question FE-1: Wellbore Schematic Visualization</h1>
        <p className="text-muted-foreground mb-8">Vertical wellbore with casing strings and formation markers</p>
        <WellboreSchematic data={wellboreData} />
      </div>
    </main>
  )
}
