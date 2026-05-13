import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Support & Feedback</h1>
        <p className="text-zinc-400 text-sm">Need help or have an idea to improve CodeXP? Let us know.</p>
      </div>

      <Card className="bg-[#121214] border-white/5">
        <CardHeader>
          <CardTitle className="text-xl text-white">Contact Support</CardTitle>
          <CardDescription className="text-zinc-400">
            Fill out the form below and our team will get back to you within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-zinc-300">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="How can we help?"
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-zinc-300">
                Request Type
              </label>
              <select 
                id="type"
                className="w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="bug" className="bg-[#121214]">Bug Report</option>
                <option value="feature" className="bg-[#121214]">Feature Request</option>
                <option value="billing" className="bg-[#121214]">Billing Issue</option>
                <option value="other" className="bg-[#121214]">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-zinc-300">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Describe your issue or feedback in detail..."
                className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
              />
            </div>

            <Button type="button" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium">
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
