const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');
const lines = content.split('\n');

const startIndex = lines.findIndex(l => l.includes('{/* Fundament (Hoofdblok) */}')) + 1; // 2605 (0-indexed 2604)
const endIndex = lines.findIndex((l, i) => i > startIndex && l.includes('100% Geld-Terug-Garantie.')) + 3; // 2754 (0-indexed)

console.log("Replacing from", startIndex, "to", endIndex);

const newLines = `              <div className="max-w-6xl mx-auto mb-16 animate-fade-in">
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
                        <div className="text-4xl md:text-5xl font-black text-brand-orange tracking-tight mb-3">
                          € 69,- <span className="text-lg text-slate-500 font-medium tracking-normal text-slate-900">p/m</span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 mb-6 max-w-[280px]">
                          Voor hosting, beheer en support via WhatsApp. 6 maanden proef, daarna automatisch 18 maanden.
                        </p>

                        <div className="flex flex-col gap-4 mt-auto">
                          {/* Promo Box */}
                          <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-5 relative overflow-hidden shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles size={18} className="text-brand-orange shrink-0" />
                              <span className="font-extrabold text-brand-orange text-sm uppercase tracking-wide">Tijdelijk €0 Opstartkosten</span>
                            </div>
                            <p className="text-sm font-medium text-slate-800 leading-relaxed">
                              Wij zoeken 2 referentie-cases per branche. Bouw zonder opstartkosten in ruil voor een testimonial en foto's.
                            </p>
                          </div>
                          
                          {/* Guarantee Box */}
                          <div className="flex items-start gap-3 text-sm font-medium text-slate-700 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                             <ShieldCheck size={18} className="text-brand-orange shrink-0 mt-0.5" />
                             <span><strong className="text-slate-900">100% Geld-Terug-Garantie.</strong> Niet tevreden? Bouwkosten direct terug.</span>
                          </div>
                        </div>
                      </div>

                      {/* Features Col */}
                      <div className="flex flex-col gap-6 md:border-l md:border-slate-100 md:pl-8 lg:pl-10 h-full justify-center">
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

                <div className="flex justify-center mt-2 relative z-10">
                  <Button
                    onClick={() =>
                      window.open("https://wa.me/31643411427", "_blank")
                    }
                    className="w-full sm:w-auto py-6 px-12 text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] bg-brand-orange hover:bg-orange-600 rounded-full font-bold transition-transform hover:scale-105"
                  >
                    App Folkert voor een partnerschap
                  </Button>
                </div>
              </div>`;

lines.splice(startIndex, endIndex - startIndex + 1, newLines);
fs.writeFileSync('App.tsx', lines.join('\n'));
console.log("Success");
