/**
 * ========================================
 * AI MILESTONE TRACKER - DATA
 * Evidence-based, professionally neutral
 * ========================================
 */

// Categories
const CATEGORIES = {
    model: { id: 'model', label: 'Model' },
    product: { id: 'product', label: 'Product' },
    capability: { id: 'capability', label: 'Capability' },
    business: { id: 'business', label: 'Business' },
    research: { id: 'research', label: 'Research' }
};

// Companies
const COMPANIES = {
    openai: { id: 'openai', label: 'OpenAI' },
    anthropic: { id: 'anthropic', label: 'Anthropic' },
    google: { id: 'google', label: 'Google' },
    meta: { id: 'meta', label: 'Meta' },
    xai: { id: 'xai', label: 'xAI' },
    mistral: { id: 'mistral', label: 'Mistral' },
    microsoft: { id: 'microsoft', label: 'Microsoft' },
    stability: { id: 'stability', label: 'Stability AI' },
    other: { id: 'other', label: 'Other' }
};

// Neutral status - just facts, no judgment
const STATUS = {
    shipped: { id: 'shipped', label: 'Shipped', color: '#10b981' },
    active: { id: 'active', label: 'Active', color: '#3b82f6' },
    delayed: { id: 'delayed', label: 'Delayed', color: '#f59e0b' },
    limited: { id: 'limited', label: 'Limited', color: '#8b5cf6' },
    discontinued: { id: 'discontinued', label: 'Ended', color: '#ef4444' }
};

