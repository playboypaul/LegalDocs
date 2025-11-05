'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createStripeCheckoutSession } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type PricingCardProps = {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  variant?: 'default' | 'secondary';
  highlight?: boolean;
  priceId?: string;
};

export default function PricingCard({
  title,
  price,
  period,
  features,
  buttonText,
  variant = 'secondary',
  highlight = false,
  priceId,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!priceId) return;

    setIsLoading(true);
    const result = await createStripeCheckoutSession(priceId);

    if (result.success && result.url) {
      window.location.href = result.url;
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to create a checkout session. Please try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn('flex flex-col', highlight && 'border-primary ring-2 ring-primary')}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={variant} onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
