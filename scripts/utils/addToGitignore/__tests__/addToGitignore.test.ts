import fs from 'fs';
import addToGitignore from '../addToGitignore'; // Import your function here

describe('addToGitignore', () => {
  const testGitignorePath = `${__dirname}/.gitignore`; // Use a test-specific gitignore path
  const originalContent = 'entry1\nentry2\nentry3\nentry4\n';

  beforeEach(() => {
    // Create a temporary .gitignore file with some content for testing
    fs.writeFileSync(testGitignorePath, originalContent, 'utf-8');
  });

  afterEach(() => {
    // Remove the temporary .gitignore file after each test
    fs.unlinkSync(testGitignorePath);
  });

  it('adds entries to .gitignore', () => {
    const addEntries = ['entry5', 'entry6'];

    addToGitignore(testGitignorePath, addEntries);

    const updatedContent = fs.readFileSync(testGitignorePath, 'utf-8');
    expect(updatedContent).toContain('entry5');
    expect(updatedContent).toContain('entry6');
  });

  it('handles empty entries', () => {
    const addEntries: string[] = [];

    addToGitignore(testGitignorePath, addEntries);

    const updatedContent = fs.readFileSync(testGitignorePath, 'utf-8');
    expect(updatedContent).toEqual(originalContent);
  });

  it('handles entries that already exist', () => {
    const addEntries = ['entry1', 'entry2'];

    addToGitignore(testGitignorePath, addEntries);

    const updatedContent = fs.readFileSync(testGitignorePath, 'utf-8');
    expect(updatedContent).toEqual(originalContent); // Entries should not be duplicated
  });
});
