import fs from 'fs';
import removeFromGitignore from '../removeFromGitignore'; // Import your function here

describe('removeFromGitignore', () => {
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

  it('removes entries from .gitignore', () => {
    const removeEntries = ['entry2', 'entry4'];

    removeFromGitignore(testGitignorePath, removeEntries);

    const updatedContent = fs.readFileSync(testGitignorePath, 'utf-8');
    expect(updatedContent).toEqual('entry1\nentry3\n');
  });

  it('handles entries that do not exist', () => {
    const removeEntries = ['nonexistentEntry'];

    removeFromGitignore(testGitignorePath, removeEntries);

    const updatedContent = fs.readFileSync(testGitignorePath, 'utf-8');
    expect(updatedContent).toEqual(originalContent);
  });
});
