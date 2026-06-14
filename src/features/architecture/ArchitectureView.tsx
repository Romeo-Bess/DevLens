import React, { useState } from 'react'
import { useRepoStore } from '../../store/repoStore'

interface ArchNode {
  id: string
  label: string
  type: 'frontend' | 'backend' | 'database' | 'external'
  tech: string
  x: number
  y: number
  description: string
  owner: string
  version: string
  dependencies: string[]
}

export const ArchitectureView: React.FC = () => {
  const { selectedRepo } = useRepoStore()
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // High-fidelity nodes matching layout
  const mockNodes: ArchNode[] = [
    {
      id: 'node-1',
      label: 'Web Client App',
      type: 'frontend',
      tech: 'Next.js',
      x: 120,
      y: 180,
      description: 'Client dashboard interface serving React components.',
      owner: 'Product UI Team',
      version: 'v4.12.0',
      dependencies: ['node-2', 'node-4']
    },
    {
      id: 'node-2',
      label: 'Auth Service API',
      type: 'backend',
      tech: 'Go API',
      x: 520,
      y: 320,
      description: 'Secure token authentication middleware service.',
      owner: 'Platform Security Team',
      version: 'v2.4.1',
      dependencies: ['node-3']
    },
    {
      id: 'node-3',
      label: 'Users DB Instance',
      type: 'database',
      tech: 'PostgreSQL',
      x: 920,
      y: 420,
      description: 'User records, profiles, and transactional details store.',
      owner: 'Data Platforms Group',
      version: 'PG 15.2',
      dependencies: []
    },
    {
      id: 'node-4',
      label: 'Stripe Webhook Gateway',
      type: 'external',
      tech: 'Stripe API',
      x: 920,
      y: 120,
      description: 'Stripe API event processor and checkout endpoints.',
      owner: 'Billing Team',
      version: 'v3-2026',
      dependencies: []
    }
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoom = (direction: 'in' | 'out' | 'fit') => {
    if (direction === 'in') setZoomLevel((prev) => Math.min(prev + 0.1, 2.0))
    if (direction === 'out') setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
    if (direction === 'fit') {
      setZoomLevel(1.0)
      setPanOffset({ x: 0, y: 0 })
    }
  }

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockNodes, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `${selectedRepo?.name || 'architecture'}-graph.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="flex-1 flex overflow-hidden relative bg-surface">
      {/* Visual Workspace Canvas */}
      <div
        className="flex-1 relative overflow-hidden cursor-grab bg-[radial-gradient(#c2c6d8_1px,transparent_1px)] [background-size:24px_24px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Controls Overlay */}
        <div className="absolute bottom-lg right-lg z-20 flex flex-col gap-sm bg-surface-container-lowest p-xs rounded-lg border border-outline-variant shadow-sm pointer-events-auto">
          <button
            onClick={() => handleZoom('in')}
            className="p-sm text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
          <div className="h-[1px] bg-outline-variant mx-sm"></div>
          <button
            onClick={() => handleZoom('out')}
            className="p-sm text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-lg">remove</span>
          </button>
          <div className="h-[1px] bg-outline-variant mx-sm"></div>
          <button
            onClick={() => handleZoom('fit')}
            className="p-sm text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors"
            title="Fit to Screen"
          >
            <span className="material-symbols-outlined text-lg">fit_screen</span>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute top-lg left-lg z-20 bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant rounded-lg p-md shadow-sm pointer-events-auto">
          <div className="flex justify-between items-center mb-sm">
            <h3 className="font-label-md font-bold text-primary">Architecture Legend</h3>
            <button
              onClick={exportJSON}
              className="text-xs font-mono text-secondary hover:underline ml-4"
            >
              Export JSON
            </button>
          </div>
          <div className="space-y-xs font-body-md text-on-surface-variant text-[13px]">
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded bg-[#eef2ff] border border-[#a5b4fc]"></span> Frontend App
            </div>
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded bg-[#f0fdf4] border border-[#86efac]"></span> Backend Service
            </div>
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded bg-[#fffbeb] border border-[#fde047]"></span> DB Cluster
            </div>
            <div className="flex items-center gap-sm">
              <span className="w-3 h-3 rounded bg-[#f5f5f5] border border-[#d4d4d4]"></span> Third-Party Service
            </div>
          </div>
        </div>

        {/* Scaled Graph container */}
        <div
          className="absolute inset-0 select-none transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '0 0'
          }}
        >
          {/* SVG Connections Container */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: 1500, minHeight: 1000 }}>
            <defs>
              <marker id="arrow" markerHeight="6" markerWidth="6" orient="auto-start-reverse" refX="28" refY="5" viewBox="0 0 10 10">
                <path fill="#c4c6cd" d="M 0 0 L 10 5 L 0 10 z"></path>
              </marker>
              <marker id="arrow-highlighted" markerHeight="6" markerWidth="6" orient="auto-start-reverse" refX="28" refY="5" viewBox="0 0 10 10">
                <path fill="#006b5f" d="M 0 0 L 10 5 L 0 10 z"></path>
              </marker>
            </defs>

            {/* Simulated Edge Render */}
            {mockNodes.map((sourceNode) =>
              sourceNode.dependencies.map((targetId) => {
                const targetNode = mockNodes.find((n) => n.id === targetId)
                if (!targetNode) return null
                const isSelectedEdge = selectedNode?.id === sourceNode.id || selectedNode?.id === targetNode.id
                return (
                  <path
                    key={`${sourceNode.id}-${targetId}`}
                    className={`transition-all ${isSelectedEdge ? 'stroke-secondary stroke-[3px]' : 'stroke-outline-variant stroke-[2px] opacity-65'}`}
                    d={`M ${sourceNode.x + 100} ${sourceNode.y + 35} C ${(sourceNode.x + targetNode.x) / 2 + 100} ${sourceNode.y + 35}, ${(sourceNode.x + targetNode.x) / 2} ${targetNode.y + 35}, ${targetNode.x} ${targetNode.y + 35}`}
                    fill="none"
                    markerEnd={`url(#${isSelectedEdge ? 'arrow-highlighted' : 'arrow'})`}
                  />
                )
              })
            )}
          </svg>

          {/* Node Renderers */}
          {mockNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id
            const nodeStyles =
              node.type === 'frontend'
                ? 'border-[#a5b4fc] bg-[#eef2ff]/50'
                : node.type === 'backend'
                ? 'border-[#86efac] bg-[#f0fdf4]/50'
                : node.type === 'database'
                ? 'border-[#fde047] bg-[#fffbeb]/50'
                : 'border-[#d4d4d4] bg-[#f5f5f5]/50'

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`absolute w-[200px] bg-surface-container-lowest border rounded-lg shadow-sm hover:translate-y-[-2px] hover:shadow-md cursor-pointer transition-all ${nodeStyles} ${
                  isSelected ? 'ring-2 ring-primary border-primary z-20 scale-105' : 'z-10'
                }`}
                style={{ left: node.x, top: node.y }}
              >
                <div className={`h-1.5 w-full rounded-t-lg ${
                  node.type === 'frontend' ? 'bg-[#a5b4fc]' : node.type === 'backend' ? 'bg-[#86efac]' : node.type === 'database' ? 'bg-[#fde047]' : 'bg-[#d4d4d4]'
                }`}></div>
                <div className="p-md space-y-xs">
                  <h4 className="font-label-md font-bold text-primary truncate">{node.label}</h4>
                  <p className="font-mono text-[11px] text-on-surface-variant">{node.tech} • {node.version}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right Drawer Inspector Sidebar */}
      {selectedNode && (
        <aside className="w-80 bg-surface-container-lowest border-l border-outline-variant flex flex-col z-20 shadow-lg animate-fade-in-right">
          <div className="p-lg border-b border-outline-variant flex justify-between items-center">
            <div>
              <h2 className="text-headline-sm font-bold text-primary">{selectedNode.label}</h2>
              <span className="font-mono text-[11px] text-on-surface-variant uppercase">{selectedNode.tech} Module</span>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-on-surface-variant hover:text-primary p-xs rounded-full hover:bg-surface-container"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-lg space-y-lg text-body-sm">
            <section className="space-y-xs">
              <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Overview</h3>
              <div className="bg-surface border border-outline-variant rounded-lg p-md space-y-sm">
                <div>
                  <span className="text-on-surface-variant block text-xs">Description</span>
                  <p className="text-on-surface">{selectedNode.description}</p>
                </div>
                <div className="flex justify-between border-t border-outline-variant/30 pt-xs">
                  <span className="text-on-surface-variant">Owner</span>
                  <span className="text-on-surface font-semibold">{selectedNode.owner}</span>
                </div>
                <div className="flex justify-between border-t border-outline-variant/30 pt-xs">
                  <span className="text-on-surface-variant">Version</span>
                  <span className="text-on-surface font-mono">{selectedNode.version}</span>
                </div>
              </div>
            </section>

            <section className="space-y-xs">
              <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider text-xs">Outgoing Links</h3>
              <ul className="space-y-sm">
                {selectedNode.dependencies.length > 0 ? (
                  selectedNode.dependencies.map((depId) => {
                    const target = mockNodes.find((n) => n.id === depId)
                    return (
                      <li
                        key={depId}
                        onClick={() => {
                          const node = mockNodes.find((n) => n.id === depId)
                          if (node) setSelectedNode(node)
                        }}
                        className="flex items-center justify-between p-sm border border-outline-variant rounded bg-surface hover:border-primary transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-primary">{target?.label}</span>
                        <span className="text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded font-mono uppercase">{target?.tech}</span>
                      </li>
                    )
                  })
                ) : (
                  <span className="text-xs text-on-surface-variant">No outgoing system dependencies.</span>
                )}
              </ul>
            </section>
          </div>
        </aside>
      )}
    </div>
  )
}
