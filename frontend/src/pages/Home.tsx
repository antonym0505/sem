export default function Home() {
  return (
    <div className="min-h-screen bg-[#fef9f3] text-[#1e293b] font-[Inter,system-ui,sans-serif]">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <span className="text-xl font-bold tracking-tight">
          Smile<span className="text-[#f97316]">EveryMile</span>
        </span>
        <nav className="hidden sm:flex gap-8 text-sm font-medium text-[#64748b]">
          <a href="/events" className="hover:text-[#f97316] transition-colors">Events</a>
          <a href="#mission" className="hover:text-[#f97316] transition-colors">Mission</a>
          <a href="#get-involved" className="hover:text-[#f97316] transition-colors">Get Involved</a>
        </nav>
        <a
          href="#donate"
          className="text-sm font-semibold bg-[#f97316] text-white px-5 py-2.5 rounded-full hover:bg-[#ea6c0a] transition-colors"
        >
          Donate
        </a>
      </header>

      {/* Hero */}
      <main>
        <section className="max-w-6xl mx-auto px-8 pt-20 pb-28 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#f97316] mb-4">
            Non-profit · Est. 2024
          </p>
          <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Every mile runs<br />
            <span className="text-[#f97316]">someone's hope.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-[#64748b] leading-relaxed mb-10">
            Smile Every Mile connects runners with causes that matter — raising
            funds, building community, and proving that forward motion changes lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#get-involved"
              className="bg-[#f97316] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#ea6c0a] transition-colors text-base"
            >
              Start running with us
            </a>
            <a
              href="#mission"
              className="border border-[#e2e8f0] text-[#1e293b] font-semibold px-8 py-3.5 rounded-full hover:border-[#f97316] hover:text-[#f97316] transition-colors text-base"
            >
              Learn more
            </a>
          </div>
        </section>

        {/* Stats strip */}
        <section id="impact" className="border-t border-b border-[#e2e8f0] bg-white">
          <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {[
              { value: '12,400+', label: 'Miles run' },
              { value: '$380K', label: 'Raised for causes' },
              { value: '2,100+', label: 'Runners joined' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-extrabold text-[#f97316]">{value}</p>
                <p className="mt-1 text-sm font-medium text-[#64748b]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section id="mission" className="max-w-6xl mx-auto px-8 py-24 grid grid-cols-1 sm:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#f97316] mb-3">Our mission</p>
            <h2 className="text-4xl font-bold leading-snug mb-5">
              Movement with meaning
            </h2>
            <p className="text-[#64748b] leading-relaxed">
              We believe running is one of the most human things we can do — and
              when you pair it with purpose, something extraordinary happens. Smile
              Every Mile organizes charity races, virtual run events, and community
              campaigns that direct every dollar toward causes chosen by our runners.
            </p>
          </div>
          <div className="rounded-3xl bg-[#f97316]/10 h-72 flex items-center justify-center text-6xl select-none">
            🏃‍♀️
          </div>
        </section>

        {/* CTA */}
        <section id="get-involved" className="bg-[#1e293b] text-white">
          <div className="max-w-6xl mx-auto px-8 py-20 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to make your miles matter?</h2>
            <p className="text-[#94a3b8] mb-10 text-lg max-w-lg mx-auto">
              Sign up for our next event or start your own fundraising run today.
            </p>
            <a
              id="donate"
              href="mailto:hello@smileeverymile.org"
              className="inline-block bg-[#f97316] text-white font-semibold px-10 py-4 rounded-full hover:bg-[#ea6c0a] transition-colors text-base"
            >
              Get in touch
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#64748b]">
        <span>© 2024 Smile Every Mile. All rights reserved.</span>
        <span>Made with ❤️ and a lot of miles.</span>
      </footer>
    </div>
  )
}
