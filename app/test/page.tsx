import { cookies } from 'next/headers';

function EnvDisplay() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div>
      <p>Base URL: {baseURL}</p>
    </div>
  );
}

function CookieDisplay() {
  const cookieStore = cookies();
  return cookieStore.getAll().map((cookie) => (
    <div key={cookie.name} className='my-4'>
      <p>Cookie Name: {cookie.name}</p>
      <p>Cookie Value: {cookie.value}</p>
    </div>
  ));
}

export default function Page() {
  return (
    <section>
      <EnvDisplay />
      <CookieDisplay />
    </section>
  );
}
