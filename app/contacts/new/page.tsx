'use client';

import React, { useState, useEffect } from 'react';
import {  useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';

const NewContactPage = () => {
  const { data: session, status } = useSession(); // Access session and its status
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [image, setImage] = useState<File | null>(null); // Changed to File type
  const [details, setDetails] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Check if the session is still loading or if the user is not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    if (!session) {
      router.push('/signup'); // Redirect to signup page if not authenticated
    }
  }, [status, session, router]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('details', details);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('https://contact-app-newbac.gmparstone99.workers.dev/api/contacts', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer my-secret-token', // Add authorization header
        },
        body: formData,
      });

      if (response.ok) {
        // If the contact was successfully created, navigate to the contacts page
        router.push('/contacts');
      } else {
        console.error('Failed to create contact:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating contact:', error);
    } finally {
      setLoading(false);
    }
  };

  // If the session is still loading, return null or a loading state
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Create New Contact</h1>
      <Card className="max-w-lg mx-auto p-6 shadow-md rounded-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold">Contact Information</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="image">Profile Picture</Label>
              <Input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files?.[0] || null)} // Handling file selection
                className="mt-2"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="details">Details (Optional)</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-green-600 text-white hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Contact'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewContactPage;
