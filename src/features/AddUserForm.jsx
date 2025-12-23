import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const AddUserForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    // Basic client-side validation for now (can be extended later)
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // We enrich the payload a bit so the new user looks similar to API users
      onSubmit({
        ...formData,
        company: { name: 'New Company' },
        address: { city: 'New City' }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />
      <Input
        label="Email"
        placeholder="email@example.com"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
            label="Phone"
            placeholder="555-0123"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
            label="Website"
            placeholder="example.com"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-100">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add Client</Button>
      </div>
    </form>
  );
};

export default AddUserForm;
