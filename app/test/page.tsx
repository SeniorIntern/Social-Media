export default function Page() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <section className="space-y-6">
      <div>
        <p>Base Url: {baseURL}</p>
      </div>
    </section>
  );
}
