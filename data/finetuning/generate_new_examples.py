#!/usr/bin/env python3
"""
Generate 35 new fine-tuning examples (30 training, 5 validation) for Yuvoo AI Coach.
Covers: age 4-6, ADHD, subponderal, hipermobilitate, eczema, creative+balet, rebel+arte martiale,
competitive+tenis, badminton, patinaj, polo, alpinism, golf, edge cases.
"""
import json
import os

SYSTEM_MSG = "Ești un asistent AI specializat în recomandări de sporturi pentru copii din România, cu vârste între 4 și 14 ani. Generează TOATE răspunsurile EXCLUSIV în limba română. Returnează DOAR un obiect JSON valid."


def make_example(user_content: str, assistant_json: dict) -> dict:
    return {
        "messages": [
            {"role": "system", "content": SYSTEM_MSG},
            {"role": "user", "content": user_content},
            {"role": "assistant", "content": json.dumps(assistant_json, ensure_ascii=False)},
        ]
    }


def main():
    examples_train = []
    examples_val = []

    # --- TRAINING: Age 4-6, creative + balet/dans ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 5 ani
Gen: Fată

Nivel de energie: Ridicat

Trăsături de personalitate: foarte creativă, expresivă, visătoare

Interese și hobby-uri: desen, muzică, teatru, povesti

Sporturi încercate anterior: Niciunul

Constituție fizică: Subțire
Nivel coordonare: Încă dezvoltă coordonarea

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Nu
- Sporturi de echipă: Nu
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "balet", "sportName": "Balet", "matchScore": 94, "reasoning": "Baletul este alegerea ideală pentru o fetiță foarte creativă și expresivă de 5 ani care iubește muzica și teatrul. Baletul combină arta cu mișcarea într-un mod care stimulează imaginația. La această vârstă, programele sunt ludice și axate pe expresie. Natura visătoare găsește un canal perfect în povestea dansului. Este individual și în interior, conform preferințelor.",
                 "benefits": ["Combină creativitatea cu activitatea fizică", "Stimulează expresia artistică și imaginația", "Dezvoltă grația și coordonarea de la vârstă fragedă"], "considerations": ["Cursuri de la 4-5 ani în studouri specializate", "Echipament: body, pantofi de balet", "Disponibil în orașe mari"]},
                {"sportId": "dans", "sportName": "Dans", "matchScore": 91, "reasoning": "Dansul contemporan sau creativ este perfect pentru o copilă care iubește să se exprime prin mișcare. Spre deosebire de baletul clasic, dansul modern permite mai multă libertate creativă. Muzica și povestirea prin mișcare se aliniază cu interesele ei. Cursurile pentru copii mici sunt jucăușe și artistice.",
                 "benefits": ["Libertate creativă și expresie artistică", "Combină muzica cu mișcarea", "Dezvoltă coordonarea și încrederea în sine"], "considerations": ["Stiluri variate: contemporan, modern, creativ", "Cost: 150-350 lei/lună", "Cursuri de la 4 ani"]},
                {"sportId": "gimnastica", "sportName": "Gimnastică", "matchScore": 82, "reasoning": "Gimnastica artistică la 5 ani oferă elemente acrobatice care pot atrage o copilă creativă. Programele recreative includ jocuri și forme artistice. Dezvoltă flexibilitatea, echilibrul și coordonarea într-un mediu structurat dar distractiv.",
                 "benefits": ["Elemente artistice și acrobatice", "Bază pentru dans sau balet viitor", "Dezvoltă coordonarea și echilibrul"], "considerations": ["Recreativ la 5 ani, competitiv de la 6", "Sală specializată necesară", "Disponibil în majoritatea orașelor"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: Age 4-6, boy, recreational ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 4 ani
Gen: Băiat

Nivel de energie: Foarte ridicat

Trăsături de personalitate: jucăuș, prietenos, neastâmpărat

Interese și hobby-uri: mașini, mingi, alergat

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Încă dezvoltă coordonarea

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "fotbal", "sportName": "Fotbal", "matchScore": 90, "reasoning": "Fotbalul recreativ la 4 ani este ideal pentru un băiețel jucăuș care iubește mingea și alergatul. La această vârstă, programele sunt 100% joc și distracție — fără reguli stricte. Energia foarte ridicată este canalizată prin alergare și lovituri la minge. Grupurile mici oferă primul contact cu echipa.",
                 "benefits": ["Canalizează energia prin joc cu mingea", "Introducere la sportul de echipă într-un mod ludic", "Dezvoltă coordonarea ochi-picior"], "considerations": ["Programe recreative de la 4 ani", "Echipament: ghete, jambiere", "Focus pe distracție, nu competiție"]},
                {"sportId": "inot", "sportName": "Înot", "matchScore": 88, "reasoning": "Înotul pentru copii mici la 4 ani este o activitate jucăușă de familiarizare cu apa. Consumă multă energie într-un mediu sigur. Pasiunea pentru apă este naturală la această vârstă. Cursurile sunt în grup, cu jocuri și exerciții adaptate.",
                 "benefits": ["Consumă energia foarte ridicată în siguranță", "Abilitate esențială de siguranță", "Dezvoltă coordonarea în apă"], "considerations": ["Cursuri parent-and-child sau grup mic", "Bazin cu apă caldă", "Disponibil în majoritatea orașelor"]},
                {"sportId": "gimnastica", "sportName": "Gimnastică", "matchScore": 85, "reasoning": "Gimnastica recreativă la 4 ani transformă energia neastâmpărată în sărituri, rostogoliri și echilibre prezentate ca jocuri. Programele pentru cei mici sunt foarte variate și distractive. Dezvoltă coordonarea care este încă în formare.",
                 "benefits": ["Canalizează energia prin activități variate", "Dezvoltă echilibrul și flexibilitatea", "Bază pentru orice sport viitor"], "considerations": ["Exclusiv recreativ la 4 ani", "Sală cu echipament adaptat", "2-3 sedințe pe săptămână"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: ADHD / dificultăți concentrare → psychologist ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 8 ani
Gen: Băiat

Nivel de energie: Foarte ridicat

Trăsături de personalitate: activ, creativ, dificultăți de concentrare

Interese și hobby-uri: jocuri video, construcții LEGO, alergare

Sporturi încercate anterior: fotbal
Motiv oprire: Nu reușea să urmărească regulile și să stea pe loc

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
- Considerații: Dificultăți de concentrare la școală, diagnostic ADHD în evaluare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "arte-martiale", "sportName": "Arte marțiale", "matchScore": 90, "reasoning": "Artele marțiale (judo, karate, taekwondo) oferă structură clară și ritualuri care ajută copiii cu dificultăți de concentrare. Fiecare antrenament are secvențe previzibile: salut, încălzire, tehnici, kata. Acest cadru ajută la focalizare. Progresul prin centuri oferă motivație pe termen lung. Sportul dezvoltă autocontrolul și disciplina.",
                 "benefits": ["Structură și ritualuri care sprijină concentrarea", "Dezvoltă autocontrolul și disciplina", "Progres clar prin centuri"], "considerations": ["Alegeți un dojo cu experiență în copii cu ADHD", "Sesiuni scurte și variate la început", "Comunicați cu antrenorul despre nevoi"]},
                {"sportId": "inot", "sportName": "Înot", "matchScore": 85, "reasoning": "Înotul oferă stimulare senzorială constantă (apă, mișcare) care menține interesul. Nu există „stai pe loc” — mișcarea continuă ajută la canalizarea energiei. Cursurile au structură clară: încălzire, exerciții, joc. Poate fi practicat individual sau în grup.",
                 "benefits": ["Stimulare senzorială care menține focusul", "Canalizează energia foarte ridicată", "Structură clară a antrenamentului"], "considerations": ["Lecții individuale pot fi mai bune la început", "Informați instructorul", "Evitați grupuri foarte mari"]},
                {"sportId": "alergare", "sportName": "Alergare", "matchScore": 82, "reasoning": "Alergarea recreativă sau atletismul pentru copii oferă libertate de mișcare și consumă energia ridicată. Nu necesită atenție îndelungată la reguli complexe. Probe scurte (sprint) sau jocuri de alergare pot menține interesul. Poate fi în aer liber sau pe pistă.",
                 "benefits": ["Libertate de mișcare fără reguli complexe", "Consumă energia foarte ridicată", "Probe scurte mențin interesul"], "considerations": ["Cluburi de atletism cu programe pentru copii", "Jocuri de alergare la început", "Evitați antrenamente prea lungi"]},
            ],
            "specialistRecommendation": {"needed": True, "specialty": "psychologist", "reason": "Copilul prezintă dificultăți de concentrare la școală și în cadrul sportului anterior (fotbal), cu posibil diagnostic ADHD în evaluare. Un psiholog pediatric poate confirma diagnosticul, oferi strategii de management și recomandări pentru activități sportive potrivite. Colaborarea cu școala și antrenorul poate sprijini succesul în noul sport.", "priority": "medium"},
        },
    ))

    # --- TRAINING: Subponderal → nutritionist ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 10 ani
Gen: Fată

Nivel de energie: Mediu

Trăsături de personalitate: timidă, silencioasă, sensibilă

