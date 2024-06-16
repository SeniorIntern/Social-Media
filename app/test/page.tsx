'use client';

import React from 'react';

export default function Page() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div>
      <p>Base URL: {baseURL}</p>
    </div>
  );
}
