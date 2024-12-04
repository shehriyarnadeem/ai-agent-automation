
import { dadJoke } from './tools/dadJoke.js'
import { sendEmail } from './tools/emailSend.js'

export const runTool = async (toolCall, userMessage
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments),
  }
  switch (toolCall.function.name) {
    case 'dad_joke':
      return dadJoke(input)

    case 'email_sending_tool':
        return sendEmail(input)  
    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}