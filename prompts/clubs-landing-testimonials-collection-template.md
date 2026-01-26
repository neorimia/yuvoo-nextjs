# Testimonials Collection Template

**Purpose**: Template for requesting testimonials from clubs using Yuvoo

---

## Email Template: Testimonial Request

**Subject**: "Ai obținut rezultate cu Yuvoo? Ne-ar ajuta să le împărtășești!"

**Body** (Romanian):

```
Bună {clubName},

Sperăm că Yuvoo îți aduce rezultate bune! Am observat că ai primit {leadCount} lead-uri și {enrollmentCount} înscrieri în ultimele luni.

Ne-ar ajuta enorm dacă ai putea să ne împărtășești experiența ta cu Yuvoo pentru a ajuta alte cluburi să înțeleagă beneficiile platformei.

Ce ne-ar ajuta să știm:
- Câte lead-uri ai primit în prima lună?
- Câte s-au convertit în înscrieri?
- Cum se compară cu Google/Facebook ads?
- Cât timp ai economisit?
- Ce ți-a plăcut cel mai mult?

Dacă ești de acord, am putea folosi numele clubului tău și poate logo-ul în secțiunea de testimoniale de pe site-ul nostru. Asta ne-ar ajuta să construim încredere și să ajutăm mai multe cluburi să descopere Yuvoo.

Mulțumim anticipat!
Echipa Yuvoo
```

---

## Follow-up Email Template

**Subject**: "Urmărire: Testimonial Yuvoo"

**Body** (Romanian):

```
Bună {clubName},

Am trimis acum câteva zile un email despre posibilitatea de a ne împărtăși experiența ta cu Yuvoo.

Dacă ai avut rezultate pozitive și ești de acord să ne împărtășești, te rugăm să răspunzi la acest email sau să ne contactezi direct.

Mulțumim!
Echipa Yuvoo
```

---

## Approval Request Template

**Subject**: "Aprobare pentru utilizarea testimonialului tău"

**Body** (Romanian):

```
Bună {clubName},

Mulțumim pentru testimonial! Ne-ar ajuta mult dacă ai putea să confirmi că suntem de acord să folosim:

✓ Numele clubului: {clubName}
✓ Logo-ul clubului (dacă este disponibil)
✓ Testimonialul: "{quote}"
✓ Metricile: "{metrics}"

Te rugăm să confirmi că ești de acord cu utilizarea acestor informații pe site-ul nostru și în materialele de marketing.

Mulțumim!
Echipa Yuvoo
```

---

## Testimonial Collection Checklist

### Before Requesting

- [ ] Club has been using Yuvoo for at least 1-2 months
- [ ] Club has received at least 5-10 leads
- [ ] Club has completed at least 1-2 successful enrollments
- [ ] Club has expressed satisfaction or positive feedback

### When Requesting

- [ ] Send personalized email with specific metrics
- [ ] Mention specific results observed (lead count, enrollments)
- [ ] Ask for concrete metrics and comparisons
- [ ] Request approval for using club name and logo

### After Receiving Testimonial

- [ ] Verify all metrics are accurate
- [ ] Request written approval for:
  - [ ] Using club name
  - [ ] Using club logo (if available)
  - [ ] Publishing testimonial quote
  - [ ] Publishing metrics/results
- [ ] Document approval date
- [ ] Add testimonial to data file with `isVerified: true`

### Before Publishing

- [ ] Verify testimonial is accurate
- [ ] Confirm all approvals are documented
- [ ] Check that club logo is available (if using)
- [ ] Test component display
- [ ] Verify all required fields are present

---

## Metrics to Collect

### Required Metrics

1. **Lead Volume**: "Câte lead-uri ai primit în prima lună?"
2. **Conversion Rate**: "Câte s-au convertit în înscrieri?"
3. **Comparison**: "Cum se compară cu Google/Facebook ads?"
4. **Time Saved**: "Cât timp ai economisit?"
5. **ROI**: "Cât ai economisit vs. Google/Facebook?"

### Optional Metrics

- Quality of leads (vs. other sources)
- Parent engagement level
- Long-term results (3+ months)
- Specific success stories
- Testimonial quote (in their own words)

---

## Example Testimonial Format

```typescript
{
  id: "testimonial-1",
  clubName: "Clubul Sportiv AquaFit București",
  author: "Maria Popescu, Manager",
  location: "București",
  sport: "Înot",
  quote: "Părinții care au venit prin Yuvoo știau deja ce caută. Discuția a fost mult mai ușoară.",
  metrics: "15 lead-uri în prima lună, 12 s-au înscris (80% conversie)",
  results: "Conversie de 80% vs. 15% din Google Ads",
  logo: "/assets/img/clubs/aquafit-logo.png",
  isVerified: true,
  approvalDate: "2026-01-15",
  featured: true,
}
```

---

## Timeline

**Week 1**: Identify clubs ready for testimonials
**Week 2**: Send testimonial request emails
**Week 3**: Follow up with clubs
**Week 4**: Collect testimonials and get approvals
**Week 5**: Add testimonials to data file and update component

---

**Note**: Always prioritize quality over quantity. Better to have 3-5 strong testimonials with concrete metrics than 10 generic ones.
