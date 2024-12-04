import { zodFunction } from 'openai/helpers/zod'
import { z } from 'zod'
import { openai } from './ai.js'
import { systemPrompt } from './systemPrompt.js'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
  tools,
}) => {
  const formattedTools = tools.map(zodFunction)
  console.log(formattedTools,'tools')
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages,
    ],
    temperature,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
    
  })

  return response.choices[0].message
}