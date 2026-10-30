import { db } from './index.ts';
import { learningPaths, modules, lessons } from './schema.ts';

const curriculum = [
  {
    title: "Level 1: AI Explorer",
    description: "Begin your journey into AI basics.",
    modules: [
      {
        title: "Foundation of AI",
        lessons: [
          { title: "Introduction to AI", content: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn. We explore the history and types of AI: Narrow AI and General AI." },
          { title: "Machine Learning Basics", content: "Machine Learning is a subset of AI that focuses on building systems that learn from data. We cover supervised, unsupervised, and reinforcement learning." },
          { title: "Generative AI Overview", content: "Generative AI models create new content, such as text, images, and audio, by understanding patterns in existing data. We look at foundational models." },
          { title: "AI Ethics & Safety", content: "Understand the importance of responsible AI development, including bias, transparency, and safety guidelines for interacting with powerful AI systems." },
        ]
      }
    ]
  },
  {
    title: "Level 2: Prompt Apprentice",
    description: "Master the art of prompting.",
    modules: [
      {
        title: "Prompt Fundamentals",
        lessons: [
          { title: "Prompt Anatomy", content: "A prompt is composed of instructions, context, input data, and output indicators. We decompose a well-formed prompt into these components." },
          { title: "Clarity & Specificity", content: "Vague prompts lead to vague results. Learn to write precise instructions, define the target audience, and specify constraints." },
          { title: "Zero-Shot Prompting", content: "Learn to give direct instructions without providing prior examples, understanding the limits of the model's inherent knowledge." },
          { title: "Iterative Prompting", content: "Refining prompts through a cycle of testing and adjusting instructions based on the AI's output." },
        ]
      }
    ]
  },
  {
    title: "Level 3: Prompt Engineer",
    description: "Intermediate prompting techniques.",
    modules: [
      {
        title: "Advanced Prompting",
        lessons: [
          { title: "Chain-of-Thought Prompting", content: "Force the model to show its reasoning steps, significantly improving performance on complex logic and math tasks." },
          { title: "Few-Shot Prompting", content: "Improve results by providing a few examples within the prompt to guide the model's pattern recognition and output style." },
          { title: "Structured Prompting", content: "Learn how to request specific output formats like JSON or XML to make AI outputs programmatic and machine-readable." },
          { title: "System Instructions", content: "Set global behavior, personality, and constraints for the AI model using system instructions to enforce consistency across interactions." },
        ]
      }
    ]
  },
  {
    title: "Level 4: AI Automator",
    description: "Building AI workflows and tools.",
    modules: [
      {
        title: "AI Workflows",
        lessons: [
          { title: "Prompt Chaining", content: "Break complex tasks into small, manageable prompts and link them together into a structured, reliable automated workflow." },
          { title: "Tool Calling Basics", content: "Enable AI models to call external functions (e.g., search tools, calculators) to overcome their knowledge limitations and perform actions." },
          { title: "Retrieval Augmented Generation (RAG)", content: "Provide AI with access to external knowledge bases so it can answer questions based on your specific documents and data." },
          { title: "Evaluation & Benchmarking", content: "Techniques to test and measure AI output quality systematically, ensuring your prompts behave consistently across different inputs." },
        ]
      }
    ]
  },
  {
    title: "Level 5: AI Architect",
    description: "Mastery and deployment.",
    modules: [
      {
        title: "AI Architecture",
        lessons: [
          { title: "LLM Fundamentals", content: "Deep dive into Transformers and attention mechanisms, understanding how LLMs process information and predict tokens." },
          { title: "AI Agents", content: "Explore the concept of AI agents that can plan, reason, and take action autonomously to reach multi-step goals." },
          { title: "Fine-Tuning vs. RAG", content: "Understand the trade-offs between fine-tuning a model on specific data and using RAG, and when to use each approach." },
          { title: "Deployment & Scaling", content: "Learn best practices for deploying AI models into production, handling rate limiting, security, and scalability challenges." },
        ]
      }
    ]
  }
];

async function resetAndSeed() {
  await db.delete(lessons);
  await db.delete(modules);
  await db.delete(learningPaths);

  for (let l = 0; l < curriculum.length; l++) {
    const [path] = await db.insert(learningPaths).values({
      title: curriculum[l].title,
      description: curriculum[l].description,
      level: l + 1,
    }).returning();

    for (const mod of curriculum[l].modules) {
      const [m] = await db.insert(modules).values({
        pathId: path.id,
        title: mod.title,
        description: "",
        order: 1,
      }).returning();

      for (let i = 0; i < mod.lessons.length; i++) {
        await db.insert(lessons).values({
          moduleId: m.id,
          title: mod.lessons[i].title,
          content: mod.lessons[i].content,
          type: 'theory',
          order: i + 1,
        });
      }
    }
  }
}

resetAndSeed().then(() => console.log("Seeding complete."));
