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
    meta: { id: 'meta', label: 'Meta AI' }
};

// Events with evidence-based structure
const EVENTS = [
    // ========== 2022 ==========
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
        impact: 'Defined the generative AI era. Made AI accessible to general public. Sparked massive investment wave.',
        tags: ['chatbot', 'consumer', 'viral', 'rlhf']
    },

    // ========== 2023 ==========
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
            text: 'Benchmark claims verified. Became foundation for ChatGPT Plus, Microsoft Copilot, and thousands of applications.',
            date: '2023-06-01'
        },
        impact: 'Set new standard for LLM capability. Triggered enterprise AI adoption wave.',
        tags: ['llm', 'multimodal', 'benchmark', 'flagship']
    },
    {
        id: 'bard-launch',
        title: 'Google Bard Launch',
        date: '2023-03-21',
        category: 'applications',
        company: 'google',
        claimed: {
            text: 'Conversational AI service powered by LaMDA, later PaLM. Direct response to ChatGPT.',
            source: 'Google Blog',
            url: 'https://blog.google/technology/ai/bard-google-ai-search-updates/'
        },
        outcome: {
            text: 'Initial launch had factual error in demo. Gradual improvements. Later rebranded to Gemini in 2024.',
            date: '2024-02-01'
        },
        impact: 'Showed Google\'s urgency to compete. Demonstrated challenges of rushing AI products.',
        tags: ['chatbot', 'consumer', 'competition']
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
            text: 'Context window worked as claimed. Established as credible GPT-4 alternative. Claude.ai consumer product launched.',
            date: '2023-09-01'
        },
        impact: 'Proved Anthropic as serious competitor. 100K context became industry norm.',
        tags: ['llm', 'context-window', 'safety']
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
            text: 'Sparked massive open-source AI ecosystem. Thousands of fine-tunes. Enabled local LLM deployment.',
            date: '2024-01-01'
        },
        impact: 'Democratized LLM access. Created alternative to closed API model.',
        tags: ['open-source', 'llm', 'democratization']
    },
    {
        id: 'gemini-1-announcement',
        title: 'Gemini 1.0 Announced',
        date: '2023-12-06',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Natively multimodal model. Ultra version exceeds GPT-4 on benchmarks. Three sizes: Ultra, Pro, Nano.',
            source: 'Google DeepMind Blog',
            url: 'https://deepmind.google/technologies/gemini/'
        },
        outcome: {
            text: 'Pro available immediately. Ultra delayed until February 2024. Demo video revealed to be edited/staged.',
            date: '2024-02-01'
        },
        impact: 'Showed Google\'s multimodal ambitions. Demo controversy highlighted AI marketing challenges.',
        tags: ['llm', 'multimodal', 'benchmark']
    },
    {
        id: 'mistral-7b-release',
        title: 'Mistral 7B Released',
        date: '2023-09-27',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: 'Open-weights 7B model outperforming Llama 2 13B. Apache 2.0 license. Released via torrent.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/news/announcing-mistral-7b/'
        },
        outcome: {
            text: 'Benchmarks validated. Became foundation for many fine-tunes. Established Mistral as serious player.',
            date: '2023-12-01'
        },
        impact: 'Proved small models can punch above weight. Created European AI champion.',
        tags: ['open-source', 'llm', 'efficiency']
    },
    {
        id: 'openai-devday-2023',
        title: 'OpenAI DevDay: GPTs & Assistants API',
        date: '2023-11-06',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Custom GPTs anyone can build. Assistants API with code interpreter. GPT-4 Turbo with 128K context.',
            source: 'OpenAI DevDay',
            url: 'https://openai.com/blog/new-models-and-developer-products-announced-at-devday'
        },
        outcome: {
            text: 'GPT Store launched January 2024. Assistants API adopted. GPT-4 Turbo available as claimed.',
            date: '2024-02-01'
        },
        impact: 'Expanded AI application ecosystem. Made custom AI accessible to non-developers.',
        tags: ['platform', 'api', 'developer']
    },
    {
        id: 'openai-board-crisis',
        title: 'OpenAI Board Crisis',
        date: '2023-11-17',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'Board stated loss of confidence in Altman\'s leadership. No specific reasons disclosed.',
            source: 'OpenAI Board Statement',
            url: 'https://openai.com/blog/openai-announces-leadership-transition'
        },
        outcome: {
            text: '5 days of chaos. 95% of staff threatened resignation. Altman reinstated. Board restructured.',
            date: '2023-11-22'
        },
        impact: 'Exposed AI governance tensions. Raised questions about non-profit AI structure.',
        tags: ['governance', 'leadership', 'corporate']
    },

    // ========== 2024 ==========
    {
        id: 'claude-3-opus',
        title: 'Claude 3 Family Released',
        date: '2024-03-04',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Claude 3 Opus matches/exceeds GPT-4. 200K context. Three tiers: Haiku, Sonnet, Opus.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-3-family'
        },
        outcome: {
            text: 'Opus widely considered best for complex reasoning. Clear GPT-4 competitor. Full family delivered.',
            date: '2024-06-01'
        },
        impact: 'First credible GPT-4 match. Established Claude as premium option.',
        tags: ['llm', 'reasoning', 'benchmark', 'flagship']
    },
    {
        id: 'llama-3-release',
        title: 'Llama 3 Released',
        date: '2024-04-18',
        category: 'models',
        company: 'meta',
        claimed: {
            text: '8B and 70B now, 400B+ coming. Best open-source performance. New tokenizer and training.',
            source: 'Meta AI Blog',
            url: 'https://ai.meta.com/blog/meta-llama-3/'
        },
        outcome: {
            text: '8B and 70B strong. 405B released July, competitive with closed models on many benchmarks.',
            date: '2024-08-01'
        },
        impact: 'Cemented Meta as open-source AI leader. Raised bar for open models.',
        tags: ['open-source', 'llm', 'benchmark']
    },
    {
        id: 'gpt4o-release',
        title: 'GPT-4o Released',
        date: '2024-05-13',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Native multimodal. Real-time voice with emotion. 2x faster, 50% cheaper than GPT-4 Turbo.',
            source: 'OpenAI Spring Event',
            url: 'https://openai.com/index/hello-gpt-4o/'
        },
        outcome: {
            text: 'Speed and pricing delivered. Advanced Voice Mode delayed 4 months to September 2024.',
            date: '2024-09-01'
        },
        impact: 'Free GPT-4 tier significant. Demo-to-delivery gap noted for voice features.',
        tags: ['llm', 'multimodal', 'voice']
    },
    {
        id: 'claude-35-sonnet',
        title: 'Claude 3.5 Sonnet Released',
        date: '2024-06-20',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Opus-level capability at Sonnet speed and price. Best-in-class coding and vision.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-3-5-sonnet'
        },
        outcome: {
            text: 'Widely considered best overall model for months. Exceptional coding. Became developer default.',
            date: '2024-10-01'
        },
        impact: 'Proved mid-tier pricing can deliver top capability. Changed pricing expectations.',
        tags: ['llm', 'coding', 'vision', 'flagship']
    },
    {
        id: 'mistral-large-2',
        title: 'Mistral Large 2 Released',
        date: '2024-07-24',
        category: 'models',
        company: 'mistral',
        claimed: {
            text: '123B parameter flagship. Competitive with GPT-4o and Claude 3.5 Sonnet. 128K context.',
            source: 'Mistral AI Blog',
            url: 'https://mistral.ai/news/mistral-large-2407/'
        },
        outcome: {
            text: 'Strong performance on code and reasoning. Established Mistral in frontier tier.',
            date: '2024-09-01'
        },
        impact: 'European AI lab reaches frontier capability. Increased competition.',
        tags: ['llm', 'flagship', 'european']
    },
    {
        id: 'grok-2-release',
        title: 'Grok-2 Released',
        date: '2024-08-13',
        category: 'models',
        company: 'xai',
        claimed: {
            text: 'Competitive with GPT-4 and Claude 3.5. Flux image generation integrated. Real-time X data.',
            source: 'xAI Blog',
            url: 'https://x.ai/blog/grok-2'
        },
        outcome: {
            text: 'Benchmarks competitive. Image generation integrated. Available to X Premium subscribers.',
            date: '2024-10-01'
        },
        impact: 'Showed xAI rapid improvement trajectory. First frontier model with image gen.',
        tags: ['llm', 'image-gen', 'social']
    },
    {
        id: 'o1-preview-release',
        title: 'OpenAI o1-preview Released',
        date: '2024-09-12',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Reasoning model that "thinks" before answering. PhD-level on hard problems. New paradigm.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/index/introducing-openai-o1-preview/'
        },
        outcome: {
            text: 'Better at math, coding, science reasoning. Slower and expensive but capability real.',
            date: '2024-11-01'
        },
        impact: 'Opened inference-time compute scaling paradigm. New architecture direction.',
        tags: ['llm', 'reasoning', 'paradigm']
    },
    {
        id: 'claude-computer-use',
        title: 'Claude Computer Use Beta',
        date: '2024-10-22',
        category: 'applications',
        company: 'anthropic',
        claimed: {
            text: 'Claude can see screen, move mouse, type. Control computers like humans. API beta.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/3-5-models-and-computer-use'
        },
        outcome: {
            text: 'Capability works but slow and error-prone. Research milestone, not production-ready.',
            date: '2024-11-01'
        },
        impact: 'First major lab to ship GUI agents. Opened new application category.',
        tags: ['agents', 'automation', 'capability']
    },
    {
        id: 'gemini-2-flash',
        title: 'Gemini 2.0 Flash Released',
        date: '2024-12-11',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Agentic AI era. Native tool use and code execution. 1M context. Project Astra previewed.',
            source: 'Google Blog',
            url: 'https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/'
        },
        outcome: {
            text: 'Flash available and impressive. Full Gemini 2.0 Pro delayed to 2025. Agentic features in preview.',
            date: '2024-12-15'
        },
        impact: 'Google clearly competitive again. Showed multimodal agent direction.',
        tags: ['llm', 'agents', 'multimodal']
    },
    {
        id: 'sora-public-release',
        title: 'Sora Public Release',
        date: '2024-12-09',
        category: 'applications',
        company: 'openai',
        claimed: {
            text: 'Text-to-video generation. Available to Plus and Pro. Up to 20 second 1080p videos.',
            source: 'OpenAI Event',
            url: 'https://openai.com/sora'
        },
        outcome: {
            text: 'Launched but hit immediate capacity limits. Impressive but restricted. 10 months after demo.',
            date: '2024-12-15'
        },
        impact: 'Competitors established during delay. Showed demo-to-product challenges.',
        tags: ['video', 'generative', 'consumer']
    },

    // ========== Hardware & Infrastructure ==========
    {
        id: 'nvidia-h100-shortage',
        title: 'NVIDIA H100 Shortage Peak',
        date: '2023-06-15',
        category: 'hardware',
        company: 'meta',
        claimed: {
            text: 'Severe GPU shortage affecting all AI labs. Wait times of 6+ months. Prices at 3-4x MSRP.',
            source: 'Industry Reports',
            url: 'https://www.reuters.com/technology/nvidia-shares-soar-second-day-after-blockbuster-forecast-2023-05-25/'
        },
        outcome: {
            text: 'Shortage continued through 2024. All major labs scrambled for allocation. Shaped AI competition.',
            date: '2024-06-01'
        },
        impact: 'GPU access became strategic advantage. Influenced which labs could train frontier models.',
        tags: ['gpu', 'supply-chain', 'infrastructure']
    },
    {
        id: 'meta-llama-training-cluster',
        title: 'Meta Announces Massive GPU Cluster',
        date: '2024-01-18',
        category: 'hardware',
        company: 'meta',
        claimed: {
            text: 'Building cluster with 350,000 H100 GPUs by end of 2024. Largest AI training infrastructure.',
            source: 'Mark Zuckerberg',
            url: 'https://www.instagram.com/p/C2P6Z5RJhtR/'
        },
        outcome: {
            text: 'Buildout progressing. Enabled Llama 3 405B training. Positioned Meta for AGI-scale training.',
            date: '2024-07-01'
        },
        impact: 'Showed Meta\'s long-term AI commitment. Raised infrastructure investment bar.',
        tags: ['gpu', 'infrastructure', 'investment']
    },
    {
        id: 'google-tpu-v5p',
        title: 'Google TPU v5p Announced',
        date: '2023-12-06',
        category: 'hardware',
        company: 'google',
        claimed: {
            text: 'Most powerful TPU yet. 2x FLOPS improvement. Pods up to 8,960 chips for training.',
            source: 'Google Cloud Blog',
            url: 'https://cloud.google.com/blog/products/ai-machine-learning/introducing-cloud-tpu-v5p-and-ai-hypercomputer'
        },
        outcome: {
            text: 'Available in Google Cloud. Used for Gemini training. Alternative to NVIDIA dependency.',
            date: '2024-03-01'
        },
        impact: 'Google vertical integration advantage. Reduced reliance on external GPU supply.',
        tags: ['tpu', 'infrastructure', 'google-cloud']
    },

    // ========== Physical AI & Robotics ==========
    {
        id: 'figure-01-demo',
        title: 'Figure 01 + OpenAI Demo',
        date: '2024-03-13',
        category: 'physical',
        company: 'openai',
        claimed: {
            text: 'Humanoid robot with GPT-4V integration. Natural language commands. Real-world task execution.',
            source: 'Figure AI',
            url: 'https://www.figure.ai/'
        },
        outcome: {
            text: 'Impressive demo. Robot performed kitchen tasks via voice. Production timeline unclear.',
            date: '2024-06-01'
        },
        impact: 'Showed potential of LLM + robotics integration. Raised expectations for humanoid AI.',
        tags: ['robotics', 'humanoid', 'vision']
    },
    {
        id: 'google-rt-2',
        title: 'Google RT-2 Paper Published',
        date: '2023-07-28',
        category: 'physical',
        company: 'google',
        claimed: {
            text: 'Vision-language-action model for robotics. Transfers web knowledge to robot control.',
            source: 'Google DeepMind',
            url: 'https://deepmind.google/discover/blog/rt-2-new-model-translates-vision-and-language-into-action/'
        },
        outcome: {
            text: 'Research milestone. Showed VLMs can improve robot generalization. Not deployed at scale.',
            date: '2024-01-01'
        },
        impact: 'Advanced foundation model approach to robotics. Influenced field direction.',
        tags: ['robotics', 'research', 'vision-language']
    },

    // ========== Policy & Society ==========
    {
        id: 'eu-ai-act-passed',
        title: 'EU AI Act Passed',
        date: '2024-03-13',
        category: 'policy',
        company: 'google',
        claimed: {
            text: 'World\'s first comprehensive AI regulation. Risk-based approach. Fines up to 7% global revenue.',
            source: 'European Parliament',
            url: 'https://www.europarl.europa.eu/news/en/press-room/20240308IPR19015/'
        },
        outcome: {
            text: 'Passed into law. Implementation phased over 2024-2026. All major labs working on compliance.',
            date: '2024-08-01'
        },
        impact: 'Set global precedent for AI regulation. Influenced other jurisdictions.',
        tags: ['regulation', 'europe', 'compliance']
    },
    {
        id: 'biden-ai-executive-order',
        title: 'Biden AI Executive Order',
        date: '2023-10-30',
        category: 'policy',
        company: 'openai',
        claimed: {
            text: 'Most significant AI governance action in US. Safety testing requirements. Reporting mandates.',
            source: 'White House',
            url: 'https://www.whitehouse.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/'
        },
        outcome: {
            text: 'Reporting requirements implemented. Safety testing frameworks developed. Industry adapted.',
            date: '2024-06-01'
        },
        impact: 'Established US federal AI oversight. Set expectations for frontier model transparency.',
        tags: ['regulation', 'usa', 'safety']
    },
    {
        id: 'anthropic-series-d',
        title: 'Anthropic Raises $4B from Amazon',
        date: '2024-03-27',
        category: 'policy',
        company: 'anthropic',
        claimed: {
            text: 'Amazon completes $4B investment. Total Amazon commitment now $4B. Strategic partnership deepened.',
            source: 'Amazon Press Release',
            url: 'https://press.aboutamazon.com/2024/3/amazon-and-anthropic-deepen-their-shared-commitment-to-advancing-generative-ai'
        },
        outcome: {
            text: 'Investment completed. Claude integrated into AWS services. Anthropic valued at ~$18B.',
            date: '2024-04-01'
        },
        impact: 'Secured Anthropic\'s position. Intensified big tech AI competition.',
        tags: ['funding', 'partnership', 'valuation']
    },
    {
        id: 'openai-gpt5-training',
        title: 'GPT-5 Training Confirmed',
        date: '2024-03-19',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Sam Altman confirms GPT-5 in training. Expected to be "materially better" than GPT-4.',
            source: 'Lex Fridman Podcast',
            url: 'https://www.youtube.com/watch?v=jvqFAi7vkBc'
        },
        outcome: {
            text: 'Training ongoing as of late 2024. Release date not announced. Expectations extremely high.',
            date: '2024-12-01'
        },
        impact: 'Set expectations for next frontier leap. Influenced competitor timelines.',
        tags: ['llm', 'next-gen', 'training']
    },

    // ========== 2025 ==========
    {
        id: 'deepseek-v3',
        title: 'DeepSeek V3 Released',
        date: '2024-12-26',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Open-weights model matching frontier. MoE architecture. Trained for fraction of typical cost.',
            source: 'DeepSeek',
            url: 'https://www.deepseek.com/'
        },
        outcome: {
            text: 'Benchmarks match Claude 3.5 Sonnet and GPT-4o. Training cost claims verified. Open weights.',
            date: '2024-12-28'
        },
        impact: 'Proved frontier achievable at fraction of cost. Major economic implications.',
        tags: ['open-source', 'llm', 'efficiency', 'chinese']
    },
    {
        id: 'deepseek-r1',
        title: 'DeepSeek R1 Released',
        date: '2025-01-20',
        category: 'models',
        company: 'meta',
        claimed: {
            text: 'Open-weights reasoning model. Matches o1 on benchmarks. Full chain-of-thought visible.',
            source: 'DeepSeek',
            url: 'https://github.com/deepseek-ai/DeepSeek-R1'
        },
        outcome: {
            text: 'Reasoning capability verified. Open weights enable research. Massive community adoption.',
            date: '2025-01-25'
        },
        impact: 'Democratized reasoning models. Challenged Western AI lab dominance narrative.',
        tags: ['open-source', 'reasoning', 'paradigm']
    },
    {
        id: 'o3-announcement',
        title: 'OpenAI o3 Announced',
        date: '2024-12-20',
        category: 'models',
        company: 'openai',
        claimed: {
            text: 'Next-generation reasoning model. Breakthrough on ARC-AGI benchmark. Release early 2025.',
            source: 'OpenAI',
            url: 'https://openai.com/index/deliberative-alignment/'
        },
        outcome: {
            text: 'ARC-AGI score unprecedented. Full capabilities not yet public. Safety testing ongoing.',
            date: '2025-01-15'
        },
        impact: 'Suggested major reasoning capability jump. Intensified AGI timeline debate.',
        tags: ['reasoning', 'benchmark', 'next-gen']
    },
    {
        id: 'claude-35-opus-expected',
        title: 'Claude 3.5 Opus Expected',
        date: '2025-01-15',
        category: 'models',
        company: 'anthropic',
        claimed: {
            text: 'Upgraded Opus tier anticipated. Following Sonnet and Haiku 3.5 releases in 2024.',
            source: 'Industry Speculation',
            url: 'https://www.anthropic.com/'
        },
        outcome: {
            text: 'Not yet released as of late January 2025. Community anticipation high.',
            date: '2025-01-28'
        },
        impact: 'Highlighted model release timing as competitive factor.',
        tags: ['llm', 'flagship', 'anticipated']
    },
    {
        id: 'gemini-2-pro-expected',
        title: 'Gemini 2.0 Pro Expected',
        date: '2025-01-15',
        category: 'models',
        company: 'google',
        claimed: {
            text: 'Full Gemini 2.0 Pro release anticipated following Flash in December 2024.',
            source: 'Google DeepMind',
            url: 'https://deepmind.google/technologies/gemini/'
        },
        outcome: {
            text: 'Release pending as of late January 2025. Flash continues as available tier.',
            date: '2025-01-28'
        },
        impact: 'Google positioning for sustained frontier presence.',
        tags: ['llm', 'flagship', 'anticipated']
    }
];
