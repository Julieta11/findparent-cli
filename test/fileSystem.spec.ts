import { File, findParent } from '../src/filesystem'

describe('File', () => {
  let root: File

  beforeEach(() => {
    root = new File('root')
  })

  test('should initialize with given name and empty children', () => {
    const file = new File('test')
    expect(file.name).toBe('test')
    expect(file.children).toEqual([])
  })

  test('should add a child file', () => {
    const child = new File('child')
    root.addChild(child)
    expect(root.children).toContain(child)
  })

  test('should find or create a child file', () => {
    const child = root.findOrCreateChild('child')
    expect(child.name).toBe('child')
    expect(root.children).toContain(child)

    const sameChild = root.findOrCreateChild('child')
    expect(sameChild).toBe(child)
  })
})

describe('findParent', () => {
  let root: File
  let child1: File
  let child2: File
  let child3: File
  let grandChild1: File
  let grandChild2: File

  beforeEach(() => {
    root = new File('root')
    child1 = new File('child1')
    child2 = new File('child2')
    child3 = new File('child3')
    grandChild1 = new File('grandChild1')
    grandChild2 = new File('grandChild2')

    root.addChild(child1)
    root.addChild(child2)
    child1.addChild(child3)
    child3.addChild(grandChild1)
    child2.addChild(grandChild2)
  })

  test('should find common parent of two files', () => {
    const parent = findParent(root, child3, grandChild1)
    expect(parent).toBe(child3)

    const commonParent = findParent(root, child1, child2)
    expect(commonParent).toBe(root)
  })

  test('should return null if any file is not found', () => {
    const nonExistent = new File('nonExistent')
    const parent = findParent(root, child1, nonExistent)
    expect(parent).toBeNull()
  })

  test('should return root if both files are the root', () => {
    const parent = findParent(root, root, root)
    expect(parent).toBe(root)
  })

  test('should handle empty tree', () => {
    const emptyRoot = new File('emptyRoot')
    const parent = findParent(emptyRoot, new File('file1'), new File('file2'))
    expect(parent).toBeNull()
  })

  test('should handle non-existent files', () => {
    const parent = findParent(root, new File('nonExistent1'), new File('nonExistent2'))
    expect(parent).toBeNull()
  })

  test('should handle files at different depths', () => {
    const parent = findParent(root, child1, grandChild2)
    expect(parent).toBe(root)
  })

  test('should handle multiple levels of nested children', () => {
    const parent = findParent(root, grandChild1, grandChild2)
    expect(parent).toBe(root)

    const nestedParent = findParent(root, child3, grandChild1)
    expect(nestedParent).toBe(child3)
  })
})
