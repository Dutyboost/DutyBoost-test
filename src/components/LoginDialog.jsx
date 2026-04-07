import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function LoginDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="w-5 h-5" />
            Sign In
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sign in with the email address associated with your account.
          </p>
          <Button 
            onClick={() => base44.auth.redirectToLogin()} 
            className="w-full"
          >
            Continue to Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}