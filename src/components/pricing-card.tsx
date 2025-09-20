import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type PricingCardProps = {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  variant?: 'default' | 'secondary';
  highlight?: boolean;
};

export default function PricingCard({
  title,
  price,
  period,
  features,
  buttonText,
  variant = 'secondary',
  highlight = false,
}: PricingCardProps) {
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
        <Button className="w-full" variant={variant}>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
