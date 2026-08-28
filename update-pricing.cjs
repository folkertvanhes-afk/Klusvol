const fs = require('fs');

let content = fs.readFileSync('App.tsx', 'utf8');

const targetBlock = `              <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
                <div className="relative bg-white/60 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)]">

                  <div className="relative z-10 flex flex-col">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6 self-start">
                      <Crown size={14} /> DE BASIS
                    </div>

                    <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
                      Klusvol Website
                    </h3>

                    {/* NEW Price Anchor block with visual */}
                    <div className="mb-10 flex flex-col bg-[#FAF9F6]/80 border border-slate-100 shadow-sm rounded-[2rem] p-6 md:p-10 max-w-3xl mx-auto items-center text-center">
                      <h4 className="text-brand-orange font-bold mb-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                        <Trophy size={14} /> Helder en doelgericht
                      </h4>
                      <div className="text-slate-900 font-extrabold text-2xl mb-1 tracking-tight">
                        Bouwkosten € 1.500,- eenmalig
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                        € 69,-{" "}
                        <span className="text-lg text-slate-500 font-medium tracking-normal">
                          per maand
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 mb-8 max-w-md mx-auto">
                        Voor hosting, beheer en support via WhatsApp. 6 maanden proef, daarna automatisch 18 maanden.
                      </p>
                      <div className="flex flex-col gap-4 w-full text-left">
                        <div className="text-sm text-slate-800 bg-brand-orange/10 p-5 rounded-2xl border border-brand-orange/30 shadow-sm leading-relaxed relative overflow-hidden">
                          <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay pointer-events-none"></div>
                          <span className="block font-extrabold text-brand-orange mb-2 flex items-center gap-2 text-lg">
                            <Sparkles size={18} />
                            Tijdelijk €0 opstartkosten
                          </span>
                          Wij zoeken 2 referentie-cases per branche. Werk je in een branche waar Klusvol nog geen klant heeft? Dan bouwen we jouw site zonder opstartkosten in ruil voor een testimonial en foto's van het eindresultaat.
                        </div>
                        <div className="text-sm text-slate-700 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm leading-relaxed relative">
                          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand-orange rounded-full"></div>
                          <span className="block font-bold text-slate-900 mb-1 flex items-center gap-2">
                            <ShieldCheck size={16} className="text-brand-orange" />
                            100% Geld-Terug-Garantie
                          </span>
                          Niet tevreden met het eerste concept? Je krijgt de eenmalige bouwkosten direct terug. Gegarandeerd.
                        </div>
                      </div>
                    </div>

                    {/* What you get instead of preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-t border-slate-100 pt-8">
                      <div className="flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                          <Check
                            size={20}
                            className="text-brand-orange"
                            strokeWidth={3}
                          />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 leading-snug">
                          Premium Digitaal Visitekaartje
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Een professionele uitstraling op maat. Geen standaard templates, gewoon goed.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                          <Check
                            size={20}
                            className="text-brand-orange"
                            strokeWidth={3}
                          />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 leading-snug">
                          Ondersteunende App
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Krijg direct een pushmelding op je telefoon bij een nieuwe aanvraag. Beheer klussen simpel via de app, zonder in te loggen op een ingewikkeld dashboard.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                          <Check
                            size={20}
                            className="text-brand-orange"
                            strokeWidth={3}
                          />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 leading-snug">
                          Hosting & Beheer
                        </h4>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Wij filteren spam en onserieuze aanvragen eruit. Je ontvangt alleen offerteaanvragen van klanten uit jouw regio die écht op zoek zijn naar vakwerk.
                        </p>
                      </div>
                    </div>

                    <div className="mb-10 bg-white border border-brand-orange/20 shadow-[0_4px_20px_rgb(249,115,22,0.08)] rounded-[2rem] p-6 md:p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
                      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                        <div className="flex-1">
                          <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                            <TrendingUp className="text-brand-orange" size={24} />
                            Groeimodule vanaf €150 per maand
                          </h4>
                          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                            Wil je actief meer opdrachten uit je regio halen? Activeer de groeimodule voor gerichte Google-vindbaarheid, advertenties en extra locatiepagina's.
                          </p>
                        </div>
                        <div className="w-full md:w-auto shrink-0 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Check size={16} className="text-brand-orange" />
                            Google Ads campagnes voor jouw regio
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Check size={16} className="text-brand-orange" />
                            Extra locatie- en dienstpagina's
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Check size={16} className="text-brand-orange" />
                            SEO optimalisatie
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Check size={16} className="text-brand-orange" />
                            Maandelijkse voortgangsupdate
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button
                        onClick={() =>
                          window.open("https://wa.me/31643411427", "_blank")
                        }
                        className="w-full sm:w-auto py-6 px-10 text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] bg-brand-orange hover:bg-orange-600 rounded-full font-bold"
                      >
                        App Folkert voor een partnerschap
                      </Button>
                    </div>
                  </div>
                </div>
              </div>`;

