# FindParent CLI

## Overview

`FindParent` is a command-line tool to navigate a dynamically built file system and find the closest parent directory that contains two given file paths. The file system is constructed based on the input paths provided by the user.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://www.npmjs.com/)
- [Jest](https://jestjs.io/) (for running tests)


### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/findparent-cli.git
cd findparent-cli
```

2. Install the dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Usage

### Running the CLI

To find the common parent of two file paths, use the following command:

```bash
npm start "<path1>" "<path2>"
```

### For example:

```bash
npm start "a/b/c" "a/b/d"
```

This command will output:
```less
Common parent: b
```

### Example File System
Given the file system structure:

```bash
root
├── a
│   ├── c
│   └── d
└── b
```

    npm start "a/c" "a/d" will output Common parent: a
    
    npm start "a/c" "b" will output Common parent: root


## Development

### Adding New Tests
To add new tests, update the test/fileSystem.spec.ts file. You can run the tests using:

```bash
npm test
```

### Building the File System
The file system is dynamically built from the paths provided. The buildFileSystem function handles the creation of the file nodes and their hierarchical structure.

## Explanation of the `findParent` Function

The `findParent` function leverages Depth-First Search (DFS) to find the common parent directory of two given files. Here's how it works:

### `findPath` Function

1. **Start from the Root:** The function begins at the root node and pushes it onto the path.
2. **Check if Root is the Target:** If the current node (`root`) is the target node, the function returns `true`.
3. **Recursively Search Children:** If the current node is not the target, the function recursively searches each child.
   - If any recursive call returns `true`, indicating the target was found in that subtree, the current call also returns `true`.
   - If no children lead to the target, the current node is removed from the path (backtracking) and the function returns `false`.
4. **Path Construction:** By the end of the function, if the target is found, `path` contains the sequence of nodes from the root to the target.

### `findParent` Function

1. **Find Paths:** The function uses `findPath` to get the paths from the root to both target files (`file1` and `file2`).
2. **Compare Paths:** The function then compares these paths to find the deepest common ancestor.
   - It iterates through both paths until the nodes differ.
   - The last common node before the paths diverge is the closest common parent.


