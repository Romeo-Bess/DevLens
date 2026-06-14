import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRepoStore } from '../../store/repoStore'

export const LandingPage: React.FC = () => {
  const loadMockData = useRepoStore((state) => state.loadMockData)
  const [demoUrl, setDemoUrl] = useState('https://github.com/vercel/next.js')
  const [simulatedMetrics, setSimulatedMetrics] = useState<any>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const handleDemoAnalysis = (e: React.FormEvent) => {
    e.preventDefault()
    setAnalyzing(true)
    setSimulatedMetrics(null)
    setTimeout(() => {
      setAnalyzing(false)
      setSimulatedMetrics({
        health: 94,
        complexity: 72,
        debtDays: 14.2,
        securityIssues: 3,
        lines: '142,400'
      })
    }, 2000)
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
      {/* Landing TopAppBar */}
      <header className="sticky top-0 z-30 flex justify-between items-center w-full px-lg py-sm bg-surface/85 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex items-center gap-md">
          <span className="font-headline-md font-bold text-primary flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>lens_blur</span>
            DevLens
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-lg">
          <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#features">Features</a>
          <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#demo">Demo</a>
          <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#pricing">Pricing</a>
        </nav>
        <div className="flex items-center gap-md">
          <Link
            to="/dashboard"
            onClick={() => loadMockData()}
            className="bg-primary hover:bg-primary/90 text-on-primary font-label-md px-md py-[8px] rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            Launch Console
          </Link>
        </div>
      </header>

      {/* Main Land Canvas */}
      <main className="flex-1 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl space-y-2xl">
        
        {/* Hero Section */}
        <section className="relative pt-[80px] pb-[60px] text-center max-w-[900px] mx-auto space-y-lg">
          {/* Simulated shader grid element background */}
          <div className="absolute inset-0 bg-[radial-gradient(#d3e4fe_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none -z-10" />
          
          <div className="inline-flex items-center gap-sm px-md py-[6px] rounded-full bg-secondary-container/10 text-on-secondary-container border border-secondary-container/30">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span className="font-label-sm uppercase tracking-wider">ENGINEERING INTEL PLATFORM</span>
          </div>

          <h1 className="text-display-lg md:text-[64px] font-bold tracking-tight text-primary leading-tight">
            Understand Software Architecture<br />
            <span className="bg-gradient-to-r from-[#006b5f] to-[#0050cb] bg-clip-text text-transparent">Faster.</span>
          </h1>

          <p className="text-body-lg text-on-surface-variant max-w-[650px] mx-auto leading-relaxed">
            Connect any repository and get instant, interactive maps of software dependencies, codebase complexity, security vulnerabilities, and technical debt indicators.
          </p>

          <div className="flex flex-wrap justify-center gap-md pt-md">
            <Link
              to="/dashboard"
              onClick={() => loadMockData()}
              className="bg-primary text-on-primary px-lg py-3 rounded-lg font-label-md hover:bg-primary/95 transition-all shadow-sm flex items-center gap-sm"
            >
              Start Free Scan
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <a
              href="#demo"
              className="bg-surface-container-lowest border border-outline-variant text-on-surface-variant px-lg py-3 rounded-lg font-label-md hover:border-primary transition-all flex items-center gap-sm"
            >
              Interactive Demo
            </a>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section id="features" className="space-y-md">
          <div className="text-center space-y-xs pb-md">
            <h2 className="text-headline-lg font-bold text-primary">High-Fidelity Codebase Observability</h2>
            <p className="text-body-md text-on-surface-variant max-w-md mx-auto">Systems understanding built directly for engineering teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md lg:gap-lg">
            {/* Feature 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl card-interactive flex flex-col justify-between h-64">
              <span className="material-symbols-outlined text-secondary text-2xl">account_tree</span>
              <div className="space-y-xs">
                <h3 className="text-headline-sm font-semibold text-primary">Architecture Mapping</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Generate beautiful interactive dependency graphs with custom mini-maps, panning, and structural breakdown panels.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl card-interactive flex flex-col justify-between h-64">
              <span className="material-symbols-outlined text-[#1b004f] text-2xl">analytics</span>
              <div className="space-y-xs">
                <h3 className="text-headline-sm font-semibold text-primary">Technical Debt Scoring</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Locate cognitive hotspots, circular dependency cycles, and large complex file structures dragging team productivity.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl card-interactive flex flex-col justify-between h-64">
              <span className="material-symbols-outlined text-[#ba1a1a] text-2xl">security</span>
              <div className="space-y-xs">
                <h3 className="text-headline-sm font-semibold text-primary">Supply Chain Security</h3>
                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                  Monitor outdated packages, active CVE vulnerabilities, and exposed API keys across commit histories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="bg-surface-container-low/50 border border-outline-variant/60 rounded-xl p-lg md:p-xl space-y-lg relative overflow-hidden">
          <div className="max-w-[700px] space-y-xs">
            <span className="text-xs font-mono bg-surface-container-highest/60 text-primary-container px-2 py-0.5 rounded-sm border border-outline-variant/50">PROVE IT IN REAL TIME</span>
            <h2 className="text-headline-lg font-bold text-primary">Scan Repository sandbox</h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Input any public repository URL path below. The analysis pipeline will simulate scanning the repository layout config manifests, scoring core health outputs, and outlining system structures.
            </p>
          </div>

          <form onSubmit={handleDemoAnalysis} className="flex flex-col sm:flex-row gap-sm max-w-xl">
            <input
              type="text"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="flex-1 bg-surface-container-lowest border border-outline-variant/80 rounded-lg px-md py-sm font-mono text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              placeholder="e.g. https://github.com/vercel/next.js"
              required
            />
            <button
              type="submit"
              disabled={analyzing}
              className="bg-primary hover:bg-primary/90 disabled:bg-primary-container/40 text-on-primary font-label-md px-lg py-sm rounded-lg transition-colors flex items-center justify-center gap-sm shrink-0"
            >
              {analyzing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  Run Diagnostics
                </>
              )}
            </button>
          </form>

          {/* Simulated Results Display */}
          {simulatedMetrics && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-md bg-surface border border-outline-variant/60 rounded-lg p-lg animate-fade-in">
              <div className="space-y-xs">
                <span className="text-xs font-mono text-on-surface-variant block uppercase">Health Index</span>
                <span className="text-headline-md font-bold text-secondary flex items-center gap-xs">
                  {simulatedMetrics.health}%
                </span>
              </div>
              <div className="space-y-xs">
                <span className="text-xs font-mono text-on-surface-variant block uppercase">Complexity</span>
                <span className="text-headline-md font-bold text-primary">
                  {simulatedMetrics.complexity}
                </span>
              </div>
              <div className="space-y-xs">
                <span className="text-xs font-mono text-on-surface-variant block uppercase">Prod Drag</span>
                <span className="text-headline-md font-bold text-on-surface">
                  {simulatedMetrics.debtDays} days
                </span>
              </div>
              <div className="space-y-xs">
                <span className="text-xs font-mono text-on-surface-variant block uppercase">CVE Vulnerability</span>
                <span className="text-headline-md font-bold text-error">
                  {simulatedMetrics.securityIssues} Issues
                </span>
              </div>
              <div className="col-span-2 md:col-span-1 space-y-xs">
                <span className="text-xs font-mono text-on-surface-variant block uppercase">Scanned Lines</span>
                <span className="text-headline-md font-bold text-on-surface">
                  {simulatedMetrics.lines}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Pricing Matrix */}
        <section id="pricing" className="space-y-lg">
          <div className="text-center space-y-xs">
            <h2 className="text-headline-lg font-bold text-primary">Predictable pricing built for teams</h2>
            <p className="text-body-md text-on-surface-variant">Simple billing plans starting at zero.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg max-w-[800px] mx-auto">
            {/* Free */}
            <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between space-y-md">
              <div className="space-y-xs">
                <h3 className="text-headline-sm font-bold text-primary">Standard Scan</h3>
                <p className="text-body-sm text-on-surface-variant">Best for individual project audits.</p>
                <div className="text-[32px] font-bold text-primary py-sm">$0</div>
              </div>
              <ul className="text-body-sm text-on-surface-variant space-y-sm">
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px] text-secondary">check</span> 3 Repository scans</li>
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px] text-secondary">check</span> Standard dependency explorer</li>
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px] text-secondary">check</span> Basic architectural visualizer</li>
              </ul>
              <Link
                to="/dashboard"
                onClick={() => loadMockData()}
                className="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md py-sm rounded-lg text-center transition-colors border border-outline-variant/60"
              >
                Scan Project
              </Link>
            </div>

            {/* Premium Team */}
            <div className="bg-surface-container-lowest border-2 border-secondary p-lg rounded-xl flex flex-col justify-between space-y-md relative">
              <span className="absolute -top-3 right-lg bg-secondary text-on-secondary px-3 py-0.5 text-[10px] font-mono rounded-full uppercase">RECOMMENDED</span>
              <div className="space-y-xs">
                <h3 className="text-headline-sm font-bold text-primary">Nordic Enterprise</h3>
                <p className="text-body-sm text-on-surface-variant">Continuous codebase health instrumentation.</p>
                <div className="text-[32px] font-bold text-primary py-sm">$29<span className="text-sm font-normal text-on-surface-variant"> / seat</span></div>
              </div>
              <ul className="text-body-sm text-on-surface-variant space-y-sm">
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px] text-secondary">check</span> Unlimited repositories</li>
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px] text-secondary">check</span> Advanced interactive graph visualizer</li>
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px] text-secondary">check</span> AI documentation auto-generation</li>
                <li className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px] text-secondary">check</span> Supply chain CVE alerts</li>
              </ul>
              <Link
                to="/dashboard"
                onClick={() => loadMockData()}
                className="w-full bg-primary hover:bg-primary/95 text-on-primary font-label-md py-sm rounded-lg text-center transition-all shadow-sm"
              >
                Upgrade Seat
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Layout */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant mt-2xl py-lg px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center text-on-surface-variant gap-md">
        <div className="flex flex-col md:flex-row items-center gap-md">
          <span className="text-label-md font-bold text-primary">DevLens</span>
          <span className="text-body-sm text-xs">© 2026 DevLens Engineering Intelligence. All rights reserved.</span>
        </div>
        <nav className="flex items-center gap-md text-body-sm text-xs">
          <a className="hover:text-primary hover:underline transition-all" href="#">Documentation</a>
          <a className="hover:text-primary hover:underline transition-all" href="#">Privacy Policy</a>
          <a className="hover:text-primary hover:underline transition-all" href="#">Status</a>
        </nav>
      </footer>
    </div>
  )
}
