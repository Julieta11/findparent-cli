export class File {
  children: File[]
  name: string

  constructor(name: string) {
    this.children = []
    this.name = name
  }

  addChild(file: File) {
    this.children.push(file)
  }

  findOrCreateChild(name: string): File {
    let child = this.children.find((child) => child.name === name)
    if (!child) {
      child = new File(name)
      this.addChild(child)
    }
    return child
  }
}

function findPath(root: File, target: File, path: File[]): boolean {
  path.push(root)

  if (root === target) {
    return true
  }

  // Recursively search in the children of the current file
  for (const child of root.children) {
    if (findPath(child, target, path)) {
      return true
    }
  }

  path.pop()
  return false
}

export function findParent(root: File, file1: File, file2: File): File | null {
  const path1: File[] = []
  const path2: File[] = []

  // Find paths from root to file1 and file2
  if (!findPath(root, file1, path1) || !findPath(root, file2, path2)) {
    return null
  }

  // Iterate through the paths to find the last common file
  let i = 0
  while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
    i++
  }

  return path1[i - 1]
}
