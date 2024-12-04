import { JSONFilePreset } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid'

export const addMetadata = (message) => ({
  ...message,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
})

export const removeMetadata = (message) => {
  const { id, createdAt, ...messageWithoutMetadata } = message
  return messageWithoutMetadata
}

const defaultData = { messages: [] }

export const getDb = async () => {
  const db = await JSONFilePreset('db.json', defaultData)

  return db
}

export const addMessages = async (messages) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))
  await db.write()
}

export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages.map(removeMetadata)
}

export const saveToolResponse = async (toolCallId,toolResponse) => {
  return await addMessages([
    { role: 'tool', content: toolResponse, tool_call_id: toolCallId },
  ])
}

export const clearMessages = async (keepLast) => {
  const db = await getDb()
  db.data.messages = db.data.messages.slice(-(keepLast ?? 0))
  await db.write()
}