// Events with evidence-based structure
const EVENTS = [
    {
        id: 'chatgpt-launch',
        title: 'ChatGPT Public Launch',
        date: '2022-11-30',
        category: 'product',
        company: 'openai',
        status: 'active',
        claimed: {
            text: 'Research preview of conversational AI assistant. Free to use. Optimized for dialogue.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/blog/chatgpt'
        },
        outcome: {
            text: 'Reached 100M users in 2 months. Became fastest-growing consumer app in history. Triggered industry-wide AI race.',
            date: '2023-02-01'
        },
        impact: 'Defined the generative AI era. Made AI accessible to general public.',
        tags: ['chatbot', 'consumer', 'viral']
    },
    {
        id: 'gpt4-release',
        title: 'GPT-4 Released',
        date: '2023-03-14',
        category: 'model',
        company: 'openai',
        status: 'active',
        claimed: {
            text: 'More capable and aligned than GPT-3.5. Accepts image inputs. Scores 90th percentile on bar exam.',
            source: 'OpenAI Technical Report',
            url: 'https://openai.com/research/gpt-4'
        },
        outcome: {
            text: 'Benchmark claims verified. Became foundation for ChatGPT Plus, Microsoft Copilot, and thousands of applications.',
            date: '2023-06-01'
        },
        impact: 'Set new standard for LLM capability. Triggered enterprise AI adoption.',
        tags: ['llm', 'multimodal', 'benchmark']
    },
    {
        id: 'bing-chat-launch',
        title: 'Bing Chat (Copilot) Launch',
        date: '2023-02-07',
        category: 'product',
        company: 'microsoft',
        status: 'active',
        claimed: {
            text: 'AI-powered search combining GPT-4 with Bing index. "Your copilot for the web."',
            source: 'Microsoft Blog',
            url: 'https://blogs.microsoft.com/blog/2023/02/07/'
        },
        outcome: {
            text: 'Early version exhibited erratic behavior (Sydney). Heavily constrained, later rebranded to Copilot. Google search still dominant.',
            date: '2023-12-01'
        },
        impact: 'Forced Google to accelerate Bard launch. Showed AI integration challenges.',
        tags: ['search', 'chatbot', 'enterprise']
    },
    {
        id: 'claude-2-release',
        title: 'Claude 2 Released',
        date: '2023-07-11',
        category: 'model',
        company: 'anthropic',
        status: 'shipped',
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
        category: 'model',
        company: 'meta',
        status: 'active',
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
        id: 'midjourney-v5',
        title: 'Midjourney V5 Released',
        date: '2023-03-15',
        category: 'capability',
        company: 'other',
        status: 'shipped',
        claimed: {
            text: 'Major quality improvement. Better hands and anatomy. More photorealistic output.',
            source: 'Midjourney Discord',
            url: 'https://www.midjourney.com/'
        },
        outcome: {
            text: 'Quality improvements verified. Hand rendering dramatically better. Set new standard for AI images.',
            date: '2023-05-01'
        },
        impact: 'Cemented Midjourney as image generation leader.',
        tags: ['image-gen', 'creative', 'generative']
    },
    {
        id: 'github-copilot-x',
        title: 'GitHub Copilot X Announced',
        date: '2023-03-22',
        category: 'product',
        company: 'microsoft',
        status: 'limited',
        claimed: {
            text: 'GPT-4 powered. Chat in IDE. Voice coding. PR summaries. Documentation integration.',
            source: 'GitHub Blog',
            url: 'https://github.blog/2023-03-22-github-copilot-x/'
        },
        outcome: {
            text: 'Chat shipped. Voice and PR features delayed or scaled back. Core Copilot hit 1M+ subscribers.',
            date: '2024-01-01'
        },
        impact: 'Transformed developer workflows despite partial feature delivery.',
        tags: ['coding', 'developer', 'tools']
    },
    {
        id: 'stability-sdxl',
        title: 'Stable Diffusion XL Released',
        date: '2023-07-26',
        category: 'model',
        company: 'stability',
        status: 'active',
        claimed: {
            text: 'Higher resolution. Better composition. Improved text rendering. Open weights.',
            source: 'Stability AI Blog',
            url: 'https://stability.ai/news/stable-diffusion-sdxl-1-announcement'
        },
        outcome: {
            text: 'Resolution and composition improved. Text rendering still limited. Foundation for community fine-tunes.',
            date: '2023-10-01'
        },
        impact: 'Kept open-source image generation competitive.',
        tags: ['image-gen', 'open-source', 'generative']
    },
    {
        id: 'sam-altman-fired',
        title: 'OpenAI Leadership Crisis',
        date: '2023-11-17',
        category: 'business',
        company: 'openai',
        status: 'shipped',
        claimed: {
            text: 'Board stated loss of confidence in Altman\'s leadership. No specific reasons disclosed.',
            source: 'OpenAI Board Statement',
            url: 'https://openai.com/blog/openai-announces-leadership-transition'
        },
        outcome: {
            text: '5 days of chaos. 95% of staff threatened resignation. Altman reinstated. Board restructured.',
            date: '2023-11-22'
        },
        impact: 'Exposed AI governance tensions. Raised questions about non-profit structure.',
        tags: ['governance', 'leadership', 'corporate']
    },
    {
        id: 'xai-grok-launch',
        title: 'xAI Launches Grok',
        date: '2023-11-04',
        category: 'model',
        company: 'xai',
        status: 'active',
        claimed: {
            text: 'Real-time access to X/Twitter data. Witty personality. "Will answer spicy questions."',
            source: 'xAI Announcement',
            url: 'https://x.ai/'
        },
        outcome: {
            text: 'Shipped for X Premium users. Real-time data access delivered. Quality improved with Grok-2.',
            date: '2024-08-01'
        },
        impact: 'Established xAI as third major US AI lab.',
        tags: ['llm', 'chatbot', 'social']
    },
    {
        id: 'gemini-pro-release',
        title: 'Google Gemini Announced',
        date: '2023-12-06',
        category: 'model',
        company: 'google',
        status: 'active',
        claimed: {
            text: 'Gemini Ultra beats GPT-4 on 30 of 32 benchmarks. Native multimodal. Three sizes.',
            source: 'Google DeepMind Blog',
            url: 'https://deepmind.google/technologies/gemini/'
        },
        outcome: {
            text: 'Pro launched first; Ultra delayed. Demo video misleading. Benchmark methodology questioned.',
            date: '2024-02-01'
        },
        impact: 'Showed Google competing but launch execution hurt credibility.',
        tags: ['llm', 'multimodal', 'benchmark']
    },
    {
        id: 'mistral-medium',
        title: 'Mistral Emerges as Competitor',
        date: '2023-12-11',
        category: 'model',
        company: 'mistral',
        status: 'active',
        claimed: {
            text: 'European AI lab. Efficient models competitive with larger ones. Open weights available.',
            source: 'Mistral AI',
            url: 'https://mistral.ai/'
        },
        outcome: {
            text: 'Mixtral 8x7B became popular open-source choice. Proved efficient architectures viable.',
            date: '2024-03-01'
        },
        impact: 'Demonstrated Europe can compete in foundation models.',
        tags: ['llm', 'open-source', 'european']
    },
    {
        id: 'rabbit-r1-ces',
        title: 'Rabbit R1 Announced at CES',
        date: '2024-01-09',
        category: 'product',
        company: 'other',
        status: 'shipped',
        claimed: {
            text: '$199 AI device. Large Action Model can operate apps, book travel, order food.',
            source: 'Rabbit CES Keynote',
            url: 'https://www.rabbit.tech/'
        },
        outcome: {
            text: 'Shipped April 2024. LAM was largely Android apps in cloud. Core features broken. Reviews negative.',
            date: '2024-06-01'
        },
        impact: 'Became cautionary tale for AI hardware hype.',
        tags: ['hardware', 'consumer', 'device']
    },
    {
        id: 'sora-announced',
        title: 'OpenAI Announces Sora',
        date: '2024-02-15',
        category: 'capability',
        company: 'openai',
        status: 'limited',
        claimed: {
            text: 'Text-to-video model. Realistic 60-second videos. "Coming later in 2024."',
            source: 'OpenAI Blog',
            url: 'https://openai.com/sora'
        },
        outcome: {
            text: 'Demo impressive but cherry-picked. Red team only for months. Limited release December 2024.',
            date: '2024-12-09'
        },
        impact: 'Set video AI expectations. 10-month delay let competitors establish.',
        tags: ['video', 'generative', 'multimodal']
    },
    {
        id: 'claude-3-opus',
        title: 'Claude 3 Family Released',
        date: '2024-03-04',
        category: 'model',
        company: 'anthropic',
        status: 'active',
        claimed: {
            text: 'Claude 3 Opus matches/exceeds GPT-4. 200K context. Three tiers: Haiku, Sonnet, Opus.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-3-family'
        },
        outcome: {
            text: 'Opus widely considered best for complex reasoning. Clear GPT-4 competitor.',
            date: '2024-06-01'
        },
        impact: 'First credible GPT-4 match. Established Claude as premium option.',
        tags: ['llm', 'reasoning', 'benchmark']
    },
    {
        id: 'humane-ai-pin',
        title: 'Humane AI Pin Ships',
        date: '2024-04-11',
        category: 'product',
        company: 'other',
        status: 'discontinued',
        claimed: {
            text: '$699 screenless AI wearable. Laser projector. Post-smartphone computing.',
            source: 'Humane Launch',
            url: 'https://humane.com/'
        },
        outcome: {
            text: 'Reviews uniformly negative. Slow, overheating, limited. Company reportedly seeking sale.',
            date: '2024-05-01'
        },
        impact: 'Demonstrated AI hardware market not ready.',
        tags: ['hardware', 'wearable', 'consumer']
    },
    {
        id: 'llama-3-release',
        title: 'Llama 3 Released',
        date: '2024-04-18',
        category: 'model',
        company: 'meta',
        status: 'active',
        claimed: {
            text: '8B and 70B now, 400B+ coming. Best open-source performance.',
            source: 'Meta AI Blog',
            url: 'https://ai.meta.com/blog/meta-llama-3/'
        },
        outcome: {
            text: '8B and 70B shipped strong. 405B released July, competitive with closed models.',
            date: '2024-08-01'
        },
        impact: 'Cemented Meta as open-source AI leader.',
        tags: ['open-source', 'llm', 'benchmark']
    },
    {
        id: 'gpt4o-release',
        title: 'GPT-4o Released',
        date: '2024-05-13',
        category: 'model',
        company: 'openai',
        status: 'active',
        claimed: {
            text: 'Native multimodal. Real-time voice with emotion. 2x faster, 50% cheaper.',
            source: 'OpenAI Spring Event',
            url: 'https://openai.com/index/hello-gpt-4o/'
        },
        outcome: {
            text: 'Speed and pricing delivered. Advanced Voice Mode delayed 4 months.',
            date: '2024-09-01'
        },
        impact: 'Free GPT-4 tier significant. Demo-to-delivery gap noted.',
        tags: ['llm', 'multimodal', 'voice']
    },
    {
        id: 'claude-35-sonnet',
        title: 'Claude 3.5 Sonnet Released',
        date: '2024-06-20',
        category: 'model',
        company: 'anthropic',
        status: 'active',
        claimed: {
            text: 'Opus-level capability at Sonnet speed and price. Best-in-class vision.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/claude-3-5-sonnet'
        },
        outcome: {
            text: 'Widely considered best overall model for months. Exceptional coding. Developer default.',
            date: '2024-10-01'
        },
        impact: 'Proved mid-tier pricing can deliver top capability.',
        tags: ['llm', 'coding', 'vision']
    },
    {
        id: 'grok-2-release',
        title: 'Grok-2 Released',
        date: '2024-08-13',
        category: 'model',
        company: 'xai',
        status: 'active',
        claimed: {
            text: 'Competitive with GPT-4 and Claude 3.5. Flux image generation integrated.',
            source: 'xAI Blog',
            url: 'https://x.ai/blog/grok-2'
        },
        outcome: {
            text: 'Benchmarks competitive. Image generation integrated. Available to X Premium.',
            date: '2024-10-01'
        },
        impact: 'Showed xAI rapid improvement trajectory.',
        tags: ['llm', 'image-gen', 'social']
    },
    {
        id: 'o1-preview-release',
        title: 'OpenAI o1-preview Released',
        date: '2024-09-12',
        category: 'model',
        company: 'openai',
        status: 'active',
        claimed: {
            text: 'Reasoning model that "thinks" before answering. PhD-level on hard problems.',
            source: 'OpenAI Blog',
            url: 'https://openai.com/index/introducing-openai-o1-preview/'
        },
        outcome: {
            text: 'Better at math, coding, science reasoning. Slower and expensive but capability real.',
            date: '2024-11-01'
        },
        impact: 'Opened inference-time compute scaling paradigm.',
        tags: ['llm', 'reasoning', 'paradigm']
    },
    {
        id: 'claude-computer-use',
        title: 'Claude Computer Use Beta',
        date: '2024-10-22',
        category: 'capability',
        company: 'anthropic',
        status: 'limited',
        claimed: {
            text: 'Claude can see screen, move mouse, type. Control computers like humans. API beta.',
            source: 'Anthropic Blog',
            url: 'https://www.anthropic.com/news/3-5-models-and-computer-use'
        },
        outcome: {
            text: 'Capability works but slow and error-prone. Research milestone, not production-ready.',
            date: '2024-11-01'
        },
        impact: 'First major lab to ship GUI agents.',
        tags: ['agents', 'automation', 'capability']
    },
    {
        id: 'gemini-2-release',
        title: 'Gemini 2.0 Released',
        date: '2024-12-11',
        category: 'model',
        company: 'google',
        status: 'active',
        claimed: {
            text: 'Agentic AI era. Native tool use. 1M context Flash. Project Astra previewed.',
            source: 'Google Blog',
            url: 'https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/'
        },
        outcome: {
            text: 'Flash available and impressive. Agentic features in limited preview.',
            date: '2024-12-15'
        },
        impact: 'Google clearly competitive again.',
        tags: ['llm', 'agents', 'multimodal']
    },
    {
        id: 'sora-public-release',
        title: 'Sora Public Release',
        date: '2024-12-09',
        category: 'capability',
        company: 'openai',
        status: 'limited',
        claimed: {
            text: 'Available to Plus and Pro. Up to 20 second 1080p videos.',
            source: 'OpenAI Event',
            url: 'https://openai.com/sora'
        },
        outcome: {
            text: 'Launched but hit capacity limits. Impressive but restricted. 10 months after announcement.',
            date: '2024-12-15'
        },
        impact: 'Competitors established during delay.',
        tags: ['video', 'generative', 'consumer']
    },
    {
        id: 'deepseek-v3',
        title: 'DeepSeek V3 Released',
        date: '2024-12-26',
        category: 'model',
        company: 'other',
        status: 'active',
        claimed: {
            text: 'Open-source matching frontier. Efficient MoE. Fraction of typical training cost.',
            source: 'DeepSeek',
            url: 'https://www.deepseek.com/'
        },
        outcome: {
            text: 'Benchmarks match Claude 3.5 Sonnet and GPT-4o. Training cost claims verified. Open weights.',
            date: '2024-12-28'
        },
        impact: 'Proved frontier achievable at fraction of cost. Major economic implications.',
        tags: ['open-source', 'llm', 'efficiency']
    }
];
