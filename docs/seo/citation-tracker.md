# Tracker citări și PR — Yuvoo (România)

Folosește acest fișier pentru outreach-ul de backlink-uri (recomandare Bing). Actualizează statusul manual după fiecare acțiune.

## Citări locale (NAP consistent)

| Platformă                | URL                         | Status   | Data | Note                                        |
| ------------------------ | --------------------------- | -------- | ---- | ------------------------------------------- |
| Bing Places for Business | https://www.bingplaces.com  | de făcut |      | NAP: Yuvoo, București, RO, contact@yuvoo.ro |
| Google Business Profile  | https://business.google.com | de făcut |      | Același NAP ca în footer + schema           |
| Pagini Aurii             | https://www.paginiaurii.ro  | de făcut |      | Categorie: servicii online / educație copii |
| Cylex România            | https://www.cylex.ro        | de făcut |      | Link către yuvoo.ro                         |
| 1188.ro                  | https://www.1188.ro         | de făcut |      |                                             |
| ListaFirme / Termene     | https://termene.ro          | de făcut |      | Doar dacă entitate juridică listată         |

## Media parenting (pitch RO)

| Outlet          | Contact / formular             | Status   | Unghi pitch                                |
| --------------- | ------------------------------ | -------- | ------------------------------------------ |
| TotulDespreMame | https://www.totuldespremame.ro | de făcut | Chestionar AI + cum alegi sportul la 6 ani |
| Qbebe           | https://www.qbebe.ro           | de făcut | Cluburi verificate vs. căutare manuală     |
| Desprecopii     | https://www.desprecopii.com    | de făcut | Ghiduri Yuvoo + probă la club              |
| BebeClub        | https://www.bebeclub.ro        | de făcut | Sport copii timizi (ghid dedicat)          |

## Parteneriate naturale (backlink-uri de calitate)

| Tip                            | Acțiune                                            | Status      |
| ------------------------------ | -------------------------------------------------- | ----------- |
| Cluburi listate                | Cere link „Găsiți-ne pe Yuvoo” pe site-ul clubului | ongoing     |
| Federații / asociații sportive | Resursă pentru părinți → link către ghiduri        | de explorat |
| Școli / after-school           | Mențiune în newsletter local                       | de explorat |

## Resurse on-site pentru jurnaliști

- Pagină presă: `/presa`
- Email: contact@yuvoo.ro
- Logo: `/assets/img/logo/logo.svg`

## Verificare lunară

- [ ] Bing Webmaster Tools → IndexNow activ
- [ ] Referring domains (Bing WMT / GSC)
- [ ] 2 cluburi noi cu profil complet (sitemap + IndexNow)
- [ ] 1 pitch trimis media parenting

## IndexNow — verificare post-deploy (Bing CSV 21.08.2026)

Verificat **22.08.2026**:

| Verificare                                                   | Rezultat                                                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `curl https://yuvoo.ro/9aa24988f8df4574b1e486b05685c5aa.txt` | HTTP 200, conținut = `9aa24988f8df4574b1e486b05685c5aa`                                           |
| Fișier local `public/9aa24988f8df4574b1e486b05685c5aa.txt`   | Aliniat                                                                                           |
| Vercel env `INDEXNOW_KEY`                                    | Confirmă manual în Vercel → Settings → Environment Variables = `9aa24988f8df4574b1e486b05685c5aa` |

**După deploy fix-uri H1/title/conținut:**

1. Bing Webmaster Tools → **IndexNow** → confirmă „configured”
2. Opțional: ping manual un URL (ex. `/sporturi/fotbal`, un ghid) via API sau cron `GET /api/cron/indexnow`
3. **Site Scan** → Request re-crawl; așteaptă 24–48h (raportul CSV poate fi pre-fix)

## Outreach backlink-uri — pași manuali (săptămâna 1)

Execuție umană, în ordine recomandată:

1. **Bing Places for Business** — NAP identic cu footer + Organization schema (`Yuvoo`, București, `contact@yuvoo.ro`, `https://yuvoo.ro`)
2. **Google Business Profile** — același NAP; categorie servicii online / educație
3. **Pagini Aurii + Cylex + 1188** — listare cu link către `https://yuvoo.ro` și descriere scurtă (chestionar AI, cluburi verificate)
4. **Pitch media** — un email către TotulDespreMame sau Qbebe (unghi: chestionar AI + ghid vârstă sport); menționează `/presa` și `/ghiduri`
5. **Cluburi partenere** — 3 cluburi cu profil complet: cere link „Găsiți-ne pe Yuvoo” pe site-ul lor

Marchează statusul în tabelele de mai sus după fiecare acțiune. Alerta Bing „Inbound links” dispare în săptămâni/luni, nu la deploy.
