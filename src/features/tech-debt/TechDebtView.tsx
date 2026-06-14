import React from 'react'
import { useRepoStore } from '../../store/repoStore'

export const TechDebtView: React.FC = () => {
  const { selectedRepo } = useRepoStore()

  const complexFiles = [
    { name: 'src/services/PaymentProcessor.ts', score: 84, churn: 'High' },
    { name: 'lib/core/LegacyAuthManager.java', score: 72, churn: 'Low' },
    { name: 'api/v1/controllers/UserController.js', score: 56, churn: 'Medium' }
  ]

  const refactorTargets = [
    { title: 'Extract Interface: Auth', label: 'Quick Win', duration: 'Est. 4h', impact: 'High' },
    { title: 'Update lodash dependencies', label: 'Quick Win', duration: 'Est. 1h', impact: 'Medium' },
    { title: 'Decouple Billing API', label: 'Strategic', duration: 'Est. 3d', impact: 'High' }
  ]

  return (
    <div className="flex-1 p-md lg:p-lg space-y-lg overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-headline-lg font-bold text-primary">Technical Debt Center</h2>
        <p className="text-body-md text-on-surface-variant">
          Maintenance risk evaluation for {selectedRepo?.fullName || 'project'}.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {/* Tech Debt Index card */}
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl card-interactive flex flex-col justify-between min-h-[260px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-md opacity-5">
            <span className="material-symbols-outlined text-[100px]">account_balance</span>
          </div>
          <div className="space-y-sm">
            <h3 className="text-headline-sm font-semibold text-primary">Technical Debt Score</h3>
            <span className="inline-flex items-center gap-xs px-2 py-0.5 rounded text-xs bg-error-container/20 text-on-error-container border border-error-container/30">
              Needs Attention
            </span>
          </div>
          <div className="flex items-baseline gap-xs">
            <span className="text-[64px] font-bold text-primary leading-none">72</span>
            <span className="text-headline-sm text-on-surface-variant">/100</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2">
            <div className="bg-error h-full rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        {/* Productivity drag */}
        <div className="bg-primary text-on-primary p-lg rounded-xl card-interactive flex flex-col justify-between min-h-[260px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-primary opacity-60"></div>
          <div className="relative z-10 space-y-sm">
            <h3 className="text-headline-sm font-semibold opacity-90">Productivity drag</h3>
            <div className="flex items-baseline gap-xs mt-md">
              <span className="text-[64px] font-bold leading-none">14.2</span>
              <span className="text-headline-sm opacity-80">Days</span>
            </div>
            <p className="text-xs uppercase font-mono tracking-wider opacity-75">Lost to technical debt / month</p>
          </div>
          <div className="relative z-10 pt-md border-t border-on-primary/10 flex items-center gap-xs">
            <span className="material-symbols-outlined text-[18px]">insights</span>
            <span className="text-xs opacity-90 leading-relaxed">
              AI calculates 12% delay in team sprints due to complexity.
            </span>
          </div>
        </div>

        {/* Churn Hotspots list */}
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl card-interactive flex flex-col justify-between min-h-[260px]">
          <h3 className="text-headline-sm font-semibold text-primary">Hotspot files</h3>
          <div className="space-y-sm flex-1 mt-sm">
            <div className="flex justify-between text-xs border-b pb-xs border-outline-variant/30">
              <span className="text-on-surface-variant">auth-api</span>
              <span className="text-error font-bold">High Risk</span>
            </div>
            <div className="flex justify-between text-xs border-b pb-xs border-outline-variant/30">
              <span className="text-on-surface-variant">billing-svc</span>
              <span className="text-error font-bold">High Risk</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant">ui-core</span>
              <span className="text-secondary font-bold">Low Risk</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* High Complexity Files List */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-md border-b border-outline-variant bg-surface-bright flex items-center justify-between">
            <h3 className="font-label-md font-bold text-primary">High Complexity Files</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/60 bg-surface-container-low/30 text-on-surface-variant font-label-md">
                <th className="p-md font-medium">File Path</th>
                <th className="p-md font-medium">Complexity Rating</th>
                <th className="p-md font-medium">Churn Rate</th>
              </tr>
            </thead>
            <tbody className="text-body-sm">
              {complexFiles.map((file) => (
                <tr key={file.name} className="border-b border-outline-variant/30 hover:bg-surface-container-low/20 transition-colors">
                  <td className="p-md font-mono text-primary font-bold">{file.name}</td>
                  <td className="p-md text-error font-bold font-mono">{file.score} CC</td>
                  <td className="p-md text-on-surface-variant">{file.churn} Churn</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Refactoring Targets Targets */}
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col space-y-md shadow-sm">
          <div>
            <h3 className="text-headline-sm font-semibold text-primary">Refactoring Targets</h3>
            <p className="text-xs text-on-surface-variant">Recommended actions</p>
          </div>
          <div className="space-y-sm flex-1">
            {refactorTargets.map((target, idx) => (
              <div key={idx} className="p-sm border border-outline-variant/40 rounded-lg hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-xs">
                  <span className="font-label-md font-bold text-primary group-hover:text-secondary transition-colors">{target.title}</span>
                  <span className="px-1.5 py-0.5 bg-secondary/10 text-secondary rounded text-[9px] font-mono font-bold uppercase">{target.label}</span>
                </div>
                <div className="flex justify-between text-xs text-on-surface-variant pt-xs">
                  <span>{target.duration}</span>
                  <span>Impact: {target.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
