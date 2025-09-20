'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Template } from '@/lib/templates';
import { generateDraft } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Download, Wand2, X, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

type DraftFormProps = {
  template: Template;
  onClear: () => void;
};

export default function DraftForm({ template, onClear }: DraftFormProps) {
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createSchema = (template: Template) => {
    const shape: { [key: string]: z.ZodType<any, any> } = {
      jurisdiction: z.string().min(1, 'Jurisdiction is required.'),
    };
    template.fields.forEach(field => {
      let schema: z.ZodString | z.ZodAny = z.string();
      if (field.required) {
        schema = schema.min(1, `${field.label} is required.`);
      }
      shape[field.name] = schema;
    });
    return z.object(shape);
  };

  const formSchema = createSchema(template);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jurisdiction: '',
      ...template.fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedDraft(null);

    const { jurisdiction, ...userInput } = values;

    const result = await generateDraft({
      templateName: template.name,
      jurisdiction,
      userInput: userInput as Record<string, string>,
    });

    setIsLoading(false);

    if (result.success && result.draftedDocument) {
      setGeneratedDraft(result.draftedDocument);
      toast({
        title: "Draft Generated!",
        description: "Your document is ready for review.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error || "An unknown error occurred.",
      });
    }
  }

  const handleDownload = () => {
    if (!generatedDraft) return;
    const blob = new Blob([generatedDraft], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.name.replace(/\s+/g, '_')}_draft.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
       <CardHeader className="relative">
        <div className='flex items-center gap-4'>
            <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle className="text-2xl">2. Fill in the Details</CardTitle>
                <CardDescription>Provide the necessary information for your {template.name}.</CardDescription>
            </div>
        </div>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClear}>
            <X className="h-4 w-4" />
            <span className="sr-only">Clear selection</span>
        </Button>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {template.fields.map(field => (
                <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => (
                    <FormItem>
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>
                            {field.type === 'textarea' ? (
                                <Textarea placeholder={field.placeholder} {...formField} />
                            ) : (
                                <Input type={field.type} placeholder={field.placeholder} {...formField} />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                ))}
            </div>
             <Separator />
            <FormField
              control={form.control}
              name="jurisdiction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Governing Jurisdiction</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., California, USA or England and Wales" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate AI Draft
                </>
              )}
            </Button>
            {generatedDraft && (
              <div className="w-full space-y-4 pt-4 border-t">
                 <h3 className="text-lg font-semibold">Your Generated Document:</h3>
                <Textarea
                  readOnly
                  value={generatedDraft}
                  className="min-h-[400px] text-sm bg-secondary"
                />
                <Button type="button" onClick={handleDownload} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download as .txt
                </Button>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
