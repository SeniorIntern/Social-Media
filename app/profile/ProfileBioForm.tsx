'use client';

import { Player, PlayerIntro } from '@/app/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CACHE_KEY_PLAYER, TOAST_KEY_ANNOUNCE } from '@/constants';
import apiClient from '@/services/apiClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  shortIntro: z
    .string()
    .min(10, { message: 'Introduction must be at least 10 characters.' })
    .max(60, { message: 'Introduction must not be more than 40 characters' }),
  study: z
    .string()
    .min(2, { message: 'School name must be at least 2 characters.' })
    .max(20, { message: 'School name must not be more than 40 characters' }),
  location: z
    .string()
    .min(2, { message: 'Location name must be at least 2 characters.' })
    .max(40, { message: 'Location name must not be more than 40 characters' }),
  job: z
    .string()
    .min(2, { message: 'Workplace name must be at least 2 characters.' })
    .max(40, { message: 'Workplace name must not be more than 40 characters' })
});

type Props = {
  openBioDialog: Dispatch<SetStateAction<boolean>>;
  userIntro: PlayerIntro;
  userId: string;
};

const ProfileBioForm = ({ userIntro, openBioDialog, userId }: Props) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: z.infer<typeof FormSchema>) =>
      apiClient.patch<Player>('/users/intro', formData).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_PLAYER, userId]
      });
      toast.success('Your information is updated', { id: TOAST_KEY_ANNOUNCE });
      openBioDialog(false);
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shortIntro: userIntro?.shortIntro ? userIntro.shortIntro : '',
      study: userIntro?.study ? userIntro.study : '',
      location: userIntro?.location ? userIntro.location : '',
      job: userIntro?.job ? userIntro.job : ''
    }
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="shortIntro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Introduction</FormLabel>
              <FormControl>
                <Input placeholder="My hobby is..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title of your job</FormLabel>
              <FormControl>
                <Input placeholder="Web developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your temporary address</FormLabel>
              <FormControl>
                <Input placeholder="Pokhara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="study"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School/College Name</FormLabel>
              <FormControl>
                <Input placeholder="Abc Secondary School" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? 'Submitting' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileBioForm;
