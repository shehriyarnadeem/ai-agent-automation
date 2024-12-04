import { runLLM } from './llm.js'
import { runTool } from './toolRunner.js'
import { addMessages, getMessages, saveToolResponse } from './memory.js'
import { logMessage, showLoader } from './ui.js'

export const runAgent = async ({
  turns = 10,
  userMessage,
  tools = [],
}) => {
  await addMessages([
    {
      role: 'user',
      content: userMessage,
    },
  ])

  const loader = showLoader('Thinking...')

  while (true) {
    const history = await getMessages()
    const response = await runLLM({
      messages: history,
      tools,
    })

    await addMessages([response])

    logMessage(response)

    // if (response.content) {
    //   loader.stop()
    //   return getMessages()
    // }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0]
      loader.update(`executing: ${toolCall.function.name}`)
      const toolResponse = await runTool(toolCall, userMessage)
      await saveToolResponse(toolCall.id, toolResponse)

      loader.update(`executed: ${toolCall.function.name}`)
    }
  }
}