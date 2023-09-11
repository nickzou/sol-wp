import path from 'path';
import fs from 'fs';
import formatMessage from '@utils/formatMessage/formatMessage';
import createFile from '@utils/createFile/createFile';

// Mock individual fs functions
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

jest.mock('@utils/formatMessage/formatMessage');

describe('createFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if the directory does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (formatMessage as jest.Mock).mockReturnValue('Mock error message');

    expect(() =>
      createFile({
        directoryPath: '/fake/dir',
        fileName: 'test.txt',
        fileContent: 'Hello, World!'
      })
    ).toThrowError('Mock error message');
  });

  it('should create a file if the directory exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (formatMessage as jest.Mock).mockReturnValue('Mock success message');

    console.log = jest.fn();

    createFile({
      directoryPath: '/fake/dir',
      fileName: 'test.txt',
      fileContent: 'Hello, World!'
    });

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join('/fake/dir', 'test.txt'),
      'Hello, World!'
    );
    expect(console.log).toHaveBeenCalledWith('Mock success message');
  });
});
