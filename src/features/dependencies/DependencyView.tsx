import React, { useState } from 'react'
import { useRepoStore } from '../../store/repoStore'

interface Dependency {
  name: string
  version: string
  score: number
  status: 'Healthy' | 'Outdated' | 'Critical'
  type: string
}

export const DependencyView: React.FC = () => {
  const { selectedRepo } = useRepoStore()
  const [selectedDep, setSelectedDep] = useState<string>('react')

  const defaultDeps: Dependency[] = [
    { name: 'react', version: '^18.2.0', score: 98, status: 'Healthy', type: 'Framework' },
    { name: 'axios', version: '0.21.1', score: 65, status: 'Outdated', type: 'HTTP Client' },
    { name: 'log4j', version: '2.14.0', score: 12, status: 'Critical', type: 'Logging' },
    { name: 'lodash', version: '4.17.21', score: 92, status: 'Healthy', type: 'Utility' }
  ]

  const activeDepDetails = defaultDeps.find((d) => d.name === selectedDep) || defaultDeps[0]

  return (
    <div className="flex-1 p-md lg:p-lg space-y-lg overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-headline-lg font-bold text-primary">Dependency Explorer</h2>
        <p className="text-body-md text-on-surface-variant">
          Ecosystem analysis for {selectedRepo?.fullName || 'project'}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* visual diagram */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden h-[450px] flex flex-col justify-between shadow-sm">
          <div className="p-md border-b border-outline-variant bg-surface-container-low/30">
            <h3 className="font-label-md font-bold text-primary">Ecosystem Topology Map</h3>
          </div>
          <div className="flex-1 bg-surface-bright/50 relative overflow-hidden flex items-center justify-center">
            {/* Visual graph layout */}
            <div className="absolute inset-0 bg-[radial-gradient(#c2c6d8_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
            <div className="relative w-full h-full max-w-md max-h-md flex items-center justify-center scale-90">
              <div className="absolute w-20 h-20 bg-primary/10 border border-primary text-primary rounded-full flex items-center justify-center font-bold z-10">
                Core
              </div>
              <svg className="absolute inset-0 w-full h-full">
                <line stroke="#c2c6d8" strokeWidth="1.5" x1="50%" x2="20%" y1="50%" y2="30%"></line>
                <line stroke="#c2c6d8" strokeWidth="1.5" x1="50%" x2="80%" y1="50%" y2="20%"></line>
                <line stroke="#ba1a1a" strokeWidth="2" x1="50%" x2="30%" y1="50%" y2="80%"></line>
              </svg>
              <div className="absolute top-[20%] left-[10%] w-14 h-14 bg-surface border border-outline-variant text-on-surface rounded-full flex items-center justify-center text-xs">
                react
              </div>
              <div className="absolute top-[10%] right-[10%] w-16 h-16 bg-surface border border-outline-variant text-on-surface rounded-full flex items-center justify-center text-xs">
                lodash
              </div>
              <div className="absolute bottom-[10%] left-[20%] w-14 h-14 bg-error/10 border border-error text-error rounded-full flex items-center justify-center text-xs animate-pulse">
                log4j
              </div>
            </div>
          </div>
        </div>

        {/* detail card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between shadow-sm h-[450px]">
          <div className="space-y-md">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-headline-lg font-bold text-primary">{activeDepDetails.name}</h4>
                <p className="font-mono text-xs text-on-surface-variant">{activeDepDetails.version}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                activeDepDetails.status === 'Healthy' ? 'bg-[#f0fdf4] text-secondary border border-secondary/20' : activeDepDetails.status === 'Outdated' ? 'bg-[#fffbeb] text-tertiary border border-tertiary/20' : 'bg-[#fdf2f2] text-error border border-error/20'
              }`}>
                {activeDepDetails.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-sm">
              <div className="p-md bg-surface-container-low/40 rounded-lg border border-outline-variant/50">
                <span className="text-on-surface-variant block text-xs">Ecosystem Score</span>
                <span className="text-headline-sm font-bold text-primary">{activeDepDetails.score}/100</span>
              </div>
              <div className="p-md bg-surface-container-low/40 rounded-lg border border-outline-variant/50">
                <span className="text-on-surface-variant block text-xs">Category</span>
                <span className="text-body-sm font-semibold truncate block">{activeDepDetails.type}</span>
              </div>
            </div>

            {activeDepDetails.status === 'Critical' && (
              <div className="bg-[#fdf2f2] border border-error/20 rounded-lg p-md space-y-xs">
                <span className="text-error font-bold flex items-center gap-xs text-xs">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  CVE-2021-44228 (Log4Shell)
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Remote Code Execution vulnerability patched in upgrade releases. Upgrading target to v2.17.1 is highly recommended.
                </p>
              </div>
            )}
          </div>

          <button className="w-full bg-primary hover:bg-primary/95 text-on-primary font-label-md py-sm rounded-lg transition-colors mt-auto">
            Audit Package Flow
          </button>
        </div>
      </div>

      {/* List Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-md border-b border-outline-variant bg-surface-bright flex justify-between items-center">
          <h3 className="font-label-md font-bold text-primary">Connected package manifests catalog</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/60 bg-surface-container-low/30 text-on-surface-variant font-label-md">
                <th className="p-md font-medium">Package Name</th>
                <th className="p-md font-medium">Current Version</th>
                <th className="p-md font-medium">Ecosystem Health</th>
                <th className="p-md font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-body-sm">
              {defaultDeps.map((d) => (
                <tr
                  key={d.name}
                  onClick={() => setSelectedDep(d.name)}
                  className={`border-b border-outline-variant/30 hover:bg-surface-container-low/20 transition-colors cursor-pointer ${
                    selectedDep === d.name ? 'bg-surface-container-low/30' : ''
                  }`}
                >
                  <td className="p-md font-mono font-bold text-primary">{d.name}</td>
                  <td className="p-md text-on-surface-variant font-mono">{d.version}</td>
                  <td className="p-md">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                      d.status === 'Healthy' ? 'bg-[#f0fdf4] text-secondary' : d.status === 'Outdated' ? 'bg-[#fffbeb] text-tertiary' : 'bg-[#fdf2f2] text-error'
                    }`}>
                      {d.score}/100
                    </span>
                  </td>
                  <td className="p-md text-right text-secondary font-label-md">Inspect</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
