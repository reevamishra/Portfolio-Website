#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const BUILD_DIR = path.resolve(process.cwd(), 'build');
const RESERVED_PATHS = [path.resolve(BUILD_DIR, 'index.html')];
const RESERVED_DIRS = ['_next', 'static'];

/**
 * Cleans up Next.js export output, removing all index.html files except the root.
 * The rest are filled in later when pre-rendering with react-snap.
 */
const cleanHTML = dir => {
  // Scan directory for file contents
  const files = fs.readdirSync(dir);

  // Sort through files
  files.forEach(file => {
    const filePath = path.resolve(dir, file);

    // Delete duplicate HTML
    if (filePath.endsWith('.html') && !RESERVED_PATHS.includes(filePath)) {
      return fs.unlinkSync(filePath);
    }

    // Recursively clean HTML in subfolders
    if (fs.lstatSync(filePath).isDirectory() && !RESERVED_DIRS.includes(file)) {
      return cleanHTML(filePath);
    }
  });
};

// Clean
cleanHTML(BUILD_DIR);
