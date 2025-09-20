'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Template } from '@/lib/templates';
import * as Icons from 'lucide-react';

type TemplateCardProps = {
  template: Template;
  onSelect: () => void;
};

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  // @ts-ignore
  const Icon = Icons[template.icon] || Icons.FileText;

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="items-center text-center">
        <div className="p-3 bg-accent/10 rounded-full mb-2">
          <Icon className="h-8 w-8 text-accent" />
        </div>
        <CardTitle className="text-lg">{template.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between text-center">
        <CardDescription className="mb-4 flex-grow">{template.description}</CardDescription>
        <Button onClick={onSelect} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Select</Button>
      </CardContent>
    </Card>
  );
}
