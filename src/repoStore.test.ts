import { describe, it, expect, beforeEach } from 'vitest'
import { useRepoStore } from './store/repoStore'

describe('useRepoStore', () => {
  beforeEach(() => {
    // Reset state before each test run
    useRepoStore.setState({
      repositories: [],
      selectedRepo: null,
      analyses: {},
      activeAnalysis: null,
      user: null
    })
  })

  it('should initialize and load mockup dataset correctly', () => {
    const store = useRepoStore.getState()
    expect(store.repositories.length).toBe(0)

    store.loadMockData()
    const updated = useRepoStore.getState()
    
    expect(updated.repositories.length).toBe(3)
    expect(updated.selectedRepo?.fullName).toBe('vercel/next.js')
    expect(updated.user?.fullName).toBe('Sarah Chen')
  })

  it('should allow connecting a new repository', () => {
    const store = useRepoStore.getState()
    store.loadMockData()
    
    const newRepo = {
      id: 'custom-repo-id',
      name: 'react-testing',
      fullName: 'facebook/react',
      htmlUrl: 'https://github.com/facebook/react',
      stars: 120,
      forks: 4,
      language: 'TypeScript',
      sizeKb: 1000,
      languagesJson: { TypeScript: 100 }
    }

    store.addRepository(newRepo)
    
    const updated = useRepoStore.getState()
    expect(updated.repositories.length).toBe(4)
    expect(updated.repositories.find((r) => r.id === 'custom-repo-id')).toBeDefined()
  })

  it('should switch selected active repository context', () => {
    const store = useRepoStore.getState()
    store.loadMockData()

    const target = useRepoStore.getState().repositories[1] // legacy-auth-service
    store.setSelectedRepo(target)

    expect(useRepoStore.getState().selectedRepo?.id).toBe('2')
  })
})
