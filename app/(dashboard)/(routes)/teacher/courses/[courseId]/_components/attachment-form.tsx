'use client';
import { useCallback, useState } from 'react';
import * as z from 'zod';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
  File,
  ImageIcon,
  Loader2,
  PencilIcon,
  PlusCircleIcon,
  XIcon,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Attachment, Course } from '@prisma/client';
import FileUpload from '@/components/file-upload';

interface IAttachmentFrom {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentFrom: React.FC<IAttachmentFrom> = ({
  initialData,
  courseId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<
    string | null
  >(null);

  const router = useRouter();

  const toggleEdit = useCallback(
    () => setIsEditing((prev) => !prev),
    [],
  );

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(
        `/api/courses/${courseId}/attachments/${id}`,
      );
    } catch (error) {
      console.error('error', error);
      toast.error('Somthing went wrong');
    } finally {
      setDeletingId(null);
    }
  };

  const onSubmit = async (
    value: z.infer<typeof formSchema>,
  ) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/attachments`,
        value,
      );
      toggleEdit();
      toast.success('Course updated');
      router.refresh();
    } catch (error) {
      console.error('error', error);
      toast.error('Somthing went wrong');
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-sm line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() =>
                        onDelete(attachment.id)
                      }
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to
            complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentFrom;
