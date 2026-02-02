/**
 * ========================================
 * Monodust - DATA
 * ========================================
 */

const CATEGORIES = {
    'model-release': {
        color: '#3b82f6',
        label: 'Model Release',
        description: 'New AI model launches'
    },
    'product-launch': {
        color: '#10b981',
        label: 'Product Launch',
        description: 'Consumer or enterprise products'
    },
    'capability-breakthrough': {
        color: '#8b5cf6',
        label: 'Capability',
        description: 'New capabilities or features'
    },
    'regulation': {
        color: '#ef4444',
        label: 'Regulation',
        description: 'Laws, policies, governance'
    },
    'flop': {
        color: '#f59e0b',
        label: 'Flop',
        description: 'Failed launches or disappointments'
    },
    'corporate-drama': {
        color: '#ec4899',
        label: 'Drama',
        description: 'Corporate events and controversies'
    },
    'model-announcement': {
        color: '#06b6d4',
        label: 'Announcement',
        description: 'Pre-release announcements'
    }
};

const COMPANIES = {
    'openai': {
        color: '#10a37f',
        label: 'OpenAI',
        description: 'ChatGPT, GPT models, DALL-E, Sora'
    },
    'anthropic': {
        color: '#d4a574',
        label: 'Anthropic',
        description: 'Claude models'
    },
    'google': {
        color: '#4285f4',
        label: 'Google',
        description: 'Gemini, Bard, DeepMind'
    },
    'meta': {
        color: '#0668e1',
        label: 'Meta',
        description: 'LLaMA models'
    },
    'xai': {
        color: '#1d9bf0',
        label: 'xAI',
        description: 'Grok'
    },
    'deepseek': {
        color: '#6366f1',
        label: 'DeepSeek',
        description: 'DeepSeek models'
    },
    'stability': {
        color: '#9333ea',
        label: 'Stability AI',
        description: 'Stable Diffusion'
    },
    'microsoft': {
        color: '#00a4ef',
        label: 'Microsoft',
        description: 'Copilot, GitHub Copilot'
    },
    'other': {
        color: '#71717a',
        label: 'Other',
        description: 'Other companies and startups'
    }
};

const IMPACT_AREAS = {
    'research': 'Research',
    'developer': 'Developers',
    'consumer': 'Consumers',
    'enterprise': 'Enterprise',
    'creative': 'Creative',
    'cultural': 'Cultural',
    'corporate': 'Corporate',
    'open-source': 'Open Source',
    'geopolitics': 'Geopolitics',
    'automation': 'Automation'
};