Interese și hobby-uri: lectură, desen, animale

Sporturi încercate anterior: Niciunul

Constituție fizică: Subțire
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
- Considerații fizice: Subponderală (IMC sub normă pentru vârstă)

Preferințe:
- Activități interioare: Da
- Activități exterioare: Nu
- Sporturi de echipă: Nu
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "inot", "sportName": "Înot", "matchScore": 88, "reasoning": "Înotul este excelent pentru o fată subponderală deoarece dezvoltă mușchi și apetit fără impact articular. Apa susține corpul, iar antrenamentul regulat stimulează metabolismul și pofta de mâncare. Este individual și în interior, conform preferințelor. Natura calmă a sportului se potrivește unei copile timide.",
                 "benefits": ["Dezvoltă mușchi și stimulează apetitul", "Fără impact articular", "Mediu calm pentru copii timizi"], "considerations": ["Asigurați-vă că mănâncă suficient înainte și după", "Consultare nutriționist recomandată", "Progres treptat"]},
                {"sportId": "dans", "sportName": "Dans", "matchScore": 82, "reasoning": "Dansul contemporan sau modern oferă activitate fizică moderată care poate crește apetitul și tonusul muscular. Este individual, în interior, și nu necesită contact. Pentru o fată timidă, dansul oferă un mediu sigur de exprimare.",
                 "benefits": ["Activitate moderată care stimulează apetitul", "Dezvoltă tonus muscular", "Mediu sigur și non-competitiv"], "considerations": ["Stiluri cu intensitate moderată", "Nutriție adecvată esențială", "Cost: 150-300 lei/lună"]},
                {"sportId": "gimnastica", "sportName": "Gimnastică", "matchScore": 78, "reasoning": "Gimnastica recreativă dezvoltă forța, flexibilitatea și coordonarea. Pentru un copil subponderal, antrenamentul regulat poate stimula apetitul și dezvoltarea musculară armonioasă. Programele recreative sunt adaptate și non-competitive.",
                 "benefits": ["Dezvoltă forța și flexibilitatea", "Stimulează apetitul prin antrenament regulat", "Mediu structurat și sigur"], "considerations": ["Orientare nutriționist în paralel", "Evitați subalimentarea", "Progres treptat"]},
            ],
            "specialistRecommendation": {"needed": True, "specialty": "nutritionist", "reason": "Copilul este subponderal (IMC sub normă pentru vârstă), ceea ce poate afecta creșterea și dezvoltarea. Un nutriționist pediatric poate evalua aportul alimentar, exclude afecțiuni medicale și elabora un plan alimentar care să susțină creșterea sănătoasă și practicarea sportului. Este important să se asigure că activitatea sportivă este însoțită de nutriție adecvată.", "priority": "medium"},
        },
    ))

    # --- TRAINING: Hipermobilitate articulară → orthopedist ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 9 ani
Gen: Fată

Nivel de energie: Ridicat

Trăsături de personalitate: flexibilă, artistică, atentă la detalii

Interese și hobby-uri: dans, gimnastică, yoga cu părinții

Sporturi încercate anterior: gimnastică
Motiv oprire: Dureri la încheieturi după antrenament

Constituție fizică: Subțire
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Dureri ușoare ocazionale la încheieturi
- Considerații: Hipermobilitate articulară (articulații foarte flexibile)

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "inot", "sportName": "Înot", "matchScore": 92, "reasoning": "Înotul este cel mai recomandat sport pentru hipermobilitate articulară deoarece apa susține corpul și reduce stresul pe articulații. Nu există impact sau suprasolicitare a ligamentelor. Dezvoltă forța musculară care protejează articulațiile. Pentru o fată artistică, înotul sincron sau stilurile tehnice oferă satisfacție estetică.",
                 "benefits": ["Zero impact — protejează articulațiile hipermobile", "Fortifică mușchii care susțin articulațiile", "Dezvoltă rezistență fără risc articular"], "considerations": ["Evitați hiperextensia excesivă la înot", "Consolidare musculară în paralel", "Consultare ortoped pentru plan personalizat"]},
                {"sportId": "dans", "sportName": "Dans", "matchScore": 80, "reasoning": "Dansul contemporan poate fi practicat cu atenție la limite — evitarea extensiilor extreme care pot agrava hipermobilitatea. Un antrenor informat poate adapta coregrafiile. Flexibilitatea naturală este un avantaj, dar forța trebuie dezvoltată în paralel.",
                 "benefits": ["Valorifică flexibilitatea cu control", "Expresie artistică", "Antrenament adaptat posibil"], "considerations": ["OBLIGATORIU: evaluare ortopedică înainte", "Evitați poziții de hiperextensie", "Consolidare musculară obligatorie"]},
                {"sportId": "ciclism", "sportName": "Ciclism", "matchScore": 75, "reasoning": "Ciclismul recreativ oferă activitate cardiovasculară cu impact redus pe articulații. Mișcarea este controlată și repetitivă. Pentru hipermobilitate, este important setarea corectă a bicicletei și evitarea suprasolicitării încheieturilor.",
                 "benefits": ["Impact redus pe articulații", "Dezvoltă rezistența", "Activitate în aer liber"], "considerations": ["Setare ergonomică a bicicletei", "Evitați terenuri foarte accidentate", "Consolidare musculară recomandată"]},
            ],
            "specialistRecommendation": {"needed": True, "specialty": "orthopedist", "reason": "Copilul prezintă hipermobilitate articulară și dureri ocazionale la încheieturi după antrenament la gimnastică. Un ortoped pediatru trebuie să confirme diagnosticul, să excludă sindromul Ehlers-Danlos sau alte condiții asociate, și să recomande sporturi sigure plus exerciții de consolidare musculară pentru protecția articulațiilor. Unele sporturi (gimnastică competitivă, arte marțiale cu extensii extreme) pot fi contraindicate sau necesită adaptări.", "priority": "high"},
        },
    ))

    # --- TRAINING: Eczema / alergii severe (fără astm), context aer liber ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 7 ani
Gen: Băiat

Nivel de energie: Ridicat

Trăsături de personalitate: curios, activ, rezervat

