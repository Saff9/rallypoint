import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { joinWaitlist } from './appwrite';

function WaitlistForm({ id }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    try {
      await joinWaitlist(value);
      toast.success("You're on the list. We'll email you at launch.");
      setEmail('');
    } catch (error) {
      if (error.code === 409) {
        toast.error('This email is already on the waitlist.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
      <label htmlFor={id} className="sr-only">Email address</label>
      <input
        id={id}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
        className="flex-1 px-4 py-3 rounded-lg bg-rally-surface border border-rally-border text-rally-text placeholder-rally-muted focus:outline-none focus:border-rally-primary focus:ring-4 focus:ring-rally-primary/15 transition disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-3 rounded-lg bg-rally-primary hover:bg-rally-primary-hover text-rally-ink font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isLoading ? 'Joining…' : 'Join waitlist'}
      </button>
    </form>
  );
}

function ProductPreview() {
  const messages = [
    { name: 'Alex', text: 'Auth is done and merged to main.' },
    { name: 'Sam', text: 'Final designs are in the shared folder.' },
    { name: 'Jordan', text: 'Demo script is ready. Rehearsal at 9am?' },
  ];
  return (
    <div className="max-w-3xl mx-auto mt-20 rounded-xl border border-rally-border bg-rally-surface overflow-hidden text-left">
      <div className="flex items-center justify-between px-5 py-3 border-b border-rally-border">
        <span className="text-sm font-medium"># team-nova</span>
        <span className="flex items-center gap-2 text-xs text-rally-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-rally-primary" />
          HackNYC 2026 · 31h left
        </span>
      </div>
      <div className="grid md:grid-cols-[1fr_220px]">
        <div className="p-5 space-y-5">
          {messages.map((m) => (
            <div key={m.name} className="flex items-start gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-rally-bg border border-rally-border text-xs font-semibold text-rally-muted flex items-center justify-center">
                {m.name[0]}
              </div>
              <div>
                <p className="text-xs font-medium text-rally-text">{m.name}</p>
                <p className="text-sm text-rally-muted">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-5 border-t md:border-t-0 md:border-l border-rally-border bg-rally-subtle space-y-5">
          <div>
            <p className="text-xs font-medium text-rally-muted mb-2">Tasks</p>
            <div className="h-1.5 rounded-full bg-rally-border overflow-hidden">
              <div className="h-full w-2/3 bg-rally-primary" />
            </div>
            <p className="text-xs text-rally-muted mt-2">8 of 12 complete</p>
          </div>
          <div>
            <p className="text-xs font-medium text-rally-muted mb-2">Members</p>
            <p className="text-sm">4 online</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const features = [
  {
    title: 'Team collaboration',
    text: 'A dedicated space for your team to chat, share files, and stay aligned in real time.',
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: 'Ephemeral by design',
    text: 'Chat data is cleared 7 days after the event, so your workspace stays focused and private.',
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Built for the sprint',
    text: 'Made for the pace of hackathons and tech events. No bloat, only what you need to ship.',
    icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  },
];

const steps = [
  { title: 'Join your event', text: 'Add your hackathon and get a ready workspace in seconds.' },
  { title: 'Bring your team', text: 'Invite developers, designers, and PMs. Chat, share files, track tasks.' },
  { title: 'Ship and move on', text: 'Demo with confidence. Everything clears automatically after the event.' },
];

function App() {
  return (
    <div className="min-h-screen bg-rally-bg text-rally-text font-sans">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#181a15',
            color: '#ece9df',
            border: '1px solid #272a23',
            borderRadius: '10px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#ff5a24', secondary: '#181a15' } },
          error: { iconTheme: { primary: '#ff5a24', secondary: '#181a15' } },
        }}
      />

      {/* Navigation */}
      <nav className="w-full border-b border-rally-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="h-2.5 w-2.5 rounded-full bg-rally-primary" />
            RallyPoint
          </a>
          <div className="flex items-center gap-8">
            <a href="#features" className="hidden sm:block text-sm text-rally-muted hover:text-rally-text transition-colors">Features</a>
            <a href="#how" className="hidden sm:block text-sm text-rally-muted hover:text-rally-text transition-colors">How it works</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-rally-muted hover:text-rally-text transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-28 text-center">
        <p className="text-sm font-medium text-rally-primary mb-6 tracking-wide uppercase">Early access</p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.08] mb-6">
          The workspace built for hackathon teams
        </h1>

        <p className="text-lg md:text-xl text-rally-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          RallyPoint brings your team, event details, and real-time collaboration into one focused space. Built for the 48-hour sprint.
        </p>

        <WaitlistForm id="hero-email" />
        <p className="text-sm text-rally-muted mt-4">No spam. Unsubscribe anytime.</p>

        <ProductPreview />
      </main>

      {/* Features */}
      <section id="features" className="bg-rally-subtle border-y border-rally-border">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-semibold tracking-tight mb-3">Everything your team needs</h2>
            <p className="text-lg text-rally-muted">
              One workspace for developers, designers, PMs, and organizers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-7 rounded-xl bg-rally-surface border border-rally-border hover:border-rally-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-rally-bg border border-rally-border flex items-center justify-center mb-5 text-rally-primary">
                  <svg {...iconProps}>{f.icon}</svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-rally-muted leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
        </div>
        <ol className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-rally-border pt-5">
              <span className="text-sm font-medium text-rally-primary">0{i + 1}</span>
              <h3 className="text-lg font-semibold mt-2 mb-2">{s.title}</h3>
              <p className="text-rally-muted leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Final CTA */}
      <section className="bg-rally-subtle border-t border-rally-border">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">Get early access</h2>
          <p className="text-rally-muted mb-8">Join the waitlist and be ready for your next hackathon.</p>
          <WaitlistForm id="cta-email" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rally-border py-8 text-center text-rally-muted text-sm">
        <p>© 2026 RallyPoint. Making hackathons better for everyone.</p>
      </footer>
    </div>
  );
}

export default App;
