import React from 'react'
import { Link } from 'react-router-dom'
import { useRepoStore } from '../../store/repoStore'

export const DashboardView: React.FC = () => {
  const { repositories, selectedRepo, analyses, activeAnalysis, setSelectedRepo, triggerAnalysis } = useRepoStore()

  const activeAnalysisData = selectedRepo ? analyses[selectedRepo.id] : null
  const isScanning = !!(activeAnalysis && activeAnalysis.repositoryId === selectedRepo?.id)

  const handleRepoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = repositories.find((r) => r.id === e.target.value)
    if (found) {
      setSelectedRepo(found)
    }
  }

  const runReAnalysis = () => {
    if (selectedRepo) {
      triggerAnalysis(selectedRepo.id)
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full relative h-screen overflow-hidden">
      {/* TopAppBar */}
      <header className="sticky top-0 right-0 z-35 flex justify-between items-center w-full px-lg py-sm bg-surface/80 backdrop-blur-md border-b border-outline-variant/50">
        <div className="flex items-center gap-md">
          {/* Breadcrumb Context selector */}
          <div className="flex items-center gap-xs text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-sm">folder</span>
            <select
              value={selectedRepo?.id || ''}
              onChange={handleRepoChange}
              className="bg-transparent border-none focus:ring-0 text-on-surface font-bold text-label-md cursor-pointer py-xs"
            >
              {repositories.map((repo) => (
                <option key={repo.id} value={repo.id} className="bg-surface text-on-surface">
                  {repo.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-md">
          <button
            onClick={runReAnalysis}
            disabled={isScanning}
            className="bg-secondary-container text-on-secondary-container hover:bg-on-primary-fixed-variant font-label-md py-xs px-md rounded-lg transition-colors flex items-center gap-xs shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">sync</span>
            {isScanning ? 'Scanning...' : 'Re-Analyze'}
          </button>
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden border border-outline-variant">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLGZgLn2pBbKo1GLLvNohhhW8VLnDPMVhRFf7-i_6lL0gcuqxRqcpyvxDZj21BYMavjKC78TlMak08q9OkBAedQvn3K-ZIMQPsbAzBh4fNU-rp18elFInEb1KQIqDjt37B-FxzR4U8h43yomDGIGfU88YpbmvXHhuDimwNCUmo2mBt8DEOTEbjkG6lrrVeXC50vUM0EB65MrIM7wyg9_B_-812G-FFl-ue8GvoGGl4zzItLBUOB8QGzx8auauMuSm0OsfqAhTPJKE"
            />
          </div>
        </div>
      </header>

      {/* Main dashboard content canvas */}
      <main className="flex-1 overflow-y-auto p-md lg:p-lg">
        <div className="max-w-container-max mx-auto space-y-lg pb-2xl">
          {/* Greeting Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
            <div>
              <h1 className="text-headline-lg font-bold text-primary mb-xs">Good morning, Engineer.</h1>
              <p className="text-body-md text-on-surface-variant">
                You have {repositories.length} repositories active in this workspace workspace.
              </p>
            </div>
          </div>

          {isScanning && (
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-md flex items-center gap-md animate-pulse">
              <span className="material-symbols-outlined animate-spin text-secondary">sync</span>
              <span className="text-body-sm text-on-surface">Running dynamic source analysis on codebase...</span>
            </div>
          )}

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
            {/* Health Score */}
            <div className="bg-surface-container-lowest rounded-xl p-md lg:p-lg border border-outline-variant card-interactive flex flex-col items-center justify-center relative overflow-hidden h-48">
              <div className="absolute top-sm left-sm font-label-md text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">health_and_safety</span>
                Health Score
              </div>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r="45" stroke="#E5E5E5" strokeWidth="4"></circle>
                  <circle
                    className="transition-all duration-1000 ease-out"
                    cx="50"
                    cy="50"
                    fill="none"
                    r="45"
                    stroke="#05162b"
                    strokeWidth="4"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * (activeAnalysisData?.healthScore || 0)) / 100}
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-display-lg text-primary">
                    {activeAnalysisData?.healthScore || '--'}
                    {activeAnalysisData?.healthScore && <span className="text-headline-md">%</span>}
                  </span>
                </div>
              </div>
            </div>

            {/* Tech Debt Index */}
            <div className="bg-surface-container-lowest rounded-xl p-md lg:p-lg border border-outline-variant card-interactive flex flex-col justify-between h-48">
              <div className="font-label-md text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">trending_down</span>
                Tech Debt Index
              </div>
              <div className="flex items-end gap-sm my-xs">
                <span className="text-headline-lg font-bold text-primary">
                  {selectedRepo?.id === '2' ? '2.4x' : '1.2x'}
                </span>
                <span className="text-label-sm text-on-surface-variant bg-surface-container px-xs py-[2px] rounded">
                  {selectedRepo?.id === '2' ? '+0.4 this week' : '-0.3 this week'}
                </span>
              </div>
              <div className="flex-1 w-full relative">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 50">
                  <path
                    className="sparkline"
                    d={selectedRepo?.id === '2' ? "M0 10 L40 20 L80 15 L120 35 L160 30 L200 45" : "M0 40 L40 35 L80 45 L120 20 L160 30 L200 10"}
                  ></path>
                </svg>
              </div>
            </div>

            {/* Security Score */}
            <div className="bg-surface-container-lowest rounded-xl p-md lg:p-lg border border-outline-variant card-interactive flex flex-col justify-between h-48">
              <div className="font-label-md text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">security</span>
                Security Issues
              </div>
              <div className="flex flex-col gap-sm flex-1 justify-center mt-sm">
                <div className="flex justify-between items-center border-b border-outline-variant/30 pb-xs">
                  <span className="text-body-sm text-on-surface">Critical</span>
                  <span className="text-label-sm text-error bg-error-container/20 px-sm py-[2px] rounded">
                    {selectedRepo?.id === '2' ? '1 Warning' : '0 Clean'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-body-sm text-on-surface-variant">High/Medium</span>
                  <span className="text-label-sm text-on-surface">
                    {selectedRepo?.id === '2' ? '12 Issues' : '3 Issues'}
                  </span>
                </div>
              </div>
            </div>

            {/* Doc Coverage */}
            <div className="bg-surface-container-lowest rounded-xl p-md lg:p-lg border border-outline-variant card-interactive flex flex-col justify-between h-48">
              <div className="font-label-md text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">description</span>
                Doc Coverage
              </div>
              <div className="flex items-end gap-sm my-xs">
                <span className="text-headline-lg font-bold text-primary">
                  {activeAnalysisData?.documentationScore || '--'}%
                </span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${activeAnalysisData?.documentationScore || 0}%` }}
                ></div>
              </div>
              <div className="text-label-sm text-on-surface-variant text-right">Target: 80%</div>
            </div>
          </div>

          {/* Recent Scans Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-bright">
              <h2 className="text-headline-sm font-bold text-primary">Repositories Health catalog</h2>
              <Link to="/repositories" className="text-label-sm text-secondary hover:underline">Manage repos</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/60 bg-surface-container-low/30 text-on-surface-variant">
                    <th className="p-md font-label-md font-medium">Repository</th>
                    <th className="p-md font-label-md font-medium">Status</th>
                    <th className="p-md font-label-md font-medium">Health Rating</th>
                    <th className="p-md font-label-md font-medium">Primary Language</th>
                    <th className="p-md font-label-md font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-body-sm">
                  {repositories.map((repo) => {
                    const ana = analyses[repo.id]
                    return (
                      <tr key={repo.id} className="border-b border-outline-variant/30 hover:bg-surface-container-low/20 transition-colors group">
                        <td className="p-md">
                          <div className="flex items-center gap-sm">
                            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">folder</span>
                            <span className="font-label-md font-bold text-primary">{repo.fullName}</span>
                          </div>
                        </td>
                        <td className="p-md">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/10 text-secondary font-mono text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            {ana?.status || 'idle'}
                          </span>
                        </td>
                        <td className="p-md font-label-md font-semibold">
                          {ana?.healthScore ? `${ana.healthScore}%` : '--'}
                        </td>
                        <td className="p-md text-on-surface-variant font-mono">{repo.language || '--'}</td>
                        <td className="p-md text-right">
                          <button
                            onClick={() => setSelectedRepo(repo)}
                            className="text-secondary hover:text-primary transition-colors opacity-0 group-hover:opacity-100 font-label-md"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
