const generateID = () => Math.random().toString(36).replace(/[^a-z]+/g, '')

export { generateID }
