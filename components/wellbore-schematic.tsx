"use client"

import { useMemo } from "react"

interface CasingSection {
  size: number
  top: number
  bottom: number
}

interface Formation {
  name: string
  depth: number
}

interface WellboreData {
  casing: CasingSection[]
  formations: Formation[]
}

interface WellboreSchematicProps {
  data: WellboreData
}

export default function WellboreSchematic({ data }: WellboreSchematicProps) {
  const { casing, formations } = data

  // Calculate dimensions and scales
  const maxDepth = Math.max(...casing.map((c) => c.bottom), ...formations.map((f) => f.depth))

  const maxCasingSize = Math.max(...casing.map((c) => c.size))

  // SVG dimensions
  const width = 800
  const height = 600
  const margin = { top: 40, right: 150, bottom: 40, left: 80 }
  const plotWidth = width - margin.left - margin.right
  const plotHeight = height - margin.top - margin.bottom

  // Scale functions
  const depthScale = (depth: number) => (depth / maxDepth) * plotHeight
  const widthScale = (size: number) => (size / maxCasingSize) * (plotWidth / 3)

  // Sort casings by size (largest first) for proper rendering
  const sortedCasing = useMemo(() => {
    return [...casing].sort((a, b) => b.size - a.size)
  }, [casing])

  // Generate colors for each casing
  const casingColors = ["#8B4513", "#A0522D", "#CD853F", "#DEB887"]

  return (
    <div className="bg-card rounded-lg border p-6">
      <svg width={width} height={height} className="mx-auto">
        <defs>
          {/* Add gradients for better visual appearance */}
          {sortedCasing.map((_, index) => (
            <linearGradient key={`gradient-${index}`} id={`casing-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={casingColors[index]} stopOpacity="0.8" />
              <stop offset="50%" stopColor={casingColors[index]} stopOpacity="1" />
              <stop offset="100%" stopColor={casingColors[index]} stopOpacity="0.8" />
            </linearGradient>
          ))}
        </defs>

        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Draw Y-axis */}
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={plotHeight}
            stroke="currentColor"
            strokeWidth={2}
            className="text-foreground"
          />

          {/* Y-axis label */}
          <text x={-30} y={-10} textAnchor="middle" className="text-sm font-semibold fill-foreground">
            Depth (ft)
          </text>

          {/* Depth markers */}
          {[0, 2000, 4000, 6000, 8000].map((depth) => (
            <g key={depth}>
              <line
                x1={-5}
                y1={depthScale(depth)}
                x2={0}
                y2={depthScale(depth)}
                stroke="currentColor"
                strokeWidth={1}
                className="text-foreground"
              />
              <text
                x={-10}
                y={depthScale(depth)}
                textAnchor="end"
                alignmentBaseline="middle"
                className="text-xs fill-muted-foreground"
              >
                {depth}
              </text>
            </g>
          ))}

          {/* Draw casing sections */}
          {sortedCasing.map((section, index) => {
            const casingWidth = widthScale(section.size)
            const casingHeight = depthScale(section.bottom) - depthScale(section.top)
            const x = plotWidth / 2 - casingWidth / 2

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={depthScale(section.top)}
                  width={casingWidth}
                  height={casingHeight}
                  fill={`url(#casing-gradient-${index})`}
                  stroke="#000"
                  strokeWidth={2}
                />
                <text
                  x={x + casingWidth + 25}
                  y={depthScale(section.top) + 15}
                  className="text-xs font-medium fill-foreground"
                >
                  {section.size}" casing
                </text>
                <text
                  x={x + casingWidth + 25}
                  y={depthScale(section.top) + 28}
                  className="text-xs fill-muted-foreground"
                >
                  ({section.top}' - {section.bottom}')
                </text>
              </g>
            )
          })}

          {/* Draw formation markers */}
          {formations.map((formation, index) => {
            const y = depthScale(formation.depth)
            return (
              <g key={index}>
                {/* Horizontal line across the wellbore */}
                <line
                  x1={plotWidth / 2 - plotWidth / 4}
                  y1={y}
                  x2={plotWidth / 2 + plotWidth / 4}
                  y2={y}
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5,5"
                />
                {/* Formation marker circle */}
                <circle cx={plotWidth / 2 + plotWidth / 4} cy={y} r={5} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                {/* Formation label */}
                <text
                  x={plotWidth / 2 + plotWidth / 4 + 15}
                  y={y - 5}
                  className="text-sm font-semibold fill-foreground"
                >
                  {formation.name}
                </text>
                <text x={plotWidth / 2 + plotWidth / 4 + 15} y={y + 10} className="text-xs fill-muted-foreground">
                  @ {formation.depth} ft
                </text>
              </g>
            )
          })}

          {/* Legend */}
          <g transform={`translate(${plotWidth + 20}, 20)`}>
            <text className="text-sm font-semibold fill-foreground mb-2" y={-5}>
              Legend
            </text>
            <g transform="translate(0, 10)">
              <rect width={20} height={15} fill={`url(#casing-gradient-0)`} stroke="#000" />
              <text x={25} y={12} className="text-xs fill-foreground">
                Casing String
              </text>
            </g>
            <g transform="translate(0, 35)">
              <line x1={0} y1={7} x2={20} y2={7} stroke="#ef4444" strokeWidth={2} strokeDasharray="5,5" />
              <circle cx={20} cy={7} r={4} fill="#ef4444" stroke="#fff" strokeWidth={1.5} />
              <text x={30} y={12} className="text-xs fill-foreground">
                Formation Marker
              </text>
            </g>
          </g>
        </g>
      </svg>

      {/* Data summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Casing Summary</h3>
          <ul className="space-y-1 text-muted-foreground">
            {sortedCasing.map((section, index) => (
              <li key={index}>
                {section.size}" - {section.top}' to {section.bottom}' ({section.bottom - section.top}' length)
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Formation Summary</h3>
          <ul className="space-y-1 text-muted-foreground">
            {formations.map((formation, index) => (
              <li key={index}>
                {formation.name} at {formation.depth} ft
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
