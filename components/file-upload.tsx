'use client';

import { UploadDropzone } from '@/lib/utils/uploadthing';
import type { UploadthingFileRouter } from '@/app/api/uploadthing/core';
import toast from 'react-hot-toast';

interface IUploadFile {
  onChange: (url?: string) => void;
  endpoint: keyof UploadthingFileRouter;
}

const FileUpload: React.FC<IUploadFile> = ({
  endpoint,
  onChange,
}) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(response) => {
        onChange(response?.[0]?.url);
      }}
      onUploadError={(error: Error) =>
        toast.error(`${error.message}`)
      }
    />
  );
};

export default FileUpload;
