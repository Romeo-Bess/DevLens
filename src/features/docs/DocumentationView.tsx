import React, { useState } from 'react'

export const DocumentationView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'system' | 'onboarding'>('system')
  const [exported, setExported] = useState(false)

  const systemOverviewMarkdown = `
# System Overview: API Gateway v2

The API Gateway v2 acts as the primary entry point for all external client requests destined for internal microservices. It is responsible for request routing, composition, protocol translation, and enforcing cross-cutting concerns such as authentication, rate limiting, and telemetry.

## Core Responsibilities

* **Dynamic Routing:** Evaluates incoming request paths and headers against defined rulesets to forward traffic to the appropriate backend service.
* **Authentication & Authorization:** Validates JWT tokens and API keys before traffic reaches downstream services.
* **Rate Limiting:** Implements token bucket algorithm using Redis key stores to prevent service abuse.

## Configuration Example

\`\`\`yaml
# gateway-config.yml
server:
  port: 8080
  tls_enabled: true

routes:
  - id: user-service-route
    match:
      path: "/api/v1/users/*"
    backends:
      - url: "http://user-service:9000"
\`\`\`
  `

  const onboardingMarkdown = `
# Developer Onboarding: API Gateway v2

Welcome to the DevLens team. Follow this guide to set up the gateway service in your local environment.

## Prerequisites

* Docker Desktop installed
* Go v1.21 compiler
* Make command CLI tools

## Local Setup

1. Clone the service sub-repository workspace.
2. Initialize environment config profiles:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
3. Spin up Redis mock cluster engines:
   \`\`\`bash
   docker-compose up -d redis
   \`\`\`
4. Execute test suits:
   \`\`\`bash
   make test
   \`\`\`
  `

  const handleCopy = () => {
    const text = activeTab === 'system' ? systemOverviewMarkdown : onboardingMarkdown
    navigator.clipboard.writeText(text)
    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar navigation context */}
      <aside className="w-64 border-r border-outline-variant bg-surface-container-lowest/80 flex flex-col shrink-0 hidden md:flex">
        <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low/20">
          <span className="font-label-md font-bold text-primary uppercase text-xs">DOCS HIERARCHY</span>
          <span className="bg-surface-container-high text-on-surface-variant font-mono text-[9px] px-1.5 py-0.5 rounded">AUTO-GEN</span>
        </div>
        <div className="p-sm flex-1 space-y-1">
          <button
            onClick={() => setActiveTab('system')}
            className={`w-full text-left px-md py-sm rounded-lg font-label-md transition-colors flex items-center gap-xs ${
              activeTab === 'system' ? 'bg-primary-container/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">description</span>
            System Overview
          </button>
          <button
            onClick={() => setActiveTab('onboarding')}
            className={`w-full text-left px-md py-sm rounded-lg font-label-md transition-colors flex items-center gap-xs ${
              activeTab === 'onboarding' ? 'bg-primary-container/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">directions_run</span>
            Onboarding Guide
          </button>
        </div>
      </aside>

      {/* Workspace content viewer */}
      <div className="flex-1 flex flex-col overflow-hidden bg-surface-bright">
        {/* Floating action header overlay */}
        <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <div className="flex gap-sm">
            <button
              onClick={() => setActiveTab('system')}
              className={`md:hidden px-sm py-xs text-xs font-bold rounded ${activeTab === 'system' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
            >
              System
            </button>
            <button
              onClick={() => setActiveTab('onboarding')}
              className={`md:hidden px-sm py-xs text-xs font-bold rounded ${activeTab === 'onboarding' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
            >
              Onboarding
            </button>
          </div>
          <div className="flex items-center gap-sm">
            <button
              onClick={handleCopy}
              className="bg-surface border border-outline-variant hover:border-primary text-on-surface-variant font-label-md px-md py-xs rounded flex items-center gap-xs text-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              {exported ? 'Copied!' : 'Copy'}
            </button>
            <button className="bg-primary hover:bg-primary/95 text-on-primary font-label-md px-md py-xs rounded flex items-center gap-xs text-xs shadow-sm">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              Regenerate
            </button>
          </div>
        </div>

        {/* markdown renderer */}
        <div className="flex-1 overflow-y-auto p-lg md:p-xl">
          <div className="max-w-3xl mx-auto bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-lg md:p-xl shadow-sm">
            <article className="markdown-body">
              {activeTab === 'system' ? (
                <>
                  <h1 className="text-display-lg font-bold text-primary mb-md">System Overview: API Gateway v2</h1>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    The API Gateway v2 acts as the primary entry point for all external client requests destined for internal microservices. It is responsible for request routing, composition, protocol translation, and enforcing cross-cutting concerns such as authentication, rate limiting, and telemetry.
                  </p>

                  <div className="bg-surface-container-low border border-outline-variant rounded-lg p-md flex gap-md items-start my-md">
                    <span className="material-symbols-outlined text-secondary">info</span>
                    <div>
                      <strong className="text-primary text-sm font-bold block mb-1">AI Scan Insight</strong>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        This document is auto-synced with commit <code>abc123f</code>. System uses Go fasthttp handlers to scale concurrency.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-headline-sm font-semibold text-primary mt-lg pb-xs border-b">Core Responsibilities</h2>
                  <ul className="list-disc list-inside text-body-sm text-on-surface-variant space-y-xs py-sm">
                    <li><strong>Dynamic Routing:</strong> Evaluates incoming request paths to forward traffic to microservices.</li>
                    <li><strong>Authentication:</strong> Integrates JWT middleware with Auth Service API.</li>
                    <li><strong>Rate Limiting:</strong> Implements token bucket Redis limits.</li>
                  </ul>

                  <h2 className="text-headline-sm font-semibold text-primary mt-lg pb-xs border-b">Performance Characteristics</h2>
                  <div className="grid grid-cols-3 gap-sm mt-md">
                    <div className="bg-surface border border-outline-variant p-sm rounded text-center">
                      <span className="text-xs text-on-surface-variant block uppercase">Latency Added</span>
                      <strong className="text-headline-sm font-bold text-primary">&lt;2ms</strong>
                    </div>
                    <div className="bg-surface border border-outline-variant p-sm rounded text-center">
                      <span className="text-xs text-on-surface-variant block uppercase">Throughput</span>
                      <strong className="text-headline-sm font-bold text-secondary">15k rps</strong>
                    </div>
                    <div className="bg-surface border border-outline-variant p-sm rounded text-center">
                      <span className="text-xs text-on-surface-variant block uppercase">RAM Footprint</span>
                      <strong className="text-headline-sm font-bold text-on-surface">~45MB</strong>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-display-lg font-bold text-primary mb-md">Developer Onboarding: API Gateway v2</h1>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    Welcome to the DevLens team. Follow this guide to set up the gateway service in your local environment.
                  </p>

                  <h2 className="text-headline-sm font-semibold text-primary mt-lg pb-xs border-b">Prerequisites</h2>
                  <ul className="list-disc list-inside text-body-sm text-on-surface-variant space-y-xs py-sm">
                    <li>Docker Desktop engine environment installed</li>
                    <li>Go v1.21 compiler runtime</li>
                    <li>Standard Linux/MacOS make CLI tools</li>
                  </ul>

                  <h2 className="text-headline-sm font-semibold text-primary mt-lg pb-xs border-b">Local Setup Commands</h2>
                  <pre className="bg-inverse-surface text-surface-container-lowest p-md rounded-lg font-mono text-xs overflow-x-auto leading-relaxed my-md">
                    <code>
{`# 1. Clone repository
git clone https://github.com/acme/gateway-v2.git

# 2. Configure variables
cp .env.example .env

# 3. Start dependency containers
docker-compose up -d redis

# 4. Execute test suites
make test`}
                    </code>
                  </pre>
                </>
              )}
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
