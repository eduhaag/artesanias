import fs from 'fs';

export const deleteFile = async (filepath: string): Promise<void> => {
  try {
    await fs.promises.stat(filepath);
  } catch (error) {
    return;
  }

  await fs.promises.unlink(filepath);
};