const newBlock = `              <div className="max-w-6xl mx-auto mb-16 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch mb-10">
                  {/* LEFT CARD (Base) */}
                  <div className="lg:col-span-2 relative bg-white/60 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-10 overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.08)]">
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6 self-start">
                      <Crown size={14} /> DE BASIS
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
                      Klusvol Website
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 flex-1">
                      {/* Price Col */}
                      <div className="flex flex-col">
                        <div className="text-slate-900 font-extrabold text-xl mb-1 tracking-tight">
                          Bouwkosten € 1.500,- eenmalig
                        </div>
                        <div className="text-4xl md:text-5xl font-black text-brand-orange tracking-tight mb-2">
                          € 69,- <span className="text-lg text-slate-500 font-medium tracking-normal text-slate-900">p/m</span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-8">
                          Voor hosting, beheer en support via WhatsApp. 6 maanden proef, daarna automatisch 18 maanden.
                        </p>

                        <div className="flex flex-col gap-4 mt-auto">
                          <div className="text-sm text-slate-800 bg-brand-orange/10 p-5 rounded-2xl border border-brand-orange/30 shadow-sm leading-relaxed relative overflow-hidden">
                            <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay pointer-events-none"></div>
                            <span className="block font-extrabold text-brand-orange mb-1 flex items-center gap-2 text-base">
                              <Sparkles size={16} />
                              Tijdelijk €0 opstartkosten
                            </span>
                            Wij zoeken 2 referentie-cases per branche. Bouw zonder opstartkosten in ruil voor een testimonial en foto's van je vakwerk.
                          </div>
                          <div className="text-sm text-slate-700 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm leading-relaxed relative">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-brand-orange rounded-full"></div>
                            <span className="block font-bold text-slate-900 mb-1 flex items-center gap-2">
                              <ShieldCheck size={16} className="text-brand-orange" />
                              100% Geld-Terug-Garantie
                            </span>
                            Niet tevreden met het concept? De eenmalige bouwkosten krijg je direct terug.
                          </div>
                        </div>
                      </div>

                      {/* Features Col */}
                      <div className="flex flex-col gap-6 md:border-l md:border-slate-100 md:pl-8 lg:pl-10">
                        {/* Feature 1 */}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                              <Check size={16} className="text-brand-orange" strokeWidth={3} />
                            </div>
                            <h4 className="text-base font-bold text-slate-900 leading-snug">
                              Premium Digitaal Visitekaartje
                            </h4>
                          </div>
                          <p className="text-slate-600 text-sm font-medium leading-relaxed pl-11">
                            Een professionele uitstraling op maat. Geen standaard templates, gewoon goed.
                          </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                              <Check size={16} className="text-brand-orange" strokeWidth={3} />
                            </div>
                            <h4 className="text-base font-bold text-slate-900 leading-snug">
                              Ondersteunende App
                            </h4>
                          </div>
                          <p className="text-slate-600 text-sm font-medium leading-relaxed pl-11">
                            Krijg een pushmelding bij een nieuwe aanvraag. Beheer klussen simpel via de app.
                          </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                              <Check size={16} className="text-brand-orange" strokeWidth={3} />
                            </div>
                            <h4 className="text-base font-bold text-slate-900 leading-snug">
                              Hosting & Beheer
                            </h4>
                          </div>
                          <p className="text-slate-600 text-sm font-medium leading-relaxed pl-11">
                            Wij filteren spam. Je ontvangt alleen serieuze offerteaanvragen uit jouw regio.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT CARD (Groeimodule) */}
                  <div className="lg:col-span-1 bg-[#FAF9F6] border border-brand-orange/20 shadow-[0_4px_20px_rgb(249,115,22,0.06)] rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(249,115,22,0.12)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 self-start shadow-sm relative z-10">
                      <TrendingUp size={14} className="text-brand-orange" /> OPTIONEEL
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight relative z-10">
                      Groeimodule
                    </h3>
                    <div className="text-xl font-bold text-slate-700 mb-6 relative z-10">
                      vanaf € 150,- <span className="text-sm font-medium text-slate-500">p/m</span>
                    </div>

                    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8 relative z-10">
                      Actief meer opdrachten uit je regio halen? Activeer de groeimodule voor gerichte vindbaarheid.
                    </p>

                    <div className="flex flex-col gap-4 mt-auto relative z-10">
                      <div className="flex items-start gap-3">
                        <Check size={18} className="text-brand-orange mt-0.5 shrink-0" strokeWidth={3} />
                        <span className="text-sm font-medium text-slate-700 leading-snug">Google Ads regio campagnes</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={18} className="text-brand-orange mt-0.5 shrink-0" strokeWidth={3} />
                        <span className="text-sm font-medium text-slate-700 leading-snug">Extra locatie- & dienstpagina's</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={18} className="text-brand-orange mt-0.5 shrink-0" strokeWidth={3} />
                        <span className="text-sm font-medium text-slate-700 leading-snug">SEO optimalisatie</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={18} className="text-brand-orange mt-0.5 shrink-0" strokeWidth={3} />
                        <span className="text-sm font-medium text-slate-700 leading-snug">Maandelijkse voortgangsupdate</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6 relative z-10">
                  <Button
                    onClick={() =>
                      window.open("https://wa.me/31643411427", "_blank")
                    }
                    className="w-full sm:w-auto py-6 px-10 text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] bg-brand-orange hover:bg-orange-600 rounded-full font-bold"
                  >
                    App Folkert voor een partnerschap
                  </Button>
                </div>
              </div>`;

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, newBlock);
    fs.writeFileSync('App.tsx', content);
    console.log("Success");
} else {
    console.log("Target block not found");
}
