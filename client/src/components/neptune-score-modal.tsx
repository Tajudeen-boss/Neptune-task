import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function NeptuneScoreModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Info className="w-4 h-4 mr-2" />
          Neptune Score Methodology
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-[hsl(207,90%,54%)]" />
            <span>Neptune Score Methodology</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-slate-600">
            The Neptune Score is our proprietary rating system that evaluates service providers 
            across multiple dimensions to give you a comprehensive view of their reliability and quality.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Customer Reviews (40%)</h4>
                  <p className="text-sm text-slate-600">
                    Average rating weighted by review volume and recency. Recent reviews carry more weight.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Response Time (25%)</h4>
                  <p className="text-sm text-slate-600">
                    How quickly providers respond to inquiries and availability for bookings.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Pricing Transparency (20%)</h4>
                  <p className="text-sm text-slate-600">
                    Clear upfront pricing, no hidden fees, and competitive rates for the market.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-slate-900">Credentials (15%)</h4>
                  <p className="text-sm text-slate-600">
                    Professional licensing, insurance coverage, certifications, and years of experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-2">Score Ranges:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>90-100: Exceptional</span>
                <span className="text-green-600 font-medium">Top-tier providers</span>
              </div>
              <div className="flex justify-between">
                <span>80-89: Excellent</span>
                <span className="text-amber-600 font-medium">Highly recommended</span>
              </div>
              <div className="flex justify-between">
                <span>70-79: Good</span>
                <span className="text-orange-600 font-medium">Solid choice</span>
              </div>
              <div className="flex justify-between">
                <span>Below 70: Fair</span>
                <span className="text-slate-600 font-medium">Consider alternatives</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
