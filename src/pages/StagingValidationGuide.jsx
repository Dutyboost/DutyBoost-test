import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Zap } from 'lucide-react';

export default function StagingValidationGuide() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Staging Environment Validation Guide</h1>
        <p className="text-muted-foreground mb-8">Step-by-step process to validate the application before production launch</p>

        <div className="space-y-6">
          {/* Phase 1 */}
          <Card className="p-6 border-l-4 border-l-primary">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
              Environment Setup
            </h2>
            <div className="space-y-4 ml-10">
              <div>
                <h3 className="font-semibold mb-2">Clone Production to Staging</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Copy production database to staging (anonymize sensitive user data)</li>
                  <li>Verify all environment variables are set</li>
                  <li>Test all payment gateway credentials</li>
                  <li>Confirm email service is pointing to staging</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Configure Test Accounts</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Create test travel partner account</li>
                  <li>Create test airport retailer account</li>
                  <li>Create test admin account</li>
                  <li>Create test traveler accounts</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Phase 2 */}
          <Card className="p-6 border-l-4 border-l-accent">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
              Core User Flows
            </h2>
            <div className="space-y-4 ml-10">
              <div>
                <h3 className="font-semibold mb-2">Travel Partner Flow</h3>
                <div className="bg-secondary/50 p-3 rounded text-sm space-y-1 font-mono text-muted-foreground">
                  <div>→ Sign up with company details</div>
                  <div>→ Verify KVK number validation</div>
                  <div>→ Wait for admin approval</div>
                  <div>→ Receive invitation email</div>
                  <div>→ Log in to dashboard</div>
                  <div>→ Generate test vouchers</div>
                  <div>→ Verify email delivery to travelers</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Airport Retailer Flow</h3>
                <div className="bg-secondary/50 p-3 rounded text-sm space-y-1 font-mono text-muted-foreground">
                  <div>→ Sign up with store details</div>
                  <div>→ Select airport location</div>
                  <div>→ Wait for admin approval</div>
                  <div>→ Access retailer dashboard</div>
                  <div>→ Configure store settings</div>
                  <div>→ Test QR code scanner</div>
                  <div>→ Process test redemptions</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Voucher Redemption Flow</h3>
                <div className="bg-secondary/50 p-3 rounded text-sm space-y-1 font-mono text-muted-foreground">
                  <div>→ Traveler receives voucher email</div>
                  <div>→ Scan QR code at retail POS</div>
                  <div>→ Verify correct discount applied</div>
                  <div>→ Confirm transaction logged</div>
                  <div>→ Check commission calculated</div>
                  <div>→ Verify confirmation email sent</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Phase 3 */}
          <Card className="p-6 border-l-4 border-l-chart-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-chart-2 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
              Payment & Billing
            </h2>
            <div className="space-y-4 ml-10">
              <div>
                <h3 className="font-semibold mb-2">Mollie Integration</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Generate test invoices</li>
                  <li>Verify payment links are created</li>
                  <li>Test payment success webhook</li>
                  <li>Test payment failure handling</li>
                  <li>Confirm invoice status updates</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payout Processing</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Verify commission calculations are correct</li>
                  <li>Test payout aggregation</li>
                  <li>Validate bank details storage</li>
                  <li>Check payout email notifications</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Phase 4 */}
          <Card className="p-6 border-l-4 border-l-chart-3">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-chart-3 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
              Edge Cases & Error Handling
            </h2>
            <div className="space-y-4 ml-10">
              <div>
                <h3 className="font-semibold mb-2">Voucher Scenarios</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Attempt to redeem expired voucher</li>
                  <li>Attempt to redeem already redeemed voucher</li>
                  <li>Test minimum spend requirement</li>
                  <li>Test maximum discount cap</li>
                  <li>Test different travel types and prices</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">User Edge Cases</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Session timeout handling</li>
                  <li>Double submission prevention</li>
                  <li>Network error recovery</li>
                  <li>Duplicate account prevention</li>
                  <li>Invalid input handling</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Phase 5 */}
          <Card className="p-6 border-l-4 border-l-chart-4">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-chart-4 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
              Performance & Load Testing
            </h2>
            <div className="space-y-4 ml-10">
              <div>
                <h3 className="font-semibold mb-2">Load Test Scenarios</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Simulate 100 concurrent users</li>
                  <li>Test voucher generation at scale</li>
                  <li>Test QR code scanning performance</li>
                  <li>Monitor database query performance</li>
                  <li>Check API response times under load</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Optimization Checks</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Run Lighthouse performance audit</li>
                  <li>Check bundle size optimization</li>
                  <li>Verify caching strategies</li>
                  <li>Test on slow connections (3G)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Phase 6 */}
          <Card className="p-6 border-l-4 border-l-chart-5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-chart-5 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</span>
              Security Testing
            </h2>
            <div className="space-y-4 ml-10">
              <div>
                <h3 className="font-semibold mb-2">Security Checks</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Test SQL injection prevention</li>
                  <li>Test XSS protection</li>
                  <li>Test CSRF token validation</li>
                  <li>Verify authentication bypass attempts fail</li>
                  <li>Test role-based access control</li>
                  <li>Check API rate limiting</li>
                  <li>Verify sensitive data is encrypted</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Compliance</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>GDPR compliance review</li>
                  <li>Data retention policies enforced</li>
                  <li>Privacy policy accessible and clear</li>
                  <li>Terms of service accepted before signup</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Final Sign-Off */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex gap-3 items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Ready for Production?</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>✓ All test scenarios passed</li>
                  <li>✓ No critical bugs found</li>
                  <li>✓ Performance meets targets</li>
                  <li>✓ Security review completed</li>
                  <li>✓ Team is trained and prepared</li>
                  <li>✓ Rollback plan documented</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}