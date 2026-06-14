import { create } from 'zustand'

export interface Profile {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
}

export interface Repository {
  id: string
  name: string
  fullName: string
  description?: string
  htmlUrl: string
  stars: number
  forks: number
  language?: string
  sizeKb: number
  languagesJson: Record<string, number>
}

export interface Analysis {
  id: string
  repositoryId: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  healthScore?: number
  complexityScore?: number
  maintainabilityScore?: number
  documentationScore?: number
  securityScore?: number
  createdAt: string
}

interface RepoStore {
  user: Profile | null
  repositories: Repository[]
  selectedRepo: Repository | null
  analyses: Record<string, Analysis>
  activeAnalysis: Analysis | null
  loading: boolean
  error: string | null
  
  setUser: (user: Profile | null) => void
  setRepositories: (repos: Repository[]) => void
  setSelectedRepo: (repo: Repository | null) => void
  addRepository: (repo: Repository) => void
  triggerAnalysis: (repoId: string) => Promise<void>
  loadMockData: () => void
}

export const useRepoStore = create<RepoStore>((set, get) => ({
  user: null,
  repositories: [],
  selectedRepo: null,
  analyses: {},
  activeAnalysis: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setRepositories: (repositories) => set({ repositories }),
  setSelectedRepo: (selectedRepo) => set({ selectedRepo }),
  addRepository: (repo) => set((state) => ({ repositories: [...state.repositories, repo] })),

  triggerAnalysis: async (repoId) => {
    set({ loading: true, error: null })
    
    // Simulate real scanning engine process
    const mockAnalysisId = Math.random().toString(36).substring(7)
    const newAnalysis: Analysis = {
      id: mockAnalysisId,
      repositoryId: repoId,
      status: 'running',
      createdAt: new Date().toISOString()
    }
    
    set((state) => ({
      activeAnalysis: newAnalysis,
      analyses: { ...state.analyses, [repoId]: newAnalysis }
    }))

    // Simulating background job analysis pipeline
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const completedAnalysis: Analysis = {
      id: mockAnalysisId,
      repositoryId: repoId,
      status: 'completed',
      healthScore: 89,
      complexityScore: 68,
      maintainabilityScore: 78,
      documentationScore: 74,
      securityScore: 85,
      createdAt: new Date().toISOString()
    }

    set((state) => ({
      activeAnalysis: null,
      loading: false,
      analyses: { ...state.analyses, [repoId]: completedAnalysis }
    }))
  },

  loadMockData: () => {
    const mockRepos: Repository[] = [
      {
        id: '1',
        name: 'next.js-core',
        fullName: 'vercel/next.js',
        description: 'The React Framework for the Web',
        htmlUrl: 'https://github.com/vercel/next.js',
        stars: 120400,
        forks: 26500,
        language: 'TypeScript',
        sizeKb: 345000,
        languagesJson: { TypeScript: 92, JavaScript: 6, Rust: 2 }
      },
      {
        id: '2',
        name: 'legacy-auth-service',
        fullName: 'facebook/react',
        description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
        htmlUrl: 'https://github.com/facebook/react',
        stars: 224000,
        forks: 45000,
        language: 'JavaScript',
        sizeKb: 128000,
        languagesJson: { JavaScript: 85, TypeScript: 15 }
      },
      {
        id: '3',
        name: 'design-system-ui',
        fullName: 'tailwindlabs/tailwindcss',
        description: 'A utility-first CSS framework for rapid UI development.',
        htmlUrl: 'https://github.com/tailwindlabs/tailwindcss',
        stars: 82000,
        forks: 4100,
        language: 'TypeScript',
        sizeKb: 92000,
        languagesJson: { TypeScript: 98, CSS: 2 }
      }
    ]

    const mockAnalyses: Record<string, Analysis> = {
      '1': {
        id: 'a1',
        repositoryId: '1',
        status: 'completed',
        healthScore: 92,
        complexityScore: 75,
        maintainabilityScore: 88,
        documentationScore: 74,
        securityScore: 95,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      '2': {
        id: 'a2',
        repositoryId: '2',
        status: 'completed',
        healthScore: 52,
        complexityScore: 84,
        maintainabilityScore: 45,
        documentationScore: 40,
        securityScore: 60,
        createdAt: new Date().toISOString()
      },
      '3': {
        id: 'a3',
        repositoryId: '3',
        status: 'completed',
        healthScore: 88,
        complexityScore: 54,
        maintainabilityScore: 90,
        documentationScore: 85,
        securityScore: 92,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    }

    set({
      repositories: mockRepos,
      selectedRepo: mockRepos[0],
      analyses: mockAnalyses,
      user: {
        id: 'user123',
        email: 'engineer@devlens.ai',
        fullName: 'Sarah Chen',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLGZgLn2pBbKo1GLLvNohhhW8VLnDPMVhRFf7-i_6lL0gcuqxRqcpyvxDZj21BYMavjKC78TlMak08q9OkBAedQvn3K-ZIMQPsbAzBh4fNU-rp18elFInEb1KQIqDjt37B-FxzR4U8h43yomDGIGfU88YpbmvXHhuDimwNCUmo2mBt8DEOTEbjkG6lrrVeXC50vUM0EB65MrIM7wyg9_B_-812G-FFl-ue8GvoGGl4zzItLBUOB8QGzx8auauMuSm0OsfqAhTPJKE'
      }
    })
  }
}))
