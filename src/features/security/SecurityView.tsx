import React from 'react'
import { useRepoStore } from '../../store/repoStore'

export const SecurityView: React.FC = () => {
  const { selectedRepo } = useRepoStore()

  const vulnerabilities = [
    { cve: 'CVE-2023-4512', severity: 'High', area: 'auth-service/jwt-parser', fix: 'Auto-Fix' },
    { cve: 'CVE-2023-8831', severity: 'High', area: 'api-gateway/rate-limiter', fix: 'Auto-Fix' },
    { cve: 'CVE-2024-1102', severity: 'Low', area: 'ui-components/image-loader', fix: 'Review' }
  ]

  return (
    <div className="flex-1 p-md lg:p-lg space-y-lg overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-headline-lg font-bold text-primary">Security Insights</h2>
        <p className="text-body-md text-on-surface-variant">
          Ecosystem vulnerability scan for {selectedRepo?.fullName || 'project'}.
        </p>
      </div>

      {/* Warning summary */}
      <div className="bg-surface border-l-4 border-error rounded-xl p-lg flex flex-col sm:flex-row items-center justify-between shadow-sm">
        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error shrink-0">
            <span className="material-symbols-outlined text-3xl">warning</span>
          </div>
          <div>
            <h3 className="text-headline-sm font-semibold text-primary">0 Critical, 3 High, 12 Low vulnerabilities found</h3>
            <p className="text-body-sm text-on-surface-variant">Supply chain scan completed across 24 project manifest modules.</p>
          </div>
        </div>
        <button className="bg-surface-container-lowest border border-outline-variant hover:border-primary text-on-surface-variant font-label-md px-md py-sm rounded-lg transition-colors mt-md sm:mt-0 shrink-0">
          Print Full PDF Audit
        </button>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Vulnerability Table (Span 2) */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-md border-b border-outline-variant bg-surface-bright">
            <h3 className="font-label-md font-bold text-primary">Vulnerability Feed</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/60 bg-surface-container-low/30 text-on-surface-variant font-label-md">
                <th className="p-md font-medium">CVE Identifier</th>
                <th className="p-md font-medium">Severity</th>
                <th className="p-md font-medium">Impact Area</th>
                <th className="p-md font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-body-sm">
              {vulnerabilities.map((v) => (
                <tr key={v.cve} className="border-b border-outline-variant/30 hover:bg-surface-container-low/20 transition-colors">
                  <td className="p-md font-mono text-primary font-bold">{v.cve}</td>
                  <td className="p-md">
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-error-container/20 text-error">
                      {v.severity}
                    </span>
                  </td>
                  <td className="p-md text-on-surface-variant font-mono">{v.area}</td>
                  <td className="p-md text-right">
                    <button className="text-secondary hover:underline font-label-md">{v.fix}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Secret checking + chain */}
        <div className="flex flex-col gap-lg">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center text-center h-48 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-md text-secondary border border-secondary/20">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
            <h4 className="font-label-md font-bold text-primary">No secrets exposed</h4>
            <p className="text-xs text-on-surface-variant">in Git commit history scans.</p>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex-1 flex flex-col justify-between shadow-sm min-h-[220px]">
            <h4 className="font-label-md font-bold text-primary">Supply Chain Topology</h4>
            <div className="h-24 w-full border border-outline-variant/50 rounded-lg bg-surface-container-low/40 relative flex items-end p-sm gap-xs mt-sm">
              <div className="w-1/4 h-[35%] bg-outline-variant/50 rounded-sm"></div>
              <div className="w-1/4 h-[65%] bg-outline-variant/50 rounded-sm"></div>
              <div className="w-1/4 h-[25%] bg-outline-variant/50 rounded-sm"></div>
              <div className="w-1/4 h-[80%] bg-error/30 border-t-2 border-error rounded-sm"></div>
            </div>
            <p className="text-xs text-on-surface-variant mt-sm text-center">NPM package manifest scanner active.</p>
          </div>
        </div>
      </div>

      {/* AI patch recommendations */}
      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm space-y-md">
        <div className="flex items-center gap-xs text-primary font-bold">
          <span className="material-symbols-outlined text-secondary">auto_awesome</span>
          <h3>AI Security Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div className="p-md bg-surface-container-low/40 border border-outline-variant/60 rounded-lg space-y-xs">
            <span className="text-xs font-mono text-error font-bold uppercase">Priority 1</span>
            <h5 className="font-label-md font-bold text-primary">Update jsonwebtoken dependency</h5>
            <p className="text-xs text-on-surface-variant">Bump jsonwebtoken to patch CVE-2023-4512 validation issues.</p>
          </div>
          <div className="p-md bg-surface-container-low/40 border border-outline-variant/60 rounded-lg space-y-xs">
            <span className="text-xs font-mono text-error font-bold uppercase">Priority 2</span>
            <h5 className="font-label-md font-bold text-primary">Enable rate limit rules</h5>
            <p className="text-xs text-on-surface-variant">Configure API limiter plugins to safeguard payment routes.</p>
          </div>
          <div className="p-md bg-surface-container-low/40 border border-outline-variant/60 rounded-lg space-y-xs opacity-75">
            <span className="text-xs font-mono text-on-surface-variant uppercase">Optimization</span>
            <h5 className="font-label-md font-bold text-primary">Audit Image Loader</h5>
            <p className="text-xs text-on-surface-variant">Low security threat in ui-core assets. Schedule for next review.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
