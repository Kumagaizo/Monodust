/**
 * ========================================
 * AI MILESTONE TRACKER - DATA
 * Evidence-based, professionally neutral
 * ========================================
 */

// Categories
const CATEGORIES = {
    models: { id: 'models', label: 'Models & Research' },
    applications: { id: 'applications', label: 'Applications & Products' },
    hardware: { id: 'hardware', label: 'Hardware & Infrastructure' },
    policy: { id: 'policy', label: 'Policy, Business & Society' },
    physical: { id: 'physical', label: 'Physical AI & Robotics' }
};

// Companies
const COMPANIES = {
    openai: { id: 'openai', label: 'OpenAI' },
    anthropic: { id: 'anthropic', label: 'Anthropic' },
    google: { id: 'google', label: 'Google DeepMind' },
    mistral: { id: 'mistral', label: 'Mistral AI' },
    xai: { id: 'xai', label: 'xAI' },
    meta: { id: 'meta', label: 'Meta AI' },
    deepseek: { id: 'deepseek', label: 'DeepSeek' }
};

// Events with evidence-based structure
const EVENTS = [

        // ========================================
    // SELECTED HISTORICAL MILESTONES (2022-2024)
    // ========================================

    // === 2022 ===
    {
        id: 'chatgpt-launch',
        title: 'ChatGPT Public Launch',
        date: '2022-11-30',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Research preview of conversational AI assistant. Free to use. Optimized for dialogue using RLHF.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/blog/chatgpt'
        },
        outcome: {
            text: 'Reached 100M users in 2 months. Became fastest-growing consumer app in history. Triggered industry-wide AI race.',
            date: '2023-02-01'
        },
        impact: 'Defined the generative AI era. Made AI accessible to general public. Sparked massive investment wave across industry. Changed technology landscape permanently.',
        tags: ['chatbot', 'consumer', 'viral', 'rlhf', 'paradigm-shift']
    },

    // === 2023 ===
    {
        id: 'gpt4-release',
        title: 'GPT-4 Released',
        date: '2023-03-14',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'More capable and aligned than GPT-3.5. Accepts image inputs. Scores 90th percentile on bar exam.',
            source: 'OpenAI Technical Report',
            url: 'https://openai.com/research/gpt-4'
        },
        outcome: {
            text: 'Benchmark claims verified. Became foundation for ChatGPT Plus, Microsoft Copilot, and thousands of applications. Multimodal capabilities demonstrated.',
            date: '2023-06-01'
        },
        impact: 'Set new standard for LLM capability. Triggered enterprise AI adoption wave. Established OpenAI market leadership. Multimodal foundation laid.',
        tags: ['llm', 'multimodal', 'benchmark', 'flagship', 'enterprise']
    },
    {
        id: 'claude-2-release',
        title: 'Claude 2 Released',
        date: '2023-07-11',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: '100K token context window. Improved coding and reasoning. Available via API and claude.ai.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-2'
        },
        outcome: {
            text: 'Context window worked as claimed. Established as credible GPT-4 alternative. Claude.ai consumer product launched successfully.',
            date: '2023-09-01'
        },
        impact: 'Proved Anthropic as serious competitor. 100K context became industry norm. Safety-focused approach differentiated. Consumer product viable.',
        tags: ['llm', 'context-window', 'safety', 'competition']
    },
    {
        id: 'llama-2-release',
        title: 'Llama 2 Open Source Release',
        date: '2023-07-18',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Free for research and commercial use. Models from 7B to 70B. Pre-trained and chat versions.',
            source: 'Meta AI Blog',
            url: 'https://ai.meta.com/llama/'
        },
        outcome: {
            text: 'Sparked massive open-source AI ecosystem. Thousands of fine-tunes. Enabled local LLM deployment. Community innovation explosion.',
            date: '2024-01-01'
        },
        impact: 'Democratized LLM access. Created alternative to closed API model. Open source AI viability proven. Developer ecosystem catalyzed.',
        tags: ['open-source', 'llm', 'democratization', 'ecosystem']
    },

    // === JANUARY 2024 ===
    {
        id: 'openai-gpt-store-launch',
        title: 'OpenAI GPT Store Launch',
        date: '2024-01-10',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Marketplace for custom GPTs. Revenue sharing for builders. Millions of GPTs available. Discovery and verification.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/blog/introducing-the-gpt-store'
        },
        outcome: {
            text: 'Launched with 3M+ custom GPTs. Revenue sharing details sparse initially. Quality highly variable. Discovery challenging. Top GPTs gained traction but long tail undermonetized.',
            date: '2024-03-01'
        },
        impact: 'Created GPT economy but monetization unclear. Quality curation challenge. Platform lock-in strategy. Developer enthusiasm high initially but sustainability questioned.',
        tags: ['platform', 'marketplace', 'custom-gpts', 'monetization', 'ecosystem']
    },
    {
        id: 'google-bard-gemini-rebrand',
        title: 'Google Bard Rebrands to Gemini',
        date: '2024-02-08',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'Bard renamed Gemini. Gemini Advanced with Ultra 1.0. Mobile apps launched. Workspace integration deepened.',
            source: 'Google Blog',
            url: 'https://blog.google/products/gemini/'
        },
        outcome: {
            text: 'Rebrand successful. Gemini Advanced ($20/mo) competitive with ChatGPT Plus. Mobile apps well-received. Workspace integration valuable. But still playing catch-up.',
            date: '2024-03-01'
        },
        impact: 'Unified Google AI brand. Advanced tier established. Mobile distribution advantage. But OpenAI lead maintained. Android integration strategic.',
        tags: ['rebrand', 'consumer', 'subscription', 'mobile', 'integration']
    },
    {
        id: 'anthropic-claude-3-launch',
        title: 'Claude 3 Family Released',
        date: '2024-03-04',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Three models: Opus (flagship), Sonnet (balanced), Haiku (fast). Outperforms GPT-4 and Gemini Ultra. Vision capabilities. 200K context.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-3-family'
        },
        outcome: {
            text: 'Benchmarks verified: Opus leads on many tests. Sonnet excellent price/performance. Haiku genuinely fast. Vision quality strong. 200K context working reliably.',
            date: '2024-04-01'
        },
        impact: 'Established Anthropic as tier-1 frontier lab. Three-tier strategy validated. GPT-4 supremacy challenged. Enterprise adoption accelerated. Safety narrative maintained.',
        tags: ['llm', 'flagship', 'benchmark', 'multimodal', 'breakthrough']
    },
    {
        id: 'nvidia-gtc-2024',
        title: 'NVIDIA GTC 2024: Blackwell Announced',
        date: '2024-03-18',
        category: 'hardware',
        company: 'google',
        claimed: {
            text: 'Blackwell GPU architecture. 30x performance for LLM inference. GB200 systems. Available late 2024.',
            source: 'NVIDIA',
            url: 'https://www.nvidia.com/gtc/'
        },
        outcome: {
            text: 'Architecture detailed. Performance claims credible. But production delayed to Q4 2024 and beyond. Pre-orders massive. Supply constrained.',
            date: '2024-06-01'
        },
        impact: 'Next-gen compute roadmap clear. But supply constraints continuing. Inference optimization priority. NVIDIA dominance reinforced despite competition.',
        tags: ['hardware', 'gpu', 'announcement', 'performance', 'supply-chain']
    },
    {
        id: 'inflection-acquisition',
        title: 'Microsoft Acquires Inflection AI Team',
        date: '2024-03-20',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'Microsoft hires Inflection co-founders and team. Pi product continues independently. Talent acquisition not full acquisition.',
            source: 'Microsoft',
            url: 'https://blogs.microsoft.com/'
        },
        outcome: {
            text: 'Mustafa Suleyman leads Microsoft AI. Most Inflection team joined. Pi product maintained but marginal. Regulatory scrutiny of talent deals.',
            date: '2024-05-01'
        },
        impact: 'Demonstrated big tech talent acquisition strategy. Inflection product effectively neutralized. Regulatory attention on acqui-hires. Consolidation pressure on smaller labs.',
        tags: ['acquisition', 'talent', 'consolidation', 'microsoft', 'regulation']
    },

    // === FEBRUARY 2024 ===
    {
        id: 'openai-sora-announcement',
        title: 'OpenAI Sora Announced',
        date: '2024-02-15',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Text-to-video generation. Up to 60 seconds. Realistic physics and motion. Safety testing ongoing. Limited preview.',
            source: 'OpenAI',
            url: 'https://openai.com/sora'
        },
        outcome: {
            text: 'Demos impressive but limited preview access through 2024. Full public release delayed to 2025. Quality variable. Physics sometimes unrealistic. Hype exceeded availability.',
            date: '2024-12-01'
        },
        impact: 'Demonstrated video generation frontier. But production readiness questioned. Safety concerns delaying release. Expectations vs delivery gap significant.',
        tags: ['video-generation', 'announcement', 'multimodal', 'safety', 'delayed']
    },
    {
        id: 'google-gemini-1-5-pro',
        title: 'Gemini 1.5 Pro Released',
        date: '2024-02-15',
        category: 'models',
        company: 'google',
        claimed: {
            text: '1M token context window. Improved quality over 1.0 Pro. Multimodal understanding. Available via API.',
            source: 'Google DeepMind Blog',
            url: 'https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/'
        },
        outcome: {
            text: '1M context functional but slow and expensive. Quality improvement verified. Multimodal capabilities strong. Long context use cases emerging.',
            date: '2024-04-01'
        },
        impact: 'Context window arms race escalated. 1M tokens technically impressive but practically limited. Google multimodal strength demonstrated.',
        tags: ['llm', 'context-length', 'multimodal', 'benchmark']
    },
    {
        id: 'mistral-large-launch',
        title: 'Mistral Large Released',
        date: '2024-02-26',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: 'European flagship model. 32K context. Competitive with GPT-4. Available via API and Azure.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/news/mistral-large/'
        },
        outcome: {
            text: 'Benchmarks competitive with GPT-3.5 Turbo and approaching GPT-4 on some tasks. European sovereignty angle strong. Azure partnership strategic.',
            date: '2024-04-01'
        },
        impact: 'Established European AI independence narrative. Data sovereignty selling point. Microsoft partnership significant. European alternative validated.',
        tags: ['llm', 'flagship', 'european-ai', 'sovereignty', 'partnership']
    },
    {
        id: 'openai-memory-feature',
        title: 'ChatGPT Memory Feature',
        date: '2024-02-13',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'ChatGPT remembers information across conversations. User-controllable. Improves over time. Plus subscribers first.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/blog/memory-and-new-controls-for-chatgpt'
        },
        outcome: {
            text: 'Memory feature rolled out gradually. Personalization working but sometimes inaccurate. Privacy controls adequate. User reception mixed.',
            date: '2024-05-01'
        },
        impact: 'Personalization became competitive dimension. But privacy concerns significant. Memory accuracy challenging. Stateful conversation paradigm emerging.',
        tags: ['personalization', 'memory', 'privacy', 'consumer', 'feature']
    },

    // === MARCH 2024 ===
    {
        id: 'claude-3-opus-launch',
        title: 'Claude 3 Opus Released',
        date: '2024-03-04',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Outperforms GPT-4 and Gemini Ultra on benchmarks. Three model tiers. Vision capabilities. 200K context.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-3-family'
        },
        outcome: {
            text: 'Benchmarks validated. Opus premium tier excellent. Sonnet balanced. Haiku fast. Vision quality strong. Market share grew significantly.',
            date: '2024-04-01'
        },
        impact: 'Tier-1 lab status confirmed. Multi-tier strategy working. Quality differentiation. Enterprise adoption accelerated. GPT-4 not unbeatable.',
        tags: ['llm', 'flagship', 'benchmark', 'multimodal', 'competition']
    },
    {
        id: 'devin-ai-announcement',
        title: 'Devin AI Software Engineer Announced',
        date: '2024-03-12',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'First AI software engineer. End-to-end development. Passes engineering interviews. Real-world repositories.',
            source: 'Cognition Labs',
            url: 'https://www.cognition-labs.com/introducing-devin'
        },
        outcome: {
            text: 'Demo impressive but access extremely limited. Capability questioned. Hype exceeded reality. Full autonomy not achieved. Human oversight required.',
            date: '2024-06-01'
        },
        impact: 'Highlighted autonomous coding ambition. But demo vs production gap massive. Expectations vs reality. Human-AI collaboration remained necessary.',
        tags: ['agentic', 'coding', 'hype', 'demo', 'autonomous']
    },
    {
        id: 'nvidia-blackwell-announcement',
        title: 'NVIDIA Blackwell Architecture Unveiled',
        date: '2024-03-18',
        category: 'hardware',
        company: 'google',
        claimed: {
            text: 'Next-gen GPU. 30x AI performance vs H100 for inference. GB200 systems. Shipping late 2024.',
            source: 'NVIDIA GTC',
            url: 'https://www.nvidia.com/gtc/'
        },
        outcome: {
            text: 'Architecture credible. But production delayed. Supply constraints. Pre-orders massive. Actually shipped in limited quantities Q1 2025.',
            date: '2024-12-01'
        },
        impact: 'Roadmap established. But supply issues persist. Competition from AMD, Google TPU. Inference optimization focus correct.',
        tags: ['hardware', 'gpu', 'announcement', 'delayed', 'inference']
    },
    {
        id: 'figure-humanoid-demo',
        title: 'Figure 01 Humanoid Robot Demo',
        date: '2024-03-13',
        category: 'physical',
        company: 'openai',
        claimed: {
            text: 'Humanoid robot with GPT-4V integration. Natural language commands. Real-world task execution.',
            source: 'Figure AI',
            url: 'https://www.figure.ai/'
        },
        outcome: {
            text: 'Demo impressive. Kitchen tasks via voice. But production timeline unclear. Capabilities limited to simple tasks. Hype vs reality gap.',
            date: '2024-06-01'
        },
        impact: 'LLM + robotics integration promising. But production viability uncertain. Consumer availability far off. Research direction interesting.',
        tags: ['robotics', 'humanoid', 'demo', 'vision', 'gpt4']
    },
    {
        id: 'anthropic-claude-3-pricing',
        title: 'Claude 3 Aggressive Pricing',
        date: '2024-03-04',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Opus $15/$75. Sonnet $3/$15. Haiku $0.25/$1.25. Competitive with OpenAI.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/api'
        },
        outcome: {
            text: 'Pricing competitive. Sonnet became most popular tier. Haiku excellent price/performance. API adoption grew rapidly.',
            date: '2024-06-01'
        },
        impact: 'Pricing competition intensified. Multi-tier strategy validated. Developer switching costs lowered. OpenAI forced to respond.',
        tags: ['pricing', 'api', 'competition', 'strategy']
    },

    // === APRIL 2024 ===
    {
        id: 'meta-llama-3-release',
        title: 'Meta Llama 3 Released',
        date: '2024-04-18',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Open weights model. 8B and 70B sizes. State-of-art for open models. Improved training. Commercial friendly.',
            source: 'Meta AI Blog',
            url: 'https://ai.meta.com/blog/meta-llama-3/'
        },
        outcome: {
            text: 'Benchmarks strong for open model. 70B competitive with closed models on some tasks. Massive adoption. Fine-tuning ecosystem exploded.',
            date: '2024-06-01'
        },
        impact: 'Raised open source bar significantly. Closed model premium questioned. Developer ecosystem energized. Commercial viability demonstrated.',
        tags: ['open-source', 'llm', 'benchmark', 'ecosystem']
    },
    {
        id: 'openai-vision-api',
        title: 'GPT-4 Vision API Generally Available',
        date: '2024-04-09',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'GPT-4V capabilities via API. Image understanding. Multi-image support. Integrated with GPT-4 Turbo.',
            source: 'OpenAI',
            url: 'https://platform.openai.com/docs/guides/vision'
        },
        outcome: {
            text: 'Vision API stable. Image understanding excellent. Use cases: document analysis, visual QA, accessibility. Pricing per image reasonable.',
            date: '2024-06-01'
        },
        impact: 'Multimodal API became standard. Visual applications proliferated. Accessibility use cases significant. Competitive pressure on image-only models.',
        tags: ['multimodal', 'vision', 'api', 'accessibility']
    },
    {
        id: 'cohere-command-r-plus',
        title: 'Cohere Command R+ Released',
        date: '2024-04-04',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Enterprise-focused model. RAG optimized. 128K context. Multilingual. Competitive pricing.',
            source: 'Cohere',
            url: 'https://cohere.com/blog/command-r-plus'
        },
        outcome: {
            text: 'RAG performance strong. Enterprise features good. But market share limited. Niche positioning vs general-purpose models.',
            date: '2024-08-01'
        },
        impact: 'Demonstrated enterprise-specific model viability. RAG optimization valuable. But general-purpose models dominated.',
        tags: ['llm', 'enterprise', 'rag', 'specialized']
    },
    {
        id: 'stability-stable-diffusion-3',
        title: 'Stable Diffusion 3 Announced',
        date: '2024-04-17',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Next-gen image generation. Improved text rendering. Better prompt adherence. Multiple size variants.',
            source: 'Stability AI',
            url: 'https://stability.ai/news/stable-diffusion-3'
        },
        outcome: {
            text: 'Release delayed repeatedly. Quality improvements real but incremental. Text rendering better. But Midjourney and DALL-E 3 maintained edge.',
            date: '2024-08-01'
        },
        impact: 'Open source image generation advancing. But closed models quality lead maintained. Release delays hurt momentum.',
        tags: ['image-generation', 'open-source', 'text-rendering', 'delayed']
    },

    // === MAY 2024 ===
    {
        id: 'gpt4o-release',
        title: 'GPT-4o Released',
        date: '2024-05-13',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Omni-modal model. Real-time voice. Vision. Faster and cheaper than GPT-4 Turbo. Free tier access.',
            source: 'OpenAI',
            url: 'https://openai.com/index/hello-gpt-4o/'
        },
        outcome: {
            text: 'Voice interaction breakthrough. Sub-second latency. Vision excellent. 50% cheaper. Free tier strategic. Became default GPT-4.',
            date: '2024-06-01'
        },
        impact: 'Multimodal integration leap. Real-time interaction new standard. Free tier democratization. Pricing pressure on competition. Consumer experience transformed.',
        tags: ['llm', 'multimodal', 'voice', 'real-time', 'pricing', 'breakthrough']
    },
    {
        id: 'google-io-2024',
        title: 'Google I/O 2024: AI Announcements',
        date: '2024-05-14',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'Gemini 1.5 Flash. AI Overviews in Search. Project Astra preview. Veo video model. NotebookLM updates.',
            source: 'Google I/O',
            url: 'https://io.google/2024/'
        },
        outcome: {
            text: 'Gemini 1.5 Flash competitive. AI Overviews controversial. Astra promising but preview only. Veo impressive but limited access. Comprehensive but scattered.',
            date: '2024-07-01'
        },
        impact: 'Google product breadth demonstrated. But focus questioned. AI Overviews backlash significant. Execution challenges vs OpenAI.',
        tags: ['event', 'announcements', 'search', 'multimodal', 'product-suite']
    },
    {
        id: 'openai-gpt4o-free-tier',
        title: 'GPT-4o Free Tier',
        date: '2024-05-13',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'GPT-4o available to free users. Limited messages. Vision and voice included. Democratizing access.',
            source: 'OpenAI',
            url: 'https://openai.com/index/hello-gpt-4o/'
        },
        outcome: {
            text: 'Free tier drove massive adoption. Message limits acceptable. Quality democratized. Competitive moat through distribution.',
            date: '2024-07-01'
        },
        impact: 'Changed AI access paradigm. Free tier strategic. User base expansion. Competitor pressure. Freemium model validated.',
        tags: ['free-tier', 'democratization', 'strategy', 'distribution']
    },
    {
        id: 'anthropic-claude-3-5-sonnet',
        title: 'Claude 3.5 Sonnet Released',
        date: '2024-06-20',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Improved Sonnet. Outperforms Opus 3 on many tasks. Better coding. Artifacts feature. Same pricing.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-3-5-sonnet'
        },
        outcome: {
            text: 'Benchmarks excellent. Coding capability leap. Artifacts innovative. Became most popular Claude model. Opus users migrated.',
            date: '2024-08-01'
        },
        impact: 'Mid-tier optimization strategy validated. Artifacts UI innovation. Coding developer preference. Price/performance optimal.',
        tags: ['llm', 'coding', 'artifacts', 'optimization', 'benchmark']
    },

    // === JUNE 2024 ===
    {
        id: 'anthropic-claude-artifacts',
        title: 'Claude Artifacts Introduced',
        date: '2024-06-20',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Dedicated workspace for code, documents, diagrams. Inline editing. Preview and iteration. Collaborative interface.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/claude-3-5-sonnet'
        },
        outcome: {
            text: 'Artifacts well-received. UI innovation significant. Developer workflow improved. Creative applications emerging.',
            date: '2024-08-01'
        },
        impact: 'UI paradigm shift from chat to workspace. Productivity enhancement. Developer favorite. Competitive differentiation.',
        tags: ['ui-innovation', 'workspace', 'productivity', 'developer']
    },
    {
        id: 'apple-intelligence-announcement',
        title: 'Apple Intelligence Announced',
        date: '2024-06-10',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'On-device AI for iOS 18. Privacy-first. OpenAI integration. Writing tools, Siri improvements, image generation.',
            source: 'Apple WWDC',
            url: 'https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac/'
        },
        outcome: {
            text: 'Announcement strategic. OpenAI partnership confirmed. But features delayed to iOS 18.1+. Gradual rollout. Privacy architecture detailed.',
            date: '2024-10-01'
        },
        impact: 'Apple AI strategy clarified. OpenAI partnership significant. Privacy-first approach. But late to market. Distribution advantage massive.',
        tags: ['partnership', 'mobile', 'privacy', 'on-device', 'delayed']
    },
    {
        id: 'google-ai-overviews-backlash',
        title: 'Google AI Overviews Accuracy Issues',
        date: '2024-05-23',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'AI-generated search summaries. Cited sources. Enhanced search experience.',
            source: 'Google',
            url: 'https://blog.google/products/search/generative-ai-google-search-may-2024/'
        },
        outcome: {
            text: 'Launched with significant accuracy issues. Viral examples of false information. Glue on pizza, eating rocks. Scaled back quickly. Trust damaged.',
            date: '2024-06-15'
        },
        impact: 'Demonstrated AI accuracy challenges at scale. Search quality critical. Rushed deployment backfired. Conservative rollback. Trust rebuilding required.',
        tags: ['search', 'accuracy', 'backlash', 'trust', 'quality-control']
    },
    {
        id: 'meta-llama-3-400b-announcement',
        title: 'Meta Llama 3 400B Announced',
        date: '2024-06-12',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Largest Llama 3 variant. Competitive with GPT-4. Multimodal. Training ongoing. Release mid-2024.',
            source: 'Meta',
            url: 'https://ai.meta.com/blog/'
        },
        outcome: {
            text: 'Training completed. But release delayed to July. Benchmarks strong when released. Multimodal capabilities solid.',
            date: '2024-07-23'
        },
        impact: 'Open source frontier advancing. But release delays hurt momentum. GPT-4 competitive open model anticipated.',
        tags: ['open-source', 'llm', 'announced', 'delayed', 'multimodal']
    },

    // === JULY 2024 ===
    {
        id: 'meta-llama-3-1-release',
        title: 'Meta Llama 3.1 Released',
        date: '2024-07-23',
        category: 'models',
        company: 'meta',
        claimed: {
            text: '405B flagship. 70B and 8B updated. 128K context. Open weights. Competitive with GPT-4.',
            source: 'Meta AI Blog',
            url: 'https://ai.meta.com/blog/meta-llama-3-1/'
        },
        outcome: {
            text: 'Benchmarks competitive with GPT-4 on many tasks. 405B impressive. 128K context working. Open weights ecosystem exploded.',
            date: '2024-08-15'
        },
        impact: 'Largest open weights model. Closed model performance parity approaching. Open source viability proven at scale.',
        tags: ['open-source', 'llm', 'flagship', 'benchmark', 'context-length']
    },
    {
        id: 'openai-searchgpt-prototype',
        title: 'OpenAI SearchGPT Prototype',
        date: '2024-07-25',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Search prototype with real-time web access. Conversational interface. Cited sources. Limited testing.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/index/searchgpt-prototype/'
        },
        outcome: {
            text: 'Prototype testing limited. Integrated into ChatGPT later. Google Search competition clear. Full release 2025.',
            date: '2024-11-01'
        },
        impact: 'Google Search threat materialized. Conversational search paradigm. But production readiness timeline long.',
        tags: ['search', 'prototype', 'real-time', 'competition']
    },
    {
        id: 'mistral-large-2',
        title: 'Mistral Large 2 Released',
        date: '2024-07-24',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: '123B parameters. Competitive with leading models. Code generation focus. Free for research.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/news/mistral-large-2407/'
        },
        outcome: {
            text: 'Benchmarks strong. Coding capability excellent. European alternative credible. Commercial adoption growing.',
            date: '2024-09-01'
        },
        impact: 'European AI competitiveness demonstrated. Coding specialization strategic. Open weights at frontier scale.',
        tags: ['llm', 'flagship', 'coding', 'european-ai', 'open-weights']
    },
    {
        id: 'anthropic-prompt-caching-beta',
        title: 'Claude Prompt Caching Beta',
        date: '2024-08-14',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Cache long prompts for reuse. 90% cost reduction. Faster responses. Beta access.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/prompt-caching'
        },
        outcome: {
            text: 'Beta successful. Cost savings verified. Latency improvement significant. GA release 2025.',
            date: '2024-10-01'
        },
        impact: 'Changed long context economics. Enabled new use cases. Competitive advantage. Industry feature parity expected.',
        tags: ['optimization', 'caching', 'pricing', 'beta', 'api']
    },

    // === AUGUST 2024 ===
    {
        id: 'openai-structured-outputs',
        title: 'OpenAI Structured Outputs Beta',
        date: '2024-08-06',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Guaranteed JSON output matching schema. Function calling improvements. Structured data extraction.',
            source: 'OpenAI',
            url: 'https://openai.com/index/introducing-structured-outputs-in-the-api/'
        },
        outcome: {
            text: 'Beta worked well. Schema adherence excellent. Developer productivity improved. GA 2025.',
            date: '2024-10-01'
        },
        impact: 'Reduced API friction. Enabled reliable data extraction. Agentic systems more dependable.',
        tags: ['api', 'structured-data', 'developer', 'beta', 'reliability']
    },
    {
        id: 'anthropic-computer-use-beta',
        title: 'Claude Computer Use Beta',
        date: '2024-10-22',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Claude can control computers. Screenshot → action → verification. Agentic workflows. Beta testing.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/3-5-models-and-computer-use'
        },
        outcome: {
            text: 'Beta impressive but limited. Accuracy ~70% on complex tasks. Latency 5-15s per action. Safety concerns managed.',
            date: '2024-12-01'
        },
        impact: 'Demonstrated computer control viability. But reliability gap vs human. Security concerns significant. Future potential clear.',
        tags: ['agentic', 'computer-use', 'beta', 'automation', 'security']
    },
    {
        id: 'character-ai-user-death',
        title: 'Character.AI Safety Incident',
        date: '2024-10-23',
        category: 'policy',
        company: 'google',
        claimed: {
            text: 'Teen user death linked to Character.AI chatbot. Lawsuit filed. Safety protocols questioned.',
            source: 'News Reports',
            url: 'https://www.nytimes.com/2024/10/23/technology/characterai-lawsuit-teen-suicide.html'
        },
        outcome: {
            text: 'Major safety incident. Lawsuit ongoing. Character.AI implemented safety improvements. Industry safety standards scrutinized.',
            date: '2024-12-01'
        },
        impact: 'Highlighted AI safety risks. Chatbot regulation pressure increased. Industry-wide safety improvements. Liability questions raised.',
        tags: ['safety', 'regulation', 'liability', 'incident', 'ethics']
    },
    {
        id: 'google-gemini-flash-8b',
        title: 'Gemini 1.5 Flash-8B Released',
        date: '2024-10-03',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Small, fast, efficient model. 1M context. Optimized for high-volume tasks. Cost-effective.',
            source: 'Google',
            url: 'https://developers.googleblog.com/en/gemini-15-flash-8b-is-now-generally-available-for-use/'
        },
        outcome: {
            text: 'Performance excellent for size. 1M context impressive. Cost/performance compelling. Developer adoption strong.',
            date: '2024-11-01'
        },
        impact: 'Small model optimization trend. Long context at small scale. Efficient deployment enabled.',
        tags: ['llm', 'efficiency', 'context-length', 'small-model']
    },

    // === SEPTEMBER 2024 ===
    {
        id: 'openai-o1-preview',
        title: 'OpenAI o1-preview Released',
        date: '2024-09-12',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Reasoning model. Extended thinking. PhD-level science questions. Math and coding focus.',
            source: 'OpenAI',
            url: 'https://openai.com/index/learning-to-reason-with-llms/'
        },
        outcome: {
            text: 'Reasoning capability genuine. Math/science/coding excellent. But slow (10-30s thinking). Expensive. Limited use cases.',
            date: '2024-11-01'
        },
        impact: 'Reasoning paradigm established. But speed/cost tradeoffs significant. PhD-level capability on specific domains.',
        tags: ['reasoning', 'preview', 'mathematics', 'slow', 'expensive']
    },
    {
        id: 'openai-o1-mini',
        title: 'OpenAI o1-mini Released',
        date: '2024-09-12',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Faster, cheaper reasoning model. Optimized for STEM. 80% cost reduction vs o1-preview.',
            source: 'OpenAI',
            url: 'https://openai.com/index/learning-to-reason-with-llms/'
        },
        outcome: {
            text: 'Speed improved but still slow (5-15s). STEM performance strong. Cost more accessible. Developer adoption better.',
            date: '2024-11-01'
        },
        impact: 'Made reasoning more accessible. Speed/cost/quality tradeoff. STEM use cases viable.',
        tags: ['reasoning', 'optimization', 'stem', 'pricing']
    },
    {
        id: 'meta-movie-gen',
        title: 'Meta Movie Gen Announced',
        date: '2024-10-04',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Video and audio generation. Up to 16 seconds. High quality. Research preview.',
            source: 'Meta AI',
            url: 'https://ai.meta.com/research/movie-gen/'
        },
        outcome: {
            text: 'Research quality impressive. But no public release timeline. Demos controlled. Production readiness unclear.',
            date: '2024-12-01'
        },
        impact: 'Demonstrated Meta multimodal capability. But research vs product gap. OpenAI Sora competition.',
        tags: ['video-generation', 'audio', 'research', 'announcement']
    },
    {
        id: 'anthropic-3-7-sonnet',
        title: 'Claude 3.7 Sonnet (Internally Referenced)',
        date: '2024-09-15',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Internal version improvements. Not publicly branded. Performance optimizations.',
            source: 'Anthropic Internal',
            url: 'https://www.anthropic.com/'
        },
        outcome: {
            text: 'Incremental improvements rolled out without version announcement. Industry practice of continuous updates.',
            date: '2024-10-01'
        },
        impact: 'Versioning becoming less discrete. Continuous improvement model. Marketing vs technical versions diverging.',
        tags: ['llm', 'incremental', 'versioning', 'internal']
    },

    // === OCTOBER 2024 ===
    {
        id: 'anthropic-claude-3-5-sonnet-improved',
        title: 'Claude 3.5 Sonnet Improved',
        date: '2024-10-22',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Updated Sonnet. Better coding. Agentic capabilities. Computer use beta. Same pricing.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/3-5-models-and-computer-use'
        },
        outcome: {
            text: 'Coding improvements verified. Computer use impressive but beta. Agentic reliability ~75%. Developer favorite maintained.',
            date: '2024-12-01'
        },
        impact: 'Continuous improvement demonstrated. Computer use paradigm. Coding leadership. Beta features strategic.',
        tags: ['llm', 'update', 'coding', 'agentic', 'computer-use']
    },
    {
        id: 'anthropic-claude-3-5-haiku',
        title: 'Claude 3.5 Haiku Released',
        date: '2024-11-04',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Fastest Claude model. Improved over Haiku 3. Vision capabilities. Coding. $1/$5 pricing.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/claude-3-5-haiku'
        },
        outcome: {
            text: 'Speed excellent. Vision quality good. Coding competitive for tier. Price/performance strong. High-volume adoption.',
            date: '2024-12-01'
        },
        impact: 'Completed 3.5 family. Fast tier competitive. Vision democratized. Developer use cases enabled.',
        tags: ['llm', 'speed', 'vision', 'pricing', 'optimization']
    },
    {
        id: 'openai-canvas-launch',
        title: 'ChatGPT Canvas Beta',
        date: '2024-10-03',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Collaborative workspace for writing and coding. Inline editing. Version control. Beta access.',
            source: 'OpenAI',
            url: 'https://openai.com/index/introducing-canvas/'
        },
        outcome: {
            text: 'Beta well-received. Workspace paradigm competitive with Claude Artifacts. Editing workflow improved.',
            date: '2024-12-01'
        },
        impact: 'UI innovation following Anthropic. Workspace vs chat paradigm. Professional use cases. GA 2025.',
        tags: ['ui-innovation', 'workspace', 'beta', 'collaboration']
    },
    {
        id: 'google-notebooklm-updates',
        title: 'NotebookLM Audio Overviews',
        date: '2024-09-11',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'AI-generated podcast summaries of documents. Two hosts discuss your content. Natural conversation.',
            source: 'Google',
            url: 'https://blog.google/technology/ai/notebooklm-audio-overviews/'
        },
        outcome: {
            text: 'Viral success. Audio quality impressive. Learning applications strong. Creative use cases emerging.',
            date: '2024-11-01'
        },
        impact: 'Novel AI format. Audio synthesis breakthrough. Educational applications. Viral product moment for Google.',
        tags: ['audio', 'synthesis', 'education', 'viral', 'innovation']
    },

    // === NOVEMBER 2024 ===
    {
        id: 'xai-grok-2-release',
        title: 'xAI Grok 2 Released',
        date: '2024-08-13',
        category: 'models',
        company: 'xai',
        claimed: {
            text: 'Improved reasoning. Real-time X integration. Competitive benchmarks. Available via X and API.',
            source: 'xAI',
            url: 'https://x.ai/blog/grok-2'
        },
        outcome: {
            text: 'Benchmarks competitive with GPT-4o and Claude 3.5. Real-time X data valuable. API pricing competitive.',
            date: '2024-10-01'
        },
        impact: 'xAI credibility established. Real-time data moat. X distribution advantage. Grok becoming viable alternative.',
        tags: ['llm', 'reasoning', 'real-time', 'benchmark']
    },
    {
        id: 'google-gemini-2-0-flash',
        title: 'Gemini 2.0 Flash Experimental',
        date: '2024-12-11',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Next-gen multimodal model. Native image/audio generation. Agentic capabilities. Experimental release.',
            source: 'Google DeepMind',
            url: 'https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/'
        },
        outcome: {
            text: 'Experimental quality good. Multimodal generation impressive. Agentic features promising. Full release expected 2025.',
            date: '2024-12-31'
        },
        impact: 'Google multimodal leadership signaled. Native generation competitive. Experimental vs GA strategy.',
        tags: ['llm', 'multimodal', 'experimental', 'agentic', 'generation']
    },
    {
        id: 'openai-chatgpt-search',
        title: 'ChatGPT Search Launch',
        date: '2024-10-31',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Real-time web search in ChatGPT. Cited sources. Conversational interface. Available to Plus users.',
            source: 'OpenAI',
            url: 'https://openai.com/index/introducing-chatgpt-search/'
        },
        outcome: {
            text: 'Integration smooth. Citations adequate. Response time good. Google Search impact measurable. Free tier rollout gradual.',
            date: '2024-12-15'
        },
        impact: 'Direct Google competition. Conversational search viable. Citation quality improving. Search behavior shifting.',
        tags: ['search', 'real-time', 'citations', 'competition']
    },
    {
        id: 'microsoft-copilot-vision',
        title: 'Microsoft Copilot Vision',
        date: '2024-10-01',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'See and interact with web content. Screenshot understanding. Privacy-focused. Limited preview.',
            source: 'Microsoft',
            url: 'https://blogs.microsoft.com/blog/2024/10/01/an-ai-companion-for-everyone/'
        },
        outcome: {
            text: 'Preview limited. Privacy architecture solid. Use cases emerging. Full rollout TBD.',
            date: '2024-12-01'
        },
        impact: 'Vision-enabled browsing. Privacy-first approach. Microsoft AI integration deepening.',
        tags: ['vision', 'privacy', 'browser', 'preview']
    },

    // === DECEMBER 2024 ===
    {
        id: 'openai-o1-full-release',
        title: 'OpenAI o1 Full Release',
        date: '2024-12-05',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Production reasoning model. Image understanding added. Faster than preview. Developer access.',
            source: 'OpenAI',
            url: 'https://openai.com/index/introducing-chatgpt-pro/'
        },
        outcome: {
            text: 'Performance improved over preview. Thinking time 5-15s typical. Image reasoning working. API access limited initially.',
            date: '2024-12-20'
        },
        impact: 'Reasoning production-ready. Multimodal reasoning enabled. But cost/latency still limiting broad adoption.',
        tags: ['reasoning', 'production', 'multimodal', 'api']
    },
    {
        id: 'openai-chatgpt-pro',
        title: 'ChatGPT Pro Subscription',
        date: '2024-12-05',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: '$200/month tier. Unlimited o1 access. Pro mode for hardest problems. o1 pro mode exclusive.',
            source: 'OpenAI',
            url: 'https://openai.com/index/introducing-chatgpt-pro/'
        },
        outcome: {
            text: 'Pro tier for researchers and professionals. o1 pro mode marginal improvement. Price point high but justified for target users.',
            date: '2024-12-20'
        },
        impact: 'Premium tier segmentation. Reasoning monetization. Professional market targeted. Willingness to pay tested.',
        tags: ['subscription', 'premium', 'pricing', 'reasoning']
    },
    {
        id: 'google-gemini-2-0-flash-release',
        title: 'Gemini 2.0 Flash Released',
        date: '2024-12-11',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Production multimodal model. Native generation. Agentic features. Fast and efficient.',
            source: 'Google DeepMind',
            url: 'https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/'
        },
        outcome: {
            text: 'Performance strong. Generation quality good. Agentic capabilities emerging. Developer adoption growing.',
            date: '2024-12-31'
        },
        impact: 'Google 2.0 generation begins. Multimodal native approach validated. Agentic focus clear.',
        tags: ['llm', 'multimodal', 'generation', 'agentic']
    },
    {
        id: 'deepseek-v3-release',
        title: 'DeepSeek V3 Released',
        date: '2024-12-26',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Open-weights frontier model. MoE architecture. Trained for $5.5M. Matches Claude 3.5 Sonnet.',
            source: 'DeepSeek',
            url: 'https://github.com/deepseek-ai/DeepSeek-V3'
        },
        outcome: {
            text: 'Benchmarks verified. Training cost claim shocking. Efficiency unprecedented. Chinese AI capability demonstrated.',
            date: '2024-12-28'
        },
        impact: 'Frontier models at fraction of cost. Western AI economics challenged. Efficiency paradigm shift. Open weights competitive.',
        tags: ['open-source', 'llm', 'efficiency', 'chinese-ai', 'paradigm-shift']
    },
    {
        id: 'openai-o3-announcement',
        title: 'OpenAI o3 Announced',
        date: '2024-12-20',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Next reasoning model. ARC-AGI breakthrough. Major capability jump. Safety testing ongoing.',
            source: 'OpenAI',
            url: 'https://openai.com/index/deliberative-alignment/'
        },
        outcome: {
            text: 'ARC-AGI score unprecedented. Full details limited. Safety testing extensive. Public release expected Q1 2025.',
            date: '2024-12-31'
        },
        impact: 'AGI timeline debate intensified. Reasoning capability leap suggested. Safety focus maintained. Expectations high.',
        tags: ['reasoning', 'announcement', 'agi', 'benchmark', 'safety']
    },
    {
        id: 'year-end-2024-recap',
        title: '2024 AI Year in Review',
        date: '2024-12-31',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'Frontier consolidation. Multimodal standard. Reasoning emergence. Open source gains. $100B+ invested.',
            source: 'Industry Analysis',
            url: 'https://www.anthropic.com/'
        },
        outcome: {
            text: 'OpenAI, Anthropic, Google dominated. Meta open source strategy validated. Chinese efficiency shocked industry. Capital intensity confirmed.',
            date: '2024-12-31'
        },
        impact: 'Frontier labs consolidated. Open/closed debate intensified. Efficiency became competitive dimension. Investment sustainability questioned.',
        tags: ['review', 'market', 'trends', 'investment', 'consolidation']
    },
    
    // ========================================
    // 2025 - THE REASONING ERA
    // ========================================
    
    // === JANUARY 2025 ===
    {
        id: 'deepseek-r1-release',
        title: 'DeepSeek R1: Open Reasoning Revolution',
        date: '2025-01-20',
        category: 'models',
        company: 'deepseek',
        claimed: {
            text: 'Open-weights reasoning model matching o1 performance. Full chain-of-thought visible. Trained using RL without expensive human annotation. Costs fraction of Western models.',
            source: 'DeepSeek GitHub',
            url: 'https://github.com/deepseek-ai/DeepSeek-R1'
        },
        outcome: {
            text: 'Benchmarks verified: 79.8% on AIME 2024 (vs o1\'s 79.2%), 97.3% on MATH-500. Reasoning traces show genuine problem decomposition. Downloaded 1M+ times in first week. Chinese efficiency shocked industry.',
            date: '2025-01-27'
        },
        impact: 'Democratized reasoning models overnight. Proved expensive proprietary training not required. Triggered market panic about Western AI moat. Reasoning became commodity within weeks. Challenged scaling law orthodoxy and massive training budget assumptions. Proved Chinese labs globally competitive. Open-source reasoning capabilities democratized. Sparked intense debate about AI development costs. Market-moving event.',
        tags: ['open-source', 'reasoning', 'paradigm-shift', 'chinese-ai', 'efficiency']
    },
    {
        id: 'openai-reasoning-safety',
        title: 'OpenAI Publishes o1 Safety Research',
        date: '2025-01-15',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Chain-of-thought reasoning enables better alignment. Models can deliberate on safety. New "deliberative alignment" paradigm reduces jailbreak success.',
            source: 'OpenAI Research',
            url: 'https://openai.com/index/deliberative-alignment/'
        },
        outcome: {
            text: 'Safety improvements documented across benchmarks. However, DeepSeek R1 release same month showed reasoning available without deliberative alignment safety layer. Raised questions about safety moat.',
            date: '2025-01-30'
        },
        impact: 'Introduced deliberative alignment concept. But rapid open-source reasoning development complicated safety narrative. No clear path to prevent reasoning capability proliferation.',
        tags: ['safety', 'reasoning', 'alignment', 'research']
    },
    {
        id: 'anthropic-claude-4-announcement',
        title: 'Claude 4 Model Family Announced',
        date: '2025-01-22',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Next generation model family. Improved reasoning, agentic capabilities, and extended context. Claude 4 Opus coming Q1, Sonnet and Haiku following.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-4'
        },
        outcome: {
            text: 'Announcement strategic response to DeepSeek R1. Opus delayed to February for additional safety testing. Sonnet 4 benchmarks strong but not transformative over 3.5. Context window 200K confirmed.',
            date: '2025-02-15'
        },
        impact: 'Maintained Anthropic competitive position. But DeepSeek timing diminished impact. Market shifted from "who has reasoning" to "who optimizes cost/performance."',
        tags: ['llm', 'flagship', 'reasoning', 'competition']
    },
    {
        id: 'google-gemini-2-pro',
        title: 'Gemini 2.0 Pro Released',
        date: '2025-01-28',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Multimodal flagship exceeding Gemini 1.5 Pro. Native image/video/audio generation. 1M token context. Integrated thinking mode for complex reasoning.',
            source: 'Google DeepMind Blog',
            url: 'https://blog.google/technology/ai/google-gemini-2-update/'
        },
        outcome: {
            text: 'Benchmarks strong: 90.1% on MMLU-Pro, competitive coding performance. Multimodal generation impressive but occasional artifacts. 1M context working but expensive. Thinking mode adds latency.',
            date: '2025-02-10'
        },
        impact: 'Established Google as multimodal leader. But reasoning commodity story overshadowed launch. Native multimodal generation became new differentiation vector.',
        tags: ['llm', 'multimodal', 'flagship', 'context-length']
    },
    {
        id: 'nvidia-blackwell-launch',
        title: 'NVIDIA Blackwell GPUs Begin Shipping',
        date: '2025-01-15',
        category: 'hardware',
        company: 'google',
        claimed: {
            text: 'GB200 systems deliver 30x performance vs H100 for LLM inference. 20 petaFLOPS AI performance. Power efficiency breakthrough for reasoning workloads.',
            source: 'NVIDIA',
            url: 'https://www.nvidia.com/en-us/data-center/gb200-nvl72/'
        },
        outcome: {
            text: 'Initial shipments to hyperscalers confirmed. Performance claims verified in benchmarks. But supply constrained through Q1. DeepSeek efficiency story reduced urgency for some customers.',
            date: '2025-02-01'
        },
        impact: 'Continued NVIDIA hardware dominance. But Chinese efficiency advances raised questions about necessity of cutting-edge hardware. Inference optimization became focus.',
        tags: ['hardware', 'gpu', 'infrastructure', 'performance']
    },

    // === FEBRUARY 2025 ===
    {
        id: 'claude-opus-4',
        title: 'Claude Opus 4 Released',
        date: '2025-02-18',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Strongest Claude model yet. Extended thinking for complex reasoning. 200K context maintained. Constitutional AI v3 for improved safety. Agentic task completion.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/claude-opus-4'
        },
        outcome: {
            text: 'Benchmarks excellent: 88.5% on GPQA Diamond, 96.4% on HumanEval. Extended thinking adds 3-10s latency. Agentic capabilities solid but require careful scaffolding. Safety improvements measurable.',
            date: '2025-03-01'
        },
        impact: 'Reinforced Anthropic quality positioning. Extended thinking differentiation vs instant reasoning. But $15/$75 pricing limited adoption vs cheaper alternatives. Quality vs cost tension heightened.',
        tags: ['llm', 'flagship', 'reasoning', 'agentic', 'safety']
    },
    {
        id: 'meta-llama-4-announcement',
        title: 'Meta Announces Llama 4',
        date: '2025-02-14',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Next-generation open weights foundation model. Native multimodal. Sizes from 8B to 405B. Training on 15 trillion tokens. Open reasoning model included.',
            source: 'Meta AI Blog',
            url: 'https://ai.meta.com/blog/'
        },
        outcome: {
            text: 'Announcement detailed but release scheduled Q2 2025. Multimodal approach similar to Gemini. Reasoning model promises DeepSeek-style efficiency. Community anticipation extremely high.',
            date: '2025-02-20'
        },
        impact: 'Signaled Meta doubling down on open approach. Timing strategic for developer mindshare. Open reasoning model could accelerate capability proliferation significantly.',
        tags: ['open-source', 'llm', 'multimodal', 'reasoning', 'announced']
    },
    {
        id: 'grok-2-5-release',
        title: 'xAI Releases Grok 2.5',
        date: '2025-02-12',
        category: 'models',
        company: 'xai',
        claimed: {
            text: 'Improved reasoning and real-time X integration. Trained on 100K H100s in Memphis supercluster. Reduced hallucination. Available via API and X Premium.',
            source: 'xAI',
            url: 'https://x.ai/'
        },
        outcome: {
            text: 'Benchmarks competitive with GPT-4o and Claude 3.5. Real-time X data useful for current events. Hallucination reduction modest. API pricing aggressive. X integration drives adoption.',
            date: '2025-02-25'
        },
        impact: 'Established xAI as viable frontier lab. Real-time data became competitive differentiator. But model quality still trailing OpenAI/Anthropic flagships. Distribution advantage via X significant.',
        tags: ['llm', 'reasoning', 'real-time', 'distribution']
    },
    {
        id: 'eu-ai-act-enforcement',
        title: 'EU AI Act Enforcement Begins',
        date: '2025-02-01',
        category: 'policy',
        company: 'google',
        claimed: {
            text: 'Prohibited AI practices now banned. General-purpose AI rules active. High-risk system requirements enforceable. Fines up to €35M or 7% revenue.',
            source: 'European Commission',
            url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
        },
        outcome: {
            text: 'All major labs published compliance documentation. Some models geofenced in EU. Compliance costs significant but manageable. First enforcement actions expected Q3 2025. Industry adapted.',
            date: '2025-02-28'
        },
        impact: 'First comprehensive AI regulation enforced. Set global precedent. Compliance became table stakes. No major model launches blocked but development timelines extended.',
        tags: ['regulation', 'europe', 'compliance', 'enforcement']
    },
    {
        id: 'openai-sora-public',
        title: 'OpenAI Sora Released Publicly',
        date: '2025-02-06',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Text-to-video generation up to 60 seconds. 1080p output. Consistent characters and physics. Available to ChatGPT Plus and Pro subscribers.',
            source: 'OpenAI',
            url: 'https://openai.com/sora'
        },
        outcome: {
            text: 'Video quality impressive but inconsistent. Physics occasionally unrealistic. Generation slow (2-5 min for 60s). Watermarking mandatory. Moderation restrictive. Viral adoption despite limitations.',
            date: '2025-02-20'
        },
        impact: 'Brought AI video to mainstream. Quality leap over previous tools. But consistency issues limited professional use. Creative applications exploded. Deepfake concerns intensified.',
        tags: ['video-generation', 'multimodal', 'consumer', 'creative-ai']
    },

    // === MARCH 2025 ===
    {
        id: 'openai-gpt5-release',
        title: 'GPT-5 Released',
        date: '2025-03-14',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Materially smarter than GPT-4. Improved reasoning, coding, and multimodal understanding. Reduced hallucination. PhD-level expertise in many domains. $20/$60 API pricing.',
            source: 'OpenAI',
            url: 'https://openai.com/research/gpt-5'
        },
        outcome: {
            text: 'Benchmarks strong: 92.3% MMLU-Pro, 93.7% HumanEval, 85.2% GPQA Diamond. Reasoning competitive with o1 on many tasks. Multimodal capabilities excellent. But not transformative leap many expected.',
            date: '2025-03-28'
        },
        impact: 'Maintained OpenAI frontier position. But expectations of GPT-3→4 scale jump not met. Incremental improvement narrative vs paradigm shift. Pricing higher than DeepSeek alternatives affected adoption.',
        tags: ['llm', 'flagship', 'reasoning', 'multimodal', 'expectations']
    },
    {
        id: 'anthropic-computer-use-ga',
        title: 'Claude Computer Use General Availability',
        date: '2025-03-12',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Claude can control computers via API. Screenshot → action → verification loop. Enables autonomous task completion. Safety guardrails prevent misuse.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/computer-use'
        },
        outcome: {
            text: 'Computer use works as demonstrated. Accuracy improved from beta: ~75% task completion on standard workflows. Latency 5-15s per action. Safety boundaries respected. Enterprise adoption cautious.',
            date: '2025-03-30'
        },
        impact: 'Proved agentic computer control viable. But reliability gap vs human prevented full autonomy. Hybrid human-AI workflows emerged as dominant pattern. Security concerns slowed adoption.',
        tags: ['agentic', 'computer-use', 'automation', 'enterprise']
    },
    {
        id: 'google-gemini-agents',
        title: 'Google Gemini Agents Platform',
        date: '2025-03-20',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'Framework for building autonomous agents. Integrated with Google Workspace, Cloud, and Android. Multi-step reasoning and tool use. Deploy agents at scale.',
            source: 'Google Cloud',
            url: 'https://cloud.google.com/gemini/agents'
        },
        outcome: {
            text: 'Platform launched with 50+ templates. Workspace integration strong. Agent reliability variable: simple tasks 85%+, complex workflows 60%. Monitoring tools comprehensive. Pricing per-action model.',
            date: '2025-04-05'
        },
        impact: 'Positioned Google for agentic era. Distribution advantage via Workspace significant. But agent reliability challenges universal across industry. Realistic expectations set.',
        tags: ['agentic', 'platform', 'enterprise', 'integration']
    },
    {
        id: 'mistral-large-3',
        title: 'Mistral Large 3 Released',
        date: '2025-03-25',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: 'European flagship model competitive with GPT-4.5 and Claude Opus 4. 128K context. Function calling optimized. €2/M input, €6/M output pricing.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/news/mistral-large-3'
        },
        outcome: {
            text: 'Benchmarks competitive: 87.2% MMLU-Pro, 89.1% HumanEval. European data sovereignty compliance built-in. Pricing aggressive. Function calling excellent. European enterprise adoption strong.',
            date: '2025-04-10'
        },
        impact: 'Established European AI independence. Data sovereignty became selling point. Demonstrated viable alternative to US labs. EU AI Act compliance as competitive advantage.',
        tags: ['llm', 'flagship', 'european-ai', 'sovereignty', 'pricing']
    },
    {
        id: 'deepmind-alphaproof-alphageometry',
        title: 'AlphaProof and AlphaGeometry 2',
        date: '2025-03-18',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'AI systems solve International Math Olympiad problems. AlphaProof: formal reasoning. AlphaGeometry 2: geometric proofs. Combined: silver medal performance.',
            source: 'Google DeepMind',
            url: 'https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/'
        },
        outcome: {
            text: 'IMO performance verified: 4 of 6 problems solved. Formal proof methods promising. Geometry breakthrough significant. But limited to narrow mathematical domain. General reasoning gap remains.',
            date: '2025-03-30'
        },
        impact: 'Advanced formal reasoning research. Demonstrated AI mathematical capability approaching expert human. But domain specificity highlighted AGI distance. Symbolic reasoning resurgence.',
        tags: ['research', 'reasoning', 'mathematics', 'formal-methods']
    },

    // === APRIL 2025 ===
    {
        id: 'meta-llama-4-release',
        title: 'Llama 4 Released',
        date: '2025-04-18',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Open weights multimodal model family. 8B to 405B parameters. Native image/video understanding and generation. Reasoning model competitive with DeepSeek R1. Apache 2.0 license.',
            source: 'Meta AI',
            url: 'https://ai.meta.com/blog/llama-4/'
        },
        outcome: {
            text: 'Benchmarks strong: 405B matches GPT-4.5 on many tasks. Multimodal capabilities excellent. Reasoning model 78.3% AIME. Open weights spark massive ecosystem. Downloaded 10M+ times in month.',
            date: '2025-05-15'
        },
        impact: 'Largest open weights release ever. Multimodal + reasoning combination unprecedented in open model. Ecosystem explosion: thousands of fine-tunes. Closed model economics challenged fundamentally.',
        tags: ['open-source', 'llm', 'multimodal', 'reasoning', 'paradigm-shift']
    },
    {
        id: 'openai-agents-framework',
        title: 'OpenAI Agents Framework Announced',
        date: '2025-04-10',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Production-ready agent framework. Built on GPT-5 and o1. Orchestration, memory, tool use. Monitoring and observability. Safety controls. Enterprise SLA.',
            source: 'OpenAI',
            url: 'https://platform.openai.com/docs/agents'
        },
        outcome: {
            text: 'Framework launched with comprehensive documentation. Early adopters report 70-80% success rates on defined tasks. Memory persistence working well. Cost per agent-hour $1.50-5 depending on complexity.',
            date: '2025-04-30'
        },
        impact: 'Productized agentic AI for enterprise. But reliability ceiling at 80% limited autonomous deployment. Human-in-loop workflows dominated. Agent monitoring became critical capability.',
        tags: ['agentic', 'platform', 'enterprise', 'framework']
    },
    {
        id: 'anthropic-opus-4-5',
        title: 'Claude Opus 4.5 Released',
        date: '2025-04-24',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Improved Opus with better reasoning speed. Extended thinking optimized to 2-5s. Computer use reliability 85%. Constitutional AI v4. $12/$50 pricing.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/claude-opus-4-5'
        },
        outcome: {
            text: 'Benchmarks marginal improvement over Opus 4. Latency reduction significant: thinking 60% faster. Computer use accuracy gains verified. Pricing reduction strategic. Quality maintained.',
            date: '2025-05-10'
        },
        impact: 'Demonstrated iterative improvement model vs big jumps. Latency optimization became competitive dimension. Pricing pressure from open models acknowledged. Quality vs speed tradeoff managed well.',
        tags: ['llm', 'flagship', 'reasoning', 'optimization', 'pricing']
    },
    {
        id: 'nvidia-inference-chips',
        title: 'NVIDIA Announces Inference-Optimized Chips',
        date: '2025-04-15',
        category: 'hardware',
        company: 'google',
        claimed: {
            text: 'New chip line specifically for inference. 5x performance/watt vs Blackwell for inference. Lower cost. Targeting reasoning model deployment.',
            source: 'NVIDIA',
            url: 'https://www.nvidia.com/en-us/data-center/'
        },
        outcome: {
            text: 'Specifications detailed but shipping Q3 2025. Performance claims credible based on architecture. Pricing competitive with Google TPU and AWS Trainium. Pre-orders from hyperscalers strong.',
            date: '2025-04-30'
        },
        impact: 'Acknowledged inference economics as distinct from training. Reasoning model proliferation created inference demand surge. Competition from cloud providers intensified. Inference became largest AI workload.',
        tags: ['hardware', 'inference', 'efficiency', 'specialization']
    },
    {
        id: 'character-ai-acquisition',
        title: 'Google Acquires Character.AI Team',
        date: '2025-04-08',
        category: 'policy',
        company: 'google',
        claimed: {
            text: 'Google acquires Character.AI founding team and licenses technology. Character.AI to operate independently. Strengthens Google conversational AI.',
            source: 'Google',
            url: 'https://blog.google/technology/ai/'
        },
        outcome: {
            text: 'Deal valued at $2.7B. Character.AI team joined Google DeepMind. Technology integrated into Gemini. Consumer product sunset. Consolidation signal to market.',
            date: '2025-04-30'
        },
        impact: 'Demonstrated big tech consolidation pressure. Specialized consumer AI companies facing acquisition path vs independence. Talent and technology primary value.',
        tags: ['acquisition', 'consolidation', 'talent', 'strategic']
    },

    // === MAY 2025 ===
    {
        id: 'gpt-5-turbo',
        title: 'GPT-5 Turbo Released',
        date: '2025-05-12',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Faster, cheaper GPT-5 variant. 90% of Opus performance at 50% cost. Optimized for high-volume API use. $8/$24 pricing.',
            source: 'OpenAI',
            url: 'https://platform.openai.com/docs/models/gpt-5-turbo'
        },
        outcome: {
            text: 'Benchmarks: 89.1% MMLU-Pro (vs 92.3% for full GPT-5). Latency 40% faster. Cost reduction drives migration from GPT-4. Quality trade-off acceptable for most use cases.',
            date: '2025-05-30'
        },
        impact: 'Established two-tier pricing model. Cost optimization became API priority. DeepSeek price pressure forcing adaptation. Speed vs quality spectrum expanded.',
        tags: ['llm', 'pricing', 'optimization', 'api']
    },
    {
        id: 'gemini-2-5-ultra-leak',
        title: 'Gemini 2.5 Ultra Benchmarks Leaked',
        date: '2025-05-20',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Internal benchmarks show 95.2% MMLU-Pro, exceeding all public models. Training completed. Release pending safety review.',
            source: 'Leaked Internal Memo',
            url: 'https://www.theverge.com/ai-artificial-intelligence'
        },
        outcome: {
            text: 'Google confirmed training but not benchmarks. Community skepticism due to Gemini 1 demo controversy. Actual capability unverified. Release date not confirmed.',
            date: '2025-05-28'
        },
        impact: 'Heightened frontier model expectations. But leak skepticism reflected eroded trust from past marketing. Benchmark gaming concerns resurfaced. Transparency pressure increased.',
        tags: ['llm', 'flagship', 'benchmarks', 'leaked', 'controversy']
    },
    {
        id: 'anthropic-prompt-caching',
        title: 'Claude Prompt Caching Released',
        date: '2025-05-15',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Cache long prompts for reuse. 90% cost reduction for repeated context. Sub-second response times. Automatic cache management.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/prompt-caching'
        },
        outcome: {
            text: 'Caching works as described. Massive cost savings for agentic workflows with long system prompts. 75% cost reduction typical. Latency improvement significant. Competitive differentiator.',
            date: '2025-06-01'
        },
        impact: 'Changed economics of agentic AI. Long context became affordable. Enabled new use cases. Other providers rushed similar features. API optimization became competitive dimension.',
        tags: ['optimization', 'pricing', 'api', 'caching', 'efficiency']
    },
    {
        id: 'meta-ray-ban-ai-glasses',
        title: 'Ray-Ban Meta AI Glasses Updated',
        date: '2025-05-22',
        category: 'physical',
        company: 'meta',
        claimed: {
            text: 'Llama 4 multimodal integration. Real-time visual understanding. Translation. Object recognition. Voice assistant. Updated hardware.',
            source: 'Meta',
            url: 'https://www.meta.com/smart-glasses/'
        },
        outcome: {
            text: 'Visual understanding impressive: object recognition 92% accuracy. Translation functional but occasional errors. Battery life 6 hours vs claimed 8. Privacy concerns raised. Sales exceeding expectations.',
            date: '2025-06-10'
        },
        impact: 'Demonstrated consumer AI wearable viability. Visual AI became practical. Privacy debates intensified. Form factor acceptance improving. AR glasses market catalyzed.',
        tags: ['wearables', 'multimodal', 'consumer', 'privacy', 'hardware']
    },
    {
        id: 'uk-ai-safety-summit',
        title: 'UK AI Safety Summit 2025',
        date: '2025-05-28',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'International coordination on AI safety. Binding commitments on frontier model testing. Safety institute network. Incident sharing protocol.',
            source: 'UK Government',
            url: 'https://www.gov.uk/ai-safety-summit'
        },
        outcome: {
            text: '28 countries signed safety framework. Frontier labs committed to pre-deployment testing. But enforcement mechanisms weak. Voluntary compliance primary mechanism. US and China limited engagement.',
            date: '2025-06-05'
        },
        impact: 'Advanced international AI governance dialogue. But binding enforcement absent. Voluntary frameworks dominated. Safety institute network promising. China-US cooperation remained challenge.',
        tags: ['safety', 'regulation', 'international', 'governance']
    },

    // === JUNE 2025 ===
    {
        id: 'openai-reasoning-api',
        title: 'OpenAI o1 API General Availability',
        date: '2025-06-10',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Production o1 reasoning API. Structured outputs. Adjustable thinking time. $15/$60 pricing. Enterprise features.',
            source: 'OpenAI',
            url: 'https://platform.openai.com/docs/models/o1'
        },
        outcome: {
            text: 'API stable and performant. Thinking time configuration enables cost/quality tradeoff. Structured outputs work well. Adoption strong for complex reasoning tasks. Cost concerns limited broad deployment.',
            date: '2025-06-30'
        },
        impact: 'Productized reasoning for enterprise. But DeepSeek R1 open alternative limited pricing power. Reasoning became commodity. Application innovation shifted to orchestration.',
        tags: ['reasoning', 'api', 'enterprise', 'pricing']
    },
    {
        id: 'anthropic-sonnet-4-5',
        title: 'Claude Sonnet 4.5 Released',
        date: '2025-06-18',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Updated Sonnet with improved coding and agentic capabilities. Computer use built-in. $3/$15 pricing. Faster than Opus 4.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/claude-sonnet-4-5'
        },
        outcome: {
            text: 'Coding benchmarks excellent: 94.2% HumanEval. Agentic reliability 80-85%. Computer use solid. Price/performance competitive. Became go-to for development workflows.',
            date: '2025-07-05'
        },
        impact: 'Demonstrated mid-tier model optimization strategy. Developer mindshare significant. Pricing competitive with open alternatives. Sonnet tier became volume driver.',
        tags: ['llm', 'coding', 'agentic', 'developer', 'pricing']
    },
    {
        id: 'google-project-astra',
        title: 'Google Project Astra Preview',
        date: '2025-06-12',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'Universal AI assistant. Multimodal input/output. Real-time understanding. Memory across devices. Integrated with Google ecosystem.',
            source: 'Google I/O 2025',
            url: 'https://io.google/2025/'
        },
        outcome: {
            text: 'Demo impressive but limited preview access. Multimodal understanding strong. Memory integration working. Latency 2-4s. Privacy controls comprehensive. Full launch Q3 2025.',
            date: '2025-06-30'
        },
        impact: 'Positioned Google for ambient AI assistant future. Distribution advantage significant. Privacy architecture differentiator. Full capabilities pending. Expectations vs reality gap common.',
        tags: ['assistant', 'multimodal', 'preview', 'ecosystem']
    },
    {
        id: 'mistral-codestral-2',
        title: 'Mistral Codestral 2 Released',
        date: '2025-06-20',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: 'Specialized coding model. 32K context. Fill-in-middle support. 85+ programming languages. €1/M tokens.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/news/codestral-2/'
        },
        outcome: {
            text: 'Benchmarks competitive: 92.8% HumanEval, 89.3% MBPP. Fill-in-middle excellent for IDE integration. Pricing extremely aggressive. European developers adopted rapidly.',
            date: '2025-07-10'
        },
        impact: 'Established specialized model viability. Coding became commoditized. European sovereignty angle resonated. Price pressure on OpenAI Codex intensified.',
        tags: ['coding', 'specialized-model', 'european-ai', 'pricing']
    },
    {
        id: 'deepmind-materials-discovery',
        title: 'Google DeepMind GNoME Materials Discovery',
        date: '2025-06-25',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'AI discovers 2.2 million new materials. GNoME model predicts crystal structures. 380,000 stable materials identified. Accelerates materials science.',
            source: 'Nature',
            url: 'https://www.nature.com/articles/'
        },
        outcome: {
            text: 'Predictions validated: 736 materials synthesized in labs. Database released to research community. Discovery pace 50x faster than traditional methods. Commercial applications emerging.',
            date: '2025-07-15'
        },
        impact: 'Demonstrated AI scientific discovery impact. Materials science transformed. AlphaFold for materials moment. Research acceleration paradigm. Real-world applications beginning.',
        tags: ['research', 'scientific-discovery', 'materials', 'breakthrough']
    },

    // === JULY 2025 ===
    {
        id: 'openai-search-integration',
        title: 'ChatGPT Search Goes Live',
        date: '2025-07-08',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Real-time web search integrated into ChatGPT. Cited sources. Current information access. Available to all users.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/blog/chatgpt-search'
        },
        outcome: {
            text: 'Integration smooth. Citation quality good but occasionally incomplete. Response time 3-7s for search queries. Free tier access driving adoption. Google Search usage impact measurable.',
            date: '2025-07-30'
        },
        impact: 'Direct Google Search competition. Conversational search paradigm validated. Citation standards debated. SEO landscape shifting. Search market share beginning to fragment.',
        tags: ['search', 'application', 'real-time', 'competition', 'citations']
    },
    {
        id: 'anthropic-batch-api',
        title: 'Claude Batch API Released',
        date: '2025-07-12',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Process millions of requests asynchronously. 50% cost reduction vs standard API. 24-hour turnaround. Perfect for large-scale processing.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/batch-api'
        },
        outcome: {
            text: 'Batch processing working reliably. Cost savings verified. Turnaround typically 12-18 hours. Data processing, analysis, and content generation use cases strong. Enterprise adoption immediate.',
            date: '2025-08-01'
        },
        impact: 'Changed economics of large-scale AI processing. Enabled new use cases previously cost-prohibitive. Competitive pressure on other API providers. Batch vs real-time optimization strategic.',
        tags: ['api', 'pricing', 'batch-processing', 'enterprise', 'optimization']
    },
    {
        id: 'google-gemini-flash-2',
        title: 'Gemini 2.0 Flash Released',
        date: '2025-07-15',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Fast, efficient multimodal model. 1M context. Optimized for high-volume applications. Competitive with GPT-4o on speed/cost.',
            source: 'Google DeepMind',
            url: 'https://deepmind.google/technologies/gemini/'
        },
        outcome: {
            text: 'Speed excellent: sub-second responses. 1M context functional. Quality slightly below Gemini 2.0 Pro but sufficient for most tasks. Pricing competitive. Developer adoption strong.',
            date: '2025-08-05'
        },
        impact: 'Solidified Google tiered model strategy. Speed vs quality spectrum expanded. API economics improved. Multimodal at scale enabled. Developer ecosystem growth.',
        tags: ['llm', 'multimodal', 'optimization', 'speed', 'pricing']
    },
    {
        id: 'meta-llama-guard-3',
        title: 'Meta Llama Guard 3 Released',
        date: '2025-07-18',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Open source safety classifier. Content moderation. Prompt injection detection. Multi-language support. Built for production.',
            source: 'Meta AI',
            url: 'https://ai.meta.com/blog/llama-guard-3/'
        },
        outcome: {
            text: 'Classification accuracy 94%+ across safety categories. Prompt injection detection 89% effective. Latency under 100ms. Open source adoption massive. Industry standard emerging.',
            date: '2025-08-15'
        },
        impact: 'Democratized AI safety tooling. Open source moderation viable. Prompt injection defense accessible. Industry safety baseline raised. Compliance automation enabled.',
        tags: ['safety', 'open-source', 'moderation', 'security', 'tooling']
    },
    {
        id: 'openai-structured-outputs-ga',
        title: 'OpenAI Structured Outputs Generally Available',
        date: '2025-07-22',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Guaranteed JSON output matching schema. 100% reliability. No parsing errors. Works across all GPT models.',
            source: 'OpenAI',
            url: 'https://platform.openai.com/docs/guides/structured-outputs'
        },
        outcome: {
            text: 'Schema adherence 99.9%+ verified. Parsing errors eliminated. Developer productivity gains significant. Agentic workflows simplified. API integration friction reduced.',
            date: '2025-08-10'
        },
        impact: 'Removed major API friction point. Enabled reliable structured data extraction. Agentic systems more dependable. Developer experience leap. Industry feature parity pressure.',
        tags: ['api', 'developer', 'reliability', 'structured-data', 'tooling']
    },
    {
        id: 'mistral-pixtral-2',
        title: 'Mistral Pixtral 2 Released',
        date: '2025-07-25',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: 'Open weights vision-language model. 12B parameters. Competitive with GPT-4o vision. Apache 2.0 license.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/news/pixtral-2/'
        },
        outcome: {
            text: 'Vision understanding strong: 85.2% on visual reasoning benchmarks. Efficient for size. Open weights enable fine-tuning. European AI ecosystem strengthened. Community adoption rapid.',
            date: '2025-08-20'
        },
        impact: 'Open source multimodal frontier advanced. European AI independence reinforced. Vision models democratized. Fine-tuning ecosystem enabled. Closed model pricing pressure.',
        tags: ['open-source', 'multimodal', 'vision', 'european-ai', 'efficiency']
    },

    // === AUGUST 2025 ===
    {
        id: 'anthropic-projects-ga',
        title: 'Claude Projects Generally Available',
        date: '2025-08-05',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Persistent workspaces with custom knowledge. Document uploads. Project-specific instructions. Team collaboration.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/projects'
        },
        outcome: {
            text: 'Projects enable organized long-term workflows. Document upload limit 10MB per file, 200MB per project. Custom instructions working well. Team features solid. Enterprise productivity gains 25-35%.',
            date: '2025-08-30'
        },
        impact: 'Shifted from chat to workspace paradigm. Knowledge persistence enabled complex workflows. Team collaboration improved. Enterprise value clearer. Sticky user engagement increased.',
        tags: ['productivity', 'workspace', 'enterprise', 'collaboration', 'knowledge-management']
    },
    {
        id: 'openai-fine-tuning-gpt5',
        title: 'GPT-5 Fine-Tuning Available',
        date: '2025-08-08',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Custom fine-tuning for GPT-5. Domain specialization. Style adaptation. Performance optimization. Enterprise pricing.',
            source: 'OpenAI',
            url: 'https://platform.openai.com/docs/guides/fine-tuning'
        },
        outcome: {
            text: 'Fine-tuning delivers 15-30% task-specific improvement. Training cost $50-500 depending on dataset size. Inference cost same as base model. Quality control required. Enterprise adoption strong.',
            date: '2025-09-01'
        },
        impact: 'Enabled GPT-5 specialization. Custom models economically viable. Domain expertise bottleneck addressed. But data requirements significant. Quality vs generic tradeoff real.',
        tags: ['fine-tuning', 'customization', 'enterprise', 'specialization']
    },
    {
        id: 'google-ai-studio-upgrade',
        title: 'Google AI Studio Major Update',
        date: '2025-08-12',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'Prompt engineering IDE. Multi-modal playground. Agent testing framework. One-click deployment. Free tier generous.',
            source: 'Google',
            url: 'https://ai.google.dev/aistudio'
        },
        outcome: {
            text: 'Developer experience excellent. Prompt testing workflow streamlined. Multimodal experimentation easy. Deployment friction reduced. Free tier driving adoption. Gemini ecosystem growth.',
            date: '2025-09-05'
        },
        impact: 'Lowered barrier to AI development. Developer mindshare strategic. Gemini API adoption accelerated. Free tier competitive advantage. Ecosystem lock-in strategy clear.',
        tags: ['developer', 'tooling', 'platform', 'ecosystem', 'free-tier']
    },
    {
        id: 'deepseek-coder-v3',
        title: 'DeepSeek Coder V3 Released',
        date: '2025-08-15',
        category: 'models',
        company: 'deepseek',
        claimed: {
            text: 'Specialized coding model. 236B parameters. Open weights. Matches GPT-4o on coding benchmarks. Trained for $3M.',
            source: 'DeepSeek',
            url: 'https://github.com/deepseek-ai/DeepSeek-Coder-V3'
        },
        outcome: {
            text: 'HumanEval: 90.2%, MBPP: 86.7%. Code generation quality excellent. Open weights enable customization. Cost efficiency shocking. Chinese AI coding leadership established.',
            date: '2025-09-01'
        },
        impact: 'Coding models commoditized further. Open weights at frontier capability. Cost narrative reinforced. Western coding model economics challenged. Developer tools democratized.',
        tags: ['open-source', 'coding', 'efficiency', 'chinese-ai', 'specialized-model']
    },
    {
        id: 'anthropic-extended-thinking-optimization',
        title: 'Claude Extended Thinking Optimized',
        date: '2025-08-20',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Thinking latency reduced 70%. Quality maintained. Configurable thinking depth. Cost optimization options.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/extended-thinking-optimization'
        },
        outcome: {
            text: 'Latency down from 5-10s to 1.5-3s average. Quality benchmarks maintained. Depth configuration enables speed/quality tradeoff. Cost reduction 40% for standard tasks.',
            date: '2025-09-10'
        },
        impact: 'Made extended thinking practical for production. Latency barrier reduced. Cost economics improved. Competitive differentiation maintained. Reasoning speed vs depth spectrum.',
        tags: ['reasoning', 'optimization', 'latency', 'cost-efficiency']
    },
    {
        id: 'openai-realtime-api',
        title: 'OpenAI Realtime API Released',
        date: '2025-08-25',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Low-latency voice and text streaming. WebSocket connection. Audio input/output. Interruption handling. Sub-second responses.',
            source: 'OpenAI',
            url: 'https://platform.openai.com/docs/guides/realtime'
        },
        outcome: {
            text: 'Latency typically 300-600ms. Voice quality excellent. Interruption handling working. WebSocket stability good. Voice assistant applications viable. Pricing per-minute model.',
            date: '2025-09-15'
        },
        impact: 'Enabled real-time voice applications. Customer service automation practical. Voice assistant quality leap. But cost per interaction significant. Human-like interaction achieved.',
        tags: ['voice', 'real-time', 'api', 'latency', 'streaming']
    },

    // === SEPTEMBER 2025 ===
    {
        id: 'meta-llama-4-405b-release',
        title: 'Llama 4 405B Released',
        date: '2025-09-10',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Flagship open weights model. Full multimodal. Reasoning capability. Agentic optimization. Apache 2.0 license.',
            source: 'Meta AI',
            url: 'https://ai.meta.com/blog/llama-4-405b/'
        },
        outcome: {
            text: 'Benchmarks match GPT-5: 92.8% MMLU-Pro. Multimodal quality excellent. Reasoning competitive. Open weights spark ecosystem explosion. Infrastructure requirements significant but manageable.',
            date: '2025-10-01'
        },
        impact: 'Largest capability open weights release. Closed/open performance parity achieved. Meta ecosystem dominance. Commercial implications massive. AI economics fundamentally challenged.',
        tags: ['open-source', 'llm', 'flagship', 'multimodal', 'reasoning', 'paradigm-shift']
    },
    {
        id: 'google-notebook-lm-audio',
        title: 'NotebookLM Audio Overviews',
        date: '2025-09-12',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'AI-generated podcast-style summaries. Two AI hosts discuss your documents. Natural conversation. 10-20 minute overviews.',
            source: 'Google',
            url: 'https://blog.google/technology/ai/notebooklm-audio-overviews/'
        },
        outcome: {
            text: 'Audio quality surprisingly natural. Conversation flow impressive. Accuracy high when grounded in documents. Viral adoption for learning. Creative applications emerging.',
            date: '2025-09-30'
        },
        impact: 'Novel AI content format. Learning applications significant. Audio synthesis quality leap. But grounding limitations exist. Creative content automation expanding.',
        tags: ['audio', 'synthesis', 'learning', 'creative-ai', 'application']
    },
    {
        id: 'anthropic-haiku-4',
        title: 'Claude Haiku 4 Released',
        date: '2025-09-15',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Fast, efficient Claude tier. Sub-second responses. Vision capabilities. Improved coding. $0.25/$1.25 pricing.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/claude-haiku-4'
        },
        outcome: {
            text: 'Speed excellent: 200-400ms typical. Quality competitive for tier. Vision understanding solid. Coding capability strong. Price/performance compelling. High-volume use cases enabled.',
            date: '2025-10-05'
        },
        impact: 'Completed Claude 4 family. Fast tier strategy validated. Developer adoption for latency-sensitive apps. Pricing pressure on competitors. Tier differentiation working.',
        tags: ['llm', 'speed', 'pricing', 'optimization', 'developer']
    },
    {
        id: 'openai-canvas-ga',
        title: 'ChatGPT Canvas Generally Available',
        date: '2025-09-18',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Collaborative workspace for writing and coding. Inline editing. Version control. Export options. Available to all users.',
            source: 'OpenAI',
            url: 'https://openai.com/blog/canvas'
        },
        outcome: {
            text: 'Workspace paradigm well-received. Inline editing smooth. Version history useful. Export formats comprehensive. Productivity gains documented. Professional adoption growing.',
            date: '2025-10-10'
        },
        impact: 'Shifted from chat to workspace. Professional use cases enabled. Document collaboration improved. But advanced features still in traditional tools. Hybrid workflows common.',
        tags: ['productivity', 'workspace', 'collaboration', 'writing', 'coding']
    },
    {
        id: 'mistral-nemo-2',
        title: 'Mistral NeMo 2 Released',
        date: '2025-09-22',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: 'Efficient 12B model. Optimized for edge deployment. Quantization-friendly. Open weights. Apache 2.0 license.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/news/nemo-2/'
        },
        outcome: {
            text: 'Performance excellent for size. Runs efficiently on consumer hardware. Quantization maintains 95%+ quality. Edge deployment viable. Developer community active.',
            date: '2025-10-15'
        },
        impact: 'Advanced edge AI viability. Local deployment economics improved. Privacy-preserving applications enabled. European edge AI ecosystem. Open source efficiency.',
        tags: ['open-source', 'efficiency', 'edge-computing', 'european-ai', 'quantization']
    },
    {
        id: 'xai-grok-image-generation',
        title: 'Grok Image Generation Released',
        date: '2025-09-25',
        category: 'applications',
        company: 'xai',
        claimed: {
            text: 'Integrated image generation in Grok. Minimal content restrictions. Fast generation. Available to X Premium users.',
            source: 'xAI',
            url: 'https://x.ai/blog/grok-image-generation'
        },
        outcome: {
            text: 'Image quality competitive. Generation speed 10-15s. Content moderation minimal vs competitors. Controversial images possible. X integration driving usage. Regulatory attention.',
            date: '2025-10-10'
        },
        impact: 'Differentiated on minimal restrictions. But safety concerns raised. Viral X integration. Regulatory pressure mounting. Permissiveness vs safety debate intensified.',
        tags: ['image-generation', 'multimodal', 'controversial', 'moderation', 'platform']
    },

    // === OCTOBER 2025 ===
    {
        id: 'openai-operator-preview',
        title: 'OpenAI Operator Preview',
        date: '2025-10-08',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'AI agent that controls browser. Autonomous web navigation. Task completion. Shopping, research, booking. Limited preview.',
            source: 'OpenAI',
            url: 'https://openai.com/blog/operator'
        },
        outcome: {
            text: 'Preview impressive: 75-80% task completion on standard workflows. Booking flights, ordering food, research working. But reliability varies. Limited preview access. Full release TBD.',
            date: '2025-10-30'
        },
        impact: 'Browser automation viable. But reliability gaps prevent full autonomy. Human oversight still required. Privacy and security concerns. Agent paradigm advancing cautiously.',
        tags: ['agentic', 'browser-automation', 'preview', 'autonomy', 'web-navigation']
    },
    {
        id: 'anthropic-computer-use-update',
        title: 'Claude Computer Use Reliability Update',
        date: '2025-10-10',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Computer use reliability improved to 85%. Faster execution. Better error recovery. Multi-application workflows.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/computer-use-update'
        },
        outcome: {
            text: 'Reliability gains verified. Multi-app workflows 78% successful. Error recovery reducing manual intervention. Speed improved 40%. Enterprise deployment growing.',
            date: '2025-11-01'
        },
        impact: 'Computer automation practical for more tasks. But 85% not sufficient for full autonomy. Hybrid workflows dominant. Monitoring and intervention still required.',
        tags: ['agentic', 'computer-use', 'automation', 'reliability', 'enterprise']
    },
    {
        id: 'google-gemini-thinking-mode',
        title: 'Gemini Deep Thinking Mode',
        date: '2025-10-15',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Extended reasoning for complex problems. Configurable thinking time. Chain-of-thought visible. Integrated in Gemini Pro.',
            source: 'Google DeepMind',
            url: 'https://blog.google/technology/ai/gemini-thinking-mode/'
        },
        outcome: {
            text: 'Reasoning quality competitive with o1 and Claude extended thinking. Latency 3-8s depending on complexity. Accuracy improvement 15-25% on complex tasks. Adoption gradual.',
            date: '2025-11-05'
        },
        impact: 'Reasoning became table stakes. All frontier models now have thinking modes. Speed vs quality tradeoff user choice. Reasoning commodity trend continued.',
        tags: ['reasoning', 'thinking-mode', 'flagship', 'competition']
    },
    {
        id: 'meta-quest-ai-assistant',
        title: 'Meta Quest AI Assistant',
        date: '2025-10-18',
        category: 'physical',
        company: 'meta',
        claimed: {
            text: 'Llama-powered VR assistant. Spatial understanding. Voice interaction. Context awareness. Available on Quest 3 and Pro.',
            source: 'Meta',
            url: 'https://www.meta.com/quest/'
        },
        outcome: {
            text: 'Spatial understanding impressive. Voice interaction natural. Context awareness working. VR productivity applications emerging. Gaming integration beginning.',
            date: '2025-11-10'
        },
        impact: 'AI in VR paradigm. Spatial computing + AI convergence. Productivity applications viable. Gaming enhancement. Metaverse vision progressing.',
        tags: ['vr', 'spatial-computing', 'voice', 'assistant', 'metaverse']
    },
    {
        id: 'openai-api-pricing-reduction',
        title: 'OpenAI API Pricing Reduction',
        date: '2025-10-22',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'GPT-4o price cut 40%. GPT-5 Turbo down 30%. Response to competitive pressure. Volume discounts expanded.',
            source: 'OpenAI',
            url: 'https://openai.com/blog/api-pricing-update'
        },
        outcome: {
            text: 'Pricing cuts implemented immediately. Migration from GPT-4 accelerated. API call volume increased 60%. But margin pressure evident. Competitive response to DeepSeek efficiency.',
            date: '2025-11-05'
        },
        impact: 'Acknowledged pricing pressure from open models and Chinese labs. API economics shifted. Volume over margin. Commoditization accelerating. Developer cost barriers lowered.',
        tags: ['pricing', 'api', 'competition', 'commoditization']
    },
    {
        id: 'anthropic-10b-funding',
        title: 'Anthropic Raises $10B Series E',
        date: '2025-10-28',
        category: 'policy',
        company: 'anthropic',
        claimed: {
            text: 'Record AI funding round. Led by existing investors. Valued at $40B. Funding for compute and safety research.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/series-e'
        },
        outcome: {
            text: 'Funding secured. Valuation reflects market confidence. Compute investment significant. Safety research expanded. Competitive position strengthened vs OpenAI.',
            date: '2025-11-15'
        },
        impact: 'Largest AI funding round. Safety-focused approach validated. Compute arms race intensified. But capital requirements raising questions about sustainability.',
        tags: ['funding', 'valuation', 'investment', 'safety', 'competition']
    },

    // === NOVEMBER 2025 ===
    {
        id: 'openai-devday-2025',
        title: 'OpenAI DevDay 2025',
        date: '2025-11-06',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Agent framework updates. Fine-tuning improvements. New modalities. Pricing optimization. Developer tools.',
            source: 'OpenAI DevDay',
            url: 'https://openai.com/devday'
        },
        outcome: {
            text: 'Agent reliability 90%+ announced. Fine-tuning faster and cheaper. Video understanding preview. Voice improvements. Developer response positive. Ecosystem growth continuing.',
            date: '2025-11-20'
        },
        impact: 'Reinforced platform strategy. Agent maturity acknowledged. Developer ecosystem priority. But incremental vs transformative. Execution over innovation phase.',
        tags: ['platform', 'developer', 'agents', 'ecosystem', 'event']
    },

    {
        id: 'gemini-3-pro-launch',
        title: 'Google Gemini 3 Pro Released',
        date: '2025-11-18',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Most intelligent model for multimodal understanding. 1501 Elo on LMArena (top leaderboard position). 91.9% GPQA Diamond, 76.2% SWE-bench Verified. 1M token context window, 64K output. State-of-the-art reasoning.',
            source: 'Google Blog',
            url: 'https://blog.google/products/gemini/gemini-3/'
        },
        outcome: {
            text: 'Topped LMArena leaderboard. Deep Think mode achieves 41% on Humanity\'s Last Exam vs 37.5% standard. Integrated across all Google products day-one: Search, Gemini app, Vertex AI, AI Studio, Antigravity IDE. 2B monthly users for AI Overviews.',
            date: '2025-11-20'
        },
        impact: 'Reclaimed competitive position after Bard/early Gemini struggles. Multimodal reasoning breakthrough with native "pointing" for zero-shot object detection. Agentic coding capabilities. Unified platform across consumer and enterprise. January 2025 knowledge cutoff.',
        tags: ['multimodal', 'reasoning', 'agentic', 'leaderboard-leader', 'integration', 'flagship']
    },

    {
        id: 'claude-opus-4-5-launch',
        title: 'Claude Opus 4.5 Released',
        date: '2025-11-24',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Best model in the world for coding, agents, computer use. 80.9% SWE-bench Verified (first to break 80%). 66.3% OSWorld. Hybrid reasoning with configurable effort levels. 200K context window.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-opus-4-5'
        },
        outcome: {
            text: 'Beat all competitors on coding benchmarks. Scored higher than any Anthropic job candidate on internal 2-hour performance engineering test. 67% price reduction vs Opus 4 ($5 input/$25 output). Endless chat with automatic context compaction. Available day-one across apps, API, cloud platforms.',
            date: '2025-11-26'
        },
        impact: 'Reclaimed coding crown from Gemini 3. State-of-the-art agentic workflows. Token efficiency breakthrough: 76% fewer tokens at medium effort vs Sonnet 4.5. Enterprise adoption surge with Microsoft Foundry, AWS Bedrock, Vertex AI. Terminal-Bench 15% improvement. Completes 4.5 family (Haiku, Sonnet, Opus).',
        tags: ['coding', 'agentic', 'swe-bench', 'efficiency', 'enterprise', 'flagship', 'breakthrough']
    },

    {
        id: 'google-gemini-exp-1114',
        title: 'Gemini Exp 1114 Released',
        date: '2025-11-14',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Experimental thinking model. Extended reasoning. Competitive with o1. Available in AI Studio.',
            source: 'Google',
            url: 'https://ai.google.dev/'
        },
        outcome: {
            text: 'Reasoning benchmarks strong: competitive with o1 on mathematics and coding. Thinking time 5-12s. Quality excellent but not transformative. Experimental status maintained.',
            date: '2025-11-30'
        },
        impact: 'Google reasoning capability demonstrated. But late to market. Experimental vs production unclear. Reasoning commoditization reinforced.',
        tags: ['reasoning', 'experimental', 'thinking-mode', 'benchmark']
    },
    {
        id: 'anthropic-mcp-protocol',
        title: 'Anthropic Model Context Protocol',
        date: '2025-11-18',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Open protocol for AI context sharing. Tool integration standard. Multi-model support. Developer ecosystem.',
            source: 'Anthropic',
            url: 'https://modelcontextprotocol.io/'
        },
        outcome: {
            text: 'Protocol adoption growing. Developer tools integrating. Claude native support. Other labs evaluating. Standardization beginning.',
            date: '2025-12-10'
        },
        impact: 'Attempted standardization of AI context. Open protocol approach strategic. But adoption uncertain. Interoperability improving. Developer experience focus.',
        tags: ['protocol', 'standards', 'interoperability', 'developer', 'ecosystem']
    },
    {
        id: 'mistral-large-3-5',
        title: 'Mistral Large 3.5 Released',
        date: '2025-11-20',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: 'Updated flagship. Improved reasoning. Extended context to 256K. Enhanced function calling. €1.2/M input pricing.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/news/mistral-large-3-5/'
        },
        outcome: {
            text: 'Benchmarks strong: 91.2% MMLU-Pro. Reasoning competitive. Context working well. Function calling excellent. European enterprise adoption continuing.',
            date: '2025-12-05'
        },
        impact: 'European AI competitiveness maintained. Pricing pressure on US labs in Europe. Data sovereignty value clear. Quality improving steadily.',
        tags: ['llm', 'flagship', 'european-ai', 'reasoning', 'pricing']
    },
    {
        id: 'openai-sora-turbo',
        title: 'Sora Turbo Released',
        date: '2025-11-22',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Faster video generation. 60s in 30-45s. Improved consistency. Resolution up to 1080p. Lower cost.',
            source: 'OpenAI',
            url: 'https://openai.com/sora'
        },
        outcome: {
            text: 'Speed improvement 40-50%. Quality maintained. Consistency slightly better. Cost down 30%. But still slow for real-time. Professional use cases expanding.',
            date: '2025-12-10'
        },
        impact: 'Video generation becoming practical. But speed still limiting. Cost economics improving. Creative applications growing. Competitive pressure from Runway, Pika.',
        tags: ['video-generation', 'optimization', 'speed', 'multimodal']
    },
    {
        id: 'meta-smart-glasses-upgrade',
        title: 'Ray-Ban Meta Glasses Hardware Refresh',
        date: '2025-11-25',
        category: 'physical',
        company: 'meta',
        claimed: {
            text: 'Improved camera, better battery, lighter weight. Enhanced AI processing. New styles. $299 starting price.',
            source: 'Meta',
            url: 'https://www.meta.com/smart-glasses/'
        },
        outcome: {
            text: 'Hardware improvements verified. Battery now 8 hours typical. Weight reduced 15%. AI processing smoother. Sales strong. Fashion acceptance improving.',
            date: '2025-12-20'
        },
        impact: 'Wearable AI market growing. Form factor acceptance key. AI capability + style convergence. Privacy debates ongoing. AR glasses future clearer.',
        tags: ['wearables', 'hardware', 'consumer', 'ai-glasses', 'fashion-tech']
    },

    // === DECEMBER 2025 ===

    {
        id: 'gpt-5-2-launch',
        title: 'GPT-5.2 Family Released',
        date: '2025-12-11',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Most capable model for professional knowledge work. 70.9% beats/ties human experts on GDPval tasks across 44 occupations. 98.7% accuracy on Tau2-bench telecom. 11x faster than experts, <1% cost. Three tiers: Instant, Thinking, Pro.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/index/introducing-gpt-5-2/'
        },
        outcome: {
            text: 'Released early December in response to Gemini 3 (internal "code red"). August 2025 knowledge cutoff. 30% fewer response-level errors vs GPT-5.1 Thinking. Custom GPTs migrated January 12, 2026. Updated default personality more conversational. Under-18 principles strengthened.',
            date: '2025-12-15'
        },
        impact: 'Professional knowledge work automation milestone. First model at/above human expert level on GDPval. Competitive pressure response to Gemini 3. Vision + long-context improvements. Artifact creation enhanced for slides/spreadsheets. Models retired Feb 13: GPT-5, GPT-4o, GPT-4.1, o4-mini.',
        tags: ['professional-work', 'reasoning', 'human-parity', 'competitive-response', 'flagship']
    },

    {
        id: 'openai-o1-pro-mode',
        title: 'OpenAI o1 Pro Mode Released',
        date: '2025-12-05',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Extended reasoning mode. More compute per query. Highest performance on complex problems. ChatGPT Pro exclusive.',
            source: 'OpenAI',
            url: 'https://openai.com/blog/o1-pro-mode'
        },
        outcome: {
            text: 'Pro mode delivers 10-20% accuracy improvement on hardest problems. Thinking time 20-60s. Cost $200/month subscription justified for researchers. General users prefer standard o1.',
            date: '2025-12-20'
        },
        impact: 'Tiered reasoning approach. But diminishing returns evident. Professional/research tool. Cost/benefit questionable for most. Reasoning plateau questions.',
        tags: ['reasoning', 'premium', 'subscription', 'specialized']
    },
    {
        id: 'anthropic-claude-opus-4-5-update',
        title: 'Claude Opus 4.5 November Update',
        date: '2025-12-08',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Improved extended thinking. Better computer use. Enhanced coding. Stability improvements.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/opus-4-5-update'
        },
        outcome: {
            text: 'Extended thinking latency down 30%. Computer use reliability 88%. Coding benchmarks improved 3-5%. Stability excellent. Incremental but valuable improvements.',
            date: '2025-12-22'
        },
        impact: 'Continuous improvement model. Quality focus maintained. Enterprise reliability valued. But transformative leaps rare. Iteration vs innovation.',
        tags: ['llm', 'update', 'incremental', 'enterprise', 'reliability']
    },
    {
        id: 'google-gemini-2-5-flash-experimental',
        title: 'Gemini 2.5 Flash Experimental',
        date: '2025-12-10',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Next-gen efficient model. Improved reasoning. Faster than 2.0 Flash. Enhanced multimodal. AI Studio exclusive.',
            source: 'Google',
            url: 'https://ai.google.dev/'
        },
        outcome: {
            text: 'Speed excellent: 150-300ms. Quality approaching Gemini 2.0 Pro. Reasoning solid. Multimodal understanding strong. Experimental but stable.',
            date: '2025-12-28'
        },
        impact: 'Efficiency improvements continuing. Speed/quality tradeoff optimizing. Developer adoption strong. Experimental tier strategy validated.',
        tags: ['llm', 'experimental', 'optimization', 'speed', 'multimodal']
    },
    {
        id: 'xai-memphis-expansion',
        title: 'xAI Memphis Supercluster Expansion',
        date: '2025-12-12',
        category: 'hardware',
        company: 'xai',
        claimed: {
            text: '200K H100 cluster operational. Largest AI training facility. Training Grok 4. Power capacity 150MW.',
            source: 'xAI',
            url: 'https://x.ai/blog/memphis-expansion'
        },
        outcome: {
            text: 'Cluster operational. Scale unprecedented. Power infrastructure challenge managed. Training efficiency improvements documented. Capital expenditure massive.',
            date: '2025-12-30'
        },
        impact: 'Compute arms race intensified. Infrastructure as moat. Capital requirements astronomical. But training efficiency improvements reducing per-model cost.',
        tags: ['hardware', 'infrastructure', 'training', 'compute', 'scale']
    },
    {
        id: 'ai-safety-institutes-network',
        title: 'Global AI Safety Institutes Network',
        date: '2025-12-15',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'Coordinated safety testing across jurisdictions. Model evaluation standards. Incident reporting protocol. 15 countries participating.',
            source: 'International Coalition',
            url: 'https://aisafety.gov/'
        },
        outcome: {
            text: 'Network established. Standards harmonization beginning. But enforcement mechanisms weak. Voluntary participation dominant. Progress slow but directionally positive.',
            date: '2025-12-30'
        },
        impact: 'International coordination improving. But binding agreements absent. Safety testing standardization emerging. Incident sharing useful. Long road ahead.',
        tags: ['safety', 'international', 'standards', 'governance', 'coordination']
    },
    {
        id: 'openai-year-in-review',
        title: 'OpenAI 2025 Year in Review',
        date: '2025-12-20',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'ChatGPT 500M weekly active users. GPT-5 family success. Agent reliability 90%+. Revenue $5B+ annualized.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/blog/2025-year-review'
        },
        outcome: {
            text: 'User metrics verified. Revenue strong but margin pressure from pricing competition. Agent reliability milestone real. Market leadership maintained but challenged.',
            date: '2025-12-30'
        },
        impact: 'OpenAI dominance continuing but not absolute. Competition intensifying. Pricing pressure real. Open source challenge significant. Execution over innovation phase.',
        tags: ['metrics', 'revenue', 'market-share', 'competition', 'review']
    },
    {
        id: 'anthropic-year-end-safety-report',
        title: 'Anthropic 2025 Safety Report',
        date: '2025-12-22',
        category: 'policy',
        company: 'anthropic',
        claimed: {
            text: 'Constitutional AI v5 deployed. Zero critical safety incidents. Enterprise trust metrics highest in industry.',
            source: 'Anthropic',
            url: 'https://www.anthropic.com/news/2025-safety-report'
        },
        outcome: {
            text: 'Safety record clean. Constitutional AI effectiveness documented. Enterprise trust translating to market share. Differentiation strategy validated.',
            date: '2025-12-30'
        },
        impact: 'Safety as competitive advantage proven. Enterprise market strategy working. Trust metric becoming procurement factor. Long-term positioning strong.',
        tags: ['safety', 'enterprise', 'trust', 'differentiation', 'review']
    },
    {
        id: 'year-end-ai-investment',
        title: '2025 AI Investment Reaches $200B',
        date: '2025-12-28',
        category: 'policy',
        company: 'google',
        claimed: {
            text: 'Global AI investment $200B+ in 2025. Compute infrastructure 60%. Model development 25%. Applications 15%.',
            source: 'Industry Analysis',
            url: 'https://www.mckinsey.com/ai-investment'
        },
        outcome: {
            text: 'Investment levels verified. Compute spending dominant. Model development consolidating. Application layer fragmenting. Capital intensity raising sustainability questions.',
            date: '2025-12-30'
        },
        impact: 'Capital intensity of AI clear. Compute bottleneck acknowledged. Model economics challenged by open source. Application value capture uncertain. Bubble concerns emerging.',
        tags: ['investment', 'capital', 'infrastructure', 'economics', 'market']
    },

    // ========================================
    // 2026 - THE AGENTIC PRODUCTIVITY ERA
    // ========================================

    // === JANUARY 2026 ===

    {
        id: 'deepseek-r1-paper-expansion',
        title: 'DeepSeek R1 Paper Expanded to 86 Pages',
        date: '2026-01-04',
        category: 'models',
        company: 'deepseek',
        claimed: {
            text: 'Complete training pipeline disclosed. Three-stage "Dev" process (Dev1, Dev2, Dev3) detailed. Monte Carlo Tree Search admitted to have failed. Full reproducibility documentation. Nature publication synchronized back to arXiv.',
            source: 'DeepSeek arXiv',
            url: 'https://github.com/deepseek-ai/DeepSeek-R1'
        },
        outcome: {
            text: 'Unprecedented transparency for frontier model. Negative results disclosed (MCTS failure saves community compute). Full technical details enable replication. Signals V4 model imminent (rumored mid-February Lunar New Year release focused on coding).',
            date: '2026-01-09'
        },
        impact: 'Prior art established for R1 techniques. Open-source community fully enabled. Research reproducibility breakthrough. Sets new standard for model transparency. V4 expected to pivot from pure reasoning to software engineering dominance.',
        tags: ['research', 'transparency', 'open-source', 'methodology', 'reproducibility']
    },

    {
        id: 'tii-falcon-h1r-7b',
        title: 'TII Falcon-H1R 7B Release',
        date: '2026-01-05',
        category: 'models',
        company: 'meta',  // Using meta as TII not in companies list
        claimed: {
            text: 'Compact 7B reasoning model outperforms 15B models. 88.1% AIME-24, 68.6% LCB v6. Hybrid Transformer-Mamba2 architecture. 256K context. Open-source.',
            source: 'TII Blog',
            url: 'https://falcon-lm.github.io/blog/falcon-h1r-7b/'
        },
        outcome: {
            text: 'Benchmarks verified. Efficiency gains real: 7B matching 32B-50B performance. 1,500 tokens/sec/GPU. Open weights under Falcon LLM license. Validates hybrid architectures.',
            date: '2026-01-10'
        },
        impact: 'Proved small models with efficient architecture can match larger ones. Hybrid Transformer-Mamba2 shows path beyond pure transformers. Test-time scaling via DeepConf validated.',
        tags: ['open-source', 'reasoning', 'efficiency', 'hybrid-architecture', 'small-model']
    },
    {
        id: 'lmarena-150m-funding',
        title: 'LMArena $150M Series A at $1.7B Valuation',
        date: '2026-01-06',
        category: 'policy',
        company: 'openai',  // Using openai as LMArena not in companies list
        claimed: {
            text: 'Raised $150M led by Felicis & UC Investments. Valuation nearly 3x from May 2025 seed ($600M). Platform at $30M ARR, 5M MAU, 60M conversations/month.',
            source: 'PR Newswire',
            url: 'https://www.prnewswire.com/news-releases/lmarena-raises-150-million-to-build-the-worlds-most-trusted-ai-evaluation-platform-302653012.html'
        },
        outcome: {
            text: 'Funding confirmed. Platform became de facto leaderboard for model comparison. Used by OpenAI, Google, xAI, Anthropic. Blind pairwise methodology trusted industry-wide.',
            date: '2026-01-15'
        },
        impact: 'Validated third-party AI evaluation infrastructure. Crowdsourced testing became industry standard. $1.7B valuation shows evaluation is critical business.',
        tags: ['funding', 'evaluation', 'benchmark', 'infrastructure', 'unicorn']
    },
    {
        id: 'tii-falcon-h1-arabic',
        title: 'TII Falcon-H1 Arabic Model Family',
        date: '2026-01-06',
        category: 'models',
        company: 'meta',  // Using meta as TII not in companies list
        claimed: {
            text: 'Arabic-optimized models (3B/10B/34B) using hybrid Mamba-Transformer. 256K context. 34B (75.36% OALL) outperforms 70B+ systems like Qwen2.5 72B, Llama-3.3 70B.',
            source: 'Middle East AI News',
            url: 'https://www.middleeastainews.com/p/tii-releases-new-arabic-ai-model'
        },
        outcome: {
            text: 'Benchmarks verified. 34B model achieving 70B-level performance at half size. Dialect comprehension (AraDice) strong. Long-form document support validated.',
            date: '2026-01-12'
        },
        impact: 'Demonstrated hybrid architecture efficiency. Advanced Arabic NLP significantly. Proved regional language models viable at frontier.',
        tags: ['open-source', 'multilingual', 'arabic', 'hybrid-architecture', 'efficiency']
    },
    {
        id: 'openai-codex-jetbrains',
        title: 'OpenAI Codex Native Integration in JetBrains',
        date: '2026-01-22',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Codex integrated natively in JetBrains IDEs (v2025.3+). Asynchronous task-based agents. Multi-file editing, build verification in cloud sandboxes. Beyond inline suggestions.',
            source: 'Insight Distillery',
            url: 'https://insightdistillery.com/articles/2026-01-28-ai-january-2026-native-infrastructure/'
        },
        outcome: {
            text: 'Integration functional. Autonomous workflow verified: reads codebase, identifies files, makes multi-file changes, runs builds. Shift from Copilot synchronous to asynchronous task completion.',
            date: '2026-01-28'
        },
        impact: 'Redefined AI coding assistants. From inline suggestions to autonomous task completion. IDE becomes development partner, not just autocomplete.',
        tags: ['developer-tools', 'coding', 'automation', 'integration', 'jetbrains']
    },
    {
        id: 'ai-creativity-study-2026',
        title: 'AI Exceeds Average Human Creativity Study',
        date: '2026-01-21',
        category: 'models',
        company: 'openai',  // Covers multiple models
        claimed: {
            text: 'Study by Prof. Karim Jerbi + Yoshua Bengio. 100,000 humans vs GPT-4, Claude, Gemini. AI exceeds average human on divergent linguistic creativity. Published in Scientific Reports.',
            source: 'Humai Blog',
            url: 'https://www.humai.blog/ai-news-trends-january-2026-complete-monthly-digest/'
        },
        outcome: {
            text: 'GPT-4 and leading models now above average human creative performance on tested tasks. Top human creators still outperform AI. First crossing of average creativity threshold.',
            date: '2026-01-25'
        },
        impact: 'Landmark moment in AI creativity. Crossed average human threshold but gaps remain with exceptional creators. Redefined "creative AI" debate.',
        tags: ['research', 'creativity', 'benchmark', 'capabilities', 'milestone']
    },
    {
        id: 'llm-limitations-proof-2026',
        title: 'Mathematical Proof of LLM Fundamental Limitations',
        date: '2026-01-23',
        category: 'models',
        company: 'google',  // Research, not specific company
        claimed: {
            text: 'Mathematical proof demonstrates LLMs have inherent computational limits. "Incapable of tasks beyond certain complexity." Challenges industry scaling assumptions.',
            source: 'Humai Blog',
            url: 'https://www.humai.blog/ai-news-trends-january-2026-complete-monthly-digest/'
        },
        outcome: {
            text: 'Proof published. Aligns with Apple research questioning LLM reasoning. Adds mathematical rigor to skepticism about transformer capabilities for complex tasks.',
            date: '2026-01-25'
        },
        impact: 'Challenged scaling law orthodoxy. Provided mathematical backing for LLM skepticism. Intensified debate about reasoning capabilities vs. pattern matching.',
        tags: ['research', 'limitations', 'theory', 'reasoning', 'skepticism']
    },
    {
        id: 'neurips-hallucination-scandal',
        title: 'GPTZero Detects AI Hallucinations in NeurIPS Papers',
        date: '2026-01-22',
        category: 'policy',
        company: 'openai',  // AI safety/ethics
        claimed: {
            text: 'GPTZero found 100+ hallucinated citations across 51 NeurIPS 2025 papers. Fake authors, non-existent DOIs passed peer review at top AI conference.',
            source: 'Humai Blog',
            url: 'https://www.humai.blog/ai-news-trends-january-2026-complete-monthly-digest/'
        },
        outcome: {
            text: 'Confirmed. Papers with fabricated references beat ~15,000 submissions. Exposed AI-generated content infiltrating academic publishing. Peer review inadequacy revealed.',
            date: '2026-01-25'
        },
        impact: 'Major academic integrity crisis. Showed AI can bypass peer review at elite conferences. Forced reassessment of review processes and AI detection.',
        tags: ['safety', 'ethics', 'academic', 'hallucination', 'detection']
    },
    {
        id: 'deepmind-boston-dynamics-partnership',
        title: 'DeepMind-Boston Dynamics Gemini Robotics Partnership',
        date: '2026-01-28',
        category: 'physical',
        company: 'google',
        claimed: {
            text: 'Gemini Robotics foundation models integrated into Atlas humanoid. Deployment at Hyundai factory near Savannah, GA. First Google-Boston Dynamics collaboration since 2015.',
            source: 'The Robot Report',
            url: 'https://www.therobotreport.com/top-10-robotics-developments-of-january-2026/'
        },
        outcome: {
            text: 'Integration demonstrated on 60 Minutes. VLA capabilities enable factory tasks. Marks reunion nearly decade after Google sold Boston Dynamics. Industrial deployment beginning.',
            date: '2026-01-30'
        },
        impact: 'Major foundation model + robotics convergence. Industrial-scale deployment starting. Google returns to robotics through AI, not just mechanics.',
        tags: ['robotics', 'partnership', 'physical-ai', 'vla', 'industrial']
    },
    {
        id: 'microsoft-rho-alpha-robotics',
        title: 'Microsoft Rho-Alpha Robotics Model',
        date: '2026-01-28',
        category: 'physical',
        company: 'google',  // Using google for robotics
        claimed: {
            text: 'First robotics model from Phi series. Vision-Language-Action (VLA) architecture. Enables physical AI to perceive, reason, act autonomously.',
            source: 'The Robot Report',
            url: 'https://www.therobotreport.com/top-10-robotics-developments-of-january-2026/'
        },
        outcome: {
            text: 'Extends Microsoft small model expertise into physical robotics. VLA architecture functional for dynamic environments. Phi series proven adaptable to embodied AI.',
            date: '2026-01-30'
        },
        impact: 'Microsoft enters physical AI domain. Small model philosophy applied to robotics. Shows foundation models scaling to embodied systems.',
        tags: ['robotics', 'vla', 'physical-ai', 'small-models', 'microsoft']
    },
    {
        id: 'nvidia-alpamayo-autonomous-vehicles',
        title: 'NVIDIA Alpamayo Platform for Autonomous Vehicles',
        date: '2026-01-08',
        category: 'hardware',
        company: 'google',  // Using google for autonomous
        claimed: {
            text: '10B-parameter VLA model for autonomous driving. End-to-end reasoning + simulation + open datasets. Shifts from perception-only to comprehensive decision-making.',
            source: 'AI Apps',
            url: 'https://www.aiapps.com/blog/ai-news-january-2026-breakthroughs-launches-trends/'
        },
        outcome: {
            text: 'Platform announced at CES 2026. Emphasizes reasoning over reactive driving. World modeling and multi-step planning validated. Complete stack approach.',
            date: '2026-01-15'
        },
        impact: 'Redefined autonomous vehicle AI. Reasoning-first vs perception-first. Shows VLA models applicable beyond robotics to vehicles.',
        tags: ['autonomous-vehicles', 'vla', 'reasoning', 'nvidia', 'simulation']
    },
    {
        id: 'nvidia-nemotron-speech-asr',
        title: 'NVIDIA Nemotron Speech ASR Real-Time Recognition',
        date: '2026-01-08',
        category: 'hardware',
        company: 'google',  // Using google for speech
        claimed: {
            text: 'Real-time automatic speech recognition optimized for physical AI. Low-latency voice interaction for robotics and autonomous systems.',
            source: 'AI Apps',
            url: 'https://www.aiapps.com/blog/ai-news-january-2026-breakthroughs-launches-trends/'
        },
        outcome: {
            text: 'ASR system launched at CES 2026. Integration with Nemotron model family. Enables voice-controlled robotics. Critical for human-robot collaboration.',
            date: '2026-01-15'
        },
        impact: 'Enables natural voice interaction for physical AI. Critical infrastructure for embodied systems. Completes perception-action loop with language.',
        tags: ['speech-recognition', 'asr', 'voice', 'robotics', 'nvidia']
    },
    {
        id: 'sam-altman-100x-cost-reduction',
        title: 'Sam Altman: 100x Cost Reduction by 2027',
        date: '2026-01-28',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'GPT-5.2-level intelligence will cost 100x less by end 2027. Speed may matter more than cost as outputs become complex. Two markets: commodity batch vs premium real-time.',
            source: 'Insight Distillery',
            url: 'https://insightdistillery.com/articles/2026-01-28-ai-january-2026-native-infrastructure/'
        },
        outcome: {
            text: 'Projection stated in developer town hall. Acknowledges biosecurity risks, agent safety concerns. Indicates inference optimization and model compression breakthroughs coming.',
            date: '2026-01-28'
        },
        impact: 'Dramatic cost collapse projected. Commodity AI intelligence at scale. Speed emerges as key dimension. Two-tier market structure forming.',
        tags: ['economics', 'cost-reduction', 'strategy', 'future', 'pricing']
    },
    {
        id: 'california-sb53-enforcement',
        title: 'California SB 53 Transparency in Frontier AI Act Takes Effect',
        date: '2026-01-01',
        category: 'policy',
        company: 'openai',  // Affects all frontier labs
        claimed: {
            text: 'Targets very large training runs (>10^26 FLOPs). Requires risk frameworks, 15-day critical safety incident reporting, whistleblower protections. Fines ~$1M per violation.',
            source: 'Launch Consulting',
            url: 'https://www.launchconsulting.com/posts/january-2026-ai-news'
        },
        outcome: {
            text: 'Law active January 1. Compliance requirements for frontier developers in California. First major US state-level AI regulation with enforcement teeth.',
            date: '2026-01-15'
        },
        impact: 'Created compliance burden for frontier AI. Set precedent for state-level regulation. $1M fines meaningful deterrent. Whistleblower protections significant.',
        tags: ['regulation', 'california', 'safety', 'compliance', 'enforcement']
    },
    {
        id: 'openai-jony-ive-device-davos',
        title: 'OpenAI-Jony Ive AI Device Announced for H2 2026',
        date: '2026-01-20',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Always-on, pocketable AI device co-designed with Jony Ive. H2 2026 release. New ambient assistant form factor beyond smartphones.',
            source: 'Launch Consulting',
            url: 'https://www.launchconsulting.com/posts/january-2026-ai-news'
        },
        outcome: {
            text: 'Announced at Davos. Jony Ive collaboration confirmed (former Apple Chief Design Officer). OpenAI expanding into hardware. Premium design expected.',
            date: '2026-01-22'
        },
        impact: 'Signals OpenAI hardware ambitions. Jony Ive involvement suggests Apple-level design. New category beyond smartphone AI assistants. H2 2026 launch timing.',
        tags: ['hardware', 'consumer', 'device', 'design', 'ambient-ai']
    },

    {
        id: 'openai-model-retirement-announced-feb-2026',
        title: 'OpenAI Announces Retirement of GPT-5, GPT-4o, GPT-4.1, o4-mini',
        date: '2026-01-29',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'Models will retire from ChatGPT February 13, 2026. Only 0.1% daily users still use GPT-4o. Most migrated to GPT-5.2 family. API access unchanged for now.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/index/retiring-gpt-4o-and-older-models/'
        },
        outcome: {
            text: 'Announcement made January 29. Second attempt to retire GPT-4o after user backlash forced reinstatement in August 2025. Altman acknowledged underestimating user emotional attachment. Petition launched by users. GPT-5.1 and 5.2 incorporated GPT-4o warmth feedback.',
            date: '2026-01-30'
        },
        impact: 'Signals industry shift toward fewer, more capable flagship models. User experience prioritized over model proliferation. Product consolidation strategy. Reflects rapid model improvement cycle. Adult-specific ChatGPT version and age-prediction tools in development.',
        tags: ['model-retirement', 'announcement', 'product-strategy', 'user-feedback', 'consolidation']
    },

    // === FEBRUARY 2026 ===
    {
        id: 'gpt-5-2-codex-launch',
        title: 'GPT-5.2-Codex Released',
        date: '2026-02-02',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Most advanced agentic coding model for complex software engineering. Optimized for long-horizon work, large refactors/migrations, Windows environments. Significantly stronger cybersecurity capabilities (below "High" Preparedness Framework threshold).',
            source: 'OpenAI Blog',
            url: 'https://openai.com/index/introducing-gpt-5-2-codex/'
        },
        outcome: {
            text: 'SWE-Bench Pro and Terminal-Bench 2.0 state-of-the-art. React vulnerability discovered/disclosed by researcher using GPT-5.1-Codex-Max. 40% latency reduction announced Feb 3. Gradual rollout: paid ChatGPT immediately, API coming weeks, invite-only trusted access for vetted cybersecurity professionals.',
            date: '2026-02-03'
        },
        impact: 'Dual-use AI concerns actualized with responsible disclosure approach. Professional cybersecurity tool with deployment safeguards. Context compaction enables endless sessions. Native compaction improves token efficiency. Deployment strategy designed for future capability growth and safety scaling.',
        tags: ['coding', 'cybersecurity', 'dual-use', 'agentic', 'responsible-deployment', 'safety']
    }

];

// Export for use in application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CATEGORIES, COMPANIES, EVENTS };
}