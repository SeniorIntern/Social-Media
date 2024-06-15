import { Player } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { CACHE_KEY_PLAYER, TOAST_KEY_ANNOUNCE } from '@/constants';
import apiClient from '@/services/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, ReactNode, useCallback, useState } from 'react';
import { Accept, FileWithPath, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

type Props = {
  title: string;
  type: 'profile' | 'cover';
  userId: string;
  children: ReactNode;
};

const ImageUploadDialog = ({ title, type, userId, children }: Props) => {
  console.log('mounted');
  // const imageRef = useRef<HTMLInputElement>(null);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const resourceName = type === 'profile' ? 'profileImage' : 'coverImage';

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      apiClient
        .patch<Player>('/users/' + resourceName, formData)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_PLAYER, userId]
      });
      toast.success('Image is updated', {
        id: TOAST_KEY_ANNOUNCE,
        duration: 3000
      });
    },
    onError: (err) => {
      toast.error(err.message, { id: TOAST_KEY_ANNOUNCE, duration: 3000 });
    }
  });

  const ClearAndDrop = () => {
    clearDropZone();
    openDropZone();
  };

  const clearDropZone = () => {
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    // if (imageRef.current) imageRef.current.value = '';
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.dir(acceptedFiles);

    if (acceptedFiles.length > 1) {
      ClearAndDrop();
      toast.error('You cannot select more than 1 file', {
        duration: 3000,
        id: TOAST_KEY_ANNOUNCE
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accept: Accept = {
    'image/png': [],
    'image/jpeg': []
  };

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    open: openDropZone
  } = useDropzone({ onDrop, accept });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof acceptedFiles[0] === 'undefined') return;

    const formData = new FormData();
    formData.append(resourceName, acceptedFiles[0]);

    try {
      mutation.mutate(formData);
      setIsDialogOpen(false);
      toast.success('Image will be updated soon', { id: TOAST_KEY_ANNOUNCE });
    } catch (err: unknown) {
      setIsDialogOpen(false);
      if (err instanceof Error)
        toast.error(err.message, { id: TOAST_KEY_ANNOUNCE });
    }
  };

  const inputFiles = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="text-blue-600">
        {children}
      </DialogTrigger>
      <DialogContent className="w-full max-w-fit">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div {...getRootProps()} className="">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="cursor-pointer rounded-md border-2 border-dashed border-muted px-4 py-8 text-mutedtext">
                <p className="border-mutedtext text-center">
                  {type === 'profile'
                    ? 'Drag & drop profile picture here, or click to select image.'
                    : type === 'cover'
                      ? 'Drag & drop cover photo here, or click to select image.'
                      : 'Drag &apos;n&apos; drop some files here, or click to select files.'}
                </p>
                <p className="text-center italic">
                  (Only *.jpeg, *.jpg, and *.png image will be accepted)
                </p>
                {inputFiles}
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              variant="plain"
              disabled={mutation.isPending || acceptedFiles.length === 0}
              type="submit"
            >
              {mutation.isPending ? 'Submitting' : 'Save'}
            </Button>
            <Button variant="plain" onClick={ClearAndDrop} type="button">
              Clear and Drop
            </Button>
            <DialogClose asChild>
              <Button
                disabled={mutation.isPending}
                onClick={clearDropZone}
                type="button"
                variant="destructive"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
