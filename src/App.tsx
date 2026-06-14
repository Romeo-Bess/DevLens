import React, { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useRepoStore } from './store/repoStore'
import { AppLayout } from './components/AppLayout'
import { LandingPage } from './features/landing/LandingPage'
import { DashboardView } from './features/dashboard/DashboardView'
import { RepositoriesView } from './features/repositories/RepositoriesView'
import { ArchitectureView } from './features/architecture/ArchitectureView'
import { DependencyView } from './features/dependencies/DependencyView'
import { TechDebtView } from './features/tech-debt/TechDebtView'
import { SecurityView } from './features/security/SecurityView'
import { DocumentationView } from './features/docs/DocumentationView'
import { AIAssistantView } from './features/ai-assistant/AIAssistantView'

const App: React.FC = () => {
  const loadMockData = useRepoStore((state) => state.loadMockData)

  useEffect(() => {
    // Bootstrap initial dashboard mockup dataset
    loadMockData()
  }, [loadMockData])

  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/repositories" element={<RepositoriesView />} />
          <Route path="/architecture" element={<ArchitectureView />} />
          <Route path="/dependencies" element={<DependencyView />} />
          <Route path="/tech-debt" element={<TechDebtView />} />
          <Route path="/security" element={<SecurityView />} />
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="/ai-assistant" element={<AIAssistantView />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  )
}

export default App
