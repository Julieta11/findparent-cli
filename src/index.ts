import { File, findParent } from './fileSystem'

// Function to parse command-line arguments
function parseArgs() {
  const args = process.argv.slice(2)
  if (args.length !== 2) {
    console.error('ERROR: Usage: npm start <path1> <path2>')
    process.exit(1)
  }
  return args
}

// Function to build the file system based on provided paths
function buildFileSystem(paths: string[]): { root: File; files: Record<string, File> } {
  const root = new File('root')
  const files: Record<string, File> = {}

// Iterate over each provided path
  for (const path of paths) {
    const parts = path.split('/')
    let current = root

    for (const part of parts) {
      if (part) {
        current = current.findOrCreateChild(part)
      }
    }

    files[path] = current // Store the last node of the path in the files object
  }

  return { root, files }
}

function main() {
  const [path1, path2] = parseArgs()
  const { root, files } = buildFileSystem([path1, path2])

  const file1 = files[path1]
  const file2 = files[path2]

  if (!file1 || !file2) {
    console.error('Invalid file paths provided.')
    process.exit(1)
  }

  const parent = findParent(root, file1, file2)
  if (parent) {
    console.log(`Common parent: ${parent.name}`)
  } else {
    console.log('No common parent found.')
  }
}

main()
