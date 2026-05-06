# Klusvol Design System

Dit document beschrijft de merkidentiteit en visuele bouwstenen van **Klusvol - Websites op maat voor vakmensen**. Gebruik deze richtlijnen zodat elke nieuwe pagina, component of frontend exact aansluit bij de bestaande stijl.

## 1. Merkessentie & Tone of Voice
- **Doelgroep:** Nuchtere, hardwerkende vakmensen (schilders, hoveniers, aannemers) die kwaliteit leveren en geen zin hebben in online / administratief "gedoe".
- **Kernwaarden:** Partnerschap, Kwaliteit, Transparantie, Geen-Gedoe, Nuchter.
- **Toon (Tone of Voice):** Professioneel maar laagdrempelig. Jij/je in plaats van u. Heldere taal, geen marketing-bullshit. To the point. *Bijvoorbeeld: "Wij spreken de taal van de bouw," "Geen verborgen kosten", en "App om te starten."*

---

## 2. Typografie
We gebruiken één helder, professioneel, en strak modern schreefloos lettertype.

- **Primary Font:** `Plus Jakarta Sans` (Geïmporteerd via Google Fonts).
- **Koppen (H1, H2, H3):**
  - Extreem stevig aangezet: `font-extrabold` (800) of `font-bold` (700).
  - Negatieve letterspatiëring voor een strakkere look: `tracking-tight` of `tracking-tighter`.
  - Strakke regelafstand: `leading-tight` of `leading-none`.
  - Kleur: Zwart/diep donkergrijs (`text-slate-900`).
  - *Voorbeeld Tailwind classes:* `text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-tight`
- **Body Tekst (Paragrafen):**
  - Relatief ruim en licht voor top-leesbaarheid.
  - Gewicht: `font-light` (300) of `font-medium` (500) voor iets lokaal benadrukte tekst.
  - Regelafstand: `leading-relaxed`.
  - Kleur: `text-slate-600` of `text-slate-700`.
- **Kickers / Labels (Subtitles boven grote koppen):**
  - Kleine speelse teksten om aandacht te sturen, altijd in hoofdletters: `uppercase text-xs tracking-[0.2em] font-bold text-brand-orange`.

---

## 3. Kleurenpalet
Een fris, strak en high-contrast palet met één duidelijke actiekleur (oranje) die perfect past in de bouwwereld.

- **Primaire Actiekleur (Brand Orange):** `#F97316` (Tailwind: `orange-500` / `brand-orange`)
  - *Gebruik:* Knoppen, USP icoontjes, belangrijke accenten, lijnen en labels.
- **Achtergronden (Licht & Strak):**
  - Primaire achtergrond: `#F8FAFC` (Tailwind: `slate-50`)
  - Alternatieve achtergrond / Blokken: `#FFFFFF` (Tailwind: `white`)
- **Typografie / Contrast (Dark Slate):**
  - Koppen en sterke elementen: `#0F172A` (Tailwind: `slate-900`)
  - Paragrafen en subteksten: `#475569` (Tailwind: `slate-600`) of `#64748B` (Tailwind: `slate-500`)
- **Accenten & Diepte:**
  - Gekleurde achtergronden voor focusgebieden: Oranje glas-look (`bg-brand-orange/5` of `bg-brand-orange/10`).
  - Zachte randdetails: `border-slate-100`, `border-slate-200`, of subtiel `border-brand-orange/20`.

---

## 4. Vormgeving, Layout & Diepte
De frontend stijl kenmerkt zich door "zwevende" glas-panelen met ronde vormen.

- **Vormen (Border Radius):**
  - We gebruiken opzettelijk hele grote afgeronde hoeken om de website modern en vriendelijk te houden.
  - Hoofdkaarten en grote container div's: `rounded-[2.5rem]` (ca 40px) of `rounded-[2rem]`.
  - Foto's en kleinere blokken: `rounded-2xl` of `rounded-xl`.
  - Call To Actions / Knoppen: `rounded-full` (volledige pilvorm).
- **Diepte en Schaduw (Elevation):**
  - Geen standaard zwarte/harde schaduwen. We gebruiken grote, zachte verspreide ("diffuse") schaduwen.
  - *Standaard panel:* `shadow-[0_20px_50px_rgba(0,0,0,0.05)]`
  - *Hover effect (focus element):* `hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)]` (geeft een warme, zacht-oranje gloed uitstraling).
- **Glow Accenten (Aura's):**
  - We positioneren abstracte kleurige bollen (bijv. rechtsboven in een header of block) achter de content, gemaskeerd met blur, wat extra ademruimte en sfeer geeft.
  - *Voorbeeld class:* `absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[80px] rounded-full pointer-events-none`

---

## 5. Interactie & Componenten 
- **Buttons (Knoppen):**
  - *Primair (Oranje):* `bg-brand-orange text-white font-bold rounded-full px-8 py-4 shadow-md hover:bg-[#EA580C] transition-colors`
  - *Secundair (Wit/Glas):* `bg-white border border-slate-200 text-slate-900 rounded-full hover:border-brand-orange/50 transition-all font-bold px-8 py-4 shadow-sm`
  - *Interactie:* Knoppen moeten altijd een lichte schaal-transitie / hover-animatie hebben of van icoon/kleur wisselen als je er met je muis op staat. Veel Call-To-Actions (zoals WhatApp) tonen een klein ArrowRight icoon (`<ArrowRight size={18} />`) naast de tekst.
- **Iconografie:**
  - Alleen outline-iconen uit de library `lucide-react`.
  - Vaak met de kleur `text-brand-orange` geplaatst in een kleine box met `bg-brand-orange/10` ronde randen (`rounded-[1.25rem]`).
- **Beeld (Vakwerk/Foto's):**
  - Altijd van hoge kwaliteit, weggesneden in strakke frames met een `rounded-2xl` rand.
  - Toon de websites op lichte achtergronden. Als je testemonials / portfolio toont: Maak het beeld interactief (bv hover zoom in `group-hover:scale-105` verborgen achter een overflow box).

Bewaak deze specificaties strak. Een consistente voering van deze layout (ruime padding, veel witruimte, oranje actiekleuren op `slate-900` tekst, en moderne `Plus Jakarta Sans`) maakt het merk direct herkenbaar en professioneel voor elke vakman wegens het "No-nonsense, premium" gevoel.
