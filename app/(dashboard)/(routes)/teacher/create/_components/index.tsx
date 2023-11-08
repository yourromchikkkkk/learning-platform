'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ROUTES_PATH } from '@/lib/const';
import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is requires',
  }),
});

const CreateCourseForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (
    value: z.infer<typeof formSchema>,
  ) => {
    try {
      const response = await axios.post(
        '/api/courses',
        value,
      );

      router.push(`/teacher/courses/${response.data.id}`);

      toast.success('Course created successfully');
    } catch {
      toast.error('Ooops! Something went wrong.');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course title</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder='e.g. "Advanced web development"'
                  {...field}
                ></Input>
              </FormControl>
              <FormDescription>
                What will you teach in this course
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Link href={ROUTES_PATH.TeacherCourses}>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateCourseForm;
