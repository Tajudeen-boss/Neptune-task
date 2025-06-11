import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Clock, 
  IdCard, 
  DollarSign, 
  Wrench, 
  Shield, 
  Phone, 
  Mail, 
  ExternalLink 
} from "lucide-react";
import type { ServiceProvider } from "@shared/schema";

interface ServiceProviderCardProps {
  provider: ServiceProvider;
}

export function ServiceProviderCard({ provider }: ServiceProviderCardProps) {
  const getNeptuneScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-amber-100 text-amber-800";
    return "bg-orange-100 text-orange-800";
  };

  const handleBookNow = () => {
    // In a real app, this would integrate with booking system
    window.alert(`Booking functionality would be integrated for ${provider.name}`);
  };

  const handleGetQuote = () => {
    // In a real app, this would open quote request form
    window.alert(`Quote request functionality would be integrated for ${provider.name}`);
  };

  const handleContact = (type: 'phone' | 'email' | 'website') => {
    switch (type) {
      case 'phone':
        if (provider.phone) window.location.href = `tel:${provider.phone}`;
        break;
      case 'email':
        if (provider.email) window.location.href = `mailto:${provider.email}`;
        break;
      case 'website':
        if (provider.website) window.open(`https://${provider.website}`, '_blank');
        break;
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">{provider.name}</h4>
                <p className="text-slate-600 text-sm">{provider.specialties}</p>
              </div>
              <Badge className={`${getNeptuneScoreColor(provider.neptuneScore)} border-0`}>
                Neptune Score: {provider.neptuneScore}
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{provider.rating}/5</span>
                  <span className="text-slate-500 text-sm">({provider.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{provider.responseTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IdCard className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">
                    {provider.isLicensed && provider.isInsured ? "Licensed & Insured" : 
                     provider.isLicensed ? "Licensed" : 
                     provider.isInsured ? "Insured" : "Ask about credentials"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{provider.pricing}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{provider.experience}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">{provider.warranty}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-slate-700">{provider.description}</p>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 lg:ml-6">
            <Button 
              onClick={handleBookNow}
              className="bg-[hsl(207,90%,54%)] hover:bg-[hsl(207,90%,44%)]"
            >
              Book Now
            </Button>
            <Button 
              variant="outline" 
              onClick={handleGetQuote}
            >
              Get Quote
            </Button>
            <div className="flex items-center justify-center space-x-4 pt-2">
              {provider.phone && (
                <button 
                  onClick={() => handleContact('phone')}
                  className="text-slate-400 hover:text-slate-600"
                  title="Call"
                >
                  <Phone className="w-4 h-4" />
                </button>
              )}
              {provider.email && (
                <button 
                  onClick={() => handleContact('email')}
                  className="text-slate-400 hover:text-slate-600"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
              )}
              {provider.website && (
                <button 
                  onClick={() => handleContact('website')}
                  className="text-slate-400 hover:text-slate-600"
                  title="Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
