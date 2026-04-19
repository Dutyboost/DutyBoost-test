import { useState } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const checklistItems = [
  {
    category: 'User Flows',
    items: [
      'Travel partner signup → approval → dashboard access',
      'Airport retailer signup → approval → store setup',
      'Voucher generation and delivery to traveler',
      'Traveler receives email with QR code and details',
      'Retailer scans voucher and processes redemption',
      'Post-redemption receipt and confirmation emails',
    ]
  },
  {
    category: 'Payment Processing',
    items: [
      'Mollie payment integration for invoices',
      'Stripe payment processing (if applicable)',
      'Payment success/failure notifications',
      'Invoice generation and delivery',
      'Payout calculations and transfers',
    ]
  },
  {
    category: 'Security',
    items: [
      'SQL injection prevention in all queries',
      'XSS protection on user inputs',
      'CSRF token validation',
      'Rate limiting on API endpoints',
      'Password reset flow security',
      'Session token expiration',
      'Sensitive data encryption at rest',
    ]
  },
  {
    category: 'Data Integrity',
    items: [
      'Voucher code uniqueness enforcement',
      'Double redemption prevention',
      'Transaction audit logs',
      'Referential integrity between entities',
      'Backup and recovery procedures tested',
    ]
  },
  {
    category: 'Mobile & Responsive',
    items: [
      'Mobile signup flow (iOS/Android)',
      'Voucher QR code display on mobile',
      'Camera permission handling',
      'Touch interactions tested',
      'Tablet responsiveness',
      'Landscape orientation handling',
    ]
  },
  {
    category: 'Email & Notifications',
    items: [
      'Voucher generation emails send successfully',
      'Flight reminder emails send on schedule',
      'Invoice emails with correct amounts',
      'Email template rendering across clients',
      'Unsubscribe functionality',
      'Spam filter testing',
    ]
  },
  {
    category: 'Performance',
    items: [
      'Page load time < 3 seconds',
      'QR code scanning < 2 seconds',
      'Database queries optimized',
      'No memory leaks in long sessions',
      'CDN caching working properly',
    ]
  },
  {
    category: 'Integrations',
    items: [
      'KVK validation API working',
      'Email service integration stable',
      'Payment gateway webhook endpoints',
      'Third-party API error handling',
      'Retry logic for failed requests',
    ]
  },
  {
    category: 'Browser Compatibility',
    items: [
      'Chrome (latest)',
      'Firefox (latest)',
      'Safari (latest)',
      'Edge (latest)',
      'Mobile browsers (Chrome, Safari)',
    ]
  },
  {
    category: 'Monitoring & Logging',
    items: [
      'Error tracking configured',
      'User action analytics active',
      'Performance monitoring enabled',
      'Database logging for audits',
      'Alert thresholds configured',
    ]
  },
];

export default function GTMTestingChecklist() {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalItems = checklistItems.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const completionPercentage = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">GTM Testing Checklist</h1>
        <p className="text-muted-foreground mb-6">Verify all critical areas before launching to production</p>

        <Card className="p-6 mb-8 bg-accent/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{checkedCount} of {totalItems} items completed</p>
        </Card>

        <div className="space-y-6">
          {checklistItems.map((category, catIdx) => (
            <Card key={catIdx} className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isChecked = checkedItems[id];
                  return (
                    <div key={id} className="flex items-start gap-3">
                      <Checkbox
                        id={id}
                        checked={isChecked}
                        onCheckedChange={() => toggleItem(id)}
                        className="mt-1"
                      />
                      <label 
                        htmlFor={id}
                        className={`text-sm cursor-pointer flex-1 ${
                          isChecked ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-8 border-accent bg-accent/5">
          <div className="flex gap-3 items-start mb-4">
            <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Before Going Live</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete at least 90% of this checklist</li>
                <li>• Conduct a full staging environment test</li>
                <li>• Have a rollback plan in place</li>
                <li>• Brief support team on common issues</li>
                <li>• Monitor closely for first 24 hours</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}