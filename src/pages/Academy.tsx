import { useState } from 'react';

const LEVELS = [
  {
    id: 1,
    title: 'Level 1: Prompting Basics',
    lessons: [
      { id: '1-1', title: 'What is a Prompt?', content: 'A prompt is the instruction you give an AI model. Bad: "Tell me about dogs." Good: "List 5 dog breeds suited for apartments with 2-sentence descriptions." Real-life: support bots answer FAQs consistently.' },
      { id: '1-2', title: 'Clarity & Specificity', content: 'Vague prompts yield vague answers. Bad: "Write an email." Good: "Write a 100-word professional email declining a meeting, polite tone." Real-life: recruiters generate tailored rejection emails.' },
      { id: '1-3', title: 'Role Prompting', content: 'Assign a persona. Bad: "Review this contract." Good: "You are a senior contract lawyer. Flag risky clauses in bullet points." Real-life: legal teams reduce review time.' },
      { id: '1-4', title: 'Few-Shot Examples', content: 'Provide 2-3 examples to steer style. Bad: "Classify sentiment." Good: "Classify as positive/negative. Example: \'Great product!\' -> positive." Real-life: e-commerce tags reviews.' },
    ],
  },
  {
    id: 2,
    title: 'Level 2: Advanced Techniques',
    lessons: [
      { id: '2-1', title: 'Chain of Thought', content: 'Ask step-by-step reasoning. Bad: "What is 23*47?" Good: "Solve 23*47 and show your work." Real-life: finance teams audit calculations.' },
      { id: '2-2', title: 'Temperature & Sampling', content: 'Temperature 0 deterministic, 1 creative. Bad: "Write a story (temp 1.5)." Good: "Write a story at temp 0.7 for balanced creativity." Real-life: marketing copy.' },
      { id: '2-3', title: 'System Prompts', content: 'Persistent instructions. Bad: "Respond nicely." Good: "You are a helpful assistant. Always reply in JSON with keys answer, confidence." Real-life: API pipelines parse outputs.' },
      { id: '2-4', title: 'Prompt Chaining', content: 'Split complex tasks. Bad: "Translate and summarize this long doc." Good: "Step1: extract key points. Step2: summarize. Step3: translate to French." Real-life: multilingual content.' },
    ],
  },
  {
    id: 3,
    title: 'Level 3: Structured Outputs',
    lessons: [
      { id: '3-1', title: 'JSON Mode', content: 'Force JSON. Bad: "Give me user data." Good: "Return JSON: {name, age, city}." Real-life: app integrations.' },
      { id: '3-2', title: 'Schema Validation', content: 'Define fields/types. Bad: "List products." Good: "List products as array of {id:number,name:string,price:number}." Real-life: catalog imports.' },
      { id: '3-3', title: 'Tables & Markdown', content: 'Request tables. Bad: "Compare plans." Good: "Compare plans in a markdown table with columns Plan, Price, Features." Real-life: sales decks.' },
      { id: '3-4', title: 'Constrained Generation', content: 'Limit output. Bad: "Explain AI." Good: "Explain AI in exactly 3 sentences." Real-life: UI tooltips.' },
    ],
  },
  {
    id: 4,
    title: 'Level 4: RAG & Context',
    lessons: [
      { id: '4-1', title: 'Providing Context', content: 'Paste relevant docs. Bad: "Answer about our policy." Good: "Using the policy text below, answer: ..." Real-life: HR chatbots.' },
      { id: '4-2', title: 'Citations', content: 'Ask for sources. Bad: "Summarize." Good: "Summarize and cite paragraph numbers." Real-life: research assistants.' },
      { id: '4-3', title: 'Chunking', content: 'Break large inputs. Bad: "Analyze this 100-page PDF." Good: "Analyze section 1 (pages 1-10) then section 2." Real-life: legal review.' },
      { id: '4-4', title: 'Grounding', content: 'Prevent hallucinations. Bad: "Invent stats." Good: "Only use provided data; say unknown if missing." Real-life: finance reporting.' },
    ],
  },
  {
    id: 5,
    title: 'Level 5: Agents & Tools',
    lessons: [
      { id: '5-1', title: 'Tool Use', content: 'Let model call functions. Bad: "Book a flight." Good: "Use search_flights tool with destination/date, then confirm." Real-life: travel assistants.' },
      { id: '5-2', title: 'Planning', content: 'Ask for plan first. Bad: "Build an app." Good: "First outline steps, then execute step 1." Real-life: project automation.' },
      { id: '5-3', title: 'Memory', content: 'Carry context across turns. Bad: "Continue." Good: "Recall earlier constraints: budget $5k, timeline 2 weeks." Real-life: long workflows.' },
      { id: '5-4', title: 'Error Recovery', content: 'Handle failures. Bad: "Try again." Good: "If tool fails, explain error and suggest alternative." Real-life: robust agents.' },
    ],
  },
  {
    id: 6,
    title: 'Level 6: Mastery',
    lessons: [
      { id: '6-1', title: 'Prompt Optimization', content: 'Iterate and measure. Bad: "One-shot prompt." Good: "A/B test 3 variants, pick highest accuracy." Real-life: production systems.' },
      { id: '6-2', title: 'Safety & Guardrails', content: 'Prevent harm. Bad: "Answer anything." Good: "Refuse unsafe requests; provide safe alternatives." Real-life: public apps.' },
      { id: '6-3', title: 'Evaluation', content: 'Define metrics. Bad: "Looks good." Good: "Score on accuracy, relevance, latency with rubric." Real-life: CI for prompts.' },
      { id: '6-4', title: 'Cost & Latency', content: 'Optimize tokens. Bad: "Include full doc." Good: "Summarize doc to 500 tokens first." Real-life: scaling apps.' },
    ],
  },
];

export default function Academy() {
  const [open, setOpen] = useState<string | null>('1-1');
...
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Learning Academy</h1>
        <p className="text-slate-400 mt-2">6 levels from basics to mastery (offline-ready). Each lesson shows good vs bad prompts.</p>
        <button onClick={() => setOpen('1-1')} className="mt-3 px-4 py-2 text-sm font-medium text-slate-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors">
          Continue Learning (Start Level 1)
        </button>
      </header>
      {LEVELS.map((level) => (
        <div key={level.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white">{level.title}</h2>
          <ul className="mt-3 space-y-2">
            {level.lessons.map((l) => (
              <li key={l.id}>
                <button onClick={() => setOpen(open === l.id ? null : l.id)} className="text-cyan-400 hover:underline">
                  {l.title}
                </button>
                {open === l.id && <p className="text-slate-300 mt-1 ml-4">{l.content}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
