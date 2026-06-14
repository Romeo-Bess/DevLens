import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useRepoStore } from '../store/repoStore'

interface LayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const currentPath = location.pathname
  const { user } = useRepoStore()

  const navLinks = [
    { path: '/dashboard', label: 'Overview', icon: 'dashboard' },
    { path: '/repositories', label: 'Repositories', icon: 'folder_shared' },
    { path: '/architecture', label: 'Architecture', icon: 'account_tree' },
    { path: '/dependencies', label: 'Dependencies', icon: 'account_tree' },
    { path: '/tech-debt', label: 'Tech Debt', icon: 'analytics' },
    { path: '/security', label: 'Security', icon: 'security' },
    { path: '/docs', label: 'Docs', icon: 'description' },
    { path: '/ai-assistant', label: 'AI Assistant', icon: 'smart_toy' }
  ]

  // If we are on landing, don't wrap in layout
  if (currentPath === '/') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-on-background font-sans">
      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-screen z-40 hidden lg:flex flex-col bg-surface border-r border-outline-variant w-64">
        <div className="p-lg flex flex-col gap-xs border-b border-outline-variant/30">
          <Link to="/" className="font-headline-md text-primary font-bold tracking-tight flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>lens_blur</span>
            DevLens
          </Link>
          <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider pl-[32px]">ENGINEERING INTEL</span>
        </div>

        <div className="flex-1 overflow-y-auto px-md py-sm flex flex-col gap-xs mt-sm">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-md px-md py-sm rounded-lg transition-all ${
                  isActive
                    ? 'text-primary font-bold bg-primary-container/10 border border-primary-container/20 scale-95'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {link.icon}
                </span>
                <span className="font-label-md">{link.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="p-md border-t border-outline-variant/30 flex items-center gap-sm">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant shrink-0">
            <img alt="Avatar" src={user?.avatarUrl} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-label-md font-bold text-primary truncate">{user?.fullName || 'Sarah Chen'}</p>
            <p className="text-[10px] text-on-surface-variant truncate font-mono">{user?.email || 'engineer@devlens.ai'}</p>
          </div>
        </div>
      </nav>

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col lg:ml-64 w-full relative h-screen overflow-hidden">
        {children}
      </div>
    </div>
  )
}