const EVENTS = [
    // ========== 2020 ==========
    {
        id: 'gpt-3-release',
        date: '2020-06-11',
        title: 'GPT-3 released by OpenAI',
        hype: 8,
        reality: 7,
        category: 'model-release',
        company: 'openai',
        impact: ['research', 'developer'],
        note: 'First truly impressive language model. Showed what was possible. API-only kept it somewhat contained.',
        source: 'OpenAI announcement',
        prediction: 'Will change NLP landscape',
        outcome: 'Confirmed - foundation for everything that followed'
    },

    // ========== 2021 ==========
    {
        id: 'github-copilot',
        date: '2021-06-29',
        title: 'GitHub Copilot technical preview',
        hype: 7,
        reality: 8,
        category: 'product-launch',
        company: 'microsoft',
        impact: ['developer'],
        note: 'First mainstream AI coding assistant. Changed how developers work. Reality exceeded hype.',
        source: 'GitHub announcement',
        prediction: 'Will become essential tool',
        outcome: 'Confirmed - industry standard now'
    },
    {
        id: 'dalle-announcement',
        date: '2021-01-05',
        title: 'DALL-E announced by OpenAI',
        hype: 9,
        reality: 6,
        category: 'model-announcement',
        company: 'openai',
        impact: ['creative', 'research'],
        note: 'First major text-to-image model. Limited access created mystique. Actual quality was limited.',
        source: 'OpenAI blog',
        prediction: 'Will revolutionize digital art',
        outcome: 'Partial - DALL-E 2 was the real breakthrough'
    },

    // ========== 2022 ==========
    {
        id: 'stable-diffusion',
        date: '2022-08-22',
        title: 'Stable Diffusion released open source',
        hype: 9,
        reality: 9,
        category: 'model-release',
        company: 'stability',
        impact: ['creative', 'cultural', 'open-source'],
        note: 'Open weights changed everything. Democratized image generation. Triggered creative and legal chaos.',
        source: 'Stability AI',
        prediction: 'Will transform creative work',
        outcome: 'Confirmed - entire industry shifted'
    },
    {
        id: 'chatgpt-launch',
        date: '2022-11-30',
        title: 'ChatGPT launches publicly',
        hype: 10,
        reality: 10,
        category: 'product-launch',
        company: 'openai',
        impact: ['consumer', 'cultural', 'enterprise'],
        note: 'Actual watershed moment. Changed public perception of AI overnight. Fastest-growing consumer app in history.',
        source: 'OpenAI announcement',
        prediction: 'This will matter',
        outcome: 'Confirmed - triggered the AI race'
    },
    {
        id: 'dalle-2',
        date: '2022-04-06',
        title: 'DALL-E 2 released',
        hype: 9,
        reality: 7,
        category: 'model-release',
        company: 'openai',
        impact: ['creative', 'consumer'],
        note: 'Major quality jump but limited access. Stable Diffusion stole its thunder months later.',
        source: 'OpenAI',
        prediction: 'Will dominate image generation',
        outcome: 'Partially - open source alternatives won'
    },

    // ========== 2023 ==========
    {
        id: 'gpt-4-release',
        date: '2023-03-14',
        title: 'GPT-4 released',
        hype: 9,
        reality: 8,
        category: 'model-release',
        company: 'openai',
        impact: ['research', 'enterprise', 'consumer'],
        note: 'Significant capability jump. Multimodal. More reliable. But not the AGI some expected.',
        source: 'OpenAI',
        prediction: 'Major improvement but not paradigm shift',
        outcome: 'Confirmed - better but incremental'
    },
    {
        id: 'anthropic-claude',
        date: '2023-03-14',
        title: 'Anthropic launches Claude',
        hype: 6,
        reality: 7,
        category: 'product-launch',
        company: 'anthropic',
        impact: ['enterprise', 'research'],
        note: 'Strong competitor. Constitutional AI approach. Longer context. Reality slightly exceeded initial hype.',
        source: 'Anthropic announcement',
        prediction: 'Quality alternative to GPT-4',
        outcome: 'Confirmed - carved significant niche'
    },
    {
        id: 'meta-llama-leak',
        date: '2023-03-03',
        title: "Meta's LLaMA models leaked",
        hype: 5,
        reality: 9,
        category: 'model-release',
        company: 'meta',
        impact: ['research', 'open-source'],
        note: 'Accidental open release. Spawned entire ecosystem: Alpaca, Vicuna, etc. Changed open-source AI forever.',
        source: 'Leaked torrent',
        prediction: 'Will accelerate open development',
        outcome: 'Confirmed - massive impact'
    },
    {
        id: 'openai-drama',
        date: '2023-11-17',
        title: 'Sam Altman fired/rehired chaos',
        hype: 10,
        reality: 2,
        category: 'corporate-drama',
        company: 'openai',
        impact: ['corporate', 'cultural'],
        note: 'Maximum drama, minimal lasting impact. Board lost, Altman won. Business continued unchanged.',
        source: 'The Verge, Bloomberg',
        prediction: "Won't fundamentally change OpenAI trajectory",
        outcome: 'Confirmed - back to normal within days'
    },
    {
        id: 'gemini-pro',
        date: '2023-12-06',
        title: 'Google Gemini Pro released',
        hype: 9,
        reality: 5,
        category: 'model-release',
        company: 'google',
        impact: ['enterprise', 'consumer'],
        note: 'Overhyped launch. Misleading demo video. Actual product solid but not revolutionary as promised.',
        source: 'Google announcement',
        prediction: 'Strong but not category-leading',
        outcome: 'Confirmed - competitive but not dominant'
    },
    {
        id: 'llama-2',
        date: '2023-07-18',
        title: 'Llama 2 released (official open release)',
        hype: 7,
        reality: 8,
        category: 'model-release',
        company: 'meta',
        impact: ['research', 'open-source', 'enterprise'],
        note: 'First major intentional open release. Commercial license. Validated open approach.',
        source: 'Meta AI',
        prediction: 'Will accelerate open AI ecosystem',
        outcome: 'Confirmed - became foundation for countless projects'
    },
    {
        id: 'chatgpt-plugins',
        date: '2023-03-23',
        title: 'ChatGPT Plugins announced',
        hype: 9,
        reality: 3,
        category: 'product-launch',
        company: 'openai',
        impact: ['developer', 'consumer'],
        note: 'Promised to be the "App Store moment". Never gained traction. Quietly deprecated.',
        source: 'OpenAI announcement',
        prediction: 'Will create new ecosystem',
        outcome: 'Failed - replaced by GPTs and then abandoned'
    },
    {
        id: 'grok-launch',
        date: '2023-11-04',
        title: 'xAI launches Grok',
        hype: 8,
        reality: 5,
        category: 'product-launch',
        company: 'xai',
        impact: ['consumer'],
        note: 'Elon Musk\'s AI chatbot. "Rebellious" personality. Exclusive to X Premium. Competitive but not leading.',
        source: 'xAI announcement',
        prediction: 'Will compete with ChatGPT',
        outcome: 'Partial - niche product, not mainstream'
    },

    // ========== 2024 ==========
    {
        id: 'rabbit-r1',
        date: '2024-01-09',
        title: 'Rabbit R1 AI hardware announced',
        hype: 8,
        reality: 1,
        category: 'flop',
        company: 'other',
        impact: ['consumer'],
        note: 'Pure hype. Hardware solution to software problem. Basically just Android wrapper. Dead within months.',
        source: 'CES announcement',
        prediction: 'Will flop hard',
        outcome: 'Confirmed - irrelevant by March'
    },
    {
        id: 'sora-announcement',
        date: '2024-02-15',
        title: 'OpenAI announces Sora video generation',
        hype: 10,
        reality: 5,
        category: 'model-announcement',
        company: 'openai',
        impact: ['creative', 'cultural'],
        note: 'Impressive demo. But extremely limited access. Still not widely available a year later.',
        source: 'OpenAI blog',
        prediction: 'Will change video production',
        outcome: 'Pending - still waiting for real access'
    },
    {
        id: 'claude-opus-3',
        date: '2024-03-04',
        title: 'Claude 3 Opus released',
        hype: 7,
        reality: 9,
        category: 'model-release',
        company: 'anthropic',
        impact: ['research', 'enterprise'],
        note: 'Best model at launch. Quietly excellent. Reality exceeded hype. Strong reasoning capabilities.',
        source: 'Anthropic',
        prediction: 'Will be competitive',
        outcome: 'Confirmed - exceeded expectations'
    },
    {
        id: 'gpt-4o',
        date: '2024-05-13',
        title: 'GPT-4o released (omni-modal)',
        hype: 8,
        reality: 8,
        category: 'model-release',
        company: 'openai',
        impact: ['consumer', 'developer'],
        note: 'Fast, multimodal, cheaper. Lived up to hype. Real improvement over GPT-4.',
        source: 'OpenAI',
        prediction: 'Solid upgrade',
        outcome: 'Confirmed - meaningfully better'
    },
    {
        id: 'humane-ai-pin',
        date: '2024-04-11',
        title: 'Humane AI Pin ships',
        hype: 7,
        reality: 1,
        category: 'flop',
        company: 'other',
        impact: ['consumer'],
        note: 'Terrible reviews. Battery life issues. Projector useless in daylight. Company seeking sale.',
        source: 'The Verge, Marques Brownlee',
        prediction: 'Will fail',
        outcome: 'Confirmed - immediate flop'
    },
    {
        id: 'llama-3',
        date: '2024-04-18',
        title: 'Llama 3 released',
        hype: 8,
        reality: 8,
        category: 'model-release',
        company: 'meta',
        impact: ['research', 'open-source', 'enterprise'],
        note: 'Competitive with GPT-4 in many benchmarks. Strong open weights option.',
        source: 'Meta AI',
        prediction: 'Will close gap with closed models',
        outcome: 'Confirmed - impressive capability jump'
    },
    {
        id: 'claude-sonnet-35',
        date: '2024-06-20',
        title: 'Claude 3.5 Sonnet released',
        hype: 6,
        reality: 9,
        category: 'model-release',
        company: 'anthropic',
        impact: ['developer', 'enterprise'],
        note: 'Quietly became the best coding model. Fast, capable, affordable. Reality far exceeded expectations.',
        source: 'Anthropic',
        prediction: 'Good mid-tier model',
        outcome: 'Confirmed - became go-to for developers'
    },
    {
        id: 'claude-sonnet-4',
        date: '2024-10-22',
        title: 'Claude Sonnet 4 with computer use',
        hype: 7,
        reality: 8,
        category: 'capability-breakthrough',
        company: 'anthropic',
        impact: ['enterprise', 'automation', 'developer'],
        note: 'First mainstream model that can control computers. Agentic capabilities. Bigger deal than it seemed at launch.',
        source: 'Anthropic',
        prediction: 'Will enable new use cases',
        outcome: 'Confirmed - agents are real now'
    },
    {
        id: 'o1-preview',
        date: '2024-09-12',
        title: 'OpenAI o1 reasoning model released',
        hype: 8,
        reality: 7,
        category: 'model-release',
        company: 'openai',
        impact: ['research', 'developer'],
        note: 'New paradigm: chain-of-thought reasoning. Impressive on hard problems. Expensive and slow.',
        source: 'OpenAI',
        prediction: 'Will change how models think',
        outcome: 'Partial - impressive but not universally better'
    },
    {
        id: 'gemini-2',
        date: '2024-12-11',
        title: 'Gemini 2.0 Flash released',
        hype: 6,
        reality: 7,
        category: 'model-release',
        company: 'google',
        impact: ['enterprise', 'developer'],
        note: 'Quietly strong. Native multimodal. Actually delivered on promises this time.',
        source: 'Google',
        prediction: 'Will be competitive',
        outcome: 'Confirmed - solid release'
    },
    {
        id: 'grok-2',
        date: '2024-08-13',
        title: 'Grok-2 released',
        hype: 6,
        reality: 6,
        category: 'model-release',
        company: 'xai',
        impact: ['consumer'],
        note: 'Significant improvement. Image generation added. Still X-exclusive limits reach.',
        source: 'xAI',
        prediction: 'Will improve but stay niche',
        outcome: 'Confirmed - better but still limited audience'
    },

    // ========== 2025 ==========
    {
        id: 'deepseek-r1',
        date: '2025-01-20',
        title: 'DeepSeek R1 reasoning model (open source)',
        hype: 9,
        reality: 10,
        category: 'model-release',
        company: 'deepseek',
        impact: ['research', 'geopolitics', 'open-source'],
        note: 'Seismic event. Chinese lab matches OpenAI o1. Open weights. Showed sanctions not blocking progress. Market crashed.',
        source: 'DeepSeek paper',
        prediction: 'Will shift entire landscape',
        outcome: 'Confirmed - triggered market selloff, policy rethink'
    },
    {
        id: 'deepseek-v3',
        date: '2025-01-15',
        title: 'DeepSeek V3 released',
        hype: 6,
        reality: 9,
        category: 'model-release',
        company: 'deepseek',
        impact: ['research', 'open-source'],
        note: 'Trained for fraction of cost of competitors. Comparable performance. Changed cost assumptions.',
        source: 'DeepSeek',
        prediction: 'Strong open model',
        outcome: 'Confirmed - exceeded all expectations'
    },
    {
        id: 'claude-opus-45',
        date: '2025-02-01',
        title: 'Claude Opus 4.5 released',
        hype: 8,
        reality: 9,
        category: 'model-release',
        company: 'anthropic',
        impact: ['research', 'enterprise'],
        note: 'Best reasoning and creative writing. Genuinely felt like a step change. Extended thinking excels.',
        source: 'Anthropic',
        prediction: 'Will be excellent',
        outcome: 'Confirmed - raised the bar'
    }
];

// Export for use in app.js
if (typeof window !== 'undefined') {
    window.CATEGORIES = CATEGORIES;
    window.COMPANIES = COMPANIES;
    window.IMPACT_AREAS = IMPACT_AREAS;
    window.EVENTS = EVENTS;
}
