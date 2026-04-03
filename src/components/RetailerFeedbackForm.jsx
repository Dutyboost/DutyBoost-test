import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const LABELS = ["Poor", "Fair", "Good", "Great", "Excellent"];

export default function RetailerFeedbackForm({ voucher }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) return;
    setLoading(true);
    await base44.entities.RetailerFeedback.create({
      voucher_code: voucher.voucher_code,
      airport: voucher.airport,
      rating,
      comment: comment.trim() || undefined,
    });
    setLoading(false);
    setSubmitted(true);
    toast.success("Thanks for your feedback!");
  };

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-2xl p-5 text-center space-y-2">
        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
        <p className="font-semibold">Thank you for your feedback!</p>
        <p className="text-sm text-muted-foreground">Your review helps improve the airport shopping experience.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <div>
        <p className="font-semibold text-sm">How was your experience at the airport store?</p>
        <p className="text-xs text-muted-foreground mt-0.5">Rate the service you received when using your DutyCredit.</p>
      </div>

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-9 h-9 transition-colors ${
                star <= (hovered || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>

      {(hovered || rating) > 0 && (
        <p className="text-center text-sm font-medium text-amber-600">
          {LABELS[(hovered || rating) - 1]}
        </p>
      )}

      <textarea
        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
        rows={3}
        placeholder="Tell us more (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        className="w-full"
        disabled={!rating || loading}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </div>
  );
}