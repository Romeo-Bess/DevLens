import React, { useState } from 'react'
import { useRepoStore } from '../../store/repoStore'

export const RepositoriesView: React.FC = () => {
  const { repositories, addRepository, setSelectedRepo, triggerAnalysis } = useRepoStore()
  const [repoUrl, setRepoUrl] = useState('')
  const [adding, setAdding] = useState(false)

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl) return

    setAdding(true)
    
    // Simulate repository validation & metadata fetch pipeline
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const parts = repoUrl.replace('https://github.com/', '').split('/')
    const name = parts[1] || 'imported-repo'
    const fullName = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : `custom/${name}`

    const newRepo = {
      id: Math.random().toString(36).substring(7),
      name,
      fullName,
      description: 'AI-imported diagnostics repository.',
      htmlUrl: repoUrl,
      stars: Math.floor(Math.random() * 5000),
      forks: Math.floor(Math.random() * 800),
      language: 'TypeScript',
      sizeKb: 45000,
      languagesJson: { TypeScript: 80, JavaScript: 20 }
    }

    addRepository(newRepo)
    setSelectedRepo(newRepo)
    setRepoUrl('')
    setAdding(false)

    // Trigger diagnostics scanning right after importing
    triggerAnalysis(newRepo.id)
  }

  return (
    <div className="flex-1 p-md lg:p-lg space-y-lg overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-headline-lg font-bold text-primary">Connected Repositories</h2>
        <p className="text-body-md text-on-surface-variant">Connect and validate repository assets below.</p>
      </div>

      {/* Import Form */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm max-w-2xl space-y-md">
        <h3 className="text-headline-sm font-semibold text-primary">Import Public Repository</h3>
        <form onSubmit={handleImport} className="flex flex-col sm:flex-row gap-sm">
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="flex-1 bg-surface border border-outline-variant/80 rounded-lg px-md py-sm font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            placeholder="e.g. https://github.com/facebook/react"
            required
          />
          <button
            type="submit"
            disabled={adding}
            className="bg-primary hover:bg-primary/95 text-on-primary font-label-md px-lg py-sm rounded-lg transition-colors flex items-center justify-center gap-sm shrink-0"
          >
            {adding ? 'Importing...' : 'Connect Repo'}
          </button>
        </form>
      </div>

      {/* Grid of connected Repos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md lg:gap-lg">
        {repositories.map((repo) => (
          <div key={repo.id} className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between card-hover-effect relative overflow-hidden group">
            <div className="flex justify-between items-start mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-md bg-surface-container-low border border-outline-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">folder</span>
                </div>
                <div>
                  <h3 className="font-label-md font-bold text-primary truncate max-w-[150px]">{repo.name}</h3>
                  <p className="text-xs text-on-surface-variant font-mono">{repo.language || 'Code'}</p>
                </div>
              </div>
              <a href={repo.htmlUrl} target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>

            <p className="text-xs text-on-surface-variant line-clamp-2 mb-md h-8">{repo.description || 'No description provided.'}</p>

            <div className="py-sm border-t border-outline-variant/30 flex justify-between items-center text-xs text-on-surface-variant">
              <span>{repo.stars} Stars</span>
              <span>{repo.forks} Forks</span>
              <span>{(repo.sizeKb / 1024).toFixed(1)} MB</span>
            </div>

            <button
              onClick={() => setSelectedRepo(repo)}
              className="w-full bg-surface-container-low hover:bg-surface-container-high text-primary font-label-md py-xs rounded-lg mt-md transition-colors border border-outline-variant/40"
            >
              Set active repo
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
