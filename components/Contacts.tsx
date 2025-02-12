import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import Image from 'next/image'

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  image?: string
}

interface ContactsProps {
  contacts: Contact[] // contacts should always be an array
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const Contacts: React.FC<ContactsProps> = ({
  contacts = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        contacts.map((contact) => (
          <Card key={contact.id} className="p-4 rounded-lg shadow-md">
            <CardHeader className="flex items-center space-x-4">
              <div className="bg-slate-200 rounded-full">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={contact.image} // Use the backend image URL
                      alt={contact.name}
                      className="w-16 h-16 rounded-full"
                    />
                  </Avatar>
                
              </div>

              <div>
                <h3 className="text-xl font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{contact.phone}</p>
              <div className="mt-2 flex space-x-4 justify-between">
                <Button
                  variant="outline"
                  className="text-blue-500"
                  onClick={() => onEdit(contact.id)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="text-white"
                  onClick={() => onDelete(contact.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

export default Contacts
