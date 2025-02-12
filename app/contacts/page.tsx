'use client'

import React, { useEffect, useState } from 'react'
import Contacts from '@/components/Contacts' // Import Contacts component
import { Button } from '@/components/ui/button'
import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  image: string
}

const ContactsPage = () => { 
  
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { data: session, status } = useSession(); // Access session and its status
  

   // Check if the session is still loading or if the user is not authenticated
      useEffect(() => {
        if (status === 'loading') return; // Wait for session to load
        if (!session) {
          router.push('/signup'); // Redirect to signup page if not authenticated
        }
      }, [status, session, router]);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://contact-app-newbac.gmparstone99.workers.dev/api/contacts', {
        headers: {
          Authorization: 'Bearer my-secret-token', // Add Authorization header
        },
      })
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
      } else {
        console.error('Error fetching contacts:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts() // Initial fetch on mount
  }, [])

  // Handle edit contact
  const handleEdit = (id: number) => {
    console.log(`Editing contact with id: ${id}`)
    router.push(`/contacts/edit/${id}`) // Redirect to edit page
  }

  // Handle delete contact
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://contact-app-newbac.gmparstone99.workers.dev/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer my-secret-token',
        },
      })
      if (response.ok) {
        // Re-fetch the contacts after delete
        fetchContacts()
      } else {
        console.error('Error deleting contact:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  return (
    <div className="container  mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-6">Contacts</h1>
      <Button
        variant="default"
        className="mb-6 bg-green-600 text-white hover:bg-green-700"
        onClick={() => router.push('/contacts/new')}>
        Add New Contact
      </Button>

      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <Contacts
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default ContactsPage
