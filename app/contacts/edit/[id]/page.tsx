'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, redirect } from 'next/navigation'; // Use `useParams` to get dynamic route parameter
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';

const EditContactPage = () => { 
   const { data: session, status } = useSession(); // Access session and its status
    const router = useRouter();
    
  const { id } = useParams(); // Use `useParams` to get the dynamic route parameter
  const [contact, setContact] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null); // Changed to File type
 


    // Check if the session is still loading or if the user is not authenticated
    useEffect(() => {
      if (status === 'loading') return; // Wait for session to load
      if (!session) {
        router.push('/signup'); // Redirect to signup page if not authenticated
      }
    }, [status, session, router]);

  // Fetch the contact data based on the ID
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`https://contact-app-newbac.gmparstone99.workers.dev/api/contacts/${id}`, {
          headers: {
            Authorization: 'Bearer my-secret-token',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch contact');
        }
        const data = await response.json();
        setContact(data.contact);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]); // Depend on `id` for re-fetching

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', contact.name);
    formData.append('email', contact.email);
    formData.append('phone', contact.phone);
    formData.append('details', contact.details);
    if (image) formData.append('image', image); // Append image if it's selected

    try {
      const response = await fetch(`https://contact-app-newbac.gmparstone99.workers.dev/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer my-secret-token',
        },
        body: formData,
      });

      if (response.ok) {
        // Redirect to the contacts page after successful update
        router.push('/contacts');
      } else {
        setError('Failed to update contact');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Render loading, error, or form data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!contact) {
    return <p>No contact found</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-6">Edit Contact</h1>
      <Card className="max-w-lg mx-auto p-6 shadow-md rounded-lg">
        <CardHeader>
          <h2 className="text-xl font-semibold">Edit Contact Information</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                id="phone"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="image">Profile Picture</Label>
              <Input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files?.[0] || null)} // Handling file selection
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="details">Details (Optional)</Label>
              <Textarea
                id="details"
                value={contact.details || ""}
                onChange={(e) => setContact({ ...contact, details: e.target.value })}
                className="mt-2"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-green-600 text-white hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Contact'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditContactPage;
