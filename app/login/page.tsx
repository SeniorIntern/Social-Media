'use client';

import { login } from '@/action';
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
import { TOAST_KEY_AUTH } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import bannerImage from './banner.avif';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7, {
    message: 'Password must be atleast 7 characters long'
  })
});

export type LoginData = z.infer<typeof FormSchema>;

export default function Page() {
  const router = useRouter();

  async function clientAction(formData: LoginData) {
    const result = await login(formData);
    if (result?.status) {
      toast.success('Login Sucessful', { id: TOAST_KEY_AUTH });
      router.push('/profile');
    } else {
      toast.error(result?.data || 'Request Failed', { id: TOAST_KEY_AUTH });
    }
  }

  const form = useForm<LoginData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: 'nik@gmail.com',
      password: 'Nikhil123'
    }
  });

  function onSubmit(data: LoginData) {
    clientAction(data);
  }

  return (
    <div className="h-full w-full grow lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-sm text-stone-400">
              Enter your email below to login to your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Enter Your Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="dan@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Enter Your Password
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="*******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white hover:text-black"
              >
                Submit
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm text-white">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden h-full w-full bg-muted lg:block">
        <Image
          src={bannerImage}
          alt="Banner image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}
