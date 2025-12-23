import React from 'react';
import { Mail, Phone, Globe, Building2, MapPin } from 'lucide-react';
import { getInitials } from '../utils/helpers';
import Badge from '../components/Badge';

const UserDetails = ({ user }) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Header Profile */}
      <div className="flex items-center space-x-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700 ring-4 ring-white shadow-sm">
          {getInitials(user.name)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-neutral-900">{user.name}</h2>
          <p className="text-sm text-neutral-500">@{user.username || 'username'}</p>
          <div className="mt-2">
             <Badge variant={user.status === 'Active' ? 'success' : 'default'}>{user.status}</Badge>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Contact</label>
          <div className="flex items-center space-x-2 text-sm text-neutral-900">
            <Mail className="h-4 w-4 text-neutral-400" />
            <a href={`mailto:${user.email}`} className="hover:text-primary-600 hover:underline">{user.email}</a>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-900">
            <Phone className="h-4 w-4 text-neutral-400" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-900">
            <Globe className="h-4 w-4 text-neutral-400" />
            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 hover:underline">{user.website}</a>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Company</label>
           <div className="flex items-start space-x-2 text-sm text-neutral-900">
            <Building2 className="h-4 w-4 text-neutral-400 mt-0.5" />
            <div>
                <p className="font-medium">{user.company?.name}</p>
                <p className="text-neutral-500 text-xs italic">"{user.company?.catchPhrase}"</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Address Section */}
      <div className="pt-4 border-t border-neutral-100">
          <div className="flex items-start space-x-2 text-sm text-neutral-900">
            <MapPin className="h-4 w-4 text-neutral-400 mt-0.5" />
            <div>
                 <p>{user.address?.street}, {user.address?.suite}</p>
                 <p>{user.address?.city}, {user.address?.zipcode}</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default UserDetails;
