import type { LucideIcon } from 'lucide-react';

export type TemplateField = {
  name: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'date';
  required?: boolean;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: TemplateField[];
};

export const templates: Template[] = [
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement',
    description: 'A contract to protect confidential information shared between parties.',
    icon: 'FileLock',
    fields: [
      { name: 'disclosingParty', label: 'Disclosing Party Name', placeholder: 'e.g., InnovateCorp', type: 'text', required: true },
      { name: 'receivingParty', label: 'Receiving Party Name', placeholder: 'e.g., Partner Solutions LLC', type: 'text', required: true },
      { name: 'effectiveDate', label: 'Effective Date', placeholder: '', type: 'date', required: true },
      { name: 'term', label: 'Term of Agreement (in years)', placeholder: 'e.g., 5', type: 'text', required: true },
      { name: 'confidentialInfo', label: 'Description of Confidential Information', placeholder: 'e.g., Business plans, financial data, customer lists', type: 'textarea', required: true },
    ],
  },
  {
    id: 'service-agreement',
    name: 'Service Agreement',
    description: 'An agreement outlining the terms of a service provided by one party to another.',
    icon: 'Briefcase',
    fields: [
      { name: 'serviceProvider', label: 'Service Provider', placeholder: 'e.g., Your Company LLC', type: 'text', required: true },
      { name: 'client', label: 'Client Name', placeholder: 'e.g., Client Corp', type: 'text', required: true },
      { name: 'serviceDescription', label: 'Description of Services', placeholder: 'e.g., Web development and design services', type: 'textarea', required: true },
      { name: 'paymentAmount', label: 'Payment Amount ($)', placeholder: 'e.g., 5000', type: 'text', required: true },
      { name: 'paymentTerms', label: 'Payment Terms', placeholder: 'e.g., Net 30, 50% upfront', type: 'text', required: true },
      { name: 'startDate', label: 'Start Date', placeholder: '', type: 'date', required: true },
    ],
  },
  {
    id: 'employment-contract',
    name: 'Employment Contract',
    description: 'Defines the terms of employment between an employer and an employee.',
    icon: 'Users',
    fields: [
      { name: 'employer', label: 'Employer Name', placeholder: 'e.g., Growth Inc.', type: 'text', required: true },
      { name: 'employee', label: 'Employee Name', placeholder: 'e.g., Jane Doe', type: 'text', required: true },
      { name: 'jobTitle', label: 'Job Title', placeholder: 'e.g., Software Engineer', type: 'text', required: true },
      { name: 'salary', label: 'Annual Salary ($)', placeholder: 'e.g., 90000', type: 'text', required: true },
      { name: 'startDate', label: 'Employment Start Date', placeholder: '', type: 'date', required: true },
      { name: 'duties', label: 'Key Responsibilities', placeholder: 'Developing new features, maintaining codebase...', type: 'textarea' },
    ],
  },
  {
    id: 'lease-agreement',
    name: 'Residential Lease',
    description: 'A contract between a landlord and tenant for renting a property.',
    icon: 'Home',
    fields: [
      { name: 'landlord', label: 'Landlord Name', placeholder: 'e.g., John Smith', type: 'text', required: true },
      { name: 'tenant', label: 'Tenant Name', placeholder: 'e.g., Sarah Johnson', type: 'text', required: true },
      { name: 'propertyAddress', label: 'Property Address', placeholder: 'e.g., 123 Main St, Anytown, USA', type: 'text', required: true },
      { name: 'leaseStartDate', label: 'Lease Start Date', placeholder: '', type: 'date', required: true },
      { name: 'leaseEndDate', label: 'Lease End Date', placeholder: '', type: 'date', required: true },
      { name: 'rentAmount', label: 'Monthly Rent ($)', placeholder: 'e.g., 1500', type: 'text', required: true },
      { name: 'securityDeposit', label: 'Security Deposit ($)', placeholder: 'e.g., 1500', type: 'text', required: true },
    ],
  },
];