Interese și hobby-uri: natură, animale, explorat

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
- Alergii severe (polen, acarieni), eczema — pielea se irită la transpirație și praf

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da (cu prudență)
- Sporturi de echipă: Da
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "inot", "sportName": "Înot", "matchScore": 91, "reasoning": "Înotul este ideal pentru un copil cu eczema și alergii: mediul de la bazin este umed, clorul controlat reduce acarienii, iar transpirația este limitată. Apa nu irită pielea la fel ca transpirația uscată. Cursurile în interior evită polenul. După înot, dus și cremă hidratantă sunt importante.",
                 "benefits": ["Mediu umed — mai puțină iritare decât transpirația uscată", "Interior fără polen", "Dezvoltă coordonarea și rezistența"], "considerations": ["Dus și hidratare imediat după", "Evitați bazine cu clor foarte puternic", "Informați instructorul despre eczema"]},
                {"sportId": "tenis-de-masa", "sportName": "Tenis de masă", "matchScore": 85, "reasoning": "Tenisul de masă se practică în interior, în săli cu climat controlat, fără praf excesiv dacă sunt bine întreținute. Transpirația este moderată. Sport de echipă (dublu) sau individual. O alternativă bună când polenul este ridicat afară.",
                 "benefits": ["Interior cu climat controlat", "Transpirație moderată", "Strategic și distractiv"], "considerations": ["Verificați că sala nu are praf/acarieni", "Hidratare și îmbrăcăminte respirantă", "Disponibil în cluburi"]},
                {"sportId": "escalada", "sportName": "Escaladă", "matchScore": 78, "reasoning": "Escalada în sală (interior) oferă activitate intensă într-un mediu controlat. Sălile moderne au ventilație bună. Transpirația poate fi gestionată cu îmbrăcăminte tehnică și dus după. Pentru un copil curios și activ, escalada oferă provocare fizică și mentală.",
                 "benefits": ["Interior cu mediu controlat", "Provocare fizică și mentală", "Comunitate prietenoasă"], "considerations": ["Hidratare și cremă după (eczema)", "Evitați săli vechi cu praf", "Echipament de siguranță obligatoriu"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: Rebel + arte marțiale (disciplină) ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 11 ani
Gen: Băiat

Nivel de energie: Ridicat

Trăsături de personalitate: rebel, independent, provocator

Interese și hobby-uri: muzică rock, skateboard, prieteni nonconformiști

Sporturi încercate anterior: fotbal
Motiv oprire: Nu îi plăceau regulile și autoritatea antrenorului

Constituție fizică: Atletic
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Nu
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "arte-martiale", "sportName": "Arte marțiale", "matchScore": 92, "reasoning": "Artele marțiale (taekwondo, kickboxing) oferă un cadru de disciplină consimțit — copilul acceptă regulile pentru că sunt parte din „jocul” și din respectul reciproc, nu impuse arbitrar. Rebelia poate fi canalizată în efort și determinare. Antrenorul este văzut ca mentor, nu ca autoritate distantă. Progresul prin centuri oferă recunoaștere individuală.",
                 "benefits": ["Disciplină consimțită care respectă nevoia de autonomie", "Canalizează energia și rebelia în efort constructiv", "Recunoaștere individuală prin centuri"], "considerations": ["Alegeți un dojo cu filosofie de respect, nu autoritară", "Taekwondo sau kickboxing pot rezonă cu spiritul rebel", "Cost: 150-350 lei/lună"]},
                {"sportId": "skateboarding", "sportName": "Skateboarding", "matchScore": 88, "reasoning": "Skateboarding-ul este un sport nonconformist, fără antrenor autoritar — învață din comunitate și din încercări. Libertate totală de expresie. Se aliniază cu muzica rock și cultura alternativă. Individual, în aer liber, cu provocări personale.",
                 "benefits": ["Libertate și cultură nonconformistă", "Provocări personale, fără ierarhie rigidă", "Comunitate de prieteni cu valori similare"], "considerations": ["Echipament de protecție OBLIGATORIU", "Skatepark-uri în orașe mari", "Risc de accidentare — cască, genunchiere"]},
                {"sportId": "escalada", "sportName": "Escaladă", "matchScore": 82, "reasoning": "Escalada oferă provocare individuală extremă fără reguli de echipă. Fiecare traseu este o luptă personală. Comunitatea de escaladă este deschisă și nonconformistă. Poate fi practicată în sală sau pe stâncă, în aer liber.",
                 "benefits": ["Provocare 100% individuală", "Comunitate deschisă", "Libertate de a alege traseele"], "considerations": ["Sală de escaladă sau trasee naturale", "Echipament de siguranță", "Cost: 200-400 lei/lună"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: Foarte competitiv + sport individual (tenis, atletism) ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 12 ani
Gen: Băiat

Nivel de energie: Foarte ridicat

Trăsături de personalitate: foarte competitiv, ambițios, perfectionist

Interese și hobby-uri: clasamente, recorduri, sport la TV

Sporturi încercate anterior: fotbal, baschet
Motiv oprire: Vrea să fie el decisiv, nu să depindă de echipă

Constituție fizică: Atletic
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "tenis", "sportName": "Tenis", "matchScore": 95, "reasoning": "Tenisul este sportul individual par excellence — victoria și înfrângerea sunt 100% ale lui. Pentru un copil foarte competitiv care nu vrea să depindă de echipă, tenisul oferă control total asupra rezultatului. Clasamentele sunt clare, recordurile personale măsurabile. La 12 ani poate concura la nivel național de juniori.",
                 "benefits": ["Succesul și eșecul sunt 100% individuale", "Clasamente și recorduri clare", "Control total asupra antrenamentului și meciurilor"], "considerations": ["Cost ridicat: lecții + turnamente + echipament", "Antrenamente 4-5 ori/săptămână la nivel competitiv", "Disponibil în cluburi din orașe mari"]},
                {"sportId": "atletism", "sportName": "Atletism", "matchScore": 92, "reasoning": "Atletismul oferă competiție individuală pură: timpi, distanțe, recorduri personale. Fiecare performanță este măsurabilă și comparabilă. Pentru un perfectionist, îmbunătățirea continuă este motivantă. Multiple discipline permit specializare.",
                 "benefits": ["Performanță 100% individuală și măsurabilă", "Recorduri personale și naționale", "Multiple discipline pentru specializare"], "considerations": ["Antrenamente intensive 4-5 ori/săptămână", "Competiții la nivel regional și național", "Cluburi în toate județele"]},
                {"sportId": "inot", "sportName": "Înot", "matchScore": 88, "reasoning": "Înotul competitiv este un sport individual cu timpi exacti și clasamente clare. Fiecare cursă este o provocare personală. La 12 ani, poate concura la multiple probe. Perfectionismul este recompensat prin îmbunătățirea continuă a timpilor.",
                 "benefits": ["Timpi și clasamente obiective", "Competiție individuală în fiecare cursă", "Multiple probe pentru varietate"], "considerations": ["Necesită bazin olimpic pentru antrenamente serioase", "Cost: 200-400 lei/lună", "4-6 antrenamente/săptămână"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: Badminton, patinaj, golf (sport variety) ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 10 ani
Gen: Fată

Nivel de energie: Ridicat

Trăsături de personalitate: rapidă, agilă, reacții bune

Interese și hobby-uri: jocuri de reacție, dans, prietene

Sporturi încercate anterior: volei
Motiv oprire: Vrea ceva mai rapid și mai individual

Constituție fizică: Atletic
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "badminton", "sportName": "Badminton", "matchScore": 93, "reasoning": "Badmintonul este unul dintre cele mai rapide sporturi de reacție — mingea poate depăși 300 km/h. Pentru o fată rapidă și cu reacții bune, badmintonul oferă provocare constantă. Este individual (simplu) sau dublu. Experiența din volei oferă bază pentru jocul la fileu. La 10 ani poate concura la nivel național.",
                 "benefits": ["Unul dintre cele mai rapide sporturi — reacții excelente", "Individual sau dublu", "Bază din volei transferabilă"], "considerations": ["Necesită sală cu înălțime suficientă", "Cost: 150-300 lei/lună", "Competiții la nivel național"]},
                {"sportId": "patinaj", "sportName": "Patinaj", "matchScore": 86, "reasoning": "Patinajul artistic sau pe role combină viteză, agilitate și expresie. Pentru o fată care iubește dansul și reacțiile rapide, patinajul oferă mișcare fluidă și provocare tehnică. Este individual, poate fi practicat în interior (patinoar) sau exterior (role).",
                 "benefits": ["Viteză și agilitate pe gheață/role", "Combină mișcarea cu expresia artistică", "Individual, cu progres clar"], "considerations": ["Patinoar sau pistă de role", "Echipament: patine (încălțăminte)", "Disponibil în orașe mari"]},
                {"sportId": "tenis", "sportName": "Tenis", "matchScore": 84, "reasoning": "Tenisul oferă reacții rapide și joc strategic. Pentru o fată atletică cu coordonare excelentă, tenisul la 10 ani permite dezvoltare competitivă. Este 100% individual în simplu. Reflexele din volei se transferă parțial.",
                 "benefits": ["Reacții rapide și joc strategic", "Individual, performanță măsurabilă", "Competiții la nivel local și național"], "considerations": ["Cost lecții: 80-200 lei/oră", "Teren necesar", "Echipament: rachetă, pantofi"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: Polo, alpinism (less common sports) ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 13 ani
Gen: Băiat

Nivel de energie: Ridicat

Trăsături de personalitate: aventuros, curajos, iubește animalele

Interese și hobby-uri: călărie, natură, documentare despre animale

Sporturi încercate anterior: fotbal, inot
Motiv oprire: Caută ceva mai unic

Constituție fizică: Atletic
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Nu
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "polo", "sportName": "Polo", "matchScore": 88, "reasoning": "Polo-ul (pe apă sau pe câmp) combină pasiunea pentru animale și natură cu sportul de echipă. Pentru un adolescent aventuros care iubește călăria, polo-ul pe câmp este o opțiune unică. Polo pe apă (water polo) este mai accesibil în România și oferă echipă, apă și dinamism. La 13 ani poate practica ambele variante în funcție de disponibilitate.",
                 "benefits": ["Combină sportul cu pasiunea pentru animale/natură", "Sport de echipă dinamic", "Unic și puțin practicat"], "considerations": ["Polo pe câmp: acces limitat, cost ridicat", "Polo pe apă: mai multe cluburi în România", "Necesită înot foarte bun pentru water polo"]},
                {"sportId": "alpinism", "sportName": "Alpinism", "matchScore": 85, "reasoning": "Alpinismul și drumețiile montane oferă aventură în natură și provocare fizică. Pentru un adolescent aventuros și curajos, turele montane și escaladă pe stâncă sunt opțiuni excelente. Comunitatea de alpinism este unită și respectuoasă față de natură. La 13 ani poate participa la ture ghidate și cursuri de escaladă.",
                 "benefits": ["Aventură în natură", "Provocare fizică și mentală", "Comunitate respectuoasă față de mediu"], "considerations": ["Cursuri și ture ghidate obligatorii la început", "Echipament de siguranță", "Disponibil în Carpați, Brașov, Sinaia"]},
                {"sportId": "ciclism", "sportName": "Ciclism", "matchScore": 82, "reasoning": "Ciclismul mountain bike oferă explorare în natură și libertate. Pentru un adolescent care iubește aventura și aerul liber, MTB pe trasee naturale este ideal. Poate fi practicat individual sau în grup. La 13 ani poate participa la ture și competiții de cross-country.",
                 "benefits": ["Explorare în natură pe bicicletă", "Libertate și aventură", "Individual sau grup"], "considerations": ["Echipament: MTB, cască, protecții", "Trasee marcate în zone montane", "Cost: bicicletă + echipament"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: Golf (less common), calm child ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 12 ani
Gen: Băiat

Nivel de energie: Mediu

Trăsături de personalitate: calm, strategic, răbdător

Interese și hobby-uri: șah, citit, natură

Sporturi încercate anterior: tenis de masă
Motiv oprire: Vrea ceva în aer liber, mai relaxat

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Nu
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "golf", "sportName": "Golf", "matchScore": 90, "reasoning": "Golful este sportul strategic și calm par excellence — se practică în natură, la ritm personal. Pentru un băiat calm, strategic și răbdător, golful oferă provocare mentală și tehnică fără presiune de timp. Fiecare lovitură este o decizie strategică. La 12 ani poate începe cursuri și participa la competiții pentru juniori.",
                 "benefits": ["Sport strategic în natură", "Ritm personal, fără presiune", "Combină tehnică și gândire"], "considerations": ["Cost ridicat: abonament, echipament, lecții", "Terenuri în orașe mari și stațiuni", "Sezon: primavară–toamnă"]},
                {"sportId": "tir-cu-arcul", "sportName": "Tir cu arcul", "matchScore": 85, "reasoning": "Tirul cu arcul necesită concentrare, răbdare și precizie — calități pe care le are. Se practică în aer liber, individual. Componenta strategică (vânt, distanță) rezonează cu șahul. Competiții disponibile la nivel național.",
                 "benefits": ["Concentrare și precizie", "În aer liber, individual", "Strategic și tehnic"], "considerations": ["Cluburi în orașe mari", "Echipament oferit de club la început", "Cost: 200-400 lei/lună"]},
                {"sportId": "ciclism", "sportName": "Ciclism", "matchScore": 78, "reasoning": "Ciclismul recreativ în natură oferă activitate la ritm propriu, în aer liber. Pentru un copil calm care iubește natura, turele de ciclism sunt relaxante și sănătoase. Poate fi practicat singur sau cu familia.",
                 "benefits": ["În natură, ritm personal", "Sănătos și relaxant", "Flexibil — singur sau grup"], "considerations": ["Bicicletă și echipament de siguranță", "Piste sau trasee sigure", "Cost accesibil"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: Edge case — 2-3 sporturi încercate anterior ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 11 ani
Gen: Fată

Nivel de energie: Ridicat

Trăsături de personalitate: curioasă, versatilă, ușor nehotărâtă

Interese și hobby-uri: muzică, citit, prietene

Sporturi încercate anterior: gimnastică, dans, înot
Motiv oprire: A vrut să încerce altceva după câteva luni fiecare

Constituție fizică: Atletic
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "volei", "sportName": "Volei", "matchScore": 90, "reasoning": "Voleiul combină coordonarea și reflexele din gimnastică, dans și înot într-un sport de echipă nou. Oferă varietate — servă, recepție, atac — care poate menține interesul unei copile curioase. La 11 ani poate concura. Echipa oferă motivare și angajament prin colegi.",
                 "benefits": ["Valorifică experiența din gimnastică, dans, înot", "Sport de echipă cu varietate tehnică", "Menține interesul prin diversitatea jocului"], "considerations": ["Nivel competitiv de la 9 ani", "Cluburi în majoritatea orașelor", "2-3 antrenamente/săptămână"]},
                {"sportId": "handbal", "sportName": "Handbal", "matchScore": 85, "reasoning": "Handbalul feminin oferă un mediu nou, dinamic, cu tradiție puternică în România. Coordonarea și constituția atletică din sporturile anterioare sunt avantaje. Ritmul rapid și echipa pot oferi motivație pe termen lung.",
                 "benefits": ["Tradiție puternică în România", "Dinamic și rapid", "Echipă motivantă"], "considerations": ["Competitiv de la 8 ani", "Antrenamente intense", "Echipament minim"]},
                {"sportId": "badminton", "sportName": "Badminton", "matchScore": 82, "reasoning": "Badmintonul este un sport individual sau dublu care pune accent pe reacții și agilitate. Pentru o fată care a încercat deja mai multe sporturi, badmintonul oferă o provocare tehnică nouă și poate fi practicat și recreativ, fără presiune de echipă.",
                 "benefits": ["Provocare tehnică nouă", "Individual sau dublu", "Rapid și distractiv"], "considerations": ["Sală cu înălțime suficientă", "Cost: 150-300 lei/lună", "Competiții disponibile"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # --- TRAINING: Edge case — preferințe mixte (echipă + individual), condiții combinate ---
    examples_train.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 9 ani
Gen: Băiat

Nivel de energie: Mediu

Trăsături de personalitate: echilibrat, prietenos, flexibil

Interese și hobby-uri: jocuri de echipă, citit, puzzle-uri

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Astm ușor (controlat)
- Folosește inhaler: Ocazional
- Dureri ușoare ocazionale la genunchi (după alergare)

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da""",
        {
            "recommendations": [
                {"sportId": "inot", "sportName": "Înot", "matchScore": 91, "reasoning": "Înotul este ideal pentru astm ușor (aer umed) și pentru dureri ușoare la genunchi (zero impact). Cursurile de grup oferă socializare, iar competiția poate fi individuală (cursă) sau de echipă (staffete). Satisfac preferințele mixte. La 9 ani poate concura.",
                 "benefits": ["Ideal pentru astm ușor și protecție genunchi", "Grup sau individual (staffete vs. cursă)", "Dezvoltă rezistența fără impact"], "considerations": ["Inhalator la bazin", "Evitați breaststroke dacă genunchii sunt sensibili", "Informați instructorul"]},
                {"sportId": "volei", "sportName": "Volei", "matchScore": 84, "reasoning": "Voleiul este sport de echipă cu intensitate intermitentă — pauze naturale, prietenos cu astm. Impactul pe genunchi este moderat (sărituri); genunchierele sunt recomandate. Satisfac preferința pentru echipă. La 9 ani poate începe competitiv.",
                 "benefits": ["Echipă cu pauze naturale — ok pentru astm", "Combină echipă cu acțiuni individuale", "Genunchiere pentru protecție"], "considerations": ["Genunchiere recomandate", "Inhalator la antrenamente", "Monitorizați genunchii"]},
                {"sportId": "tenis-de-masa", "sportName": "Tenis de masă", "matchScore": 80, "reasoning": "Tenisul de masă este în interior, fără impact pe genunchi, cu efort moderat — bun pentru astm controlat. Se poate practica individual (simplu) sau în echipă (dublu, echipe). Preferințe mixte satisfăcute.",
                 "benefits": ["Zero impact genunchi", "Individual sau echipă (dublu)", "Strategic și distractiv"], "considerations": ["Interior — fără alergeni exteriori", "Cost: 100-250 lei/lună", "Disponibil în cluburi"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # Add more training examples to reach ~30 (we have 12 so far; add 18 more shorter ones)
    # I'll add 18 more varied training examples in a compact way.
    def add_short_train(age, gender, personality, medical_note, sports_list, specialist=None):
        user = f"""ANALIZA COPILULUI:

Vârstă: {age} ani
Gen: {gender}

Nivel de energie: Ridicat

Trăsături de personalitate: {personality}

Interese și hobby-uri: sport, jocuri, prieteni

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
{medical_note}

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da"""
        recs = []
        for s in sports_list:
            recs.append({
                "sportId": s["id"],
                "sportName": s["name"],
                "matchScore": s["score"],
                "reasoning": s["reasoning"],
                "benefits": s["benefits"],
                "considerations": s["considerations"],
            })
        spec = specialist if specialist else {"needed": False}
        examples_train.append(make_example(user, {"recommendations": recs, "specialistRecommendation": spec}))

    add_short_train(6, "Fată", "foarte creativă, expresivă", "", [
        {"id": "balet", "name": "Balet", "score": 92, "reasoning": "Baletul valorifică creativitatea și expresivitatea unei fetițe de 6 ani. Programele sunt artistice și ludice.", "benefits": ["Expresie artistică", "Grație și coordonare"], "considerations": ["Cursuri de la 4-6 ani", "Echipament: body, pantofi"]},
        {"id": "dans", "name": "Dans", "score": 88, "reasoning": "Dansul contemporan oferă libertate creativă și mișcare. La 6 ani, cursurile sunt jucăușe.", "benefits": ["Libertate creativă", "Socializare în grup"], "considerations": ["Studiouri în orașe mari", "Cost: 150-300 lei/lună"]},
        {"id": "gimnastica", "name": "Gimnastică", "score": 85, "reasoning": "Gimnastica artistică combină elemente acrobatice cu expresie. Baza pentru dans sau balet.", "benefits": ["Acrobații și expresie", "Coordonare"], "considerations": ["Recreativ la 6 ani", "Sală specializată"]},
    ])

    add_short_train(7, "Băiat", "rebel, energic, neascultător", "", [
        {"id": "judo", "name": "Judo", "score": 90, "reasoning": "Judoul oferă disciplină și respect într-un cadru care atrage copiii rebeli. Canalizează energia.", "benefits": ["Disciplină consimțită", "Canalizare energie"], "considerations": ["Dojo cu experiență copii", "Kimono necesar"]},
        {"id": "karate", "name": "Karate", "score": 86, "reasoning": "Karate-ul dezvoltă autocontrolul și respectul. Ritualurile oferă structură.", "benefits": ["Autocontrol", "Structură clară"], "considerations": ["Programe pentru 6-8 ani", "Cost: 150-300 lei/lună"]},
        {"id": "taekwondo", "name": "Taekwondo", "score": 84, "reasoning": "Taekwondo oferă lovituri și sărituri care consumă energia. Progres prin centuri.", "benefits": ["Consumă energia", "Progres centuri"], "considerations": ["Disponibil în orașe", "Echipament: dobok"]},
    ])

    add_short_train(10, "Băiat", "foarte competitiv, strategic", "", [
        {"id": "tenis", "name": "Tenis", "score": 92, "reasoning": "Tenisul este 100% individual — victoria depinde doar de el. Strategic și competitiv.", "benefits": ["Individual, măsurabil", "Strategic"], "considerations": ["Lecții 80-200 lei/oră", "Teren necesar"]},
        {"id": "sah", "name": "Șah", "score": 85, "reasoning": "Șahul oferă competiție intelectuală. Complementar sporturilor fizice.", "benefits": ["Competiție strategică", "Complementar"], "considerations": ["Cluburi și online", "Cost redus"]},
        {"id": "atletism", "name": "Atletism", "score": 88, "reasoning": "Atletismul — performanță individuală, timpi și recorduri. Ideal pentru competitiv.", "benefits": ["Performanță individuală", "Recorduri"], "considerations": ["Cluburi în județe", "Multiple discipline"]},
    ])

    add_short_train(8, "Fată", "timidă, creativă", "", [
        {"id": "patinaj", "name": "Patinaj", "score": 88, "reasoning": "Patinajul artistic oferă expresie și grație. Individual, dar cu grup la antrenament.", "benefits": ["Expresie artistică", "Individual"], "considerations": ["Patinoar necesar", "Cost echipament"]},
        {"id": "dans", "name": "Dans", "score": 86, "reasoning": "Dansul oferă mediu sigur pentru copii timizi. Expresie prin mișcare.", "benefits": ["Mediu sigur", "Expresie"], "considerations": ["Studio inclusiv", "150-350 lei/lună"]},
        {"id": "inot", "name": "Înot", "score": 82, "reasoning": "Înotul — mediu personal, progres individual. Cursuri de grup mici.", "benefits": ["Progres individual", "Mediu calm"], "considerations": ["Cursuri mici", "Bazin"]},
    ])

    add_short_train(13, "Băiat", "aventuros, independent", "", [
        {"id": "alpinism", "name": "Alpinism", "score": 90, "reasoning": "Alpinismul și drumețiile montane oferă aventură în natură. La 13 ani, ture ghidate.", "benefits": ["Aventură în natură", "Provocare fizică"], "considerations": ["Ture ghidate", "Carpați"]},
        {"id": "escalada", "name": "Escaladă", "score": 88, "reasoning": "Escalada pe stâncă sau în sală — provocare individuală. Comunitate deschisă.", "benefits": ["Provocare individuală", "Comunitate"], "considerations": ["Echipament siguranță", "Săli în orașe mari"]},
        {"id": "ciclism", "name": "Ciclism", "score": 85, "reasoning": "MTB oferă explorare și libertate. Ture în natură.", "benefits": ["Explorare", "Libertate"], "considerations": ["MTB + cască", "Trasee marcate"]},
    ])

    # Validation set (5 examples)
    val_user1 = """ANALIZA COPILULUI:

Vârstă: 5 ani
Gen: Băiat

Nivel de energie: Mediu

Trăsături de personalitate: curios, blând, atent

Interese și hobby-uri: apă, puzzle-uri, animale

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Încă dezvoltă coordonarea

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da"""
    examples_val.append(make_example(val_user1, {
        "recommendations": [
            {"sportId": "inot", "sportName": "Înot", "matchScore": 92, "reasoning": "Înotul recreativ la 5 ani este ideal pentru un băiețel curios care iubește apa. Cursurile sunt jucăușe și de familiarizare. Dezvoltă coordonarea în siguranță.", "benefits": ["Familiarizare cu apa", "Coordonare", "Siguranță"], "considerations": ["Cursuri 4-5 ani", "Bazin cald", "Prezență părinte"]},
            {"sportId": "gimnastica", "sportName": "Gimnastică", "matchScore": 85, "reasoning": "Gimnastica recreativă la 5 ani este ludică. Curiozitatea și atenția sunt avantaje pentru învățare.", "benefits": ["Coordonare", "Echilibru", "Ludic"], "considerations": ["Recreativ", "Sală specializată"]},
            {"sportId": "dans", "sportName": "Dans", "matchScore": 78, "reasoning": "Dansul pentru copii mici oferă mișcare și expresie. Individual, în interior.", "benefits": ["Expresie", "Mișcare", "Grup mic"], "considerations": ["De la 4 ani", "Studio"]},
        ],
        "specialistRecommendation": {"needed": False},
    }))
    # Validation 2: ADHD referral
    val_user2 = """ANALIZA COPILULUI:

Vârstă: 8 ani
Gen: Fată

Nivel de energie: Foarte ridicat

Trăsături de personalitate: neatenție, impulsivă, creativă

Interese și hobby-uri: desen, jocuri, alergat

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
- Dificultăți de concentrare la școală

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da"""
    examples_val.append(make_example(val_user2, {
        "recommendations": [
            {"sportId": "arte-martiale", "sportName": "Arte marțiale", "matchScore": 88, "reasoning": "Artele marțiale oferă structură și ritualuri care ajută la concentrare. Disciplina consimțită.", "benefits": ["Structură", "Disciplină", "Progres centuri"], "considerations": ["Dojo cu experiență copii", "Comunicați cu antrenorul"]},
            {"sportId": "inot", "sportName": "Înot", "matchScore": 85, "reasoning": "Înotul oferă stimulare senzorială constantă. Structură clară a antrenamentului.", "benefits": ["Stimulare", "Structură", "Energie"], "considerations": ["Lecții individuale la început", "Bazin"]},
            {"sportId": "gimnastica", "sportName": "Gimnastică", "matchScore": 80, "reasoning": "Gimnastica — secvențe scurte, varietate. Menține interesul.", "benefits": ["Varietate", "Secvențe scurte", "Coordonare"], "considerations": ["Programe adaptate", "Sală"]},
        ],
        "specialistRecommendation": {"needed": True, "specialty": "psychologist", "reason": "Dificultățile de concentrare la școală merită evaluare de un psiholog pediatric pentru a exclude ADHD sau alte condiții și pentru strategii de management.", "priority": "medium"},
    }))

    # Validation 3: Subponderal
    val_user3 = """ANALIZA COPILULUI:

Vârstă: 9 ani
Gen: Băiat

Nivel de energie: Mediu

Trăsături de personalitate: calm, silențios

Interese și hobby-uri: citit, desen

Sporturi încercate anterior: Niciunul

Constituție fizică: Subțire
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
- Subponderal (IMC sub normă)

Preferințe:
- Activități interioare: Da
- Activități exterioare: Nu
- Sporturi de echipă: Nu
- Sporturi individuale: Da"""
    examples_val.append(make_example(val_user3, {
        "recommendations": [
            {"sportId": "inot", "sportName": "Înot", "matchScore": 88, "reasoning": "Înotul dezvoltă mușchi și stimulează apetitul fără impact. Individual, în interior.", "benefits": ["Mușchi", "Apetit", "Fără impact"], "considerations": ["Nutriție adecvată", "Progres treptat"]},
            {"sportId": "dans", "sportName": "Dans", "matchScore": 80, "reasoning": "Dansul oferă activitate moderată. Stimulează apetitul și tonusul.", "benefits": ["Moderat", "Tonus", "Individual"], "considerations": ["Nutriționist în paralel", "Stiluri moderate"]},
        ],
        "specialistRecommendation": {"needed": True, "specialty": "nutritionist", "reason": "Subponderalul necesită evaluare nutrițională pentru plan alimentar care să susțină creșterea și sportul.", "priority": "medium"},
    }))

    # Validation 4: Hipermobilitate
    val_user4 = """ANALIZA COPILULUI:

Vârstă: 10 ani
Gen: Fată

Nivel de energie: Ridicat

Trăsături de personalitate: flexibilă, atentă

Interese și hobby-uri: dans, gimnastică

Sporturi încercate anterior: gimnastică
Motiv oprire: Dureri la încheieturi

Constituție fizică: Subțire
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Dureri ușoare ocazionale
- Hipermobilitate articulară

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da"""
    examples_val.append(make_example(val_user4, {
        "recommendations": [
            {"sportId": "inot", "sportName": "Înot", "matchScore": 92, "reasoning": "Înotul protejează articulațiile hipermobile — zero impact. Fortifică mușchii.", "benefits": ["Zero impact", "Fortificare", "Sigur"], "considerations": ["Evitați hiperextensia", "Consolidare musculară"]},
            {"sportId": "dans", "sportName": "Dans", "matchScore": 78, "reasoning": "Dansul cu adaptări — evitați extensii extreme. Fortificare în paralel.", "benefits": ["Adaptat", "Expresie"], "considerations": ["Evaluare ortoped", "Limite de extensie"]},
        ],
        "specialistRecommendation": {"needed": True, "specialty": "orthopedist", "reason": "Hipermobilitatea și durerile la încheieturi necesită evaluare ortopedică pentru sporturi sigure și exerciții de consolidare.", "priority": "high"},
    }))

    # Validation 5: Badminton
    val_user5 = """ANALIZA COPILULUI:

Vârstă: 11 ani
Gen: Băiat

Nivel de energie: Ridicat

Trăsături de personalitate: rapid, agil

Interese și hobby-uri: jocuri video, sport

Sporturi încercate anterior: fotbal

Constituție fizică: Atletic
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Nu
- Sporturi de echipă: Nu
- Sporturi individuale: Da"""
    examples_val.append(make_example(val_user5, {
        "recommendations": [
            {"sportId": "badminton", "sportName": "Badminton", "matchScore": 92, "reasoning": "Badmintonul este rapid și solicită reacții. Individual, în interior. La 11 ani competitiv.", "benefits": ["Rapid", "Reacții", "Individual"], "considerations": ["Sală înălțime", "150-300 lei/lună"]},
            {"sportId": "tenis-de-masa", "sportName": "Tenis de masă", "matchScore": 85, "reasoning": "Tenis de masă — reacții și strategie. Individual, interior.", "benefits": ["Reacții", "Strategic", "Interior"], "considerations": ["Cluburi", "Cost redus"]},
            {"sportId": "sah", "sportName": "Șah", "matchScore": 72, "reasoning": "Șah — strategic, complementar. Competiții disponibile.", "benefits": ["Strategic", "Complementar"], "considerations": ["Online sau club", "Cost redus"]},
        ],
        "specialistRecommendation": {"needed": False},
    }))

    # ========== BATCH 2: Additional examples (append only this batch when running script) ==========
    examples_train_b2 = []
    examples_val_b2 = []

    def add_b2(age, gender, personality, medical, sports_list, specialist=None):
        user = f"""ANALIZA COPILULUI:

Vârstă: {age} ani
Gen: {gender}

Nivel de energie: Ridicat

Trăsături de personalitate: {personality}

Interese și hobby-uri: sport, jocuri, prieteni

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare
{medical}

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Da"""
        recs = [{"sportId": s["id"], "sportName": s["name"], "matchScore": s["score"], "reasoning": s["reasoning"], "benefits": s["benefits"], "considerations": s["considerations"]} for s in sports_list]
        spec = specialist if specialist else {"needed": False}
        examples_train_b2.append(make_example(user, {"recommendations": recs, "specialistRecommendation": spec}))

    # B2: Age 4-6 variety
    add_b2(4, "Fată", "veselă, activă, sociabilă", "", [
        {"id": "dans", "name": "Dans", "score": 90, "reasoning": "Dansul la 4 ani este jucăuș și în grup. Ideal pentru o fetiță veselă și sociabilă.", "benefits": ["Socializare", "Mișcare", "Distracție"], "considerations": ["De la 4 ani", "Studio"]},
        {"id": "gimnastica", "name": "Gimnastică", "score": 85, "reasoning": "Gimnastica recreativă la 4 ani — jocuri și exerciții ludice.", "benefits": ["Coordonare", "Echilibru", "Grup"], "considerations": ["Recreativ", "Sală"]},
        {"id": "inot", "name": "Înot", "score": 82, "reasoning": "Înot pentru copii mici — familiarizare cu apa, jocuri în grup.", "benefits": ["Siguranță în apă", "Coordonare", "Grup"], "considerations": ["Bazin cald", "Părinte"]},
    ])
    add_b2(6, "Băiat", "curios, energic, prietenos", "", [
        {"id": "fotbal", "name": "Fotbal", "score": 91, "reasoning": "Fotbalul la 6 ani — echipă, joc, energie. Nivel competitiv disponibil.", "benefits": ["Echipă", "Energie", "Coordonare"], "considerations": ["Competitiv de la 6 ani", "Echipament"]},
        {"id": "inot", "name": "Înot", "score": 88, "reasoning": "Înot la 6 ani — grup sau individual. Consumă energia.", "benefits": ["Rezistență", "Siguranță", "Grup"], "considerations": ["Bazin", "150-300 lei/lună"]},
        {"id": "judo", "name": "Judo", "score": 84, "reasoning": "Judoul la 6 ani — disciplină și joc. Progres prin centuri.", "benefits": ["Disciplină", "Respect", "Progres"], "considerations": ["Dojo", "Kimono"]},
    ])

    # B2: Age 7-10 variety
    add_b2(7, "Fată", "empatică, cooperantă, calmă", "", [
        {"id": "volei", "name": "Volei", "score": 86, "reasoning": "Voleiul recreativ la 7 ani — echipă, cooperare. Fără contact fizic intens.", "benefits": ["Cooperare", "Echipă", "Reacții"], "considerations": ["Recreativ până la 9 ani", "Sală"]},
        {"id": "dans", "name": "Dans", "score": 88, "reasoning": "Dansul în grup — expresie și cooperare. Ideal pentru empatică.", "benefits": ["Expresie", "Grup", "Cooperare"], "considerations": ["Studio", "Cost moderat"]},
        {"id": "inot", "name": "Înot", "score": 85, "reasoning": "Înot în grup — echipă la staffete sau individual. Calm și structurat.", "benefits": ["Rezistență", "Grup sau individual", "Calm"], "considerations": ["Bazin", "Competitiv de la 5 ani"]},
    ])
    add_b2(9, "Băiat", "analitic, concentrat, răbdător", "", [
        {"id": "sah", "name": "Șah", "score": 94, "reasoning": "Șahul valorifică analiza și concentrarea. Competiții la nivel național.", "benefits": ["Strategic", "Concentrare", "Competiție"], "considerations": ["Cluburi", "Online"]},
        {"id": "tenis-de-masa", "name": "Tenis de masă", "score": 88, "reasoning": "Tenis de masă — reacții și strategie. Individual sau echipă.", "benefits": ["Reacții", "Strategic", "Individual"], "considerations": ["Cluburi", "Cost redus"]},
        {"id": "tir-cu-arcul", "name": "Tir cu arcul", "score": 85, "reasoning": "Tir cu arcul — concentrare și precizie. Individual, calm.", "benefits": ["Concentrare", "Precizie", "Calm"], "considerations": ["Cluburi orașe mari", "Echipament"]},
    ])
    add_b2(10, "Fată", "determinată, ambițioasă, disciplinată", "", [
        {"id": "gimnastica", "name": "Gimnastică", "score": 92, "reasoning": "Gimnastica artistică la 10 ani — disciplină și ambiție. Competitiv disponibil.", "benefits": ["Disciplină", "Flexibilitate", "Competiție"], "considerations": ["Sală specializată", "Antrenamente frecvente"]},
        {"id": "atletism", "name": "Atletism", "score": 88, "reasoning": "Atletismul — performanță individuală, recorduri. Pentru determinată și ambițioasă.", "benefits": ["Performanță individuală", "Recorduri", "Disciplină"], "considerations": ["Cluburi județene", "Multiple discipline"]},
        {"id": "inot", "name": "Înot", "score": 86, "reasoning": "Înot competitiv la 10 ani — timpi, discipline. Disciplină și angajament.", "benefits": ["Competiție", "Rezistență", "Disciplină"], "considerations": ["Bazin olimpic", "4-5 antrenamente/săpt"]},
    ])

    # B2: Age 11-14 variety
    add_b2(11, "Băiat", "sociabil, lider, comunicativ", "", [
        {"id": "handbal", "name": "Handbal", "score": 90, "reasoning": "Handbalul — echipă, lider pe teren. România are tradiție puternică.", "benefits": ["Lider în echipă", "Rapid", "Tradiție RO"], "considerations": ["Competitiv de la 8 ani", "Cluburi"]},
        {"id": "baschet", "name": "Baschet", "score": 88, "reasoning": "Baschetul — playmaker, comunicare în echipă. Ritm rapid.", "benefits": ["Lider", "Strategic", "Rapid"], "considerations": ["Cluburi", "Echipament"]},
        {"id": "volei", "name": "Volei", "score": 85, "reasoning": "Volei — capitanie, comunicare. Sport de echipă fără contact direct.", "benefits": ["Comunicare", "Echipă", "Reacții"], "considerations": ["Competitiv de la 9 ani", "Sală"]},
    ])
    add_b2(12, "Fată", "intelectuală, creativă, concentrată", "", [
        {"id": "escalada", "name": "Escaladă", "score": 89, "reasoning": "Escalada — puzzle fizic și mental. Pentru creativă și concentrată.", "benefits": ["Puzzle fizic", "Concentrare", "Individual"], "considerations": ["Sală escaladă", "Echipament"]},
        {"id": "tir-cu-arcul", "name": "Tir cu arcul", "score": 88, "reasoning": "Tir cu arcul — precizie și concentrare. Sport calm, individual.", "benefits": ["Precizie", "Concentrare", "Calm"], "considerations": ["Cluburi", "Competiții"]},
        {"id": "sah", "name": "Șah", "score": 85, "reasoning": "Șah — strategic și creativ. Complementar sporturilor fizice.", "benefits": ["Strategic", "Creativ", "Competiție"], "considerations": ["Cluburi", "Online"]},
    ])
    add_b2(13, "Fată", "sportivă, competitivă, disciplinată", "", [
        {"id": "handbal", "name": "Handbal", "score": 93, "reasoning": "Handbal feminin la 13 ani — tradiție românească, competiție serioasă.", "benefits": ["Tradiție RO", "Competiție", "Echipă"], "considerations": ["Antrenamente intense", "Meciuri frecvente"]},
        {"id": "volei", "name": "Volei", "score": 90, "reasoning": "Volei feminin — competiție la nivel național. Disciplină și echipă.", "benefits": ["Competiție națională", "Echipă", "Strategic"], "considerations": ["Cluburi", "4-5 antrenamente/săpt"]},
        {"id": "atletism", "name": "Atletism", "score": 87, "reasoning": "Atletism la 13 ani — multiple discipline, performanță individuală.", "benefits": ["Individual", "Multiple discipline", "Competiție"], "considerations": ["Stadion", "Antrenamente"]},
    ])
    add_b2(14, "Băiat", "ambițios, focusat, atletic", "", [
        {"id": "fotbal", "name": "Fotbal", "score": 91, "reasoning": "Fotbal la 14 ani — academii și competiții juniori. Oportunități de carieră.", "benefits": ["Academii", "Competiții juniori", "Carieră"], "considerations": ["Selecție", "Antrenamente zilnice"]},
        {"id": "inot", "name": "Înot", "score": 88, "reasoning": "Înot competitiv la 14 ani — discipline multiple, performanță.", "benefits": ["Competiție", "Discipline multiple", "Performanță"], "considerations": ["Bazin olimpic", "6 antrenamente/săpt"]},
        {"id": "judo", "name": "Judo", "score": 86, "reasoning": "Judoul la 14 ani — competiții naționale și internaționale. Disciplină.", "benefits": ["Competiții naționale", "Disciplină", "Individual"], "considerations": ["Dojo", "Kimono", "Antrenamente"]},
    ])

    # B2: Medical / specialist variety
    add_b2(8, "Băiat", "activ, neatenție, creativ", "", [
        {"id": "arte-martiale", "name": "Arte marțiale", "score": 88, "reasoning": "Arte marțiale — structură și ritualuri care ajută la concentrare.", "benefits": ["Structură", "Concentrare", "Disciplină"], "considerations": ["Dojo cu experiență copii", "Comunicați cu antrenorul"]},
        {"id": "inot", "name": "Înot", "score": 85, "reasoning": "Înot — stimulare senzorială constantă, structură clară a antrenamentului.", "benefits": ["Stimulare", "Structură", "Energie"], "considerations": ["Lecții individuale la început", "Bazin"]},
        {"id": "alergare", "name": "Alergare", "score": 80, "reasoning": "Alergare recreativă — libertate de mișcare, probe scurte.", "benefits": ["Libertate", "Probe scurte", "Aer liber"], "considerations": ["Grupuri de alergare", "Evitați antrenamente prea lungi"]},
    ], {"needed": True, "specialty": "psychologist", "reason": "Dificultățile de concentrare merită evaluare de un psiholog pediatric pentru strategii de management și eventual diagnostic ADHD.", "priority": "medium"})

    add_b2(9, "Fată", "calmă, subponderală, sensibilă", "", [
        {"id": "inot", "name": "Înot", "score": 88, "reasoning": "Înot — dezvoltă mușchi și stimulează apetitul fără impact. Individual, calm.", "benefits": ["Mușchi", "Apetit", "Fără impact"], "considerations": ["Nutriție adecvată", "Progres treptat"]},
        {"id": "dans", "name": "Dans", "score": 82, "reasoning": "Dans — activitate moderată care stimulează apetitul. Expresie și mișcare.", "benefits": ["Moderat", "Apetit", "Expresie"], "considerations": ["Nutriționist în paralel", "Stiluri moderate"]},
        {"id": "gimnastica", "name": "Gimnastică", "score": 78, "reasoning": "Gimnastică recreativă — forță și flexibilitate. Non-competitiv.", "benefits": ["Forță", "Flexibilitate", "Recreativ"], "considerations": ["Orientare nutriționist", "Progres treptat"]},
    ], {"needed": True, "specialty": "nutritionist", "reason": "Subponderalul necesită evaluare nutrițională pentru plan alimentar care să susțină creșterea și activitatea sportivă.", "priority": "medium"})

    # B2: Sport variety (patinaj, polo, golf, etc.)
    add_b2(10, "Băiat", "elegant, concentrat, ambițios", "", [
        {"id": "patinaj", "name": "Patinaj", "score": 90, "reasoning": "Patinaj artistic — eleganță și concentrare. Individual, performanță.", "benefits": ["Eleganță", "Concentrare", "Individual"], "considerations": ["Patinoar", "Echipament", "Cost"]},
        {"id": "tenis", "name": "Tenis", "score": 88, "reasoning": "Tenis — eleganță și strategic. Individual, competitiv.", "benefits": ["Strategic", "Individual", "Competitiv"], "considerations": ["Teren", "Lecții", "Cost"]},
        {"id": "gimnastica", "name": "Gimnastică", "score": 85, "reasoning": "Gimnastică artistică — eleganță și disciplină. Multiple discipline.", "benefits": ["Eleganță", "Disciplină", "Multiple discipline"], "considerations": ["Sală", "Antrenamente"]},
    ])
    add_b2(12, "Băiat", "calm, strategic, răbdător", "", [
        {"id": "golf", "name": "Golf", "score": 91, "reasoning": "Golful — strategic, calm, în natură. La 12 ani competiții juniori.", "benefits": ["Strategic", "Calm", "Natură"], "considerations": ["Terenuri", "Cost ridicat", "Sezon"]},
        {"id": "tir-cu-arcul", "name": "Tir cu arcul", "score": 88, "reasoning": "Tir cu arcul — concentrare și precizie. Individual, aer liber.", "benefits": ["Concentrare", "Precizie", "Aer liber"], "considerations": ["Cluburi", "Echipament"]},
        {"id": "sah", "name": "Șah", "score": 85, "reasoning": "Șah — strategic și calm. Complementar sporturilor în aer liber.", "benefits": ["Strategic", "Calm", "Competiție"], "considerations": ["Cluburi", "Online"]},
    ])

    # B2: Edge cases — multiple sports tried, mixed preferences
    add_b2(11, "Fată", "versatilă, curioasă, nehotărâtă", "", [
        {"id": "badminton", "name": "Badminton", "score": 88, "reasoning": "Badminton — rapid, individual sau dublu. Noutate pentru o copilă care a încercat multe.", "benefits": ["Rapid", "Individual/dublu", "Noutate"], "considerations": ["Sală", "Competiții"]},
        {"id": "volei", "name": "Volei", "score": 86, "reasoning": "Volei — echipă, varietate tehnică. Poate menține interesul versatil.", "benefits": ["Echipă", "Varietate", "Reacții"], "considerations": ["Competitiv de la 9 ani", "Cluburi"]},
        {"id": "escalada", "name": "Escaladă", "score": 82, "reasoning": "Escaladă — provocare nouă, individual. Comunitate prietenoasă.", "benefits": ["Provocare nouă", "Individual", "Comunitate"], "considerations": ["Sală escaladă", "Echipament"]},
    ])
    add_b2(8, "Băiat", "echilibrat, prietenos, flexibil", "", [
        {"id": "inot", "name": "Înot", "score": 88, "reasoning": "Înot — grup sau individual (staffete). Preferințe mixte satisfăcute.", "benefits": ["Grup sau individual", "Flexibil", "Rezistență"], "considerations": ["Bazin", "Competitiv sau recreativ"]},
        {"id": "tenis-de-masa", "name": "Tenis de masă", "score": 85, "reasoning": "Tenis de masă — simplu sau dublu. Interior, strategic.", "benefits": ["Simplu sau dublu", "Strategic", "Interior"], "considerations": ["Cluburi", "Cost redus"]},
        {"id": "volei", "name": "Volei", "score": 83, "reasoning": "Volei — echipă cu momente individuale. Echilibrat și variat.", "benefits": ["Echipă", "Momente individuale", "Varietate"], "considerations": ["Recreativ la 8 ani", "Sală"]},
    ])

    # B2: Astm ușor, dureri ușoare (combined, no referral)
    examples_train_b2.append(make_example(
        """ANALIZA COPILULUI:

Vârstă: 9 ani
Gen: Fată

Nivel de energie: Mediu

Trăsături de personalitate: sociabilă, veselă, cooperantă

Interese și hobby-uri: dans, muzică, prietene

Sporturi încercate anterior: gimnastică

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Astm ușor (controlat)
- Folosește inhaler: Ocazional
- Dureri ușoare ocazionale

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Nu""",
        {
            "recommendations": [
                {"sportId": "inot", "sportName": "Înot", "matchScore": 92, "reasoning": "Înotul este ideal pentru astm ușor (aer umed) și dureri ușoare (zero impact). Cursuri de grup pentru sociabilă.", "benefits": ["Aer umed pentru astm", "Zero impact articulații", "Grup"], "considerations": ["Inhalator la bazin", "Informați instructorul", "Monitorizați durerile"]},
                {"sportId": "dans", "sportName": "Dans", "matchScore": 85, "reasoning": "Dansul în interior — controlat pentru astm. Impact redus. Grup pentru sociabilă.", "benefits": ["Interior controlat", "Impact redus", "Grup"], "considerations": ["Inhalator la curs", "Stiluri cu impact redus"]},
                {"sportId": "volei", "sportName": "Volei", "matchScore": 78, "reasoning": "Volei recreativ — intensitate intermitentă, pauze. Echipă pentru sociabilă.", "benefits": ["Intensitate intermitentă", "Echipă", "Pauze naturale"], "considerations": ["Inhalator disponibil", "Monitorizați respirația"]},
            ],
            "specialistRecommendation": {"needed": False},
        },
    ))

    # B2: Validation set (5 examples)
    v_b2_1 = make_example("""ANALIZA COPILULUI:

Vârstă: 6 ani
Gen: Fată

Nivel de energie: Ridicat

Trăsături de personalitate: creativă, expresivă, veselă

Interese și hobby-uri: muzică, desen, prietene

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Încă dezvoltă coordonarea

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Nu""", {
        "recommendations": [
            {"sportId": "dans", "sportName": "Dans", "matchScore": 92, "reasoning": "Dansul la 6 ani pentru creativă și expresivă — grup, muzică, mișcare.", "benefits": ["Creativitate", "Grup", "Muzică"], "considerations": ["Studio", "Cost 150-300 lei"]},
            {"sportId": "balet", "sportName": "Balet", "matchScore": 88, "reasoning": "Balet — grație și expresie. De la 6 ani nivel poate fi mai structurat.", "benefits": ["Grație", "Expresie", "Structură"], "considerations": ["Studiou", "Echipament"]},
            {"sportId": "gimnastica", "sportName": "Gimnastică", "matchScore": 84, "reasoning": "Gimnastică artistică — bază pentru dans, coordonare.", "benefits": ["Bază dans", "Coordonare", "Flexibilitate"], "considerations": ["Sală", "Recreativ sau competitiv"]},
        ],
        "specialistRecommendation": {"needed": False},
    })
    examples_val_b2.append(v_b2_1)

    v_b2_2 = make_example("""ANALIZA COPILULUI:

Vârstă: 10 ani
Gen: Băiat

Nivel de energie: Foarte ridicat

Trăsături de personalitate: competitiv, energic, impulsiv

Interese și hobby-uri: fotbal, jocuri, prieteni

Sporturi încercate anterior: fotbal

Constituție fizică: Atletic
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Nu
- Activități exterioare: Da
- Sporturi de echipă: Da
- Sporturi individuale: Nu""", {
        "recommendations": [
            {"sportId": "baschet", "sportName": "Baschet", "matchScore": 92, "reasoning": "Baschet — ritm rapid, echipă, consumă energia foarte ridicată.", "benefits": ["Rapid", "Echipă", "Energie"], "considerations": ["Cluburi", "Competitiv de la 8 ani"]},
            {"sportId": "handbal", "sportName": "Handbal", "matchScore": 88, "reasoning": "Handbal — dinamic, echipă, tradiție românească.", "benefits": ["Dinamic", "Echipă", "Tradiție RO"], "considerations": ["Cluburi", "Antrenamente"]},
            {"sportId": "fotbal", "sportName": "Fotbal", "matchScore": 85, "reasoning": "Fotbal — continuare pasiune, alt club sau poziție pentru noutate.", "benefits": ["Pasiune existentă", "Echipă", "Aer liber"], "considerations": ["Alt club", "Poziție nouă"]},
        ],
        "specialistRecommendation": {"needed": False},
    })
    examples_val_b2.append(v_b2_2)

    v_b2_3 = make_example("""ANALIZA COPILULUI:

Vârstă: 7 ani
Gen: Băiat

Nivel de energie: Mediu

Trăsături de personalitate: timid, blând, sensibil

Interese și hobby-uri: animale, citit, natură

Sporturi încercate anterior: Niciunul

Constituție fizică: Subțire
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Nu
- Sporturi de echipă: Nu
- Sporturi individuale: Da""", {
        "recommendations": [
            {"sportId": "inot", "sportName": "Înot", "matchScore": 90, "reasoning": "Înot — mediu calm, individual, progres personal. Ideal pentru timid.", "benefits": ["Calm", "Individual", "Progres personal"], "considerations": ["Cursuri individuale la început", "Bazin"]},
            {"sportId": "dans", "sportName": "Dans", "matchScore": 82, "reasoning": "Dans — expresie în mediu sigur, individual sau grup mic.", "benefits": ["Mediu sigur", "Expresie", "Grup mic"], "considerations": ["Studio inclusiv", "Stiluri variate"]},
            {"sportId": "sah", "sportName": "Șah", "matchScore": 78, "reasoning": "Șah — zero presiune socială, strategic. Complementar.", "benefits": ["Zero presiune", "Strategic", "Individual"], "considerations": ["Cluburi", "Online"]},
        ],
        "specialistRecommendation": {"needed": False},
    })
    examples_val_b2.append(v_b2_3)

    v_b2_4 = make_example("""ANALIZA COPILULUI:

Vârstă: 12 ani
Gen: Fată

Nivel de energie: Ridicat

Trăsături de personalitate: nonconformistă, independentă, creativă

Interese și hobby-uri: artă, muzică, skateboard

Sporturi încercate anterior: dans
Motiv oprire: Prea structurat

Constituție fizică: Atletic
Nivel coordonare: Foarte bine coordonat

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Nu
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da""", {
        "recommendations": [
            {"sportId": "skateboarding", "sportName": "Skateboarding", "matchScore": 93, "reasoning": "Skateboarding — libertate, creativitate, cultură nonconformistă.", "benefits": ["Libertate", "Creativitate", "Cultură"], "considerations": ["Echipament protecție OBLIGATORIU", "Skatepark-uri"]},
            {"sportId": "escalada", "sportName": "Escaladă", "matchScore": 88, "reasoning": "Escaladă — provocare individuală, fără structură rigidă.", "benefits": ["Individual", "Provocare", "Libertate"], "considerations": ["Sală sau stâncă", "Echipament"]},
            {"sportId": "ciclism", "sportName": "Ciclism", "matchScore": 82, "reasoning": "Ciclism BMX sau MTB — libertate, aer liber, cultură urbană.", "benefits": ["Libertate", "Aer liber", "Urban"], "considerations": ["Cască obligatorie", "Piste sau skatepark"]},
        ],
        "specialistRecommendation": {"needed": False},
    })
    examples_val_b2.append(v_b2_4)

    v_b2_5 = make_example("""ANALIZA COPILULUI:

Vârstă: 8 ani
Gen: Fată

Nivel de energie: Scăzut

Trăsături de personalitate: calmă, gânditoare, sensibilă

Interese și hobby-uri: citit, puzzle-uri, natură

Sporturi încercate anterior: Niciunul

Constituție fizică: Mediu
Nivel coordonare: Coordonare bună

CONDIȚII MEDICALE:
- Fără astm
- Fără dureri articulare

Preferințe:
- Activități interioare: Da
- Activități exterioare: Da
- Sporturi de echipă: Nu
- Sporturi individuale: Da""", {
        "recommendations": [
            {"sportId": "tir-cu-arcul", "sportName": "Tir cu arcul", "matchScore": 90, "reasoning": "Tir cu arcul — calm, concentrare, precizie. Individual.", "benefits": ["Calm", "Concentrare", "Individual"], "considerations": ["Cluburi", "Echipament oferit"]},
            {"sportId": "sah", "sportName": "Șah", "matchScore": 88, "reasoning": "Șah — strategic, calm, zero efort fizic mare.", "benefits": ["Strategic", "Calm", "Intelectual"], "considerations": ["Cluburi", "Online"]},
            {"sportId": "inot", "sportName": "Înot", "matchScore": 82, "reasoning": "Înot recreativ — ritm personal, energie scăzută ok, mediu calm.", "benefits": ["Ritm personal", "Calm", "Fără presiune"], "considerations": ["Cursuri individuale", "Bazin"]},
        ],
        "specialistRecommendation": {"needed": False},
    })
    examples_val_b2.append(v_b2_5)

    # Write files: append BATCH 2 only (so running script adds only new examples)
    base_dir = os.path.dirname(os.path.abspath(__file__))
    training_path = os.path.join(base_dir, "training_data.jsonl")
    validation_path = os.path.join(base_dir, "validation_data.jsonl")

    with open(training_path, "a", encoding="utf-8") as f:
        f.write("\n")  # ensure new examples start on new line
        for ex in examples_train_b2:
            f.write(json.dumps(ex, ensure_ascii=False) + "\n")

    with open(validation_path, "a", encoding="utf-8") as f:
        f.write("\n")  # ensure new examples start on new line
        for ex in examples_val_b2:
            f.write(json.dumps(ex, ensure_ascii=False) + "\n")

    print(f"Appended BATCH 2: {len(examples_train_b2)} training + {len(examples_val_b2)} validation examples.")
    print(f"Training: {training_path}")
    print(f"Validation: {validation_path}")


if __name__ == "__main__":
    main()
